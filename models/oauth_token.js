/**
 * 
 * @param {*} sequelize 
 * @param {*} DataTypes 
 */
module.exports = (sequelize, DataTypes) => {
    const OAuthToken = sequelize.define('OAuthToken', {
        accessToken: {
            allowNull: false,
            field: 'access_token',
            type: DataTypes.STRING
        },
        accessTokenExpiresOn: {
            allowNull: false,
            field: 'access_token_expires_on',
            type: DataTypes.DATE
        },
        clientId: {
            allowNull: false,
            field: 'oauth_client_id',
            type: DataTypes.INTEGER
        },
        refreshToken: {
            allowNull: false,
            field: 'refresh_token',
            type: DataTypes.STRING
        },
        refreshTokenExpiresOn: {
            allowNull: false,
            field: 'refresh_token_expires_on',
            type: DataTypes.DATE
        },
        userId: {
            allowNull: false,
            field: 'user_id',
            type: DataTypes.INTEGER
        }
    }, { 
        tableName: 'oauth_tokens',
        underscored: true 
    });

    OAuthToken.associate = (models) => {
        models.OAuthToken.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'user_id'
        });
        models.OAuthToken.belongsTo(models.OAuthClient, {
            as: 'client',
            foreignKey: 'oauth_client_id'
        });
    };

    return OAuthToken;
};