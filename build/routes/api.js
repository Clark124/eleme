var express = require('express');
var apiRoutes = express.Router();

var appDate = require('../../data.json')
var seller = appDate.seller
var goods = appDate.goods
var ratings = appDate.ratings


apiRoutes.get('/seller',function(req,res){
  res.json({
    errno:0,
    data: seller
  })
})
apiRoutes.get('/goods', function(req,res){
  res.json({
    errno: 0,
    data: goods
  })
})

apiRoutes.get('/ratings', function(req,res){
  res.json({
    errno: 0,
    data: ratings
  })
})

module.exports = apiRoutes