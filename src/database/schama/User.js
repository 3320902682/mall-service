const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//创建用户Schema
const userSchema = new Schema({
  UserId: Schema.Types.ObjectId,
  userName: { unique: true, type: String },
  password: String,
  createAt: { type: Date, default: Date.now() },
  lastLoginAt: { type: Date, default: Date.now() }
});

//发布模型
mongoose.model('User', userSchema);