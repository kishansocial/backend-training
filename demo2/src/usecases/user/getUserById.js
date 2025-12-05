module.exports = ({ userRepo }) => {
  return async function getUserById(id) {
    return await userRepo.findById(id);
  };
};
