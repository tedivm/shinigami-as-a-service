#!/usr/bin/env bash
set -e

# Find the current version from the Firefox extensions listing
EXTENSION_PAGE=$(curl -s -L https://addons.mozilla.org/en-US/firefox/addon/shinigami-eyes/)
VERSION_REGEX='<dd class="Definition-dd AddonMoreInfo-version">([0-9]\.[0-9]\.[0-9]+)<\/dd>'
if [[ "$EXTENSION_PAGE" =~ $VERSION_REGEX ]]
then
    VERSION="${BASH_REMATCH[1]}"
else
    echo "Unable to find version"
    exit 1
fi

# Download extension file (which is a zip with a different extension)
curl https://addons.mozilla.org/firefox/downloads/file/3827437/shinigami_eyes-$VERSION-an+fx.xpi -s -L --output shinigami_eyes.xpi
ls -lah

# Delete old data
rm -Rf data || true
rm -Rf lib || true

# Pull out the files and data
mkdir -p lib
unzip -u shinigami_eyes.xpi "data/*"
unzip -u shinigami_eyes.xpi "*.js" -d lib

# Clear the template
rm shinigami_eyes.xpi
