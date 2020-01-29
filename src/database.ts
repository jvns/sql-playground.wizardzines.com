'use strict';
const initSqlJs = require('sql.js');
const fs = require('fs');
const path = require('path');

export interface StoredAnswer {
    query: string;
    complete: boolean;
}

export interface Query {
    query?: string;
    error?: string;
    result?: Result[];
    name?: string;
}

export interface Result {
    columns: string[];
    values: any[][];
}

export class Database {
    public currentTime: Date = new Date();
    public SQLite: any = null;
    public db: any = null;

    constructor(SQLite: any) {
        this.SQLite = SQLite;
    }

    public getDbContents() {
        return new Promise(function(resolve, reject) {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', '/db.sqlite', true);
            xhr.responseType = 'arraybuffer';
            xhr.onload = (e) => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(new Uint8Array(xhr.response));
                } else {
                    reject({
                        status: xhr.status,
                        statusText: xhr.statusText,
                    });
                }
            };
            xhr.onerror = function() {
                reject({
                    status: xhr.status,
                    statusText: xhr.statusText,
                });
            };
            xhr.send();
        });
    }

    public async init() {
        try {
            const contents = fs.readFileSync('./public/db.sqlite');
            this.db = new this.SQLite.Database(contents);
        } catch {
            const contents = await this.getDbContents();
            this.db = new this.SQLite.Database(contents);
        }
    }

    public exec(query: Query) {
        try {
            query.result = this.db.exec(query.query!);
            query.error = undefined;
            if (!(query.result!)[0]) {
                query.result = undefined;
                query.error = 'that\'s a valid query, but it didn\'t return any results :(';
            }
        } catch (error) {
            console.log(error);
            console.log(query.query);
            query.result = undefined;
            query.error = error.message;
        }
    }
}
