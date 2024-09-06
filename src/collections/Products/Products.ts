import { PRODUCT_CATEGORIES } from "../../config";
import { CollectionConfig } from "payload/types";
import { isAdmin, isAdminFieldLevel } from "../../access/isAdmin";

export const Products: CollectionConfig = {
  slug: "products",
  admin: {
    useAsTitle: "name",
  },
  access: {
    read: isAdmin,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      required: true,
      hasMany: false,
      admin: {
        condition: () => false,
      },
    },
    {
      name: "name",
      label: "Ürün adı",
      type: "text",
      required: true,
    },
    {
      name: "description",
      label: "Ürün açıklaması",
      type: "textarea",
    },
    {
      name: "price",
      label: "Fiyat",
      min: 0,
      max: 100000,
      type: "number",
      required: true,
    },
    {
      name: "category",
      label: "kategori",
      type: "select",
      options: PRODUCT_CATEGORIES.map(({ label, value }) => ({ label, value })),
      required: true,
    },
    {
      name: "approvedForSale",
      label: "Product Status",
      type: "select",
      defaultValue: "pending",
      access: {
        create: isAdminFieldLevel,
        read: isAdminFieldLevel,
        update: isAdminFieldLevel,
      },
      options: [
        {
          label: "Pending verification",
          value: "pending",
        },
        {
          label: "Approved",
          value: "approved",
        },
        {
          label: "Denied",
          value: "denied",
        },
      ],
    },
    {
      name: "priceId",
      access: {
        create: () => false,
        read: () => false,
        update: () => false,
      },
      type: "text",
      admin: {
        hidden: true,
      },
    },
    {
      name: "stripeId",
      access: {
        create: () => false,
        read: () => false,
        update: () => false,
      },
      type: "text",
      admin: {
        hidden: true,
      },
    },
    {
      name: "images",
      type: "array",
      label: "Ürün görselleri",
      minRows: 1,
      maxRows: 4,
      required: true,
      labels: {
        singular: "Görsel",
        plural: "Görseller",
      },
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
    },
  ],
};
