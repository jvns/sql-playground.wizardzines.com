<template>
    <div id="app">
        <h1 class="text-3xl"> sql exercises </h1>
        <div class="w-3/5" style="margin: 0 auto;">
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Table from './components/Table.vue';
const initSqlJs = require('sql.js');
import { Database } from '@/database';
import { firebase } from '@firebase/app';
import '@firebase/firestore'

@Component({
    components: {
        Table,
    },
})
export default class App extends Vue {
    database?: Database;

    uuidv4() {
        // @ts-ignore
        return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, (c: any) =>
            // @ts-ignore
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }

    firebase() {
        // Your web app's Firebase configuration
        var firebaseConfig = {
            apiKey: "AIzaSyCEbH_2zf9dDzh6Muq-DdK3byHMUIsHfCA",
            authDomain: "wizard-sql-school.firebaseapp.com",
            databaseURL: "https://wizard-sql-school.firebaseio.com",
            projectId: "wizard-sql-school",
            storageBucket: "",
            messagingSenderId: "779622015462",
            appId: "1:779622015462:web:b0ca93a1d5fbb1ea2d3627"
        };
        firebase.initializeApp(firebaseConfig);
        // @ts-ignore
        Vue.prototype.$firedb = firebase.firestore();
    }

    async created() {
        this.firebase()
        if (!localStorage.getItem('uuid')) {
            localStorage.setItem('uuid', this.uuidv4());
        }
        // @ts-ignore
        Vue.prototype.$uuid = localStorage.getItem('uuid');
        let SQLite = await initSqlJs();
        const database = new Database(SQLite);
        await database.init();
        this.database = database;
    }
}
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
