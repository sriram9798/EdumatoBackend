const express = require('express');
const app = express();
const port = process.env.PORT || 7000;
const cors = require('cors');
app.use(cors());
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
const MongoServer = require('mongodb');
const MongoUrl = "mongodb+srv://mongodb_snk24:M0ng0db_snk24@cluster0.f4w4u.mongodb.net/edurekainternship?retryWrites=true&w=majority";
const MongoClient = MongoServer.MongoClient;
let db;

app.get('/location', (req,res) => {
    db.collection('city').find().toArray((err,result) => {
        if(err) throw err;
        res.send(result);
    })
})

app.get('/restaurants', (req,res) => {
    var query = {};

    if(req.query.city) {
        query = {city: req.query.city};
    }

    if(req.query.mealtype) {
        query = {"type.mealtype": req.query.mealtype}
    }
    
    db.collection('restaurant').find(query).toArray((err,result) => {
        if(err) throw err;
        res.send(result);
    })
})

app.get('/mealtype', (req,res) => {
    db.collection('mealtype').find().toArray((err,result) => {
        if(err) throw err;
        res.send(result);
    })
})

app.get('/mealtype/:id', (req,res) => {
    var query = {"_id":Number(req.params.id)};

    db.collection('mealtype').find(query).toArray((err,result) => {
        if(err) throw err;
        res.send(result);
    })
})

app.get('/restaurant/:id', (req,res) => {
    var query={_id:req.params.id};

    db.collection('restaurant').find(query).toArray((err,result) => {
        if(err) throw err;
        res.send(result);
    })
})

app.get('/restaurants/:mealtype', (req,res) => {
    query = {"type.mealtype":req.params.mealtype};
    sort_cost = {"cost": 1};

    //Filter by city
    if(req.query.city) {
        query = {"type.mealtype":req.params.mealtype, "city": req.query.city}
    }

    //Filter by cuisine
    if(req.query.cuisine) {
        query = {"type.mealtype":req.params.mealtype, "Cuisine.cuisine": req.query.cuisine}
    }

    //Filter by cost range
    if(req.query.lcost && req.query.hcost) {
        query = {"type.mealtype":req.params.mealtype, "cost": {$gt: Number(req.query.lcost), $lt: Number(req.query.hcost)}}
    }

    //Filter by price(high to low)
    if(req.query.hTol) {
        sort_cost = {"cost": Number(req.query.hTol)}
    }

    //Filter by city, cuisine
    if(req.query.city && req.query.cuisine) {
        query = {"type.mealtype": req.params.mealtype, "city": req.query.city,"Cuisine.cuisine": req.query.cuisine};
    }

    //Filter by city, cost range
    if(req.query.city && req.query.lcost && req.query.hcost) {
        query = {"type.mealtype": req.params.mealtype, "city": req.query.city, "cost": {$gt: Number(req.query.lcost),$lt: Number(req.query.hcost)} };
    }

    //Filter by city, price(high to low)
    if(req.query.city && req.query.hTol) {
        query = {"type.mealtype": req.params.mealtype, "city": req.query.city};
        sort_cost = {"cost": Number(req.query.hTol)};
    }

    //Filter by cuisine, cost range 
    if(req.query.cuisine && req.query.lcost && req.query.hcost) {
        query = {"type.mealtype": req.params.mealtype,"Cuisine.cuisine": req.query.cuisine, "cost": {$gt: Number(req.query.lcost),$lt: Number(req.query.hcost)} };
    }

    //Filter by cuisine, price(high to low)
    if(req.query.cuisine && req.query.hTol) {
        query = {"type.mealtype": req.params.mealtype,"Cuisine.cuisine": req.query.cuisine};
        sort_cost = {"cost": Number(req.query.hTol)};
    }

    //Filter by cost range, price(high to low)
    if(req.query.lcost && req.query.hcost && req.query.hTol) {
        query = {"type.mealtype": req.params.mealtype, "cost": {$gt: Number(req.query.lcost),$lt: Number(req.query.hcost)} };
        sort_cost = {"cost": Number(req.query.hTol)};
    }

    //Filter by city, cuisine, cost range
    if(req.query.city && req.query.cuisine && req.query.lcost && req.query.hcost) {
        query = {"type.mealtype": req.params.mealtype, "city": req.query.city, "Cuisine.cuisine": req.query.cuisine, "cost": {$gt: Number(req.query.lcost),$lt: Number(req.query.hcost)} };
    }

    //Filter by city, cuisine, price(high to low)
    if(req.query.city && req.query.cuisine && req.query.hTol) {
        query = {"type.mealtype": req.params.mealtype, "city": req.query.city, "Cuisine.cuisine": req.query.cuisine};
        sort_cost = {"cost": Number(req.query.hTol)};
    }

    //Filter by city, cost range, price(high to low)
    if(req.query.city && req.query.lcost && req.query.hcost && req.query.hTol) {
        query = {"type.mealtype": req.params.mealtype, "city": req.query.city, "cost": {$gt: Number(req.query.lcost),$lt: Number(req.query.hcost)} };
        sort_cost = {"cost": Number(req.query.hTol)};
    }

    //Filter by cuisine, cost range, price(high to low)
    if(req.query.cuisine && req.query.lcost && req.query.hcost && req.query.hTol) {
        query = {"type.mealtype": req.params.mealtype, "Cuisine.cuisine": req.query.cuisine, "cost": {$gt: Number(req.query.lcost),$lt: Number(req.query.hcost)} };
        sort_cost = {"cost": Number(req.query.hTol)};
    }

    //Filter by city, cuisine, cost range, price(high to low)
    if(req.query.city && req.query.cuisine && req.query.lcost && req.query.hcost && req.query.hTol) {
        query = {"type.mealtype": req.params.mealtype, "city": req.query.city, "Cuisine.cuisine": req.query.cuisine, "cost": {$gt: Number(req.query.lcost),$lt: Number(req.query.hcost)} };
        sort_cost = {"cost": Number(req.query.hTol)};
    }

    db.collection('restaurant').find(query).sort(sort_cost).toArray((err,result) => {
        if(err) throw err;
        res.send(result);
    })
})

//Order Placement
app.post('/placeorder', (req,res) => {
    db.collection('orders').insertOne(req.body, (err,result) => {
        if(err) throw err;
        res.send('Data added');
    })
})

//Viewing Placed Orders
app.get('/orders', (req,res) => {
    db.collection('orders').find().toArray((err,result) => {
        if(err) throw err;
        res.send(result);
    })
})

MongoClient.connect(MongoUrl,{useNewUrlParser:true},(err,client) => {
    if(err) throw err; 
    db = client.db('edurekainternship');
    app.listen(port ,(err) => {
        if(err) throw err;
        console.log(`Server running on port ${port}`);
    })
})

