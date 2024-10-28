import { jwtDecode } from "jwt-decode";

interface CustomJwtPayload {
  id: string;
  role: string;
  iat: number;
  exp: number;
}

export const getDecodedToken = (): CustomJwtPayload | null => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("Token not found in localStorage");
    return null;
  }

  try {
    const decodedToken = jwtDecode<CustomJwtPayload>(token);
    return decodedToken;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};
