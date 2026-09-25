require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const Category = require('./models/Category');
const Product = require('./models/Product');

const seedData = JSON.parse(fs.readFileSync('plants.json', 'utf8'));

const seedProducts = async () => {
  try {
    const mongoURI = process.env.MONGODB || "mongodb://localhost:27017/plantora";
    console.log(`Connecting to MongoDB at ${mongoURI}...`);
    await mongoose.connect(mongoURI);
    console.log('Connected!');

    console.log('Clearing existing Categories and Products...');
    await Category.deleteMany({});
    await Product.deleteMany({});

    // 1. Create Categories
    const categoryNames = [...new Set(seedData.map(p => p.category))];
    const categoryMap = {}; // name -> ObjectId
    
    for (const name of categoryNames) {
      const slug = name.toLowerCase().replace(/ /g, '-');
      const cat = await Category.create({ name, slug, description: name });
      categoryMap[name] = cat._id;
    }
    console.log(`Created ${Object.keys(categoryMap).length} categories.`);

    // 2. Map & Create Products
    const productsToInsert = seedData.map((plant, index) => {
      const slug = plant.name.toLowerCase().replace(/ /g, '-') + '-' + index;
      
      let diff = "easy";
      if (plant.difficulty === "Moderate") diff = "moderate";
      if (plant.difficulty === "Challenging") diff = "hard";

      return {
        name: plant.name,
        slug,
        description: plant.description + ' ' + plant.scientificName,
        price: Math.floor(Math.random() * 500) + 200, // random price 200-699
        stock: 50,
        images: plant.images,
        category: categoryMap[plant.category],
        difficulty: diff,
        lightRequirement: plant.category === "Low-Light Plants" ? "low" : "medium",
        wateringFrequency: "weekly",
        petFriendly: plant.toxicity ? !plant.toxicity.toxicToCats : false,
        airPurifying: plant.airPurifying || false,
        careInstructions: JSON.stringify(plant.careGuide),
        status: "active"
      };
    });

    await Product.insertMany(productsToInsert);
    console.log(`Inserted ${productsToInsert.length} products successfully!`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();
