/**
 * 
 * @param {*} sequelize 
 * @param {*} DataTypes 
 */
module.exports = (sequelize, DataTypes) => {
    const OAuthClient = sequelize.define('OAuthClient', {
        uid: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true
        },
        secret: {
            allowNull: false,
            type: DataTypes.STRING
        },
        redirectURI: {
            field: 'redirect_uri',
            type: DataTypes.STRING
        }
    }, { 
        tableName: 'oauth_clients',
        underscored: true 
    });

    return OAuthClient;
};