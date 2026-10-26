import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_5qAW1czeCwVH@ep-tiny-forest-b47aqlur-pooler.c-6.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  ssl: {
    rejectUnauthorized: true,
  },
});

export const DBconn = async () => {
  try {
    const result = await pool.query("SELECT NOW()");

    console.log("Database connected successfully!");
    console.log("Database time:", result.rows[0].now);
  } catch (error) {
    console.error("Database connection failed:", error.message);
  }
};

export default pool;