const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv/config');
const Grocery = require('./models/Grocery');

const app = express()
const port = process.env.PORT || 3000;

let myCart = [
    {
        "productid": 0,
        "grocery-name": "dummy item",
        "price": "00/kg",
        "quantity": 0
    }
];

let docs = [
    {
        "Endpoint": "/",
        "method": "GET",
        "body": null,
        "description": "Welcome Page of API & docs"
    },
    {
        "Endpoint": "/grocery",
        "method": "GET",
        "body": null,
        "description": "Returns List of all Grocery Available"
    },
    {
        "Endpoint": "/mycart",
        "method": "GET",
        "body": null,
        "description": "Returns List of all Grocery Available in the users cart"
    },
    {
        "Endpoint": "/grocery/:name",
        "method": "GET",
        "body": null,
        "description": "Returns a single Grocery item matching with the param name"
    },
    {
        "Endpoint": "/grocery/add",
        "method": "POST",
        "body": {
            "body": ""
        },
        "description": "Adds data into main Grocery List"
    },
    {
        "Endpoint": "/addtocart",
        "method": "POST",
        "body": {
            "body": ""
        },
        "description": "Adds the item into mycart sent in post request if the item is present in the main list"
    },
    {
        "Endpoint": "/cart/:id",
        "method": "DELETE",
        "body": null,
        "description": "Deletes the item from myCart with given index"
    },
    {
        "Endpoint": "/grocery/:id",
        "method": "DELETE",
        "body": null,
        "description": "Deletes the item from Gorcery with given index"
    }
];

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json(docs);
});

app.get('/grocery', async (req, res) => {
    try {
        const grocery = await Grocery.find();
        res.json(grocery);
    } catch (e) {
        res.json({ message: e });
    }
})

app.get('/mycart', (req, res) => {
    if (myCart.length == 0) {
        res.send('Cart is Empty');
    } else {
        res.json(myCart);
    }
})

app.get('/grocery/:name', async (req, res) => {
    try {
        const post = await Grocery.findOne({ groceryname: req.params.name });
        res.json(post);
    } catch (error) {
        res.json({ message: error });
    }

});

app.post('/grocery/add', async (req, res) => {

    const grocery = new Grocery({
        productid: req.body.productid,
        groceryname: req.body.groceryname,
        price: req.body.price,
        quantity: req.body.quantity
    });

    try {
        const savedGrocery = await grocery.save()
        res.json(savedGrocery);
    } catch (e) {
        res.json({ message: e });
    }

})

app.post('/addtocart', async (req, res) => {

    const toadd = req.body;
    console.log(toadd);

    try {
        if (await Grocery.exists({groceryname: toadd.groceryname})) {
            myCart.push(toadd);
            
            return res.json(myCart);
        }


    } catch (e) {
        return res.send({ message: e })
    }

    return res.json('Item not in the list');
})

app.delete('/cart/:id', (req, res) => {
    const groceryid = req.params.id;

    myCart = myCart.filter(i => {
        if (i.productid != groceryid) {
            return true;
        }

        return false;
    })

    res.send('Grocery deleted from My Cart')

})

app.delete('/grocery/:id', async (req, res) => {
    try {
        const removedGrocery = await Grocery.remove({ productid: req.params.id });
        res.json(removedGrocery);
    } catch (e) {
        res.json({ message: e });
    }
})

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
    console.log('Connected to DB');
});

app.listen(port, () => console.log(`Grocery app listening on port ${port}!`));