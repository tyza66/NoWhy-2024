import Database from 'better-sqlite3';
const { dbPath } = require('./fileutil');
const fs = require('fs');

//数据库操作类
const db = {
    db: null,
    init: function () {
        console.log('dbPath：', dbPath);
        //main.db
        var mainPath = dbPath + '/main.db';
        if (!fs.existsSync(dbPath)) {
            fs.writeFileSync(dbPath, '');
        }
        this.db = new Database(dbPath);
    }
}

export default db;