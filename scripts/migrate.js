import { Pool } from 'pg'
import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const sql = readFileSync(join(__dirname, '../app/lib/schema.sql'), 'utf8')

pool.query(sql)
  .then(() => { console.log('Migration successful'); pool.end() })
  .catch(err => { console.error(err.message); pool.end(); process.exit(1) })
