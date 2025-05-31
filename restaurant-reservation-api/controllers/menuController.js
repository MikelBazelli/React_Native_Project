const db = require('../models/db');

// POST new menu item
exports.createMenuItem = async (req, res) => {
  const { name, description, price, image, restaurant_id } = req.body;

  if (!name || !price || !restaurant_id) {
    return res.status(400).json({ message: 'Name, price, and restaurant_id are required' });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO menu_items (name, description, price, image, restaurant_id) VALUES (?, ?, ?, ?, ?)',
      [name, description, price, image, restaurant_id]
    );

    res.status(201).json({
      message: 'Menu item created successfully',
      menuItem: {
        id: result.insertId,
        name,
        description,
        price,
        image,
        restaurant_id
      }
    });
  } catch (err) {
    console.error('Create menu item error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
