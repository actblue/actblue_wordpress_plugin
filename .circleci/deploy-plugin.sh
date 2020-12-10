#!/usr/bin/env bash

set -e

while getopts "u:p:h" opt; do
    case ${opt} in
        u )
            WP_ORG_USERNAME=$OPTARG
            ;;
        p )
            WP_ORG_PASSWORD=$OPTARG
            ;;
        h )
            echo "Usage: deploy-plugin.sh [-u <username>] [-p <password>]"
            echo ""
            echo "Deploys the plugin to the WordPress svn repository. If you run this"
            echo "locally, you'll either need to pass the WordPress.org username and"
            echo "password when running this script or have the \$WP_ORG_PASSWORD and"
            echo "\$WP_ORG_USERNAME environment variables set."
            echo ""
            echo "  -u  Set the WordPress.org username of the authorized user."
            echo "  -p  Set the WordPress.org password for the authorized user."
            exit 0
            ;;
        \? )
            echo "Invalid option: $OPTARG" 1>&2
            ;;
        : )
            echo "Invalid option: $OPTARG requires an argument" 1>&2
            ;;
    esac
done
shift $((OPTIND -1))


# If this is being run by CircleCI, make sure the job was triggered by a tag.
if [[ -n "$CIRCLECI" && -z "$CIRCLE_TAG" ]]; then
    echo "Deployment through CircleCI can only be initiated by a tag. Stopping deployment." 1>&2
    exit 0
fi

if [[ -z "$WP_ORG_PASSWORD" ]]; then
    echo "WordPress.org password not set. Aborting." 1>&2
    exit 1
fi

if [[ -z "$WP_ORG_USERNAME" ]]; then
    echo "WordPress.org username not set. Aborting." 1>&2
    exit 1
fi

WP_ORG_PLUGIN_NAME="actblue-contributions"
SVN_URL=${SVN_URL:-"https://plugins.svn.wordpress.org/${WP_ORG_PLUGIN_NAME}"}
PLUGIN_BUILD_PATH="/tmp/build"
PLUGIN_SVN_PATH="/tmp/svn"

# Figure out the most recent git tag
LATEST_GIT_TAG=$(git describe --tags `git rev-list --tags --max-count=1`)

# Remove the "v" at the beginning of the git tag
LATEST_SVN_TAG=${LATEST_GIT_TAG:1}

if svn ls "${SVN_URL}/tags/${LATEST_SVN_TAG}" > /dev/null 2>&1; then
    echo "Latest tag ($LATEST_SVN_TAG) already exists on the WordPress directory. No deployment needed!"
    exit 0
fi

# Checkout the git tag.
echo "Checking out the laatest git tag"
git checkout tags/$LATEST_GIT_TAG

# Create the build directory.
mkdir $PLUGIN_BUILD_PATH

# Copy plugin files.
echo "Copying plugin files"
rsync -rc --exclude-from="./actblue-contributions/.distignore" ./actblue-contributions/ $PLUGIN_BUILD_PATH

# Go back to the `main` branch to reset the state of the local repository.
echo "Reset git state"
git checkout main

# Checkout the SVN repo
echo "Checkout the svn repository from WordPress"
svn checkout $SVN_URL $PLUGIN_SVN_PATH

echo "Move assets over"
rm -rf $PLUGIN_SVN_PATH/assets # Delete the assets directory
rsync -rc --exclude=".gitkeep" ./assets/ $PLUGIN_SVN_PATH/assets/ # Copy our plugin assets as the new assets directory

# Move to SVN directory
echo "Move into the local svn repository"
cd $PLUGIN_SVN_PATH

# Delete the trunk directory and create a `tags` directory if there isn't one.
echo "Configure the local svn directory"
rm -rf ./trunk
if [ ! -d "./tags" ]; then
  mkdir tags
fi

# Copy our new version of the plugin as the new trunk directory.
echo "Copy the plugin into the local svn repository"
cp -r $PLUGIN_BUILD_PATH ./trunk

# Copy our new version of the plugin into new version tag directory.
cp -r $PLUGIN_BUILD_PATH ./tags/$LATEST_SVN_TAG

# Add new files to SVN
echo "Add new files to SVN"
svn stat | grep '^?' | awk '{print $2}' | xargs -I x svn add x@

# Remove deleted files from SVN.
svn stat | grep '^!' | awk '{print $2}' | xargs -I x svn rm --force x@

# Commit to SVN.
echo "Commit to WordPress svn repository"
svn commit --no-auth-cache --username $WP_ORG_USERNAME --password $WP_ORG_PASSWORD -m "Deploy version $LATEST_SVN_TAG"
