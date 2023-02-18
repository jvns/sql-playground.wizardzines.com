<template>
    <button 
        href='#'
        class="plausible-event-name=click-table text-mono text-pink-800 border-b border-dotted border-pink-700"
        v-on:click="setGuess('select * from ' + table)">
        {{table}}</button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Query } from '@/database';

@Component
export default class TableLink extends Vue {
    @Prop() private table!: string;
    @Prop() private setGuess!: any;
}
</script>


