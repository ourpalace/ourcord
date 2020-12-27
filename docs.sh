rm -rf docs/src/classes/ docs/src/interfaces/ docs/src/modules docs/src/globals.md docs/src/index.md
npx typedoc --out documentation src --plugin typedoc-plugin-markdown --hideProjectName true --hideBreadcrumbs true
mv documentation/* docs/src
cp README.md docs/src/index.md
sed -i '1i---\nsidebar: auto\n---' docs/src/index.md
rm -rf documentation