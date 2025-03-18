# sql-playground.wizardzines.com

## Setup

Install [esbuild](https://esbuild.github.io/)

### Build site

```
bash scripts/build.sh
```

### Live reload

* Install `entr`
* Run `bash scripts/watch.sh`

### View site

```
cd public
python3 -m http.server 8080
```

Then open http://localhost:8080
