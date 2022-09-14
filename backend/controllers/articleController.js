import express from "express";
import Article from "../models/articleModel.js";
import asyncHandler from "express-async-handler";

// @desc Selectionner tous les articles
// @route GET /api/articles
// @accés public
const getArticles = asyncHandler(async (req, res) => {
  const articles = await Article.find();

  res.json(articles);
});

// @desc Selectionner un article par son ID
// @route GET /api/articles/:id
// @accés public
const getArticleById = asyncHandler(async (req, res) => {
  const article = await Article.findById(req.params.id);
  if (article) {
    res.json(article);
  } else {
    res.status(404).json({ message: "Article non existant" });
  }
});
// @desc    Supp article
// @route   DELETE /api/articles/:id
// @access  Private/Admin
const suppArticle = asyncHandler(async (req, res) => {
  const article = await Article.findById(req.params.id);

  if (article) {
    await article.remove();
    res.json({ message: "article removed" });
  } else {
    res.status(404);
    throw new Error("article not found");
  }
});

// @desc    Crée article
// @route   POST /api/articles
// @access  Private/Admin
const creeArticle = asyncHandler(async (req, res) => {
  const article = new Article({
    nom: "Sample name",
    prix: 1,
    prix_1: 1,
    prix_2: 2,
    utilisateur: req.utilisateur._id,
    image: "/images/sample.jpg",
    categorie: "sample categorie",
    marque: "sample marque",
    num_stock: 1,
    numevaluation: 0,
    description: "Sample description",
    code_art: "Sample code_art",
    famille: req.utilisateur._id,
  });
  const articleCree = await article.save();
  res.status(201).json(articleCree);
});
// @desc    mis a jour article
// @route   PUT /api/articles/:id
// @access  Private/Admin
const updateArticle = asyncHandler(async (req, res) => {
  const {
    code_art,
    nom,
    prix,
    prix_1,
    prix_2,
    image,
    categorie,
    num_stock,

    description,
    marque,
    famille,
  } = req.body;
  console.log(req.body.code_art);
  const article = await Article.findById(req.params.id);
  if (article) {
    article.code_art = code_art;
    article.nom = nom;
    article.prix = prix;
    article.prix_1 = prix_1;
    article.prix_2 = prix_2;
    article.image = image;
    article.marque = marque;
    article.categorie = categorie;
    article.num_stock = num_stock;
    article.famille = famille;
    article.description = description;

    const articleUpdated = await article.save();
    res.status(201).json(articleUpdated);
  } else {
    res.status(404);
    throw new Error(`Article n'existe pas!`);
  }
});

// @desc Selectionner un article par son Famille
// @route GET /api/articles/famille/:id
// @accés public
const getArticleByFamille = asyncHandler(async (req, res) => {
  console.log(req.params.id);
  const famille = req.params.id;
  const articles = await Article.find({ famille: req.params.id });
  if (articles) {
    res.json(articles);
  } else {
    res.status(404).json({ message: "Articles de ce famille non existant" });
  }
});
// @desc Selectionner un famille par son Nom
// @route GET /api/famille/:nom
// @accés public
const getArticleByNom = asyncHandler(async (req, res) => {
  console.log("Debut requette");

  console.log(req.params.nom);
  const article = req.params.nom.toUpperCase();
  //const co = lib_fam.substr(0, famille.length)

  const articles = await Article.find({
    nom: { $regex: article, $options: "i" },
  });
  if (articles) {
    res.json(articles);
  } else {
    res.status(404).json({ message: "Articles non existant" });
  }
});
const evaluationArticle = asyncHandler(async (req, res) => {
  const { nom, commentaire, rating, utilisateur } = req.body;

  const article = await Article.findById(req.params.id);
  if (article) {
    article.evaluations.push({ nom, commentaire, rating, utilisateur });
    /*
    article.evaluations.nom=req.body.nom
    article.evaluations.rating=req.body.rating
    article.evaluations.commentaire=req.body.commentaire
    article.evaluations.utilisateur=req.body.utilisateur*/
    console.log(article.evaluations);
    const articleUpdated = await article.save();

    res.status(201).json(articleUpdated);
  } else {
    res.status(404).json({ message: "Article nexiste pas!" });
  }
});
export {
  getArticles,
  getArticleById,
  suppArticle,
  creeArticle,
  updateArticle,
  getArticleByFamille,
  getArticleByNom,
  evaluationArticle,
};
