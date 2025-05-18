# Prerequisites

* [Install Node.JS](https://nodejs.org/en) >= 18.15.0
* [Install Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable) >= 1.22.19
* Install MySQL

# How to run server

Firstly, you need to setup MySQL:
* Create database with `project` name
* Run [1_schema_init.sql](server/database/1_schema_init.sql) and [2_data_init.sql](server/database/2_data_init.sql) for created database
* Update [.env](server/.env) file with necessary config values

```shell
cd server

yarn install

yarn dev
```

# How to run client

```shell
cd client

yarn install

yarn dev
```

Open browser and go to http://localhost:3000