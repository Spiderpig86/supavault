import { Db } from './supabase/db';
import { Storage } from './supabase/storage';

export interface SupaVault {
  db: Db;
  storage: Storage;
}

export function initializeClient(url: string, sessionKey: string): SupaVault {
  const db = Db.getInstance(url, sessionKey);
  const storage = Storage.getInstance(url, sessionKey);

  return {
    db,
    storage,
  };
}

export async function backup(
  supaVault: SupaVault,
  bucketName: string,
  tables: string[],
  useAllTables = false,
) {
  supaVault.storage.createBucket(bucketName);
  const dateTime = new Date().toISOString();

  // TODO fetch all tables

  for (const table of tables) {
    const data = await supaVault.db.get(table);

    try {
      await supaVault.storage.upload(
        bucketName,
        `backup-${dateTime}/${table}.json`,
        data,
      );
    } catch (err) {
      console.error(`Failed to create backup for table ${table}`, err);
    }
  }
}

export async function restore(
  supaVault: SupaVault,
  bucketName: string,
  folderName: string,
  tables: string[],
  useAllTables = false,
) {
  // TODO fetch all tables

  for (const table of tables) {
    const data = await supaVault.storage.download(
      bucketName,
      folderName,
      table,
    );

    try {
      await supaVault.db.upsert(table, JSON.parse(data));
    } catch (err) {
      console.error(`Failed to create backup for table ${table}`, err);
    }
  }
}
