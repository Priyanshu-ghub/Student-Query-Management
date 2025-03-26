const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');  
const Query = require('../models/Query');

// Create Query
router.post('/', auth, async (req, res) => {
    try {
        const newQuery = new Query({
            ...req.body,
            createdBy: req.user.id
        });

        await newQuery.save();
        res.status(201).json(newQuery);
    } catch (err) {
        console.error(err.message);  // Added error logging
        res.status(500).send('Server Error');
    }
});

// Get all queries
router.get('/', auth, async (req, res) => {
    try {
        const queries = await Query.find().populate('createdBy', 'email');  
        res.json(queries);
    } catch (err) {
        console.error(err.message);  // Added error logging
        res.status(500).send('Server Error');  // Consistent error message
    }
});

// Add response 
router.post('/:id/responses', auth, async (req, res) => {  
    try {
        const query = await Query.findById(req.params.id);
        if (!query) {
            return res.status(404).json({ msg: 'Query not found' });
        }

        query.responses.push({
            text: req.body.text,
            respondedBy: req.user.id
        });
        
        await query.save();
        res.json(query);
    } catch (err) {
        console.error(err.message);  // Added error logging
        res.status(500).send('Server Error');  // Consistent error message
    }
});

module.exports = router;