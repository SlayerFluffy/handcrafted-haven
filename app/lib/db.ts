import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

export default pool;

// Usage example:
// import pool from '@/app/lib/db';
// const result = await pool.query('SELECT * FROM products');