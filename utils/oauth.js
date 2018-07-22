const db = require('../models');

module.exports.getAccessToken = async (bearerToken) => {
    try {
        const token = await db.OAuthToken.findOne({
            where: {
                accessToken: bearerToken
            }
        });
        if (!token) return;
        return {
            accessToken: token.accessToken,
            accessTokenExpiresAt: new Date(token.accessTokenExpiresOn),
            client: {
                id: token.clientId
            },
            expires: token.accessTokenExpiresOn,
            user: await token.getUser({
                attributes: ['id', 'username'],
                include: ['roles']
            })
        };
    } catch (err) {
        throw err;
    }
};

module.exports.getClient = async (clientId, clientSecret) => {
    try {
        const client = await db.OAuthClient.findOne({
            where: {
                uid: clientId,
                secret: clientSecret
            }
        });
        if (!client) return;
        return {
            clientId: client.id,
            clientSecret: client.secret,
            grants: ['password']
        };
    } catch (err) {
        throw err;
    }
};

module.exports.getRefreshToken = async (bearerToken) => {
    try {
        const token = await db.OAuthToken.findOne({
            where: {
                refreshToken: bearerToken
            }
        });
        if (!token) return;
        return {
            accessToken: token.accessToken,
            client: {
                id: token.clientId
            },
            expires: token.accessTokenExpiresOn,
            user: {
                id: token.userId
            }
        };
    } catch (err) {
        throw err;
    }
};

module.exports.getUser = async (username, password) => {
    try {
        const user = await db.User.findOne({
            where: {
                username: username
            },
            include: ['roles']
        });
        if (!user) throw new Error(`User not found with username ${username}`);
        if (!user.verifyPassword(password)) throw new Error('Incorrect password');
        return user;
    } catch (err) {
        throw (err);
    }
}

module.exports.saveToken = async (token, client, user) => {
    try {
        const OAuthToken = await db.OAuthToken.create({
            accessToken: token.accessToken,
            accessTokenExpiresOn: new Date(token.accessTokenExpiresAt),
            clientId: client.clientId,
            refreshToken: token.refreshToken,
            refreshTokenExpiresOn: new Date(token.refreshTokenExpiresAt),
            userId: user.id
        });
        if (!OAuthToken) throw new Error('Unable to create OAuth Token');
        console.log(await OAuthToken.getClient());
        return {
            accessToken: OAuthToken.accessToken,
            accessTokenExpiresAt: OAuthToken.accessTokenExpiresOn,
            client: {
                id: OAuthToken.clientId
            },
            user: {
                id: OAuthToken.userId
            }
        };
    } catch (err) {
        throw err;
    }
};