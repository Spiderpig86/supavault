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
    const { data, error } = await this.client.from(tableName).select();

    if (error) {
      throw new Error(`Error getting table ${tableName}, ${JSON.stringify(error)}`);
    }

    return data;
  }

  public async upsert(tableName: string, dataToUpsert: any): Promise<any> {
    const { data, error } = await this.client
      .from(tableName)
      .upsert(dataToUpsert);

    if (error) {
      throw new Error(`Error upserting to table ${tableName}, ${JSON.stringify(error)}`);
    }

    return data;
  }
}
