import { Sequelize } from "sequelize";
import config from './index.js'

// Sequelize ORM orqali ma'lumotlar bazasiga ulanish
// database - ma'lumotlar bazasi nomi, password - parol, username - foydalanuvchi nomi
const sequelize = new Sequelize(config.database.database, config.database.username, config.database.password, {
  dialect: config.database.dialect, // Ma'lumotlar bazasi turi (postgres)
  host: config.database.host,       // Ma'lumotlar bazasi serveri manzili
  port: config.database.port,       // Ma'lumotlar bazasi porti
  logging: false                    // SQL so'rovlarni logga yozmaslik
});

export {sequelize}