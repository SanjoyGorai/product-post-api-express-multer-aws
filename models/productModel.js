import { DataTypes } from "sequelize";
import { sequelize } from "../config/dbConfig.js";
import { nanoid } from "nanoid";

export const Product = sequelize.define("Product", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: () => nanoid(),
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  images: {
    type: DataTypes.JSON,
    allowNull: false,
  },
});
