import { Router } from 'express';

import DriverController from './Controllers/DriverController';
import VehicleController from './Controllers/VehicleController';

const routes = Router();

// Drivers
routes.get('/drivers', DriverController.index);
routes.get('/driver/:id', DriverController.show);
routes.post('/drivers', DriverController.store);
routes.put('/driver/:id', DriverController.update);
routes.delete('/driver/:id', DriverController.delete);
// Vehicles
routes.get('/vehicles', VehicleController.index);
routes.get('/vehicle/:id', VehicleController.show);
routes.post('/vehicles', VehicleController.store);
routes.put('/vehicle/:id', VehicleController.update);
routes.delete('/vehicle/:id', VehicleController.delete);

export default routes;
