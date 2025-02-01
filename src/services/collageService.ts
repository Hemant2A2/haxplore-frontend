import api from "../utils/api";

export const createRoom = async (name: string) => {
  const response = await api.post("/rooms/create", { name });
  return response.data;
};

export const getMyRooms = async () => {
  const response = await api.get("/rooms/my");
  return response.data;
};

export const joinRoom = async (inviteCode: string) => {
  const response = await api.post("/rooms/join", { inviteCode });
  return response.data;
};
