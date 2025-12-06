'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Item.init({
    item_code: DataTypes.STRING,
    description: DataTypes.TEXT,
    item_pictures: DataTypes.JSON,
    length: DataTypes.FLOAT,
    breadth: DataTypes.FLOAT,
    height: DataTypes.FLOAT,
    version: DataTypes.INTEGER,
    created_by: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Item',
  });
  return Item;
};