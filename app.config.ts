export default defineAppConfig({
  ui: {
    // strategy: "override",
    primary: "main",
    button: {
      base: "select-none",
      color: {
        // white: { solid: "!text-green-900" },
        // black: { solid: "!text-red-900" }
      },
      default: {
        color: "main",
      }
    }
    ,
    skeleton: {
      background: "bg-gray-300"
    },
    dropdown: { item: { disabled: "opacity-100", base: "select-none", label: 'capitalize' }, }
    // dropdown:{
    //   default:{
    //     closeDelay:parseFloat('2000')
    //   }
    // }
  }
})