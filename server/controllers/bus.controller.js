const BusSchedule = require("../models/Bus");

const getAllBuses = async (req, res, next) => {
  try {
    // const { limit = 20, page = 1 } = req.query;
    // const skip = (page - 1) * limit;
    const buses = await BusSchedule.find().limit(20);
  
    res.json({
      data: buses,
    });
  } catch (e) {
    next(e);
  }
};

const getComplete = async (req,res, next)=>{
  try {
    const bus = await BusSchedule.findById(req.params.id);

    if(!bus){
      return "error"
    }
    bus.complete = !bus.complete;
  
    await bus.save();
    res.json(bus);
  } catch(e) {
    next(e);
  }
};

const getBusById = async (req, res, next) => {
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
};

const createBus = async (req, res, next) => {
  try {
    const createBus = await BusSchedule.create({
      ...req.body
    });

    res.json(createBus);
  } catch (e) {
    next(e);
  }
};

const updateBus = async (req, res, next) => {
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
};

const deleteBus = async (req, res, next) => {
  try {
    const { busId } = req.params;
    const deleteBus = await BusSchedule.deleteOne({ _id: busId });

    res.json(deleteBus);
  } catch (e) {
    next(e);
  }
}


module.exports = {
  getAllBuses,
  getComplete,
  getBusById,
  createBus,
  updateBus,
  deleteBus
};
