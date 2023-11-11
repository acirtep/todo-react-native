// import * as SQLite from "expo-sqlite"
// import { SQLiteDatabase } from "expo-sqlite"

// function getDatabase(): SQLiteDatabase {
//     return SQLite.openDatabase("db.db")
// }
//
// function setupDatabaseObjects(db: SQLiteDatabase): Boolean {
//     db.transaction((tx) => {
//         tx.executeSql(
//             "create table if not exists tasks(" +
//                 "task_id INTEGER PRIMARY KEY AUTOINCREMENT," +
//                 "task_name TEXT" +
//                 "completed INTEGER DEFAULT 0," +
//                 "created_timestamp  TIMESTAMP  DEFAULT CURRENT_TIMESTAMP)",
//             [],
//             (_, resultSet) => {},
//             (_, error) => {
//                 console.error(error)
//                 alert("Unable to create tasks table!")
//                 return true
//             },
//         )
//     })
//     return true
// }
