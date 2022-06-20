export type User = {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
};

export type NewUser = Omit<User, 'id'>;

export type Users = User[];
