const {
    Router
} = require('express');
const router = Router();
const {
    superpowers
} = require('../controllers');

router.get('/', superpowers.list);
router.get('/:id', superpowers.fetch);
router.post('/', superpowers.create);
router.put('/:id', superpowers.update);
router.delete('/:id', superpowers.delete);

module.exports = router;