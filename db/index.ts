import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

type DbClient = ReturnType<typeof createDb>;

let _db: DbClient | undefined;
let _overrideDb: unknown;

function createDb() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not defined");
  return drizzle({ client: neon(url) });
}

export function setDbForTesting(mockDb?: unknown) {
  _overrideDb = mockDb;
}

export function getDb(): DbClient {
  if (_overrideDb !== undefined) {
    return _overrideDb as DbClient;
  }
  _db ??= createDb();
  return _db;
}




