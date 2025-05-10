import { API_URL } from "./contants";
const path = "/orders/";

export const getOrders = async () => {
  try {
    const response = await fetch(`${API_URL}${path}`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};
