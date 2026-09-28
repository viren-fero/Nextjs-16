import { sql } from "drizzle-orm";
import { db } from "./index";

async function main() {
    const result = await db.execute(
        sql`SELECT current_database(), version()`,
    );

    console.log(result.rows);
}

main()
    .catch(console.error)
    .finally(() => process.exit(0));