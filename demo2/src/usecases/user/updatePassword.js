module.exports = ({ userRepo, passwordUtil }) => {
  return async function updatePassword(id, newPassword) {
    const hashed = await passwordUtil.hash(newPassword);
    await userRepo.updatePassword(id, hashed);
  };
};
