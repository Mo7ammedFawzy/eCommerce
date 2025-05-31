import type { IOrder } from "~/types";

export default (date: string | Date | undefined) => new Intl.DateTimeFormat('en-GB', {
 day: 'numeric',
 month: "long",
 year: "numeric"
 // TODO: fix this date remove this ??
}).format(new Date(date ?? new Date()))