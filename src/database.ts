import { SQLiteDBConnection } from 'react-sqlite-hook';
import { sqlite } from '../src/App';

export const getDBInitByName = async (name: string, encryption: string) => {

    let db: SQLiteDBConnection;
    alert("initdb")
    let isDBConnected = await sqlite.isConnection(name)

    if (isDBConnected.result) {
        db = await sqlite.retrieveConnection(name)
    } else {
        try {
            db = await sqlite
                .createConnection(name, false, encryption, 1);
            isDBConnected = await sqlite.isConnection(name)
        } catch (error) {
            alert("isDBConnected final check error: " + error)
        }
    }
}

export const sqlExecuteStatement = async (dbName: string, createTableSql: string) => {
    let db: SQLiteDBConnection;
    db = await sqlite.retrieveConnection(dbName)
    db.open()
    await db.execute(createTableSql);
    db.close()
}

export const sqlQuery = async (dbName: string, querySql: string) => {

    let db: SQLiteDBConnection;
    let isDBConnected = await sqlite.isConnection(dbName)
    alert("sqlQuery isDBConnected: " + isDBConnected.result)
    db = await sqlite.retrieveConnection(dbName)
    db.open()
    let resp = await db.query(querySql);

    db.close()

    return resp;
}

export const getCurrentPlatform = async () => {

    let platform = await sqlite.getPlatform().then(
        (resp: { platform: string; }) => {
            return resp;
        })

    return platform;
}


