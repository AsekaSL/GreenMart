const app = require('./app.js');
const mongoose = require('mongoose');
const port = 3001;
const host = '127.0.0.1';

const uri = `mongodb+srv://saranga:saranga123@cluster0.vca0q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const connect = async () => {
    try {
        
        await mongoose.connect(uri);
        console.log('Succfully connect');

    } catch (error) {
        console.log(error);
    }
};

connect();

const server = app.listen(port, host, () => {
    console.log(`Succsfully connect ${server.address().port}`);
});