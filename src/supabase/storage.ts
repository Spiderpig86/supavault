import { SupabaseClient, createClient } from '@supabase/supabase-js';

export class Storage {
  private static instance: Storage;
  private client: SupabaseClient;

  private constructor(dbUrl: string, sessionKey: string) {
    this.client = createClient(dbUrl, sessionKey);
  }

  public static getInstance(dbUrl: string, sessionKey: string): Storage {
    if (!Storage.instance) {
      Storage.instance = new Storage(dbUrl, sessionKey);
    }
    return Storage.instance;
  }

  public async createBucket(bucketName: string): Promise<any> {
    // TODO
  }

  public async download(path: string, file: any): Promise<any> {
    // TODO
  }

  public async upload(
    path: string,
    folderPath: string,
    file: any,
  ): Promise<any> {
    // TODO
  }
}
