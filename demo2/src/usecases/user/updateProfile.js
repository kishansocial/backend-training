module.exports = ({ userRepo }) => {
  return async function updateProfile(id, data) {
    await userRepo.updateProfile(id, data);
  };
};
