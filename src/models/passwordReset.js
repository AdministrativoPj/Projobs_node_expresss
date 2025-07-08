const { DataTypes } = require('sequelize');
const { sequelize } = require('./Usuario'); // ✅ esta es la correcta

const PasswordReset = sequelize.define('PasswordReset', {
  correo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false
  },
  expiracion: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: 'password_resets',
  timestamps: false
});

module.exports = PasswordReset;
