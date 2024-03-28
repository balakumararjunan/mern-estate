import { apiRequest } from ".";

export const BACKEND_URL = "http://localhost:5000";

export const RegisterUser = async (payload) => {
  return await apiRequest({
    method: "post",
    endPoint: `${BACKEND_URL}/api/auth/signup`,
    payload,
  });
};