'use strict';
module.exports = (sequelize, DataTypes) => {
  const ReportSettings = sequelize.define('ReportSettings', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    reportType: {
      type: DataTypes.ENUM('daily', 'weekly', 'monthly'),
      allowNull: false
    },
    emailRecipients: {
      type: DataTypes.JSON,
      allowNull: false
    },
    sendTime: {
      type: DataTypes.STRING, // Format: HH:mm
      allowNull: false
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  });
  return ReportSettings;
};