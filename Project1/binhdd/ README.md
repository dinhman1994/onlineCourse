- Sequelize cli

```
Step 1: create database name 'onlinecourse' in sql , readfile config.json in folder config for more information

Step 2: Go to your project and run this command
npm install

Step 3: Go to your project and run this command to create database
npx sequelize-cli db:migrate

Step 4: Run this command to create admin Account
npx sequelize-cli db:seed:all

Step 5: You have admin account with email: 'admin@gmail.com' and password '123456'

Step 6: run this command and go to localhost:8000
npm start

node_modules/.bin/sequelize help
```

- Fix eslint

```
npm run lint:fix
```
