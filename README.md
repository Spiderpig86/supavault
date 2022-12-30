# :lock: supavault

Supavault is a simple library + CLI tool to backup and restore your tables on Supabase.
Data is serialized and deserialized to/from JSON and backup files are created within Supabase Storage.

## ✨ Features

- Backup and restore tables within Supabase.
- CLI tool to use from your machine.
- API to write your own backup scripts.

## 🚀 Installation

```
npm i supavault
```

## 🖥 CLI

```
Usage: supavault [options] [command]

CLI to backup and restore Supabase tables

Options:
  -h, --help                                    display help for command

Commands:
  backup [options] <string> <string> <string>   Backs up current state of specified tables in Supabase
  restore [options] <string> <string> <string>  Restores data given table names in Supabase
  help [command]                                display help for command
```

### Backup

```
Usage: supavault backup [options] <string> <string> <string>

Backs up current state of specified tables in Supabase

Arguments:
  string                Supabase url
  string                Session key
  string                Bucket name

Options:
  -t, --tables <items>  Comma-separated list of table names
  -h, --help            display help for command
```

__Example__

```sh
supavault backup SUPABASE_URL SESSION_KEY ANY_BUCKET_NAME_YOU_WANT --tables Users,Widgets
```

### Restore


```
Usage: supavault restore [options] <string> <string> <string> <string>

Restores data given table names in Supabase

Arguments:
  string                Supabase url
  string                Session key
  string                Bucket name
  string                Folder name

Options:
  -t, --tables <items>  Comma-separated list of table names
  -h, --help            display help for command
```

__Example__

```sh
supavault restore SUPABASE_URL SESSION_KEY ANY_BUCKET_NAME_YOU_WANT --tables Users,Widgets
```

## 🔥 API

You can integrate the functionality into your project as follows. The parameters here are the same as the ones expected in the CLI:

```ts
import { backup, initializeClient, restore } from 'supavault';

const client = initializeClient(`https://yourdb.supabase.co`, `your-service-key`);

// Backing up (assuming top level await is supported)
const folderName = await backup(client, `backup`, [`User`, `Widget`]);

// Restoring
await restore(client, `backup`, folderName, [`User`, `Widget`])
```

## 🙋‍♀️ FAQ

__Where do I get the `SUPABASE_URL`?__

This URL can be found in `Settings` > `API` > `Project URL`.

__Where do I get the `SESSION_KEY`?__

This key can be found in `Settings` > `API` > `Project API Keys` > `service_role`.

> ⚠ This key has the ability to bypass Row Level Security. Never share it publicly.

## :newspaper: License and Attribution

Supavault is licensed under the [MIT license](https://github.com/Spiderpig86/supavault/blob/master/LICENSE "MIT License"). If this project has helped you in any way, attribution in your project's README would be much appreciated.

## 🤝 Contributing [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

When opening PRs, please provide adequate information on the bug or feature request. The added detail and formatting will help me understand and resolve your issue faster.
