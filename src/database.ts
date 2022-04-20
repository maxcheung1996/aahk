import { capSQLiteValues } from '@capacitor-community/sqlite';
import { SQLiteDBConnection } from 'react-sqlite-hook';
import { sqlite } from '../src/App';
import { createTablesNoEncryption } from './Utils/noEncryptionUtils';

export const getDBInitByName = async (name: string, encryption: string) => {
    try {

        await sqlite.closeAllConnections();
        let db = await sqlite.createConnection(name, false, encryption, 1);
        await sqlExecuteStatement("aahk", createTablesNoEncryption);
    } catch (error) {
        alert("getDBInitByName Error: " + error)
    }
}

export const sqlExecuteStatement = async (dbName: string, createTableSql: string) => {
    try {
        let db = await sqlite.retrieveConnection(dbName);
        db.open()
        await db.execute(createTableSql);
        db.close()
    } catch (error) {
        alert("sqlExecuteStatement Error : " + error)
    }
}

export const sqlQuery = async (dbName: string, querySql: string) => {

    let resp: capSQLiteValues = { values: [] };

    try {
        let db = await sqlite.retrieveConnection(dbName);
        db.open()
        resp = await db.query(querySql);
        db.close()

        return resp;

    } catch (error) {
        alert("sqlQuery Error: " + error)
        return resp;
    }
}

export const getCurrentPlatform = async () => {

    let platform = await sqlite.getPlatform().then(
        (resp: { platform: string; }) => {
            return resp;
        })

    return platform;
}


