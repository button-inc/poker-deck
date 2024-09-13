"use server";

import { getToken } from "@/actions/getToken";
import { revalidatePath } from "next/cache";

// 🛠️ Function to fetch from GitHub API
/**
 * Action handler to fetch GitHub data - returns the response as a JSON object.
 * @param apiUrl The relative URL of the API endpoint to send the request to.
 * @param method The HTTP method to use for the request (GET, POST, PUT, DELETE, PATCH).
 * @param pathToRevalidate The path of the data to revalidate after the request is complete.
 * @param options Optional data to include in the request body (example: body for POST, PUT, and PATCH requests, overriding cache control).
 * @returns A Promise that resolves to the JSON response from the API endpoint, or an error object if the request fails.
 */
export async function fetchGitHub(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" = "GET",
  pathToRevalidate?: string,
  options: RequestInit = {}
) {
  try {
    // 🔒 Get the encrypted JWT
    const token = await getToken();

    // Add Authorization header
    const defaultOptions: RequestInit = {
      cache: "no-store", // Default cache option
      method,
      headers: new Headers({
        Authorization: `Bearer ${token.accessToken}`, // Set the Authorization header with the token
        Accept: "application/vnd.github.v3+json", // Optional: specify GitHub API version
      }),
    };

    const mergedOptions: RequestInit = {
      ...defaultOptions,
      ...options, // Merge the provided options, allowing cache to be overridden
    };
    const response = await fetch(
      `${process.env.API_URL}${endpoint}`,
      mergedOptions
    );
    if (!response.ok) {
      const res = await response.json();

      // Handle API errors, if any
      if ("message" in res) return { error: res.message };

      // Handle HTTP errors, e.g., response.status is not in the 200-299 range
      return { error: `HTTP error! Status: ${response.status}` };
    }

    const data = await response.json();

    if (pathToRevalidate) revalidatePath(pathToRevalidate);

    return data;
  } catch (error: unknown) {
    // Handle any errors, including network issues
    if (error instanceof Error) {
      // eslint-disable-next-line no-console
      console.error(`An error occurred while fetching ${endpoint}:`, error);
      return {
        // eslint-disable-next-line no-console
        error: `An error occurred while fetching ${endpoint}: ${error.message}`,
      };
    } else {
      // eslint-disable-next-line no-console
      console.error(`An unknown error occurred while fetching ${endpoint}`);
      return {
        error: `An unknown error occurred while fetching ${endpoint}`,
      };
    }
  }
}
