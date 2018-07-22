const {
    Router
} = require('express');
const router = Router();
const {
    superheroes
} = require('../controllers');

router.get('/', superheroes.list);
router.get('/:id', superheroes.fetch);
router.post('/', superheroes.create);
router.put('/:id', superheroes.update);
router.delete('/:id', superheroes.delete);

module.exports = router;