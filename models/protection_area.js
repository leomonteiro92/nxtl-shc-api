/**
 * 
 * @param {*} sequelize 
 * @param {*} DataTypes 
 */
module.exports = (sequelize, DataTypes) => {
    const ProtectionArea = sequelize.define('ProtectionArea', {
        name: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true
        },
        point: {
            allowNull: false,
            type: DataTypes.GEOMETRY('POINT', 4326)
        },
        radius: {
            allowNull: false,
            type: DataTypes.FLOAT
        }
    }, {
        tableName: 'protection_areas',
        underscored: true
    });

    return ProtectionArea;
};