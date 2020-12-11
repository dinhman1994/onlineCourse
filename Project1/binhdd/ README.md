- Sequelize cli

```
Step 1: create database name 'onlinecourse' in sql , readfile config.json in folder config for more information

Step 2: Go to your project and run this command to create database
npx sequelize-cli db:migrate

Step 3: Run this command to create admin Account
npx sequelize-cli db:seed:all

Step 4: You have admin account with email: 'admin@gmail.com' and password '123456'

Step 5: run this command and go to localhost:8000
npm start

node_modules/.bin/sequelize help
```

- Fix eslint

```
npm run lint:fix
```
