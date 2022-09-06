import mongoose from "mongoose";

const personnelSchema = mongoose.Schema(
  {
    mat_pers: {
      type: String,
      required: true,
    },
    nom_pers: {
      type: String,
      required: false,
    },
    photo_pers: {
      type: String,
      required: false,
    },
    cin_pers: {
      type: String,
      required: false,
    },
    grad_pers: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    ech_pers: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);
const Personnel = mongoose.model("Personnel", personnelSchema);
export default Personnel;
