import { defineType, defineField } from "sanity";
import { HelpCircleIcon } from "@sanity/icons";

export const citation = defineType({
  name: "citation",
  title: "Citation",
  type: "document",
  icon: HelpCircleIcon,
  fields: [
    defineField({
      name: "image",
      title: "Citation Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
    }),
  ],
});
