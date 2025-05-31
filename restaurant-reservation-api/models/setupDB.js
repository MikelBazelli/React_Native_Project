const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3307,
  user: 'root',
  password: 'NewPassword'
});

connection.connect(err => {
  if (err) throw err;
  console.log('✅ Connected to MariaDB!');

  connection.query(`CREATE DATABASE IF NOT EXISTS restaurant_app_api`, (err) => {
    if (err) throw err;
    console.log('📁 Database created or already exists.');

    connection.changeUser({ database: 'restaurant_app_api' }, (err) => {
      if (err) throw err;

      const tableQueries = [
        `CREATE TABLE IF NOT EXISTS users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(100),
          email VARCHAR(100) UNIQUE,
          password VARCHAR(255)
        )`,

        `CREATE TABLE IF NOT EXISTS restaurants (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(100),
          email VARCHAR(100) UNIQUE,
          password VARCHAR(255),
          location VARCHAR(100),
          description TEXT,
          image VARCHAR(255)
        )`,

        `CREATE TABLE IF NOT EXISTS menu_items (
          id INT AUTO_INCREMENT PRIMARY KEY,
          restaurant_id INT,
          name VARCHAR(100),
          price DECIMAL(5,2),
          image VARCHAR(255),
          FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE
        )`,

        `CREATE TABLE IF NOT EXISTS reservations (
          id INT AUTO_INCREMENT PRIMARY KEY,
          user_id INT,
          restaurant_id INT,
          menu_item_id INT NULL,
          date DATE,
          time TIME,
          people_count INT,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
          FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE,
          FOREIGN KEY (menu_item_id) REFERENCES menu_items(id) ON DELETE CASCADE
        )`
      ];

      let completed = 0;
      tableQueries.forEach(query => {
        connection.query(query, err => {
          if (err) throw err;
          completed++;

          if (completed === tableQueries.length) {
            console.log('✅ All base tables created!');
          }
        });
      });
    });
  });
});
