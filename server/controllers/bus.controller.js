const BusSchedule = require("../models/Bus");


module.exports = {
  getAllBuses: async (req, res, next) => {
    try {
      const { limit = 20, page = 1 } = req.query;
      const skip = (page - 1) * limit;
      const buses = await BusSchedule.find().limit(limit).skip(skip);
      const count = await BusSchedule.count({});

      res.json({
        page,
        perPage: limit,
        count,
        data: buses,
      });
    } catch (e) {
      next(e);
    }
  },

  getBusById: async (req, res, next) => {
    try {
      const {busId } = req.params;
      const getBus = await BusSchedule.findOne(
        { _id: busId },
        { $set: req.body }
      );
      res.json(getBus);
    } catch (e) {
      next(e);
    }
  },

  createBus: async (req, res, next) => {
    try {
      const createBus = await BusSchedule.create({
        ...req.body
      });

      res.json(createBus);
    } catch (e) {
      next(e);
    }
  },

  updateBus: async (req, res, next) => {
    try {
      const {busId } = req.params;
      const updateBus = await BusSchedule.findByIdAndUpdate(
         busId,
        req.body 
      );

      res.json(updateBus);
    } catch (e) {
      next(e);
    }
  },

  deleteBus: async (req, res, next) => {
    try {
      const { busId } = req.params;

      const deleteBus = await BusSchedule.deleteOne({ _id: busId });

      res.json(deleteBus);
    } catch (e) {
      next(e);
    }
  }

};
