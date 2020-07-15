import express from 'express';

import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';

const routes = express.Router();
const pointsController = new PointsController();
const itemsController = new ItemsController();

/*   index: listar todos registros
     show: mostrar um registro 
     create: criar um registro 
     update: atualizar 
     delete: deletar*/

routes.get('/items', itemsController.index);

routes.post('/points', pointsController.create);

routes.get('/points/:id', pointsController.show);

export default routes;