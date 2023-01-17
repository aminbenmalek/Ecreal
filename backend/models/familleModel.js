import mongoose from 'mongoose'


const familleSchema = mongoose.Schema(
  {
    utilisateur: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Utilisateur',
      },
  
    lib_fam: {
      type: String,
      required: true,
    },
    description: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      
      
  }
    
)
const Famille = mongoose.model('Famille', familleSchema)

export default Famille
