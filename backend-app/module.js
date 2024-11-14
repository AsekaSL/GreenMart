const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemsSchema = new Schema({
    id: Number,
    name: String,
    price: Number,
    bio: String,
    imageName: String
});


const Item = mongoose.model('Item', ItemsSchema);

module.exports = Item;