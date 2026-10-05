import * as orders from "./orders";
import * as system from "./system";
import * as reports from "./reports";

export const jobs = [
    ...Object.values(orders),
    ...Object.values(system),
    ...Object.values(reports)
];
