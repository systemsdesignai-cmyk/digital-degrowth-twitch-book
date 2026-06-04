import { defineType, defineField } from "sanity";
import { TagIcon } from "@sanity/icons";

export const retailer = defineType({
  name: "retailer",
  title: "Retailer",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
    }),
    defineField({
      name: "url",
      title: "URL",
      type: "url",
    }),
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Amazon", value: "amazon" },
          { title: "Takealot", value: "takealot" },
          { title: "Apple Books", value: "apple" },
          { title: "Other", value: "other" },
        ],
      },
    }),
  ],
});
