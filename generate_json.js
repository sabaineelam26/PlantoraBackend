const fs = require('fs');

const lowLightImages = [
  'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1599598425947-330026217431?auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1598539962534-738981d39209?auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1601985705806-5b9a71f6004f?auto=format&fit=crop&w=500&q=60'
];

const airPurifyingImages = [
  'https://images.unsplash.com/photo-1459156212016-c812468e2115?auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1491147334573-44cbb4602074?auto=format&fit=crop&w=500&q=60'
];

const petFriendlyImages = [
  'https://images.unsplash.com/photo-1611145367651-63028d44e6fa?auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1600411832986-5a4477b64a1c?auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1598880940080-c9f5dd00f3e2?auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1597404104037-1428a2a09503?auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&w=500&q=60'
];

const easyCareImages = [
  'https://images.unsplash.com/photo-1453904300235-0f2f60b15b5d?auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1416879598555-aca40c9ce1e2?auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1446071103084-c257b5f70672?auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1487700160041-babef9c3cb55?auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=500&q=60'
];

const getImagesForCategory = (category) => {
  if (category === 'Low-Light Plants') return lowLightImages;
  if (category === 'Air-Purifying Plants') return airPurifyingImages;
  if (category === 'Pet-Friendly Plants') return petFriendlyImages;
  if (category === 'Easy-Care Plants') return easyCareImages;
  return airPurifyingImages;
};

const plants = [];

const createPlant = (name, scientificName, category, isToxic, diff) => ({
  name,
  scientificName,
  category,
  difficulty: diff,
  description: `The ${name} is a beautiful indoor plant perfect for any home.`,
  careGuide: {
    watering: { frequencyDays: 7, instructions: 'Water when top inch of soil is dry.' },
    light: { type: 'Indirect', idealLux: '1000-2000' },
    temperature: { minC: 15, maxC: 30 },
    humidity: { minPercentage: 40, idealPercentage: 60 },
    fertilizer: { schedule: 'Once a month during spring and summer.' }
  },
  toxicity: { toxicToCats: isToxic, toxicToDogs: isToxic, notes: isToxic ? 'Keep away from pets.' : 'Safe for pets.' },
  airPurifying: category === 'Air-Purifying Plants',
  images: getImagesForCategory(category),
  tags: [category.toLowerCase().replace(' ', '-'), 'indoor', 'plant']
});

plants.push(createPlant('ZZ Plant', 'Zamioculcas zamiifolia', 'Low-Light Plants', true, 'Easy'));
plants.push(createPlant('Snake Plant', 'Sansevieria trifasciata', 'Low-Light Plants', true, 'Easy'));
plants.push(createPlant('Cast Iron Plant', 'Aspidistra elatior', 'Low-Light Plants', false, 'Moderate'));
plants.push(createPlant('Parlor Palm', 'Chamaedorea elegans', 'Low-Light Plants', false, 'Easy'));
plants.push(createPlant('Chinese Evergreen', 'Aglaonema', 'Low-Light Plants', true, 'Easy'));

plants.push(createPlant('Spider Plant', 'Chlorophytum comosum', 'Air-Purifying Plants', false, 'Easy'));
plants.push(createPlant('Peace Lily', 'Spathiphyllum', 'Air-Purifying Plants', true, 'Moderate'));
plants.push(createPlant('English Ivy', 'Hedera helix', 'Air-Purifying Plants', true, 'Challenging'));
plants.push(createPlant('Boston Fern', 'Nephrolepis exaltata', 'Air-Purifying Plants', false, 'Moderate'));
plants.push(createPlant('Rubber Plant', 'Ficus elastica', 'Air-Purifying Plants', true, 'Moderate'));

plants.push(createPlant('Calathea', 'Calathea spp.', 'Pet-Friendly Plants', false, 'Challenging'));
plants.push(createPlant('Ponytail Palm', 'Beaucarnea recurvata', 'Pet-Friendly Plants', false, 'Easy'));
plants.push(createPlant('Peperomia', 'Peperomia spp.', 'Pet-Friendly Plants', false, 'Easy'));
plants.push(createPlant('Bird\'s Nest Fern', 'Asplenium nidus', 'Pet-Friendly Plants', false, 'Moderate'));
plants.push(createPlant('African Violet', 'Saintpaulia', 'Pet-Friendly Plants', false, 'Moderate'));

plants.push(createPlant('Pothos', 'Epipremnum aureum', 'Easy-Care Plants', true, 'Easy'));
plants.push(createPlant('Aloe Vera', 'Aloe barbadensis miller', 'Easy-Care Plants', true, 'Easy'));
plants.push(createPlant('Monstera', 'Monstera deliciosa', 'Easy-Care Plants', true, 'Easy'));
plants.push(createPlant('Jade Plant', 'Crassula ovata', 'Easy-Care Plants', true, 'Easy'));
plants.push(createPlant('Philodendron', 'Philodendron spp.', 'Easy-Care Plants', true, 'Easy'));

fs.writeFileSync('plants.json', JSON.stringify(plants, null, 2));
console.log('plants.json updated with distinct categorical images successfully');
