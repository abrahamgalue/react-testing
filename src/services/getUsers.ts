export const getUsers = async () => {
  // Mock API call
  return [
    { id: "1", username: "admin", role: "superadmin" },
    { id: "2", username: "viewer", role: "visualizer" },
  ];
};

export const createUser = async (user: {
  username: string;
  password: string;
  role: string;
}) => {
  // Mock API call
  return { id: String(Math.random()), ...user };
};

export const deleteUser = async (userId: string) => {
  // Mock API call
  return;
};
