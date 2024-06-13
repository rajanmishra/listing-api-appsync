const Taxonomy = require('../models/taxonomyModel');

const taxonomyController = {
    createTaxonomy: async (req, res) => {
        try {
            const result = await Taxonomy.create(req.body);
            res.status(201).json({ message: 'Taxonomy created', taxonomyId: result.taxonomyId });
        } catch (error) {
            res.status(500).json({ error: 'Could not create taxonomy' });
        }
    },

    getTaxonomy: async (req, res) => {
        try {
            const taxonomy = await Taxonomy.get(req.params.id);
            if (taxonomy) {
                res.json(taxonomy);
            } else {
                res.status(404).json({ error: 'Taxonomy not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Could not retrieve taxonomy' });
        }
    },

    updateTaxonomy: async (req, res) => {
        try {
            const updatedTaxonomy = await Taxonomy.update(req.params.id, req.body);
            res.json({ message: 'Taxonomy updated', data: updatedTaxonomy });
        } catch (error) {
            res.status(500).json({ error: 'Could not update taxonomy' });
        }
    },

    deleteTaxonomy: async (req, res) => {
        try {
            await Taxonomy.delete(req.params.id);
            res.json({ message: 'Taxonomy deleted' });
        } catch (error) {
            res.status(500).json({ error: 'Could not delete taxonomy' });
        }
    },

    listTaxonomies: async (req, res) => {
        try {
            const limit = parseInt(req.query.limit) || 10;
            const lastEvaluatedKey = req.query.lastEvaluatedKey ? JSON.parse(req.query.lastEvaluatedKey) : null;

            const result = await Taxonomy.list(limit, lastEvaluatedKey);
            res.json({
                items: result.items,
                lastEvaluatedKey: result.lastEvaluatedKey
            });
        } catch (error) {
            res.status(500).json({ error: 'Could not list taxonomies' });
        }
    },

    listTaxonomiesByParentId: async (req, res) => {
        try {
            const parentId = req.params.parentId;
            const taxonomies = await Taxonomy.listByParentId(parentId);
            res.json(taxonomies);
        } catch (error) {
            res.status(500).json({ error: 'Could not list taxonomies by parent ID' });
        }
    }
};

module.exports = taxonomyController;
