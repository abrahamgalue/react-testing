import { API_URL } from './contants';
const path = "/auth/";

export const getAuth = async (email: string, password: string) => {
  try {
    const response = await fetch(
      `${API_URL}${path}?email=${email}&password=${password}`
    );
    const data = await response.json();
    if(data?.length === 0) {
        throw new Error("Invalid username or password");
    }
    return data?.[0];
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};
