const db = require('../models/db');

// ✅ Make a reservation (with optional menu item)
exports.makeReservation = async (req, res) => {
  const { restaurant_id, menu_item_id, date, time, people_count } = req.body;
  const user_id = req.user.id;

  try {
    if (menu_item_id) {
      await db.query(
        'INSERT INTO reservations (user_id, restaurant_id, menu_item_id, date, time, people_count) VALUES (?, ?, ?, ?, ?, ?)',
        [user_id, restaurant_id, menu_item_id, date, time, people_count]
      );
    } else {
      await db.query(
        'INSERT INTO reservations (user_id, restaurant_id, date, time, people_count) VALUES (?, ?, ?, ?, ?)',
        [user_id, restaurant_id, date, time, people_count]
      );
    }

    res.json({ message: 'Reservation created successfully' });
  } catch (err) {
    console.error('Make reservation error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Get reservations for the logged-in user
exports.getUserReservations = async (req, res) => {
  const user_id = req.user.id;

  try {
    const [rows] = await db.query(
      `SELECT r.id, r.date, r.time, r.people_count,
              rest.name AS restaurant,
              COALESCE(m.name, 'No menu selected') AS menu_item
       FROM reservations r
       JOIN restaurants rest ON r.restaurant_id = rest.id
       LEFT JOIN menu_items m ON r.menu_item_id = m.id
       WHERE r.user_id = ?
       ORDER BY r.date DESC, r.time DESC`,
      [user_id]
    );

    res.json(rows);
  } catch (err) {
    console.error('Get user reservations error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllReservations = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        r.id, 
        r.date, 
        r.time, 
        r.people_count,
        u.name AS user_name,
        u.email AS user_email,
        rest.name AS restaurant,
        COALESCE(m.name, 'No menu selected') AS menu_item
      FROM reservations r
      JOIN users u ON r.user_id = u.id
      JOIN restaurants rest ON r.restaurant_id = rest.id
      LEFT JOIN menu_items m ON r.menu_item_id = m.id
      ORDER BY r.date DESC, r.time DESC
    `);

    res.json(rows);
  } catch (err) {
    console.error('Get all reservations error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.editReservation = async (req, res) => {
  const { id } = req.params;
  const { date, time, people_count } = req.body;
  const user_id = req.user.id;

  try {
    await db.query(
      'UPDATE reservations SET date = ?, time = ?, people_count = ? WHERE id = ? AND user_id = ?',
      [date, time, people_count, id, user_id]
    );
    res.json({ message: 'Reservation updated' });
  } catch (err) {
    console.error('Edit reservation error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Delete reservation
exports.deleteReservation = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user.id;

  try {
    await db.query(
      'DELETE FROM reservations WHERE id = ? AND user_id = ?',
      [id, user_id]
    );
    res.json({ message: 'Reservation deleted' });
  } catch (err) {
    console.error('Delete reservation error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Get all restaurants
exports.getAllRestaurants = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM restaurants');
    res.json(rows);
  } catch (err) {
    console.error('Get restaurants error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Create new restaurant
exports.createRestaurant = async (req, res) => {
  const { name, image, location, description } = req.body;

  try {
    await db.query(
      'INSERT INTO restaurants (name, image, location, description) VALUES (?, ?, ?, ?)',
      [name, image, location, description]
    );
    res.status(201).json({ message: 'Restaurant created' });
  } catch (err) {
    console.error('Create restaurant error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Edit restaurant
exports.updateRestaurant = async (req, res) => {
  const { id } = req.params;
  const { name, image, location, description } = req.body;

  try {
    await db.query(
      'UPDATE restaurants SET name = ?, image = ?, location = ?, description = ? WHERE id = ?',
      [name, image, location, description, id]
    );
    res.json({ message: 'Restaurant updated' });
  } catch (err) {
    console.error('Update restaurant error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Delete restaurant
exports.deleteRestaurant = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query('DELETE FROM restaurants WHERE id = ?', [id]);
    res.json({ message: 'Restaurant deleted' });
  } catch (err) {
    console.error('Delete restaurant error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
