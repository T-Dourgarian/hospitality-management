const express = require('express');
const router = express.Router();
const axios = require("axios");
const uuid = require('uuid');
const pool = require('../pool')





router.get('/', async(req,res) => {
    try {
        
        

        const queryText = 
        `
            SELECT * FROM rate_plan
            WHERE property_id = 1;
        `;
        
        pool.query(queryText)
            .then(result => {
                res.send(result.rows);
            })
            .catch(error => {
                console.log(error);
                res.sendStatus(500);
            });


    }catch(error) {
        console.log(error)
        res.sendStatus(400);
    }
});

module.exports = router;