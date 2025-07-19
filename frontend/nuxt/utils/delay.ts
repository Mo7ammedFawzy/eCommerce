import { DELAY_TIME } from "~/constants"

export default async (delay: number = DELAY_TIME) => {
 return await new Promise(resolve => setTimeout(resolve, delay))
}