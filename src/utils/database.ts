import { Message } from "@/interface";
import { type SQLiteDatabase } from "expo-sqlite/next";

export async function createTableMessage(db: SQLiteDatabase, tablename) {
  return await db.runAsync(`
    CREATE TABLE IF NOT EXISTS ${tablename} (
      _id VARCHAR, 
      text TEXT, 
      createdAt VARCHAR, 
      image TEXT, 
      user_id VARCHAR, 
      name VARCHAR
    );
  `);
}

export async function getAllMessage(
  db: SQLiteDatabase,
  tablename: string
): Promise<Message[]> {
  return await db.getAllAsync<Message>(`SELECT * FROM ${tablename}`);
}

export async function saveMessage(
  db: SQLiteDatabase,
  tablename: string,
  { _id, text, createdAt, image, user_id, name }: Message
) {
  return await db.runAsync(
    `
    INSERT INTO ${tablename} (_id, text, createdAt, image, user_id, name) VALUES (?, ?, ?, ?, ?, ?);
  `,
    _id,
    text,
    createdAt,
    image || "",
    user_id || "system",
    name
  );
}

export async function deleteOneMessage(
  db: SQLiteDatabase,
  tablename: string,
  _id: string
) {
  return await db.runAsync(`DELETE FROM ${tablename} WHERE _id = ?`, _id);
}

export async function deleteAllConversation(
  db: SQLiteDatabase,
  tablename: string
) {
  return await db.runAsync("DELETE FROM tablename = ?", tablename);
}
