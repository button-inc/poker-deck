export function buildFilters(newValue: string, values: string[]): string {
  // Add the new value to the array
  const updatedValues = [...values, newValue];

  // Join the array into a comma-separated string
  return updatedValues.join(",");
}
