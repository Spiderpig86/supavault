import { runCli } from './cli';
import { Db } from './supabase/db';
import { Storage } from './supabase/storage';

function isCliCall() {
  return require.main === module;
}

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
): Promise<string> {
  await supaVault.storage.createBucket(bucketName);
  const dateTime = new Date().toISOString();
  const folderName = `backup-${dateTime}`;

  for (const table of tables) {
    const data = await supaVault.db.get(table);
    console.log(`Backing up table ${table}`);

    try {
      await supaVault.storage.upload(
        bucketName,
        `${folderName}/${table}.json`,
        data,
      );
    } catch (err) {
      console.error(`Failed to create backup for table ${table}`, err);
    }
  }

  return folderName;
}

export async function restore(
  supaVault: SupaVault,
  bucketName: string,
  folderName: string,
  tables: string[],
) {
  for (const table of tables) {
    console.log(`Restoring table ${table}`);
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

// Trigger CLI if this is triggered as a command, otherwise we only export the funcitons
if (isCliCall()) {
  runCli();
}
