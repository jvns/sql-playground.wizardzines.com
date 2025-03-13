import template from "./Main.html";
import Table from "./Table.js";
import Example from "./Example.js";
import TableLink from "./TableLink.js";
import { Database } from "./database.js";

// Notice we don't import SQL.js - it will be loaded from the global scope

export default {
  name: "Main",
  template,
  components: {
    Table,
    Example,
    TableLink
  },
  setup() {
    const guess = Vue.ref({});
    const database = Vue.ref(null);

    const values = query => {
      if (query.result === undefined || query.result[0] === undefined) {
        return "";
      }
      return query.result[0].values;
    };

    const setGuess = query => {
      guess.value = { query };
      runQuery(null);
    };

    const runQuery = async event => {
      // Set hash to current query
      const hash = encodeURI(guess.value.query);
      if (history.pushState) {
        history.pushState(null, null, "#" + hash);
      } else {
        window.location.hash = "#" + hash;
      }

      // Wait for database to be set
      while (!database.value) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      database.value.exec(guess.value);
      guess.value = JSON.parse(JSON.stringify(guess.value));
    };

    Vue.onMounted(async () => {
      try {
        // Use global initSqlJs function from the script tag
        const SQLite = await window.initSqlJs({
          locateFile: file => "/static/sql-wasm.wasm"
        });

        const db = new Database(SQLite);
        await db.init();
        database.value = db;

        // Handle hash in URL
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
