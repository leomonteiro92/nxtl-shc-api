/**
 * 
 * @param {*} sequelize 
 * @param {*} DataTypes 
 */
module.exports = (sequelize, DataTypes) => {
    const UserRole = sequelize.define('UserRole', {
        userId: {
            allowNull: false,
            field: 'user_id',
            type: DataTypes.INTEGER
        },
        roleId: {
            allowNull: false,
            field: 'role_id',
            type: DataTypes.INTEGER
        }
    }, {
        timestamps: false,
        tableName: 'users-roles',
        underscored: true
    });

    return UserRole;
};