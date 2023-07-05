import axios from "axios";

export const fetchUser = async (userId) => {
  try {
    const userRes = await axios.get(`/api/users/${userId}`);
    const user = userRes.data;

    return user;
  } catch (err) {
    return (err);
  }
}