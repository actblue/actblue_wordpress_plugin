#!/usr/bin/env bash

CIRCLECI=1
CIRCLE_BRANCH="main"
WP_ORG_PASSWORD="password"
WP_ORG_PLUGIN_NAME="actblue-contributions"
WP_ORG_USERNAME="actblue"

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

PLUGIN_SVN_PATH="/tmp/svn"

# Checkout the SVN repo
# svn co -q "http://svn.wp-plugins.org/$WP_ORG_PLUGIN_NAME" $PLUGIN_SVN_PATH
svn co -q "file:///Users/braican/Projects/upstatement/actblue/svn" $PLUGIN_SVN_PATH

# Delete the assets directory
rm -rf $PLUGIN_SVN_PATH/assets

# Copy our plugin assets as the new assets directory
cp -r ./assets $PLUGIN_SVN_PATH/assets

# Move to SVN directory
cd $PLUGIN_SVN_PATH

# Add new files to SVN
svn stat | grep '^?' | awk '{print $2}' | xargs -I x svn add x@

# Remove deleted files from SVN
svn stat | grep '^!' | awk '{print $2}' | xargs -I x svn rm --force x@

# Commit to SVN
# svn ci --no-auth-cache --username $WP_ORG_USERNAME --password $WP_ORG_PASSWORD -m "Deploy new assets"
svn ci -m "Deploy new assets"