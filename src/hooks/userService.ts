interface User {
  email: string;
  password: string;
  displayName: string;
}

export const findUserByEmail = (email: string): User | undefined => {
  const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
  console.log("Users found:", users);
  return users.find((user) => user.email === email);
};

export const saveUser = (user: User): void => {
  const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
  console.log("Users found before saving:", users);
  const existingUserIndex = users.findIndex((u) => u.email === user.email);
  console.log("Saving user:", user, "Existing user index:", existingUserIndex);
  if (existingUserIndex >= 0) {
    users[existingUserIndex] = user;
  } else {
    users.push(user);
  }
  localStorage.setItem("users", JSON.stringify(users));
  console.log(
    "Updated users list:",
    JSON.parse(localStorage.getItem("users") || "[]")
  );
};

// const users = JSON.parse(localStorage.getItem("users") || "[]");
// const uniqueUsers = Array.from(new Map(users.map(user => [user.email, user])).values());
// localStorage.setItem("users", JSON.stringify(uniqueUsers));

// console.log(JSON.parse(localStorage.getItem("users") || "[]"));  codigo para resetear user en console de navegador
