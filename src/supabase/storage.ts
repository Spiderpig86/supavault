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
    const { data, error } = await this.client.storage.createBucket(bucketName, {
      public: false,
    });

    if (!error) {
      throw new Error(`Error creating bucket ${bucketName}, ${JSON.stringify(error)}`);
    }

    return data;
  }

  public async download(
    bucketName: string,
    path: string,
    file: any,
  ): Promise<any> {
    const { data, error } = await this.client.storage
      .from(bucketName)
      .download(`${path}/${file}.json`);

    if (error) {
      throw new Error(`Error creating bucket ${bucketName}, ${JSON.stringify(error)}`);
    }

    if (!data) {
      throw new Error(
        `No data found in JSON file with path ${path}/${file}.json`,
      );
    }

    return (data as Blob).text();
  }

  public async upload(
    bucketName: string,
    path: string,
    file: any,
  ): Promise<any> {
    const { data, error } = await this.client.storage
      .from(bucketName)
      .upload(path, JSON.stringify(file), {
        cacheControl: `3600`,
        upsert: false,
      });

    if (error) {
      throw new Error(`Error uploading to bucket ${bucketName}, ${JSON.stringify(error)}`);
    }

    if (!data) {
      throw new Error(
        `No data found in JSON file with path ${path}/${file}.json`,
      );
    }

    return { data, error };
  }
}
