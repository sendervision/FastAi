import { Message, ProfileAI } from "@/interface";
import { type SQLiteDatabase, type SQLiteRunResult } from "expo-sqlite/next";

export async function createTableImage(db: SQLiteDatabase, tablename: string) {
  return await db.runAsync(`
    CREATE TABLE IF NOT EXISTS ${tablename} (
      _id VARCHAR, 
      name TEXT, 
      image TEXT
    );
  `);
}

export async function getAllProfile(
  db: SQLiteDatabase,
  tablename: string
): Promise<ProfileAI[]> {
  return await db.getAllAsync<ProfileAI>(`SELECT * FROM ${tablename}`);
}

export async function getProfileByName(
  db: SQLiteDatabase,
  tablename: string,
  name: string
): Promise<ProfileAI> {
  return await db.getFirstAsync(
    `SELECT image FROM ${tablename} WHERE name=?`,
    name
  );
}

export async function savedProfileAi(
  db: SQLiteDatabase,
  tablename: string,
  { id, image, name }: ProfileAI
) {
  return await db.runAsync(
    `INSERT INTO ${tablename} (_id, name, image) VALUES (?, ?, ?);`,
    id,
    name,
    image
  );
}

export async function deleteAllProfile(
  db: SQLiteDatabase,
  tablename: string
): Promise<SQLiteRunResult> {
  return await db.runAsync("DELETE FROM tablename = ?", tablename);
}

export async function deleteProfileByName(
  db: SQLiteDatabase,
  tablename: string,
  name: string
) {
  return await db.runAsync(`DELETE FROM ${tablename} WHERE name = ?;`, name);
}
