const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express()
const port = process.env.port || 3000;

let groceryList = [
    {
        "productid": 1,
        "grocery-name": "carrot",
        "price": "20/kg",
        "quantity": 100
    },
    {
        "productid": 2,
        "grocery-name": "apple",
        "price": "100/kg",
        "quantity": 200
    }
];

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
        "Endpoint": "/grocery/add/:name/:pass",
        "method": "POST",
        "body" : {
            "body" : ""
        },
        "description" : "Adds data into main Grocery List only if name & pass matched the credentials"
    },
    {
        "Endpoint": "/addtocart",
        "method": "POST",
        "body" : {
            "body" : ""
        },
        "description" : "Adds the item into mycart sent in post request if the item is present in the main list"
    },
    {
        "Endpoint": "/cart/:id",
        "method": "DELETE",
        "body": null,
        "description": "Deletes the item from myCart with given index"
    }
];

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json(docs);
});

app.get('/grocery', (req, res) => {
    res.json(groceryList);
})

app.get('/mycart', (req, res) => {
    if(myCart.length == 0)
    {
        res.send('Cart is Empty');
    } else {
        res.json(myCart);
    }   
})

app.get('/grocery/:name', (req, res) => {
    const groceryName = req.params.name;
    console.log(groceryName);

    for(let grocery of groceryList) {
        if(grocery['grocery-name'] == groceryName) {
            res.json(grocery);
            console.log(grocery);
            return;
        }
    }
    return res.json('Item not present in the list')

});

app.post('/grocery/add/:name/:pass', (req, res) => {
    const name = req.params.name;
    const pass = req.params.pass;

    const grocery = req.body;

    if(name == 'admin' && pass == 'pass') {
        console.log(grocery);
        groceryList.push(grocery);

        return res.send('Grocery Added to main List');
    }

    res.send('Wrong Credentials')
})

app.post('/addtocart', (req, res) => {
    const newGrocery = req.body;

    for(let grocery of groceryList) {
        if(newGrocery['grocery-name'] == grocery["grocery-name"]) {
            myCart.push(newGrocery);
            grocery.quantity -= newGrocery.quantity;
            return res.send(myCart);
        }
    }

    return res.json('Item not in the list');
})

app.delete('/cart/:id', (req, res) => {
    const groceryid = req.params.id;

    myCart = myCart.filter(i => {
        if(i.productid != groceryid) {
            return true;
        }

        return false;
    })

    res.send('Grocery deleted from My Cart')

})

app.listen(port, () => console.log(`Grocery app listening on port ${port}!`));