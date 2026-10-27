export const pageHead = (title: string, description: string) => ({
  meta: [
    { title: `${title} · ASL Content Studio` },
    { name: "description", content: description },
    { property: "og:title", content: `${title} · ASL Content Studio` },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ],
});
