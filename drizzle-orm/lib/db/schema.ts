import { pgTable, serial, varchar, timestamp, boolean } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    name: varchar("name", { length: 255 }).notNull(),
    password: varchar("password", { length: 255 }).notNull(),
    created_at: timestamp("created_at").defaultNow().notNull(),
    updated_at: timestamp("updated_at").defaultNow().notNull().$onUpdate(() => new Date()),
    isActive: boolean().default(true).notNull()
});