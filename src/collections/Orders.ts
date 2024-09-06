import { isAdmin, isAdminFieldLevel } from "../access/isAdmin";
import { isAdminOrSelf } from "../access/isAdminOrSelf";
import { CollectionConfig } from "payload/types";

export const Orders: CollectionConfig = {
  slug: "orders",
  admin: {
    useAsTitle: "Your Orders",
    description: "A summary of all your orders on DigitalHippo.",
  },
  access: {
    read: isAdminOrSelf,
    update: isAdmin,
    delete: isAdmin,
    create: isAdmin,
  },
  fields: [
    {
      name: "_isPaid",
      type: "checkbox",
      access: {
        read: isAdminFieldLevel,
        create: () => false,
        update: () => false,
      },
      admin: {
        hidden: true,
      },
      required: true,
    },
    {
      name: "user",
      type: "relationship",
      admin: {
        hidden: true,
      },
      relationTo: "users",
      required: true,
    },
    {
      name: "products",
      type: "relationship",
      relationTo: "products",
      required: true,
      hasMany: true,
    },
  ],
};
