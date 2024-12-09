export default defineAppConfig({
 ui: {
  // strategy: "override",
  primary: "main",
  button: {
   color: {
    white: { solid: "!text-green-900" },
    black: { solid: "!text-red-900" }
   },
   default: {
    color: "main",
   }
  }
 }
})