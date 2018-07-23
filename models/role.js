/**
 * 
 * @param {*} sequelize 
 * @param {*} DataTypes 
 */
module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define('Role', {
        name: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true
        }
    }, { 
        tableName: 'roles',
        underscored: true 
    });

    Role.associate = (models) => {
        models.Role.belongsToMany(models.User, {
            as: 'users',
            through: models.UserRole
        });
    };

    return Role;
};