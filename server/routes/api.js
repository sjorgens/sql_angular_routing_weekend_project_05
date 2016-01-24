/**
 * Created by Scott on 1/23/16.
 */

var express = require('express');
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/Scott';

var router = express.Router();

router.get('/pullAllUsers', function(request, response){

    var users = [];

    pg.connect(connectionString, function(error, client){

        if(error){
            console.log(error);
        }

        var query = client.query("SELECT * FROM users ORDER BY id ASC");

        query.on('row', function(row){
            users.push(row);
        });

        query.on('end', function(){
            client.end();
            return response.json(users);
        });

    });

});

router.get('/pullUserAddresses/:id', function(request, response){
    //testing purposes
    //console.log('pullUserAddresses api call initiated...');

    var addresses = [];

    pg.connect(connectionString, function(error, client){

        if(error){
            console.log(error);
        }

        var query = client.query("SELECT users.name, addresses.* FROM users JOIN addresses ON users.id = addresses.user_id WHERE users.id = " + [request.params.id]);

        query.on('row', function(row){
            addresses.push(row);
        });

        query.on('end', function(){
            client.end();
            return response.json(addresses);
        });
    });
});

router.get('/pullUserOrders/:id', function(request, response){
    //testing purposes
    //console.log('pullUserOrders api call initiated...');

    var orders = [];

    pg.connect(connectionString, function(error, client){

        if(error){
            console.log(error);
        }

        var query = client.query("SELECT users.name, addresses.*, orders.* FROM users INNER JOIN orders ON users.id = orders.user_id INNER JOIN addresses ON orders.ship_address_id = addresses.address_id WHERE users.id = " + [request.params.id]);

        query.on('row', function(row){
            orders.push(row);
        });

        query.on('end', function(){
            client.end();
            return response.json(orders);
        });
    });
});

module.exports = router;