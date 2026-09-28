import {
    pgTable,
    serial,
    varchar,
    integer,
    timestamp,
} from "drizzle-orm/pg-core";

export const orders = pgTable("orders", {
    id: serial("id").primaryKey(),

    customerName: varchar("customer_name", {
        length: 100,
    }).notNull(),

    status: varchar("status", {
        length: 30,
    }).notNull().default("pending"),

    amount: integer("amount").notNull(),

    updatedAt: timestamp("updated_at", {
        withTimezone: true,
    }).defaultNow().notNull(),
});