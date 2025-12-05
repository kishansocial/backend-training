

module.exports = ({ userRepo, passwordUtil }) => {
  return async function loginUser({ username, password }) {
    console.log("Login");
    const user = await userRepo.findByUsername(username);
    if (!user) throw new Error("Invalid credentials");

    const match = await passwordUtil.compare(password, user.password);
    if (!match) throw new Error("Invalid credentials");


    return { Message: "Login Succesfully", user };
  };
};
