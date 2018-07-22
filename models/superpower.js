/**
 * 
 * @param {*} sequelize 
 * @param {*} DataTypes 
 */
module.exports = (sequelize, DataTypes) => {
    const Superpower = sequelize.define('Superpower', {
        description: DataTypes.STRING,
        name: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true
        }
    }, {
        tableName: 'superpowers',
        underscored: true
    });

    return Superpower;
};