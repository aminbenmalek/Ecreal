import mongoose from 'mongoose'
import dotenv from 'dotenv'
import utilisateurs from './data/utilisateurs.js'
import articles from './data/articles.js'
import Utilisateur from './models/utilisateurModel.js'
import Article from './models/articleModel.js'
import Commande from './models/commandeModel.js'
import connectDB from './config/db.js'

dotenv.config()
connectDB()
const addData=async()=>{
    try {
        await Commande.deleteMany()
        await Article.deleteMany()
        await Utilisateur.deleteMany()
        const utilisateursCree=await Utilisateur.insertMany(utilisateurs)
        const utilisateurAdmin=utilisateursCree[0]._id
        const exempleArticle=articles.map(article => {
            return {...article, utilisateur: utilisateurAdmin}
        })
        await Article.insertMany(exempleArticle)

        console.log('Données ajoutée!')
        process.exit()
            
        
        
    } catch (error) {
        console.error(`${error}`)
        process.exit(1)
    }
}
const importData=async()=>{
    try {
        await Commande.deleteMany()
        await Article.deleteMany()
        await Utilisateur.deleteMany()
        console.log('Données supprimer!')
        process.exit()
            
            
        
        
    } catch (error) {
        console.error(`${error}`)
        process.exit(1)
    }
}
if(process.argv[2]==='-d'){
    destroyData()
}else{
    addData()
}