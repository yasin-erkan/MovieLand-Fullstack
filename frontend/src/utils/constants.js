export const inputs = [
  { name: "title", label: "Title" },
  { name: "description", label: "Description" },
  { name: "rating", label: "Rating", type: "number", min: 1, max: 10 },
  { name: "year", label: "Year", type: "number", min: 1800, max: 2025 },
  { name: "director", label: "Director" },
  { name: "duration", label: "Duration", type: "number" },
  { name: "language", label: "Language" },
  { name: "cast", label: "Cast (separate with commas)" },
  { name: "genre", label: "Genres (separate with commas)" },
];
