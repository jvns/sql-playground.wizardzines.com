set -eux
mkdir -p public
esbuild main.js --bundle --loader:.html=text --outfile=bundle.js --alias:vue=vue/dist/vue.esm-bundler.js
cp index.html public
cp -R static public
cp bundle.js public
