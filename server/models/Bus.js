const { Schema, model } = require("mongoose");


let dformat = new Date;
dformat = [dformat.toLocaleDateString().split('T')[0]]+ ' '+
[
  dformat.getHours() < 10 ? "0" + dformat.getHours() : dformat.getHours(),
  dformat.getMinutes() < 10 ? "0" + dformat.getMinutes() : dformat.getMinutes()
].join(':');

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
        complete: {
          type: Boolean,
          default: false
        },
        date: { type: String, default:dformat  },
        directionOut: { type: String, required: true },
        directionIn: { type: String, required: true },

      },
      { timestamps: true }
    );

    

    module.exports=model("BusSchedule", BusSchedule);

