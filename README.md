# GROCERY-API


## Usage/Examples

```json
[
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
]
```

