import { Command } from 'commander';
import { backup, initializeClient } from '.';

// Parsing logic
function commaSeparatedList(value: string, dummy: any) {
  return value.split(`,`);
}

const program = new Command();

program
  .name(`supavault`)
  .description(`CLI to backup and restore Supabase tables`);

program
  .command(`backup`)
  .description(`Backs up current state of specified tables in Supabase`)
  .argument(`<string>`, `Supabase url`)
  .argument(`<string>`, `Session key`)
  .argument(`<string>`, `Bucket name`)
  .option(
    `-t, --tables <items>`,
    `Comma-separated list of table names`,
    commaSeparatedList,
  )
  .action(async (url, sessionKey, bucketName, options) => {
    console.log(url, sessionKey, bucketName, options);
    const client = initializeClient(url, sessionKey);

    await backup(client, bucketName, options.tables);
  });

program
  .command(`restore`)
  .description(`Restores data given table names in Supabase`)
  .argument(`<string>`, `Supabase url`)
  .argument(`<string>`, `Session key`)
  .argument(`<string>`, `Bucket name`)
  .option(
    `-t, --tables <items>`,
    `Comma-separated list of table names`,
    commaSeparatedList,
  )
  .action(async (url, sessionKey, bucketName, options) => {
    console.log(url, sessionKey, bucketName, options);
    const client = initializeClient(url, sessionKey);

    await backup(client, bucketName, options.tables);
  });

program.parse();
