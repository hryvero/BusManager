const { Router } = require("express");


const BusSchedule=require("../models/Bus")



const busRouter = Router();

busRouter.get("/", async(req, res)=>{
      const schedule= await BusSchedule.find();

      res.json(schedule)
} )

busRouter.post("/", async(req, res)=>{
      try {
            // const todo = new BusSchedule({
            //       name: req.body.name
            // })
      
            // todo.save();
      
            // res.json(todo);
            const createBus= await BusSchedule.create(req.body);

            console.log(req.body.name)

            // res.setHeader("Content-Type", "application/json");
            res.json(createBus); 
          } catch (e) {
            console.log(e)
          }
    
} )


module.exports = busRouter;

