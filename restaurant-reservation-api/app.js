const express = require('express');
const cors = require('cors'); // ✅ Only once
const db = require('./models/db');
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
// const menuRoutes = require('./routes/menu');
const reservationRoutes = require('./routes/reservation');
const uploadRoutes = require('./routes/upload');
const menuRoutes = require('./routes/menu');

const app = express();
const PORT = 3000;

// ✅ CORS Middleware (before routes)
app.use(cors({
  origin: '*', // ⬅️ TEMPORARY: Allow all origins for testing
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));


// Other Middleware
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
// app.use('/api/menu', menuRoutes);
app.use('/api/users', userRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/api/menus', menuRoutes);

// DB Test Route
app.get('/test-db', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT 1 + 1 AS result');
    res.json({ message: 'Database connected!', result: rows[0].result });
  } catch (err) {
    console.error('DB connection error:', err);
    res.status(500).json({ message: 'Database connection failed' });
  }
});

// Start Server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running at 192.168.137.106:${PORT}`);
});
