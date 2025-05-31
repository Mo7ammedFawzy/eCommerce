import { DISCOUNT } from "~/constants";

export default (price: number) => Number(Number(price * (1 - DISCOUNT / 100)).toFixed(2))