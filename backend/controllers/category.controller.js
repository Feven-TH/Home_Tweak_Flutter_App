const { Category } = require('../models');

async function insertCategories() {
  const existing = await Category.count();
  if (existing === 0) {
    await Category.bulkCreate([
      { id: 1, name: 'Plumber' },
      { id: 2, name: 'Painter' },
      { id: 3, name: 'Carpenter' },
      { id: 4, name: 'Electrician' },
      { id: 5, name: 'Contractor' },
      { id: 6, name: 'Gardner' },
    ]);
    console.log('Categories inserted');
  } else {
    console.log('Categories already exist, skipping insert.');
  }
}
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll(); // Fetch categories from the database
    res.json(categories); // Return the categories as a JSON response
  } catch (err) {
    console.error('Error fetching categories:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


insertCategories().catch(err => console.error('Error:', err));
