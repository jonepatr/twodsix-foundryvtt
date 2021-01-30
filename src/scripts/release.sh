SEARCH_PATTERN='(\s*"(manifest|download)"\:).*'
DEVELOPMENT_REPLACE="\1 \"https://github.com/xdy/twodsix-foundryvtt/releases/download/v$1/system.json\","
MASTER_REPLACE="\1 \"https://github.com/xdy/twodsix-foundryvtt/releases/latest/system.json\","

sed -i -e 's|\(.*"version"\): "\(.*\)",.*|\1: '"\"$1\",|" static/system.json &&
  if echo "$1" | grep -q "development"; then sed -i -e -E  s"~$SEARCH_PATTERN~$DEVELOPMENT_REPLACE~" static/system.json; else sed -i -e -E  s"~$SEARCH_PATTERN~$MASTER_REPLACE~" static/system.json; fi &&
  cp static/system.json dist &&
  sed -i -e 's|\(.*"version"\): "\(.*\)",.*|\1: '"\"$1\",|" package.json &&
  npm install &&
  npm audit fix &&
  cd dist || exit &&
  zip -r twodsix.zip ./* &&
  cd ..

