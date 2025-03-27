const express = require('express');
const router = express.Router();
const Query = require('../models/Query'); // Verify this path is correct

// GET all queries
router.get('/', async (req, res) => {
  try {
    const queries = await Query.find(); // This will now work
    res.json(queries);
  } catch (err) {
    res.status(500).json({ 
      error: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
});

module.exports = router;