interface User {
  email: string;
  password: string;
  displayName: string;
}

export const findUserByEmail = (email: string): User | undefined => {
  const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
  return users.find((user) => user.email === email);
};

export const saveUser = (user: User): void => {
  const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
};
