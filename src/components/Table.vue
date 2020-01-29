<template>
    <div class="flex-shrink-0 bg-gray-100 rounded-lg mt-3">
        <div class="px-6 py-2 text-xl w-full border-b-2
            border-gray-400"> Query results </div>

        <div v-if="query.error" class="px-3">
            <strong> error </strong> <br>
            <p class="text-left"> {{query.error}} </p>
        </div>

        <div class="mb-2">
            <table v-if="query.result" class="pl-6 mb-2 pb-2">
                <tr> <th class="p-2 text-gray-700" v-if="query.result" v-for="column in query.result[0].columns">
                        {{column}}
                    </th></tr>
                    <tr v-for="row in query.result[0].values">
                        <td class="p-2 text-gray-700" v-for="col in row">
                            {{col}}
                        </td>
                    </tr>
            </table>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Query } from '@/database';

@Component
export default class Table extends Vue {
    @Prop() private query!: Query; 
    setGuess?: any; 
}
</script>

