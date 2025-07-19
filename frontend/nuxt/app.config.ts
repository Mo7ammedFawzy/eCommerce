export default defineAppConfig({
  ui: {
    primary: "main",
    button: {
      base: "select-none",
      color: {
      },
      default: {
        color: "main",
      }
    }
    ,
    skeleton: {
      background: "bg-gray-300"
    },
    dropdown: { item: { disabled: "opacity-100", base: "select-none", label: 'capitalize' }, },
    divider: {
      border: {
        base: "border-gray-300 dark:border-gray-600"
      }
    },
    input: {
      base: "h-12"
    }
  }
})