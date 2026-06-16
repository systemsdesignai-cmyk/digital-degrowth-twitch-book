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
          { title: "Pluto Press", value: "pluto" },
          { title: "Amazon (US)", value: "amazon-us" },
          { title: "Amazon (Europe)", value: "amazon-eu" },
          { title: "Barnes & Noble", value: "barnes" },
          { title: "Takealot", value: "takealot" },
          { title: "Apple Books", value: "apple" },
          { title: "Bookshop.org", value: "bookshop" },
          { title: "Other", value: "other" },
        ],
      },
    }),
  ],
});
