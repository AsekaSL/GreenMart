const fs = require('node:fs');
const Item = require('./module.js');


const getUsers = () => {
    return new Promise((resolve,reject) => {
        try {
            const users = loadUsers();
            resolve(users);
        } catch (error) {
            reject(error);
        }
    });
};

const login = (req) => {
    return new Promise((resolve, reject) => {
        const users = loadUsers();
        const user = users.find(user => user.pass == req.pass && user.name == req.name );
        resolve( (user.id) ? user : {error : 'Login failed'} );
        reject('error');
    });
};

const signUp = (req) => {
    return new Promise((resolve, reject) => {
        const user = {
            id: generateID(),
            name: req.name,
            email: req.email,
            pass: req.pass,
            cart: []
        };
        let users = loadUsers();
        
        try {
            users.push(user);
            fs.writeFileSync('./data.json', JSON.stringify(users));
            const users = loadUsers();
            const user = users.find(user => user.pass == req.pass && user.name == req.name );
            resolve( (user.id) ? user : {error : 'Login failed'} );
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
};

const getItems = () => {
    return new Promise((resolve, reject) => {
        Item.find()
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error);
            });
    });
};

const addItem = (req) => {
    return new Promise((resolve, reject) => {
        const item = new Item({
            id: req.id,
            name: req.name,
            price: req.price,
            bio: req.bio,
            imageName: req.imageName
        });
        item.save()
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error);
            });
    });
};

const updatItem = (req) => {
    return new Promise((resolve,reject) => {
        Item.updateOne({id: req.id}, {$set: {name: req.name, price: req.price, bio: req.bio, imageName: req.imageName}})
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error);
            });
    });
};

const deleteItem = (id) => {
    return new Promise((resolve,reject) => {
        Item.deleteOne({id: id})
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error);
            });
    });
};

const getCart = (id) => {
    return new Promise((resolve, reject) => {
        const fullCart = loadUsers();
        const cart = fullCart.find(user => user.id == id);
        if (cart) {
            resolve(cart);
        }else{
            reject({error: "error"});
        }
    });
};

const addItemCart = (data) => {
    return new Promise((resolve, rejects) => {
        const profileId = data.profileId; 
        const fullCart = loadUsers();
        const index = fullCart.findIndex( cart => cart.id == profileId);
        if (fullCart[index].cart.length == 0) {
            fullCart[index].cart.push(data);
            resolve({id: data.profileId});
            fs.writeFileSync('data.json', JSON.stringify(fullCart));
        }else{
            const element = fullCart[index].cart;
            const cartIndex = element.findIndex(item => item.id == data.id);
            if (cartIndex > -1 ) {
                fullCart[index].cart[cartIndex].quantity += 1;
                resolve({id: data.profileId});
                fs.writeFileSync('data.json', JSON.stringify(fullCart));
            }else{
                fullCart[index].cart.push(data);
                resolve({id: data.profileId});
                fs.writeFileSync('data.json', JSON.stringify(fullCart));
            }
        }
    });
};

const deleteCart = (id) => {
    return new Promise((resolve, reject) => {
        const fullCart = loadUsers();
        const index = fullCart.findIndex( cart => cart.id == id);
        fullCart[index].cart = [];
        console.log(fullCart[index].cart);
        fs.writeFileSync('data.json', JSON.stringify(fullCart));
        resolve({state: true})
    });
};

const loadUsers = () => {
    try {
        return JSON.parse(fs.readFileSync('data.json'))
    } catch (error) {
        return [];
    }
}; 

const generateID = () => {
    try {
        const users = JSON.parse(fs.readFileSync('data.json'));
        return users[users.length - 1].id + 1;
    } catch (error) {
        return 1;
    }

}

exports.getUsers = getUsers;
exports.login = login;
exports.signUp = signUp;
exports.getItems = getItems;
exports.addItem = addItem;
exports.updatItem = updatItem;
exports.deleteItem = deleteItem;
exports.getCart = getCart;
exports.addItemCart = addItemCart;
exports.deleteCart = deleteCart;