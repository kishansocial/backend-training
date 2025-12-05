const {
  registerUserUC,
  loginUserUC,
  getUserByIdUC,
  updatePasswordUC,
  updateProfileUC,
  softDeleteUserUC,
} = require("../usecases");

module.exports = {
  register: async (req, res) => {
    try {
      const body = req.body;

      const data = {
        username: body.username,
        password: body.password,
        address1: body.address1 || "",
        address2: body.address2 || "",
        phone_number: body.phone_number || "",
        created_at: body.created_at ? new Date(body.created_at) : new Date(),
        is_deleted: body.is_deleted ?? false,
        deleted_by: body.deleted_by || null,
        deleted_at: body.deleted_at ? new Date(body.deleted_at) : null,
        is_admin: body.is_admin ?? false,
        updated_at: body.updated_at ? new Date(body.updated_at) : new Date(),
      };

      const user = await registerUserUC(data);
      res.json(user);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  login: async (req, res) => {
    try {
      // console.log("hii login");
      // res.json({ sdad: "Asdas" });
      const result = await loginUserUC(req.body);
      res.cookie("userId", result.user.id, {
        httpOnly: true,
        maxAge: 10 * 60 * 1000, // 10 minutes in ms
      });
      res.json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  getById: async (req, res) => {
    const user = await getUserByIdUC(req.params.id);

    if (!user) {
      return res.status(400).json({ error: "Not valid ID" });
    }
    res.json(user);
  },

  updatePassword: async (req, res) => {
    const user = await getUserByIdUC(req.params.id);

    if (!user) {
      return res.status(400).json({ error: "Not valid ID" });
    }

    await updatePasswordUC(req.params.id, req.body.password);
    res.json({ message: "Password updated" });
  },

  updateProfile: async (req, res) => {
    const user = await getUserByIdUC(req.params.id);

    if (!user) {
      return res.status(400).json({ error: "Not valid ID" });
    }
    const body = req.body;
    const data = {
      username: body.username || user.username,
      password: body.password || user.password,
      address1: body.address1 || user.address1,
      address2: body.address2 || user.address2,
      phone_number: body.phone_number || user.phone_number,

      created_at: body.created_at
        ? new Date(body.created_at)
        : user.created_at || new Date(),

      is_deleted: body.is_deleted ?? user.is_deleted,

      deleted_by: body.deleted_by || user.deleted_by,

      deleted_at: body.deleted_at ? new Date(body.deleted_at) : user.deleted_at,

      is_admin: body.is_admin ?? user.is_admin,

      updated_at: new Date(),
    };

    await updateProfileUC(req.params.id, data);
    res.json({ message: "Profile updated" });
  },

  softDelete: async (req, res) => {
    const user = await getUserByIdUC(req.params.id);

    if (!user) {
      return res.status(400).json({ error: "Not valid ID" });
    }
    const deletedBy = req.cookies.userId || null;

    const deletedAt = new Date();

    await softDeleteUserUC(req.params.id, deletedBy, deletedAt);
    res.json({ message: "User soft deleted" });
  },
};
