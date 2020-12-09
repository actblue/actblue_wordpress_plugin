#!/usr/bin/env bash

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
PLUGIN_SVN_PATH="/tmp/svn"

# Checkout the SVN repo
svn checkout -q $SVN_URL $PLUGIN_SVN_PATH

# Delete the assets directory
rm -rf $PLUGIN_SVN_PATH/assets

# Copy our plugin assets as the new assets directory
rsync -rc --exclude=".gitkeep" ./assets/ $PLUGIN_SVN_PATH/assets/

# Move to SVN directory
cd $PLUGIN_SVN_PATH

# Add new files to SVN
svn stat | grep '^?' | awk '{print $2}' | xargs -I x svn add x@

# Remove deleted files from SVN
svn stat | grep '^!' | awk '{print $2}' | xargs -I x svn rm --force x@

# Commit to SVN
svn commit --no-auth-cache --username $WP_ORG_USERNAME --password $WP_ORG_PASSWORD -m "Deploy new assets"