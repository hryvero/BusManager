const { Router } = require("express");

const busRouter = Router();
const controller = require('../controllers/bus.controller');


busRouter.get('/', controller.getAllBuses);
busRouter.put('/complete/:id', controller.getComplete)
busRouter.get('/:busId', controller.getBusById);
busRouter.post('/', controller.createBus);
busRouter.put('/:busId', controller.updateBus);
busRouter.delete('/:busId', controller.deleteBus);


module.exports = busRouter;



