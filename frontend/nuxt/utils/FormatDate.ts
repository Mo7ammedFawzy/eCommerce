export default (date: string | Date | undefined) => new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: "long",
  year: "numeric"
}).format(new Date(date ?? new Date()))