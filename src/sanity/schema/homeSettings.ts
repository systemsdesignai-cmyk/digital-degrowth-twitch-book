import { defineType, defineField } from "sanity";
import { HomeIcon } from "@sanity/icons";

export const homeSettings = defineType({
  name: "homeSettings",
  title: "Home Page Settings",
  type: "document",
  icon: HomeIcon,
  fields: [
    defineField({
      name: "heroTitle",
      title: "Hero Title",
      type: "string",
    }),
    defineField({
      name: "heroTitleOutline",
      title: "Hero Title Outline",
      type: "string",
    }),
    defineField({
      name: "heroCopy",
      title: "Hero Copy",
      type: "text",
    }),
    defineField({
      name: "aboutKicker",
      title: "About Section Kicker",
      type: "string",
    }),
    defineField({
      name: "aboutTitle",
      title: "About Section Title",
      type: "string",
    }),
    defineField({
      name: "aboutCopy",
      title: "About Section Copy",
      type: "text",
    }),
  ],
});
