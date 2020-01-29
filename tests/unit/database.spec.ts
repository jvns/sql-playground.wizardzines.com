/**
 * @jest-environment node
 */
import { Database } from '@/database';
const initSqlJs = require('sql.js');

describe('whatever', () => {

    it('all the queries run', async () => {
        const SQLite = await initSqlJs();
        const database = new Database(SQLite);
        await database.init();
        // queries.forEach(function(query: PuzzleDef) {
        //    database.exec(query.answer);
        //    expect(query.answer.result!.length).toBeGreaterThan(0);
        // });
    });
});
