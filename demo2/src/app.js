const express = require("express");

const userRoutes = require("./routes/user");
const permissionModule = require("./routes/permissionModule");
const userPermissionRoutes = require("./routes/userPermission");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/users", userRoutes);
app.use("/permissionModules", permissionModule);
app.use("/userPermissions", userPermissionRoutes);

app.get("/", (req, res) => {
  res.send("Node + PostgreSQL API Running 🚀");
});

module.exports = app;
