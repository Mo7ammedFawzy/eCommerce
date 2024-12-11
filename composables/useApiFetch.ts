import { API_URL } from "~/constants"

export const useApiFetch = (endpoint: string, options?: any) => {
  const URL = API_URL + endpoint
  return useFetch(URL, options)
}
