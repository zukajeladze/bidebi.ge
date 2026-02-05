import { Pool } from '@neondatabase/serverless';
import bcrypt from 'bcrypt';

if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL not found in environment variables');
  console.error('Make sure to run this script with: npm run create-admin');
  process.exit(1);
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function createAdminUser() {
  try {
    // Admin user details
    const username = 'admin';
    const email = 'admin@bidebi.ge';
    const password = 'Bidebi2026@!';

    console.log('🔐 Creating admin user...');
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('');

    // Check if user already exists
    const existingUser = await pool.query(
      'SELECT * FROM users WHERE username = $1 OR email = $2',
      [username, email],
    );

    if (existingUser.rows.length > 0) {
      console.log('⚠️  User already exists!');
      console.log('');
      console.log('Existing user details:');
      console.log('ID:', existingUser.rows[0].id);
      console.log('Username:', existingUser.rows[0].username);
      console.log('Email:', existingUser.rows[0].email);
      console.log('Role:', existingUser.rows[0].role);
      console.log('');

      const updateRole = await pool.query(
        'UPDATE users SET role = $1 WHERE id = $2 RETURNING *',
        ['admin', existingUser.rows[0].id],
      );

      console.log('✅ Updated user role to admin');
      console.log('');
      console.log('You can now login with:');
      console.log('Username:', updateRole.rows[0].username);
      console.log('Password: (your existing password)');

      await pool.end();
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the admin user
    const result = await pool.query(
      `INSERT INTO users (
        username,
        email,
        password,
        role,
        bid_balance,
        created_at
      ) VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING *`,
      [username, email, hashedPassword, 'admin', 1000],
    );

    console.log('✅ Admin user created successfully!');
    console.log('');
    console.log('Login credentials:');
    console.log('Username:', result.rows[0].username);
    console.log('Email:', result.rows[0].email);
    console.log('Password:', password);
    console.log('Role:', result.rows[0].role);
    console.log('Bid Balance:', result.rows[0].bid_balance);
    console.log('');
    console.log('🎉 You can now login with these credentials!');
  } catch (error) {
    console.error('❌ Error creating admin user:', error);
  } finally {
    await pool.end();
  }
}

createAdminUser();
