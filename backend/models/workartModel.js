import mongoose from "mongoose";
const workartSchema = mongoose.Schema(
  {
    article: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Article",
    },

    code_art: {
      type: String,
      required: false,
    },

    prix: {
      type: Number,
      required: false,
    },
    prix_1: {
      type: Number,
      required: false,
    },
    prix_2: {
      type: Number,
      required: false,
    },
    num_stock: {
      type: Number,
      required: false,
    },
    famille: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Famille",
      required: false,
    },
  },
  {
    timestamps: true,
  }
);
const Workart = mongoose.model("Workart", workartSchema);
export default Workart;
