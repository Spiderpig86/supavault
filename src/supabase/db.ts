import { SupabaseClient, createClient } from '@supabase/supabase-js';

export class Db {
  private static instance: Db;
  private client: SupabaseClient;

  private constructor(dbUrl: string, sessionKey: string) {
    this.client = createClient(dbUrl, sessionKey);
  }

  public static getInstance(dbUrl: string, sessionKey: string): Db {
    if (!Db.instance) {
      Db.instance = new Db(dbUrl, sessionKey);
    }
    return Db.instance;
  }

  public async get(tableName: string): Promise<any> {
    // TODO
  }

  public async upsert(tableName: string): Promise<any> {
    // TODO
  }
}
