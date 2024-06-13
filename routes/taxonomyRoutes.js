const express = require('express');
const router = express.Router();
const taxonomyController = require('../controllers/taxonomyController');

router.post('/taxonomy', taxonomyController.createTaxonomy);
router.get('/taxonomy/:id', taxonomyController.getTaxonomy);
router.put('/taxonomy/:id', taxonomyController.updateTaxonomy);
router.delete('/taxonomy/:id', taxonomyController.deleteTaxonomy);
router.get('/taxonomies', taxonomyController.listTaxonomies);
router.get('/taxonomies/parent/:parentId', taxonomyController.listTaxonomiesByParentId); // New route

module.exports = router;
