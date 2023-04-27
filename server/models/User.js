const mongoose = require('mongoose')
const bcrypt=require('bcryptjs')

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    userRole: {
      type: String,
      roles: ["user", "admin"],
      default: "user"
    },
    phone:{
      type: String,
    },
    shippingAddress: {
      address: { type: String ,default: "" },
      city: { type: String,default: "" },
      postalCode: { type: String,default: "" }
    },

  },
  { timestamps: true }
);

userSchema.methods.matchPasswords = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    console.log("next")
    next();
  }
  console.log("salt password")
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports=mongoose.model('User', userSchema);

