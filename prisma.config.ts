import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    // Migrações usam a conexão direta (Supabase: porta 5432). No runtime,
    // o app conecta via adapter usando DATABASE_URL (pooler 6543).
    url: process.env.DIRECT_URL || process.env.DATABASE_URL || "",
  },
});
