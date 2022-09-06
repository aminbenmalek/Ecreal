import mongoose from 'mongoose'

const paramAppSchema = mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Client',
    },
    code_param: {
      type: String,
      required: true,
    },
    nom_param: {
      type: String,
      required: true,
    },
    desc_param: {
      type: String,
      required: false,
    },
    valeur: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)
const ParamApp = mongoose.model('ParamApp', paramAppSchema)
export default ParamApp
