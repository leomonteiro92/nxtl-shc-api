const db = require('../models');

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
module.exports.list = async (req, res) => {
    const {
        limit = 10, page = 0
    } = req.query;
    try {
        const {
            count,
            rows
        } = await db.Superpower.findAndCountAll({
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
        const data = await db.Superpower.create(body);
        return res.status(200).send({
            data: data
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
module.exports.update = async (req, res) => {
    const {
        body,
        params
    } = req;
    try {
        const data = await db.Superpower.findById(params.id);
        if (!data) throw new Error(`Superpower not found with id:${params.id}`);
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
    const { params } = req;
    try {
        const data = await db.Superpower.findById(params.id);
        if (!data)
            throw new Error(`Superpower not found with id:${params.id}`);
        await data.destroy();
        return res.status(204).end();
    }
    catch (err) {
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
        const data = await db.Superpower.findById(params.id);
        if (!data) throw new Error(`Superpower not found with id:${params.id}`);
        return res.status(200).send({
            data: data
        });
    } catch (err) {
        return res.status(400).send({
            error: err.message
        });
    }
}