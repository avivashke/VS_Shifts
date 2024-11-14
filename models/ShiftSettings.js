'use strict';
module.exports = (sequelize, DataTypes) => {
  const ShiftSettings = sequelize.define('ShiftSettings', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    shiftType: {
      type: DataTypes.ENUM('morning', 'evening'),
      allowNull: false
    },
    startTime: {
      type: DataTypes.STRING,
      allowNull: false
    },
    endTime: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  });
  return ShiftSettings;
};