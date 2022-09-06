/* il s'agit d'une table de produits qui est rendue dans le frontend,
 à remplacer par les données de la base de données */
const articles = [
  {
    
    nom: 'Airpods Wireless Bluetooth Headphones',
    image: '/images/airpods.jpg',
    description:
      'Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working',
    marque: 'Apple',
    categorie: 'Electronics',
    prix: 80,
    num_stock: 0,
    evaluation: 4.5,
    numevaluation: 12,
  },
  {
    
    nom: 'iPhone 11 Pro 256GB Memory',
    image: '/images/phone.jpg',
    description:
      'Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life',
    marque: 'Apple',
    categorie: 'Electronics',
    prix: 599.99,
    num_stock: 7,
    evaluation: 4.0,
    numevaluation: 8,
  },
  {
  
    nom: 'Cannon EOS 80D DSLR Camera',
    image: '/images/camera.jpg',
    description:
      'Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design',
    marque: 'Cannon',
    categorie: 'Electronics',
    prix: 929.99,
    num_stock: 5,
    evaluation: 3,
    numevaluation: 12,
  },
  {

    nom: 'Sony Playstation 4 Pro White Version',
    image: '/images/playstation.jpg',
    description:
      'The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music',
    marque: 'Sony',
    categorie: 'Electronics',
    prix: 399.99,
    num_stock: 11,
    evaluation: 5,
    numevaluation: 12,
  },


]

export default articles
