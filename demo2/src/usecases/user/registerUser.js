module.exports = ({ userRepo, passwordUtil }) => {
  return async function registerUser(userData) {
    const exists = await userRepo.findByUsername(userData.username);
    if (exists) throw new Error("User already exists");

    const hashed = await passwordUtil.hash(userData.password);
    userData.password = hashed;
    // console.log("hiiiiii");
    return await userRepo.createUser(userData);
  };
};
