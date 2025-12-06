const { createItemUC, getItemUC, updaetItemUC } = require("../usecases");

exports.createItem = async (req, res) => {
  try {
    const userId = req.userId;
    req.body.createdAt = new Date(Date.now() + 5.5 * 60 * 60 * 1000)
      .toISOString()
      .replace(".000Z", "+05:30");
    req.body.updatedAt = new Date(Date.now() + 5.5 * 60 * 60 * 1000)
      .toISOString()
      .replace(".000Z", "+05:30");
    // console.log("ittt");
    // console.log(req.body);
    const item = await createItemUC(req.body, userId);
    res.status(201).json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getItem = async (req, res) => {
  try {
    const item = await getItemUC(req.params.item_code);
    res.status(200).json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const userId = req.userId;
    const item = await updaetItemUC(req.params.item_code, req.body, userId);
    res.status(201).json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
