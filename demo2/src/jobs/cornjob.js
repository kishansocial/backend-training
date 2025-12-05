const cron = require("node-cron");
const { allSoftUsers, deleteSoftUsers } = require("../data/user");

const cronjob = cron.schedule("*/30 * * * *", async () => {
  console.log("⏳ Running User Cleanup Cron Job...");

  try {
    const softUsers = await allSoftUsers();

    if (softUsers.length === 0) {
      console.log("No soft-deleted users found.");
      return;
    }

    console.log(`Found ${softUsers.length} users to delete...`);

    await deleteSoftUsers();

    console.log("✅ Soft-deleted users removed successfully!");
  } catch (error) {
    console.error("❌ Cron Job Error:", error);
  }
});

module.exports = cronjob;
