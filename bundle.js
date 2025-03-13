(() => {
  // components/Main.html
  var Main_default = `<div class="mx-8">
<div class="flex flex-col content-center m-0 m-auto">
    <h1 align="center" class="text-2xl md:text-3xl my-8">\u2605 SQL playground \u2605</h1>
    <p class="mb-4">
    This playground is an accompaniment to <a class="text-pink-800"
        href="https://wizardzines.com/zines/sql">Become a SELECT Star!</a>.
    It contains all the SQL example tables in the zine so you can practice SELECTs a
    little bit.
    </p>
    <p class="mb-4">
    Tables:
<TableLink table=addresses v-bind:setGuess='setGuess'></TableLink>,
<TableLink table=baby_log v-bind:setGuess='setGuess'></TableLink>,
<TableLink table=cats v-bind:setGuess='setGuess'></TableLink>,
<TableLink table=clients v-bind:setGuess='setGuess'></TableLink>,
<TableLink table=dogs v-bind:setGuess='setGuess'></TableLink>,
<TableLink table=fish v-bind:setGuess='setGuess'></TableLink>,
<TableLink table=grades v-bind:setGuess='setGuess'></TableLink>,
<TableLink table=owners v-bind:setGuess='setGuess'></TableLink>,
<TableLink table=pets v-bind:setGuess='setGuess'></TableLink>,
<TableLink table=people v-bind:setGuess='setGuess'></TableLink>,
<TableLink table=plants v-bind:setGuess='setGuess'></TableLink>,
<TableLink table=products v-bind:setGuess='setGuess'></TableLink>,
<TableLink table=sales v-bind:setGuess='setGuess'></TableLink>,
<TableLink table=users v-bind:setGuess='setGuess'></TableLink>
    </p>
</div>
<div class="md:flex md:flex-row md:flex-wrap mt-8">
    <div class="mb-8 md:w-1/2 w-full md:flex-grow">
        <div>
            <textarea v-model="guess.query" 
                      class="font-mono w-full shadow appearance-none border
                      rounded-lg mb-2 h-48 py-2 px-3 bg-gray-100
                      text-gray-700 leading-tight focus:outline-none
                      focus:shadow-outline" id="query" placeholder="SELECT ... FROM .... WHERE ... GROUP BY ... HAVING ... ORDER BY ... LIMIT ...">
            </textarea>
            <button v-on:click="runQuery" class="plausible-event-name=run-query bg-pink-800 text-pink-100 hover:bg-pink-500  hover:text-pink-100 mb-2 font-bold py-2 px-4 rounded text-left">
                Run query
            </button>
        </div>
        <Table v-bind:wide="true" title="Your results" v-if="guess.result || guess.error" v-bind:query="guess"> </Table>
    </div>
    <div class="md:pl-8">
        <h2 class="text-2xl pb-4">Examples</h2>
        <div class="text-xs md:text-sm overflow-scroll px-2 bg-gray-100 rounded-lg" id="examples">
            <Example query="
SELECT * from cats
WHERE name = 'daisy'
            "
                     v-bind:setGuess='setGuess'> </Example>
            <Example query="
SELECT email, COUNT(*)
FROM users
GROUP BY email
HAVING COUNT(*) > 1
            "
                     v-bind:setGuess='setGuess'> </Example>
            <Example query="
SELECT item
  , COUNT(*)
  , MAX(price)
FROM sales
GROUP BY item
            "
                     v-bind:setGuess='setGuess'> </Example>
            <Example query="
SELECT month, SUM(price)
FROM sales
GROUP BY month
HAVING SUM(price) > 6
            "
                     v-bind:setGuess='setGuess'> </Example>

            <Example query="
SELECT *
FROM owners INNER JOIN cats
ON cats.owner = owners.id
            "
                     v-bind:setGuess='setGuess'> </Example>

            <Example query="
SELECT * from cats
ORDER BY LENGTH(name) ASC
            "
                     v-bind:setGuess='setGuess'> </Example>

            <Example query="
SELECT name, class, grade,
ROW_NUMBER() 
  OVER (
    PARTITION BY class
    ORDER BY grade DESC
  )
  AS rank_in_class
FROM grades
            "
                     v-bind:setGuess='setGuess'> </Example>
            <!--
            <Example query="
            "
                     v-bind:setGuess='setGuess'> </Example>
            -->
            <Example query="
SELECT name,
   price - COALESCE(discount,0)
      AS net_price
FROM products
            "
                     v-bind:setGuess='setGuess'> </Example>

            <Example query="
SELECT event, hour, 
  hour - LAG(hour) OVER(
    PARTITION BY event
    ORDER BY hour ASC)
   AS time_since_last
FROM baby_log
WHERE event IN ('feeding', 'diaper')
ORDER BY hour ASC

            "
                     v-bind:setGuess='setGuess'> </Example>

            <Example query="
SELECT customer
   , COALESCE(
      mailing_state,
      billing_state,
      ip_address_state
   ) AS state
FROM addresses
"
                     v-bind:setGuess='setGuess'> </Example>

            <Example query="
SELECT first_name, age, CASE
WHEN age < 13 THEN 'child'
WHEN age < 20 THEN 'teenager'
ELSE 'adult' END as age_range
FROM people
"
                     v-bind:setGuess='setGuess'> </Example>

            <Example query="
SELECT genus,
   COUNT(DISTINCT species)
FROM plants
GROUP BY 1
ORDER BY 2 DESC
"
                     v-bind:setGuess='setGuess'> </Example>

            <Example query="
SELECT owner
, SUM(CASE 
WHEN type = 'dog' THEN 1 
ELSE 0 END) AS num_dogs
, SUM(CASE 
WHEN type = 'cat' THEN 1
ELSE 0 END) AS num_cats
, SUM(CASE
WHEN type NOT IN ('dog', 'cat') THEN 1
ELSE 0 END) AS num_other
FROM pets
GROUP BY owner
"
                     v-bind:setGuess='setGuess'> </Example>
            <Example query="
SELECT owner
FROM dogs
WHERE name in (
SELECT name
FROM dogs
GROUP BY name
HAVING count(*) > 2)
"
                     v-bind:setGuess='setGuess'> </Example>



        </div>
    </div>
</div>
</div>

`;

  // components/Table.html
  var Table_default = '<div class="flex-shrink-0 bg-gray-100 rounded-lg mt-3">\n  <div class="px-6 py-2 text-xl w-full border-b-2\n              border-gray-400"> Query results </div>\n\n  <div v-if="query.error" class="px-3">\n    <strong> error </strong> <br>\n    <p class="text-left"> {{query.error}} </p>\n  </div>\n\n  <div class="mb-2">\n    <table v-if="query.result" class="pl-6 mb-2 pb-2">\n      <thead>\n      <tr> <th class="p-2 text-gray-700" v-if="query.result" v-for="column in query.result[0].columns">\n          {{column}}\n        </th>\n      </tr>\n      </thead>\n      <tbody>\n        <tr v-for="row in query.result[0].values">\n          <td class="p-2 text-gray-700" v-for="col in row">\n            {{col}}\n          </td>\n        </tr>\n      </tbody>\n    </table>\n  </div>\n</div>\n';

  // components/Table.js
  var Table_default2 = Vue.defineComponent({
    name: "Table",
    template: Table_default,
    props: {
      query: {
        type: Object,
        required: true
      },
      wide: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: "Query results"
      }
    }
  });

  // components/Example.html
  var Example_default = '<div class="py-4">\n    <pre class="">{{query.trim()}}</pre>\n    <button v-on:click="setGuess(query.trim())" class="plausible-event-name=run-example bg-blue-800 text-blue-100 hover:bg-blue-500  hover:text-blue-100 mb-2 font-bold py-1 px-3 rounded text-left text-sm mt-2">\n        Run example\n    </button>\n</div>\n\n';

  // components/Example.js
  var Example_default2 = Vue.defineComponent({
    name: "Example",
    template: Example_default,
    props: {
      query: {
        type: String,
        required: true
      },
      setGuess: {
        type: Function,
        required: true
      }
    }
  });

  // components/TableLink.html
  var TableLink_default = `<button 
  href='#'
  class="plausible-event-name=click-table text-mono text-pink-800 border-b border-dotted border-pink-700"
  @click="setGuess('select * from ' + table)">
  {{ table }}
</button>
`;

  // components/TableLink.js
  var TableLink_default2 = Vue.defineComponent({
    name: "TableLink",
    template: TableLink_default,
    props: {
      table: {
        type: String,
        required: true
      },
      setGuess: {
        type: Function,
        required: true
      }
    }
  });

  // components/database.js
  var Database = class {
    constructor(SQLite) {
      this.currentTime = /* @__PURE__ */ new Date();
      this.SQLite = SQLite;
      this.db = null;
    }
    getDbContents() {
      return new Promise(function(resolve, reject) {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "/static/db.sqlite", true);
        xhr.responseType = "arraybuffer";
        xhr.onload = (e) => {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(new Uint8Array(xhr.response));
          } else {
            reject({
              status: xhr.status,
              statusText: xhr.statusText
            });
          }
        };
        xhr.onerror = function() {
          reject({
            status: xhr.status,
            statusText: xhr.statusText
          });
        };
        xhr.send();
      });
    }
    async init() {
      try {
        const contents = await this.getDbContents();
        this.db = new this.SQLite.Database(contents);
      } catch (error) {
        console.error("Error initializing database:", error);
      }
    }
    exec(query) {
      try {
        query.result = this.db.exec(query.query);
        query.error = void 0;
        if (!query.result[0]) {
          query.result = void 0;
          query.error = "that's a valid query, but it didn't return any results :(";
        }
      } catch (error) {
        console.log(error);
        console.log(query.query);
        query.result = void 0;
        query.error = error.message;
      }
    }
  };

  // components/Main.js
  var Main_default2 = {
    name: "Main",
    template: Main_default,
    components: {
      Table: Table_default2,
      Example: Example_default2,
      TableLink: TableLink_default2
    },
    setup() {
      const guess = Vue.ref({});
      const database = Vue.ref(null);
      const values = (query) => {
        if (query.result === void 0 || query.result[0] === void 0) {
          return "";
        }
        return query.result[0].values;
      };
      const setGuess = (query) => {
        guess.value = { query };
        runQuery(null);
      };
      const runQuery = async (event) => {
        const hash = encodeURI(guess.value.query);
        if (history.pushState) {
          history.pushState(null, null, "#" + hash);
        } else {
          window.location.hash = "#" + hash;
        }
        while (!database.value) {
          await new Promise((resolve) => setTimeout(resolve, 100));
        }
        database.value.exec(guess.value);
        guess.value = JSON.parse(JSON.stringify(guess.value));
      };
      Vue.onMounted(async () => {
        try {
          const SQLite = await window.initSqlJs({
            locateFile: (file) => "/static/sql-wasm.wasm"
          });
          const db = new Database(SQLite);
          await db.init();
          database.value = db;
          let hash = decodeURI(window.location.hash);
          if (hash.length > 5) {
            guess.value = {
              query: hash.substring(1)
            };
            runQuery(null);
          } else {
            guess.value = {};
          }
        } catch (err) {
          console.error("Failed to initialize SQL.js:", err);
        }
      });
      return {
        guess,
        values,
        setGuess,
        runQuery
      };
    }
  };

  // main.js
  var app = Vue.createApp(Main_default2);
  app.mount("#app");
})();
