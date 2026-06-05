import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";

const { Pool } = pg;

function getConnectionConfig() {
  // In Replit dev, DATABASE_URL takes priority over RDS credentials
  if (process.env.DATABASE_URL) {
    return {
      connectionString: process.env.DATABASE_URL,
    };
  }
  // In Lightsail (no DATABASE_URL), use RDS credentials
  if (process.env.RDS_ENDPOINT) {
    const host = process.env.RDS_ENDPOINT.trim();
    const password = process.env.RDS_PASSWORD || "";
    const user = process.env.RDS_USERNAME || "postgres";
    const database = process.env.RDS_DATABASE || "postgres";
    const port = parseInt(process.env.RDS_PORT || "5432", 10);
    return {
      host,
      port,
      user,
      password,
      database,
      ssl: { rejectUnauthorized: false },
    };
  }
  throw new Error("DATABASE_URL or RDS_ENDPOINT must be set");
}

export const pool = new Pool(getConnectionConfig());
export const db = drizzle(pool, { schema });
