const express = require('express');
const router = express.Router();
const axios = require("axios");
const uuid = require('uuid');
const pool = require('../pool')



router.get('/:type', async (req,res) => {
    try {

        // arrivals, departures, inhouse
        const { type: TYPE } = req.params;

        let date = new Date();

        const TODAY_YYYYMMDD = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

        // still need to adjust query -> WHERE property.id = X
        let queryText = ``;
       
        if (TYPE == 'arrivals') {
            queryText = 
            `
                SELECT 
                    reservation.*, 
                    reservation.id as reservation_id,
                    public."user".first_name as created_by_first_name, 
                    public."user".last_name as created_by_last_name, 
                    public."user".username as created_by_username, 
                    guest.*,
                    room_type.*,
                    room.number as room_number,
                    room.name as room_name,
                    room_status_type.name as room_status,
                    room_status_type.name_short as room_status_short
                FROM reservation
                JOIN guest ON reservation.guest_id = guest.id
                JOIN room_type ON reservation.room_type_id = room_type.id
                JOIN public."user" ON reservation.created_by = public."user".id
                FULL OUTER JOIN room ON reservation.room_id = room.id
                FULL OUTER JOIN room_status_type on room.status_type_id = room_status_type.id
                WHERE reservation.check_in = $1 AND reservation.status = $2;
            `;


                // returning arrivals
            pool.query(queryText,[TODAY_YYYYMMDD, 'reserved'])
                .then(result => {
                    res.send(result.rows);
                })
                .catch(error => {
                    console.log(error);
                    res.sendStatus(500);
                });
        } else if ( TYPE == 'departures') {

            queryText=
            `
                SELECT 
                    reservation.*, 
                    reservation.id as reservation_id,
                    public."user".first_name as created_by_first_name, 
                    public."user".last_name as created_by_last_name, 
                    public."user".username as created_by_username, 
                    guest.*,
                    room_type.*,
                    room.number as room_number,
                    room.name as room_name,
                    room_status_type.name as room_status,
                    room_status_type.name_short as room_status_short
                FROM reservation
                JOIN guest ON reservation.guest_id = guest.id
                JOIN room_type ON reservation.room_type_id = room_type.id
                JOIN public."user" ON reservation.created_by = public."user".id
                FULL OUTER JOIN room ON reservation.room_id = room.id
                FULL OUTER JOIN room_status_type on room.status_type_id = room_status_type.id
                WHERE reservation.check_out = $1 AND reservation.status = $2;
            `

            pool.query(queryText, [TODAY_YYYYMMDD, 'checked_in'])
            .then(result => {
                res.send(result.rows);
            })
            .catch(error => {
                console.log(error);
                res.sendStatus(500);
            });

        } else if ( TYPE == 'inhouse') {
            queryText=
            `
                SELECT 
                    reservation.*, 
                    reservation.id as reservation_id,
                    public."user".first_name as created_by_first_name, 
                    public."user".last_name as created_by_last_name, 
                    public."user".username as created_by_username, 
                    guest.*,
                    room_type.*,
                    room.number as room_number,
                    room.name as room_name,
                    room_status_type.name as room_status,
                    room_status_type.name_short as room_status_short
                FROM reservation
                JOIN guest ON reservation.guest_id = guest.id
                JOIN room_type ON reservation.room_type_id = room_type.id
                JOIN public."user" ON reservation.created_by = public."user".id
                FULL OUTER JOIN room ON reservation.room_id = room.id
                FULL OUTER JOIN room_status_type on room.status_type_id = room_status_type.id
                WHERE reservation.status = $1;
            `

            pool.query(queryText,['checked_in'])
            .then(result => {
                res.send(result.rows);
            })
            .catch(error => {
                console.log(error);
                res.sendStatus(500);
            });

        } else {
            pool.query(queryText)
            .then(result => {
                res.send(result.rows);
            })
            .catch(error => {
                console.log(error);
                res.sendStatus(500);
            });
        }

    
    }catch(error) {
        console.log(error)
        res.sendStatus(400);
    }
});

module.exports = router;