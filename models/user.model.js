/**
 * Foydalanuvchi modeli
 * Tizimda ro'yxatdan o'tgan foydalanuvchilar uchun ma'lumotlar bazasi modeli
 */
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.config.js';

// Foydalanuvchi modelini aniqlash
const User = sequelize.define('User', {
  // Noyob identifikator
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  // Foydalanuvchi ismi
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  // Foydalanuvchi familiyasi
  surname: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  // Elektron pochta manzili (noyob)
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  // Parol (shifrlangan)
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // Foydalanuvchi holati
  status: {
    type: DataTypes.ENUM('active', 'inactive', 'deleted'),
    defaultValue: 'active',
  }
}, {
  // Jadval sozlamalari
  tableName: 'users', // Ma'lumotlar bazasidagi jadval nomi
  timestamps: true // Yaratilgan va yangilangan vaqtlarni saqlash
});

export  {User};
