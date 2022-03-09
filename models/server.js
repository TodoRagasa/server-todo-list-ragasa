const express = require('express');
const cors = require('cors');

const {dbConnection} = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = 8085;
        this.pathTodos = '/api/todos';

        // Connection database
        this.connectDB().then();

        // Middlewares
        this.middlewares();

        // Routes
        this.routes();
    }

    async connectDB() {
        await dbConnection();
    }

    middlewares() {
        this.app.use(cors({
            origin: ['http://localhost:8100', '*']
        }))

        // Read and parse json
        this.app.use(express.json());
    }

    routes() {
        this.app.use(this.pathTodos, require('../routes/todo'));
    }

    init() {
        this.app.listen(this.port, () => {
            console.log(`Listen server in port ${this.port}`);
        });
    }
}

module.exports = Server;
