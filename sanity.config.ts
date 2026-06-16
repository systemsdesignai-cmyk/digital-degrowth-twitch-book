import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { schemaTypes } from "./src/sanity/schema";
import { structure } from "./src/sanity/structure";

export default defineConfig({
  name: "default",
  title: "Digital Degrowth Admin",

  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  basePath: "/studio",

  plugins: [
    deskTool({
      structure,
    }),
  ],

  schema: {
    types: schemaTypes,
    // Filter out singleton types from the global “New document” menu
    templates: (prev) =>
      prev.filter((template) => !["siteSettings", "homeSettings", "author"].includes(template.id)),
  },

  document: {
    // For singleton types, filter out actions that are not relevant
    actions: (prev, { schemaType }) => {
      if (["siteSettings", "homeSettings", "author"].includes(schemaType)) {
        return prev.filter(({ action }) => action && ["publish", "discardChanges", "restore"].includes(action));
      }
      return prev;
    },
  },
});
