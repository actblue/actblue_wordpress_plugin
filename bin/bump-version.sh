#!/bin/bash

PARAMS=""

show_help() {
  cat <<EOF
Usage: ${0##*/} [options]

Bump the version across plugin files. If no version is specified,
an interactive session will prompt you for the new version.

Options:

  -h, --help      Display this help and exit
  -v, --version   Set the version to bump to
  --commit        Commit the changes locally to git once bumped
  --tag           Add a local git tag once bumped
EOF
}

COMMIT=
TAG=

while (( "$#" )); do
  case "$1" in
    -h|--help)
      echo
      show_help
      exit 0
      ;;
    --commit)
      COMMIT=1
      shift
      ;;
    --tag)
      TAG=1
      shift
      ;;
    -v|--version)
      if [ -n "$2" ] && [ ${2:0:1} != "-" ]; then
        NEW_VERSION=$2
        shift 2
      else
        echo "ERROR: Argument for 'Version' is missing" >&2
        exit 1
      fi
      ;;
    --version=?*)
      NEW_VERSION=${1#*=}
      if [ -z "$NEW_VERSION" ]; then
        echo "ERROR: Argument for 'Version' is missing" >&2
        exit 1
      fi
      shift
      ;;
    -*|--*=) # unsupported flags
      echo "WARN: Unsupported flag $1" >&2
      shift
      ;;
    *) # preserve positional arguments
      PARAMS="$PARAMS $1"
      shift
      ;;
  esac
done

# set positional arguments in their proper place
eval set -- "$PARAMS"

echo

# Colors
BLUE='\033[0;34m'
NC='\033[0m' # No Color


if [ -z $NEW_VERSION ]; then
CURRENT_VERSION=$(cat actblue-contributions/package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[",]//g')
echo "Prompt for Version:"
echo -e "${BLUE}Current version:${NC} $CURRENT_VERSION"
read -p "New version: "  NEW_VERSION
echo
fi

echo "Bumping to $NEW_VERSION"

yarn version $NEW_VERSION --no-git-tag-version --no-commit-hooks

if [ "$COMMIT" ]; then
echo "Do a commit"
fi

if [ "$TAG" ]; then
echo "Do a tag"
fi