const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autoIncrement = require("mongoose-auto-increment");

autoIncrement.initialize(mongoose.connection);

const contentSchema = new Schema({
  num: Number,
  id: String,
  title: String,
  content: String,
});

contentSchema.plugin(autoIncrement.plugin, {
  model: "content",
  field: "num",
  startAt: 1,
  increment: 1,
});

module.exports = mongoose.model("content", contentSchema);
