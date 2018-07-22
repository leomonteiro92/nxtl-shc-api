const {
    hashSync,
    compareSync
} = require('bcrypt');

/**
 * 
 * @param {*} sequelize 
 * @param {*} DataTypes 
 */
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        password: {
            allowNull: false,
            type: DataTypes.STRING
        },
        username: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true
        }
    }, {
        tableName: 'users',
        underscored: true
    });

    User.associate = (models) => {
        models.User.belongsToMany(models.Role, {
            as: 'roles',
            foreignKey: 'user_id',
            through: models.UserRole
        });
    };

    User.beforeSave((user, options) => {
        user.password = hashSync(user.password, 10);
    });

    User.prototype.verifyPassword = function (password) {
        return compareSync(password, this.password);
    };

    return User;
};