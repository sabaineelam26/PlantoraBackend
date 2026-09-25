require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');

const seedData = JSON.parse(fs.readFileSync('plants.json', 'utf8'));

// A simplified generic schema for seeding since we don't have the exact Plant model 
// (the previous prompt used 'Product', but we are seeding 'plants')
const plantSchema = new mongoose.Schema({
  name: String,
  scientificName: String,
  category: { type: String, enum: ["Low-Light Plants", "Air-Purifying Plants", "Pet-Friendly Plants", "Easy-Care Plants"] },
  difficulty: { type: String, enum: ["Easy", "Moderate", "Challenging"] },
  description: String,
  careGuide: {
    watering: { frequencyDays: Number, instructions: String },
    light: { type: String, idealLux: String },
    temperature: { minC: Number, maxC: Number },
    humidity: { minPercentage: Number, idealPercentage: Number },
    fertilizer: { schedule: String }
  },
  toxicity: { toxicToCats: Boolean, toxicToDogs: Boolean, notes: String },
  airPurifying: Boolean,
  images: [String],
  tags: [String]
});

const Plant = mongoose.model('Plant', plantSchema);

const seedDatabase = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/plantora";
    console.log(`Connecting to MongoDB at ${mongoURI}...`);
    await mongoose.connect(mongoURI);
    console.log('Connected!');
    
    console.log('Clearing existing plants...');
    await Plant.deleteMany({});
    
    console.log('Inserting 20 plants...');
    await Plant.insertMany(seedData);
    
    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
