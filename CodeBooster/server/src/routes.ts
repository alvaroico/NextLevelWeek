import express, { request, response } from 'express';

import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';

// index, show, create, update, delete

const routes = express.Router();

const itemsController = new ItemsController();
const pointsController = new PointsController();


routes.get('/items', itemsController.index);

 routes.post('/points', pointsController.create);
 routes.get('/points', pointsController.index);
 routes.get('/points/:id', pointsController.show);

 export default routes;
 