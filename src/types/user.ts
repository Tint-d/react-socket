export type User = {
  friends: [];
  _id: string;
  username: string;
  email: string;
  role: string;
  __v: number;
};

export type UserResponse = {
  users: User[];
};

export type UserResponseById = {
  email: string;
  friends: [];
  role: string;
  username: string;
  __v: number;
  _id: string;
};
