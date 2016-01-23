/**
 * Created by Scott on 1/23/16.
 */

var express = require('express');
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/Scott';

var router = express.Router();

router.get('/pullAllUsers', function(request, response){

    console.log('pullAllUsers initiated from api.js...');

    var users = [];

    pg.connect(connectionString, function(error, client){

        if(error){
            console.log(error);
        }

        var query = client.query("SELECT * FROM users");

        query.on('row', function(row){
            users.push(row);
        });

        query.on('end', function(){
            client.end();
            return response.json(users);
        });

    });

});

module.exports = router;