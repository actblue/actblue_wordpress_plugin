#!/usr/bin/env bash

if [[ -z "$CIRCLECI" ]]; then
    echo "This script can only be run by CircleCI. Aborting." 1>&2
    exit 1
fi

if [[ -z "$CIRCLE_BRANCH" || "$CIRCLE_BRANCH" != "main" ]]; then
    echo "Build branch is required and must be 'main' branch. Stopping deployment." 1>&2
    exit 0
fi

if [[ -z "$WP_ORG_PASSWORD" ]]; then
    echo "WordPress.org password not set. Aborting." 1>&2
    exit 1
fi

if [[ -z "$WP_ORG_PLUGIN_NAME" ]]; then
    echo "WordPress.org plugin name not set. Aborting." 1>&2
    exit 1
fi

if [[ -z "$WP_ORG_USERNAME" ]]; then
    echo "WordPress.org username not set. Aborting." 1>&2
    exit 1
fi

SVN_URL=${SVN_URL:-"https://plugins.svn.wordpress.org/${WP_ORG_PLUGIN_NAME}/"}
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