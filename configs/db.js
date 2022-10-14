import { Sequelize } from 'sequelize';

// Option 3: Passing parameters separately (other dialects)
const db = new Sequelize('dbfood', 'root', 'root123', {
    host: 'localhost',
    dialect: 'mysql' 
});

db.authenticate()
    .then(() => {
        console.log('Connected server successfully')
    })

export default db;