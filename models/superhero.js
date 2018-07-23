/**
 * 
 * @param {*} sequelize 
 * @param {*} DataTypes 
 */
module.exports = (sequelize, DataTypes) => {
    const Superhero = sequelize.define('Superhero', {
        alias: {
            allowNull: false,
            type: DataTypes.STRING
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true
        },
        protectionAreaId: {
            allowNull: false,
            field: 'protection_area_id',
            type: DataTypes.INTEGER
        }
    }, {
        tableName: 'superheroes',
        underscored: true
    });

    Superhero.associate = (models) => {
        models.Superhero.hasOne(models.ProtectionArea, {
            as: 'protectionArea',
            foreignKey: 'id'
        });
        models.Superhero.belongsToMany(models.Superpower, {
            as: 'superpowers',
            foreignKey: 'superhero_id',
            through: 'superheroes-superpowers',
            onDelete: 'cascade'
        });
    };

    return Superhero;
};