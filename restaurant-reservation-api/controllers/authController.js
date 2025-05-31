const db = require('../models/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

// ✅ REGISTER
exports.registerRestaurant = async (req, res) => {
  const { name, email, password, location, description, image } = req.body;

  try {
    const [existing] = await db.query('SELECT * FROM restaurants WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      'INSERT INTO restaurants (name, email, password, location, description, image) VALUES (?, ?, ?, ?, ?, ?)',
      [name, email, hashedPassword, location, description, image]
    );

    res.json({ message: 'Restaurant registered successfully' });
  } catch (err) {
    console.error('Register Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ LOGIN
exports.loginRestaurant = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await db.query('SELECT * FROM restaurants WHERE email = ?', [email]);
    if (rows.length === 0) return res.status(400).json({ message: 'Invalid credentials' });

    const restaurant = rows[0];
    const match = await bcrypt.compare(password, restaurant.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: restaurant.id, role: 'restaurant' }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ UPDATE (self)
exports.updateRestaurant = async (req, res) => {
  const { name, location, description } = req.body;
  const restaurant_id = req.user.id;

  try {
    await db.query(
      'UPDATE restaurants SET name = ?, location = ?, description = ? WHERE id = ?',
      [name, location, description, restaurant_id]
    );
    res.json({ message: 'Restaurant updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ GET ALL
exports.getAllRestaurants = async (req, res) => {
  try {
    const [restaurants] = await db.query(
      'SELECT id, name, image, location, description FROM restaurants'
    );

    const updated = restaurants.map(r => ({
      ...r,
      image: r.image ? `http://192.168.137.106:3000/uploads/${r.image}` : null
    }));

    res.json(updated);
  } catch (err) {
    console.error('Error fetching restaurants:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ DELETE (self, protected)
exports.deleteRestaurant = async (req, res) => {
  const restaurant_id = req.user.id;

  try {
    await db.query(
      `DELETE FROM reservations 
       WHERE restaurant_id = ? 
       OR menu_item_id IN (
         SELECT id FROM menu_items WHERE restaurant_id = ?
       )`,
      [restaurant_id, restaurant_id]
    );

    await db.query('DELETE FROM menu_items WHERE restaurant_id = ?', [restaurant_id]);

    const [result] = await db.query('DELETE FROM restaurants WHERE id = ?', [restaurant_id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    res.json({ message: 'Restaurant and all related data deleted successfully' });
  } catch (err) {
    console.error('❌ Delete restaurant error:', err);
    res.status(500).json({ message: 'Error deleting restaurant with dependencies' });
  }
};

// ✅ DELETE BY ID (admin only)
exports.deleteRestaurantById = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query(
      `DELETE FROM reservations 
       WHERE restaurant_id = ? 
       OR menu_item_id IN (
         SELECT id FROM menu_items WHERE restaurant_id = ?
       )`,
      [id, id]
    );

    await db.query('DELETE FROM menu_items WHERE restaurant_id = ?', [id]);

    const [result] = await db.query('DELETE FROM restaurants WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    res.json({ message: 'Restaurant and all related data deleted successfully (admin)' });
  } catch (err) {
    console.error('❌ Admin delete restaurant error:', err);
    res.status(500).json({ message: 'Error deleting restaurant as admin' });
  }
};
