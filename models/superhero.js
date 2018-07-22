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
        }
    }, {
        tableName: 'superheroes',
        underscored: true
    });

    Superhero.associate = (models) => {
        models.Superhero.hasOne(models.ProtectionArea, {
            foreignKey: 'superhero_id'
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