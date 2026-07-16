import { DataTypes } from 'sequelize';
import { sequelize } from '../src/config/database.js';

export const Brew = sequelize.define(
  'Brew',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    coffeeName: {
      type: DataTypes.STRING(120),
      allowNull: false,
      validate: { notEmpty: true },
    },
    brewMethod: {
      type: DataTypes.STRING(80),
      allowNull: false,
      validate: { notEmpty: true },
    },
    coffeeWeight: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: false,
      validate: { min: 0.1 },
    },
    waterAmount: {
      type: DataTypes.DECIMAL(7, 2),
      allowNull: false,
      validate: { min: 0.1 },
    },
    brewTime: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1 },
      comment: 'Brew time in seconds',
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1, max: 5 },
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: { notEmpty: true },
    },
  },
  {
    tableName: 'brews',
    timestamps: true,
  }
);
