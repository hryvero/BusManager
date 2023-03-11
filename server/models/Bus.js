const { Schema, model } = require("mongoose");


let d = new Date,
dformat = [d.toLocaleDateString().split('T')[0]]+ " "+
 [d.getHours(),
  d.getMinutes()].join(':');

const BusSchedule = new Schema(
      {
        name: { type: String, trim: true, required: true },
        phoneNumber: {
          type: String,
          max: 10,
          trim: true,
          lowercase: true,
          unique: true,
          required: true,
        },
        date: { type: String, default:dformat  },
        directionOut: { type: String, required: true },
        directionIn: { type: String, required: true },

      },
      { timestamps: true }
    );

    

    module.exports=model("BusSchedule", BusSchedule);

