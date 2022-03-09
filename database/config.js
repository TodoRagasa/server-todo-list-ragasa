const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('Database online |o|');
    } catch (error) {
        throw new Error('Error to connect to database T_T');
    }
}

module.exports = {
    dbConnection
}
