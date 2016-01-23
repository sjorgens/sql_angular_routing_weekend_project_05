/**
 * Created by Scott on 1/22/16.
 */
var express = require('express');
var path = require('path');
var router = express.Router();

router.get('/', function(request, response){
    var joinedPath = path.join(__dirname, '../public/views/index.html');

    //console.log('Join path: ', joinedPath);

    response.sendFile(joinedPath);
});

router.get('/*', function(request, response){    //needed at bottom for catch-all to fix the page refresh issue; there is a better solution to be aware of
    response.redirect('/');
});

module.exports = router;