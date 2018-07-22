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
            type: DataTypes.GEOMETRY('POINT')
        },
        radius: {
            allowNull: false,
            type: DataTypes.FLOAT
        }
    }, {
        tableName: 'protection_areas',
        underscored: true
    });

    ProtectionArea.associate = (models) => {
        models.ProtectionArea.belongsTo(models.Superhero, {
            onDelete: 'cascade'
        });
    };

    return ProtectionArea;
};