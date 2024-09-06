import { isAdminOrSelf } from "../access/isAdminOrSelf";
import { isAdmin, isAdminFieldLevel } from "../access/isAdmin";
import { CollectionConfig } from "payload/types";

export const Users: CollectionConfig = {
  slug: "users",
  auth: {
    verify: {
      generateEmailHTML: ({ token }) => {
        return `<a href='${process.env.NEXT_PUBLIC_SERVER_URL}/verify-email?token=${token}'>Hesabı doğrula</a>`;
      },
    },
  },
  access: {
    read: isAdminOrSelf,
    create: isAdmin,
    update: isAdminOrSelf,
    delete: isAdmin,
  },
  admin: {
    hidden: ({ user }) => user.role !== "admin",
  },
  fields: [
    {
      name: "role",
      defaultValue: "user",
      required: true,
      type: "select",
      options: [
        { label: "Admin", value: "admin" },
        { label: "User", value: "user" },
      ],
      access: {
        create: isAdminFieldLevel,
        update: isAdminFieldLevel,
      },
    },
  ],
};
