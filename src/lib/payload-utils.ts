import { User } from "../payload-types";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { NextRequest } from "next/server";

export const getServerSideUser = async (
  cookies: NextRequest["cookies"] | ReadonlyRequestCookies
) => {
  const token = cookies.get("payload-token")?.value;

  const meRes = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/me`,
    {
      credentials: "include",
      headers: {
        Authorization: `JWT ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  //console.log("mRes:", meRes)
  //console.log("mRes json:", meRes.json())

  if (!meRes.ok) {
    console.error("Failed to fetch user data:", await meRes.text());
    return { user: null };
  }

  const { user } = (await meRes.json()) as { user: User | null };
  console.log("user:", user)

  return { user };




};