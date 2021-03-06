import { capSQLiteSet } from '@capacitor-community/sqlite';
export const createTablesNoEncryption: string = `
    CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY NOT NULL,
    email TEXT NOT NULL,
    name TEXT,
    company TEXT,
    size FLOAT,
    age INTEGER,
    last_modified INTEGER DEFAULT (strftime('%s', 'now'))
    );
    CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY NOT NULL,
    userid INTEGER,
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    last_modified INTEGER DEFAULT (strftime('%s', 'now')),
    FOREIGN KEY (userid) REFERENCES users(id) ON DELETE SET DEFAULT
    );
    CREATE TABLE IF NOT EXISTS com_file (
      id INTEGER PRIMARY KEY NOT NULL,
      fileName TEXT,
      base64 TEXT,
      last_modified INTEGER DEFAULT (strftime('%s', 'now'))
    );
    CREATE TABLE IF NOT EXISTS eform_result_main (
      id INTEGER PRIMARY KEY NOT NULL,
      eform_result_main_guid TEXT,
      eform_define_guid TEXT,
      ref_no TEXT,
      proj_code TEXT,
      proj_guid TEXT, 
      is_deleted TEXT,
      eform_status TEXT,
      created_by TEXT,
      created_date TEXT,
      last_modified INTEGER DEFAULT (strftime('%s', 'now'))
    );
    CREATE TABLE IF NOT EXISTS eform_result_table_1 (
      id INTEGER PRIMARY KEY NOT NULL,
      eform_result_guid TEXT,
      eform_define_guid TEXT,
      eform_quest_guid TEXT,
      eform_result_main_guid TEXT,
      sort TEXT,
      alias TEXT,
      fieldName TEXT,
      defaultValues TEXT,
      required TEXT,
      pattern TEXT,
      type TEXT,
      value TEXT,
      readOnly TEXT,
      placeHolder TEXT,
      disabled TEXT,
      clearInput TEXT,
      description TEXT,
      option TEXT,
      last_modified INTEGER DEFAULT (strftime('%s', 'now'))
    );
    CREATE INDEX IF NOT EXISTS users_index_name ON users (name);
    CREATE INDEX IF NOT EXISTS users_index_last_modified ON users (last_modified);
    CREATE INDEX IF NOT EXISTS messages_index_last_modified ON messages (last_modified);
    CREATE INDEX IF NOT EXISTS com_file_index_last_modified ON com_file (last_modified);
    CREATE INDEX IF NOT EXISTS eform_result_table_1_index_last_modified ON eform_result_table_1 (last_modified);
    CREATE INDEX IF NOT EXISTS eform_result_main_index_last_modified ON eform_result_main (last_modified);
    CREATE TRIGGER IF NOT EXISTS users_trigger_last_modified 
    AFTER UPDATE ON users
    FOR EACH ROW WHEN NEW.last_modified <= OLD.last_modified  
    BEGIN  
        UPDATE users SET last_modified= (strftime('%s', 'now')) WHERE id=OLD.id;   
    END;      
    CREATE TRIGGER IF NOT EXISTS messages_trigger_last_modified AFTER UPDATE ON messages
    FOR EACH ROW WHEN NEW.last_modified <= OLD.last_modified  
    BEGIN  
        UPDATE messages SET last_modified= (strftime('%s', 'now')) WHERE id=OLD.id;   
    END;      
    CREATE TRIGGER IF NOT EXISTS com_file_trigger_last_modified AFTER UPDATE ON com_file
    FOR EACH ROW WHEN NEW.last_modified <= OLD.last_modified  
    BEGIN  
        UPDATE com_file SET last_modified= (strftime('%s', 'now')) WHERE id=OLD.id;   
    END;  
    CREATE TRIGGER IF NOT EXISTS eform_result_table_1_index_last_modified AFTER UPDATE ON eform_result_table_1
    FOR EACH ROW WHEN NEW.last_modified <= OLD.last_modified  
    BEGIN  
        UPDATE eform_result_table_1 SET last_modified= (strftime('%s', 'now')) WHERE id=OLD.id;   
    END; 
    CREATE TRIGGER IF NOT EXISTS eform_result_main_index_last_modified AFTER UPDATE ON eform_result_main
    FOR EACH ROW WHEN NEW.last_modified <= OLD.last_modified  
    BEGIN  
        UPDATE eform_result_main SET last_modified= (strftime('%s', 'now')) WHERE id=OLD.id;   
    END; 
    PRAGMA user_version = 1;
`;
export const importTwoUsers: string = `
    INSERT INTO users (name,email,age) VALUES ("Whiteley","Whiteley.com",30);
    INSERT INTO users (name,email,age) VALUES ("Jones","Jones.com",44);
`;
export const importThreeMessages: string = `
    DELETE FROM messages;
    INSERT INTO messages (userid,title,body) VALUES (1,"test post 1","content test post 1");
    INSERT INTO messages (userid,title,body) VALUES (2,"test post 2","content test post 2");
    INSERT INTO messages (userid,title,body) VALUES (1,"test post 3","content test post 3");
`;
export const dropTablesTablesNoEncryption: string = `
    PRAGMA foreign_keys = OFF;
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS messages;
    PRAGMA foreign_keys = ON;
`;

export const setUsers: Array<capSQLiteSet> = [
  {
    statement: "INSERT INTO users (name,email,age) VALUES (?,?,?);",
    values: ["Jackson", "Jackson@example.com", 18]
  },
  {
    statement: "INSERT INTO users (name,email,age) VALUES (?,?,?);",
    values: ["Kennedy", "Kennedy@example.com", 25]
  },
  {
    statement: "INSERT INTO users (name,email,age) VALUES (?,?,?);",
    values: ["Bush", "Bush@example.com", 42]
  },
];

export const deleteAllPhotoSQL: string = `
    DELETE FROM com_file;
`;

export const deleteAllUsers: string = `
    DELETE FROM users;
`;