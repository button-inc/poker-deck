"use server";

import { cookies } from "next/headers";
// 🛠️ Function to get the encrypted JWT from NextAuth getToken route function
export async function getToken() {
  try {
    const res = await fetch(`${process.env.AUTH_URL}/api/auth/token`, {
      method: "POST",
      headers: { Cookie: cookies().toString() },
    });

    if (!res.ok) {
      // eslint-disable-next-line no-console
      console.error(`Failed to fetch token. Status: ${res.status}`);
      return {};
    }
    return await res.json();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`An error occurred while fetching token: ${error}`);
    return {};
  }
}
