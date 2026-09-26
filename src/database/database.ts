import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabaseSync("todo-app.db");

export function initializeDatabase() {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    time TEXT,
    date TEXT,
    category TEXT,
    completed INTEGER NOT NULL DEFAULT 0,
    isImportant INTEGER NOT NULL DEFAULT 0
    );
`);
 console.log("Database initialized successfully.");
}
initializeDatabase();