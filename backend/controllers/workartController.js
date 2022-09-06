import Workart from "../models/workartModel.js";
//import asyncHandler from "express-async-Handler";
import Article from "../models/articleModel.js";

//desc:ajouter nouveau donnée de mis a jour
//Route:PUT /api/workart/
//access:Private/admin

const ajoutWorkart = async (req, res) => {
  //Donnes envoye Depuis document externe=depuis applicatif
  const { article, num_stock, nom, famille, prix, prix_1, prix_2, code_art } =
    req.body;

  //Depuis BD en fonction de ID

  const art = await Workart.find({ code_art: req.params.code_art });
  //En cas dexistance=Update
  if (art.length > 0) {
    art.map(
      (a) => (
        (a.num_stock = num_stock),
        (a.prix = prix),
        (a.nom = nom),
        (a.famille = famille),
        (a.article = article)
      )
    );
    //Lancement de mis a jour
    const artUpdated = await Workart.updateMany({
      num_stock: art.num_stock || num_stock,
      prix: art.prix || prix,
      nom: art.nom || nom,
      famille: art.famille || famille,
      code_art: art.code_art || code_art,
      article: art.article || article,
    });

    res.json({ num_stock, prix, prix_1, prix_2, code_art, article, famille });
    console.log("Update succes!");
  } else {
    //En cas de dabsence=creer
    const artCreated = await Workart.create({
      article,
      num_stock,
      prix,
      famille,
      code_art,
      nom,
    });

    res.status(201).json(artCreated);
    console.log("Creation succes!");
  }
};
const updateArticle = async (req, res) => {
  // const { prix, prix_1, prix_2, num_stock } = req.body
  let isCree = false;
  const work = await Workart.find();
  //
  let resArt = [];

  work.map(async (w) => {
    let art = await Article.findOne({ code_art: w.code_art });
    if (art?.length != null) {
      console.log(art);
      console.log("updating...");
      art.prix = w.prix || art.prix;
      art.nom = w.nom || art.nom;
      art.num_stock = w.num_stock || art.num_stock;
      art.famille = w.famille || art.famille;

      await art.save();
      console.log(art);
    } else {
      await Article.create({
        code_art: w.code_art,
        num_stock: w.num_stock,
        prix: w.prix,
        nom: w.nom,
        famille: w.famille,
      });
      console.log(w);
      resArt.push(w);
    }
  });
  res.json({ message: "Opération succés!", articlesCree: resArt });
};
const remiseWorkArt = async (req, res) => {
  try {
    await Workart.deleteMany({});
    res.json({ message: "Remise Succés!" });
  } catch (error) {
    res.json(error);
  }
};

export { ajoutWorkart, updateArticle, remiseWorkArt };
