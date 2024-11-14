const express = require('express');
const cors = require('cors');
const controller = require('./controller.js');

const app = express();

app.use(cors());

app.use(express.urlencoded({extended: true}));

app.use(express.json());

app.get('/users', (req, res) => {
    controller.getUsers()
        .then( response => {
            res.send(response);
        }) 
        .catch(error => {
            res.send(error);
        });
});

app.get('/login', (req,res) => {
    controller.login(req.query)
        .then( response => {
            res.send(response);
        }) 
        .catch(error => {
            res.send(error);
        });
});

app.post('/signup', (req, res) => {
    controller.signUp(req.body)
        .then( response => {
            res.send(response);
        }) 
        .catch(error => {
            res.send(error);
        });
});

app.get('/items', (req, res) => {
    controller.getItems()
        .then( response => {
            res.send(response);
        } )
        .catch( error => {
            res.send(error);
        });
});

app.post('/additem' , (req,res) => {
    controller.addItem(req.body)
        .then(response => {
            res.send(response);
        })
        .catch(error => {
            res.send(error);
        });
});

app.put('/updateitem', (req, res) => { 
    controller.updatItem(req.body)
        .then(response => {
            res.send(response);
        })
        .catch(error => {
            res.send(error);
        });
});

app.delete('/deleteitem', (req, res) => {
    controller.deleteItem(req.query.id)
        .then(response => {
            res.send(response)
        })
        .catch(error => {
            res.send(error);
        });
});

app.get('/getcart', (req, res) => {
    controller.getCart(req.query.id)
        .then(response => {
            res.send(response)
        })
        .catch(error => {
            res.send(error);
        });
});

app.post('/addcart', (req, res) => {
    controller.addItemCart(req.body)
        .then(response => {
            res.send(response)
        })
        .catch(error => {
            res.send(error);
        });
});

app.delete('/deletecart', (req, res) => {
    controller.deleteCart(req.query.id)
        .then(response => {
            res.send(response.state)
        })
        .catch(error => {
            res.send(error);
        });
});


module.exports = app;