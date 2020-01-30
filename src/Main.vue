<template>
    <div class="mx-8">
    <div class="flex flex-col content-center m-0 m-auto">
        <h1 align="center" class="text-3xl my-8">★ SQL playground ★</h1>
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
                <button v-on:click="runQuery" class="bg-pink-800 text-pink-100 hover:bg-pink-500  hover:text-pink-100 mb-2 font-bold py-2 px-4 rounded text-left">
                    Run query
                </button>
            </div>
            <Table v-bind:wide="true" title="Your results" v-if="guess.result || guess.error" v-bind:query="guess"> </Table>
        </div>
        <div class="md:pl-8">
            <h2 class="text-2xl pb-4">Examples</h2>
            <div class="md:h-screen md:text-sm md:overflow-scroll md:px-2 md:bg-gray-100 md:border-2" id="examples">
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
FROM dogs
WHERE name in (
  SELECT name
  FROM dogs
  GROUP BY name
  HAVING count(*) > 2)
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



            </div>
        </div>
    </div>
    </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Database, Query, StoredAnswer} from '@/database';
import Table from './components/Table.vue';
import Example from './components/Example.vue';
import TableLink from './components/TableLink.vue';
import App from './App.vue';

@Component({
    components: {
        Table,
        Example,
        TableLink,
    },
})
export default class Main extends App {
    private guess: Query = {};

    constructor() {
        super()
    }

    async created() {
        let hash = decodeURI(window.location.hash);
        if (hash.length > 5) {
            this.guess = {
                query: hash.substring(1)
            }
            this.runQuery(null)
        } else {
            this.guess = {}
        }
        // Wait for database to be set
        while(!this.database) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
    }

    values(query: Query): any {
        if (query.result === undefined || query.result[0] === undefined) {
            return ""
        }
        return query.result[0].values
    }

    setGuess(query: string) {
        this.guess = {query: query};
        this.runQuery(null);
        scrollTo(0, 0);
    }

    async runQuery(event: any) {
        // set hash to current query
        let hash = encodeURI(this.guess.query!);
        if(history.pushState) {
            // @ts-ignore
            history.pushState(null, null, '#' + hash);
        }
        else {
            window.location.hash = '#' + hash;
        }

        // todo: ugly
        while(!this.database) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        this.database!.exec(this.guess);
        this.guess = JSON.parse(JSON.stringify(this.guess))

        // @ts-ignore
        while(!this.$firedb) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        // @ts-ignore
        this.$firedb.collection("sql-attempts").add({
            query: this.guess.query,
            // @ts-ignore
            uuid: this.$uuid,
            version: "sql-playground",
            timestamp: Math.floor(Date.now() / 1000),
        })
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
    margin: 40px 0 0;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
</style>
