import { Express } from 'express';
import userController from '../controllers/user.controller';

const routes = (app: Express) => {
    app.get('/users', userController.getUsers);
    app.post('/users', userController.create);
    app.put('/updateUser/:id', userController.update);
    app.post('/deleteUser/:id', userController.delete);
    app.get('/users/:id', userController.findById);
};

export default routes;