import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const utilisateurSchema = mongoose.Schema(
  {
    nom: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mdp: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
utilisateurSchema.methods.mdpVerif = async function (mdpEntree) {
  return await bcrypt.compare(mdpEntree, this.mdp);
};
utilisateurSchema.pre("save", async function (next) {
  if (!this.isModified("mdp")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.mdp = await bcrypt.hash(this.mdp, salt);
});
const Utilisateur = mongoose.model("Utilisateur", utilisateurSchema);
export default Utilisateur;
