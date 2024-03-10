import express, { Express, Request, Response } from 'express';
import dotenv from "dotenv";

import { db } from './config/db';
import routes from './routes';

const app: Express = express();

dotenv.config();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send("Hello world");
});

app.get('/bye', (req: Request, res: Response) => {
    res.send("Bye fucking world");
});

app.get('/about', (req: Request, res: Response) => {
    res.send(`ABOUT`);
});

app.post('/about', (req: Request, res: Response) => {
    res.send(`Name: ${req.body.name}`);
});

routes(app);

db.then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch((err) => console.error(err));