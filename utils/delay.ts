import { DELAY_TIME } from "~/constants"

export default (fn: () => void) => {
 return new Promise(() => setTimeout(() => fn(), DELAY_TIME))
}