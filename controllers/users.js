const acl = require('../utils/acl');
const db = require('../models');

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
module.exports.list = async (req, res) => {
    try {
        const {
            limit = 10, page = 0
        } = req.query;
        const {
            count,
            rows
        } = await db.User.findAndCountAll({
            attributes: ['id', 'username', 'created_at', 'updated_at'],
            limit: limit,
            offset: page
        });
        return res.status(200).send({
            count: count,
            data: rows
        });
    } catch (err) {
        return res.status(400).send({
            error: err.message
        });
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
module.exports.create = async (req, res) => {
    const {
        body
    } = req;
    try {
        const data = await db.User.create(body);
        return res.status(200).send({
            data: data
        });
    } catch (err) {
        console.log(err);
        return res.status(400).send({
            error: err.message
        });
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
module.exports.update = async (req, res) => {
    const {
        body,
        params
    } = req;
    try {
        const data = await db.User.findById(params.id);
        if (!data) throw new Error(`User not found with id:${params.id}`);
        await data.update(body);
        return res.status(204).end();
    } catch (err) {
        return res.status(400).send({
            error: err.message
        });
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
module.exports.delete = async (req, res) => {
    const {
        params
    } = req;
    try {
        const data = await db.User.findById(params.id);
        if (!data)
            throw new Error(`User not found with id:${params.id}`);
        await data.destroy();
        return res.status(204).end();
    } catch (err) {
        return res.status(400).send({
            error: err.message
        });
    }
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
module.exports.fetch = async (req, res) => {
    const {
        params
    } = req;
    try {
        const data = await db.User.findById(params.id, {
            attributes: ['id', 'username', 'created_at', 'updated_at']
        });
        if (!data) throw new Error(`User not found with id:${params.id}`);
        return res.status(200).send({
            data: data
        });
    } catch (err) {
        return res.status(400).send({
            error: err.message
        });
    }
}