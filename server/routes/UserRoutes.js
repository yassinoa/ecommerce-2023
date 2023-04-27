const express=require('express')
const User =require('../models/User.js')
// const Order=require('../models/Order.js')
const asyncHandler =require ('express-async-handler');
const jwt=require('jsonwebtoken')
const { protectRoute, admin } =require('../middleware/authMiddleware.js')
const userRoutes = express.Router();

//TODO: redefine expiresIn
const genToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, { expiresIn: '60d' });
};

const loginUser =asyncHandler( async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPasswords(password))) {
      const { password, ...otherDetails } = user._doc;
      res.json({
        ...otherDetails,
        token: genToken(user._id),
      });
    } else {
      res.status(401).send('Invalid Email or Password');
    }
    
  } catch (error) {
    res.status(500).send(error);
  }
});



// POST register user
const registerUser =asyncHandler( async (req, res) => {
  const { fullname, email, password,phone,address,city,postalCode } = req.body;

try {
  
      const userExists = await User.findOne({ email });
      if (userExists) {
        res.status(400).send('User is allready exist.');
        // res.status(401).json({ msg: "User is allready exist " });
        console.log("User is allready exist")
        return false;
      }
      
    console.log("create")
      const user = await User.create({
        fullname,
        email,
        password,phone,
        shippingAddress:{address,city,postalCode}
      });

      console.log(" END create")
      if (user) {
        const { password, ...otherDetails } = user._doc;

          // res.status(200).json(otherDetails);

        res.status(201).json({
          // _id: user._id,
          // fullname: user.fullname,
          // email: user.email,
          // userRole: user.userRole,
          ...otherDetails,
          token: genToken(user._id),
        });
          console.log("status 201")
      } else {
        res.status(400).send('We could not register you.');
      }
} catch (error) {
  res.status(500).send( error );
}
  });

// const updateUserProfile = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.params.id);

//   if (user) {
//     user.name = req.body.name || user.name;
//     user.email = req.body.email || user.email;
//     if (req.body.password) {
//       user.password = req.body.password;
//     }

//     const updatedUser = await user.save();

//     res.json({
//       _id: updatedUser._id,
//       name: updatedUser.name,
//       email: updatedUser.email,
//       isAdmin: updatedUser.isAdmin,
//       token: genToken(updatedUser._id),
//       createdAt: updatedUser.createdAt,
//     });
//   } else {
//     res.status(404);
//     throw new Error('User not found.');
//   }
// });

// const getUserOrders = asyncHandler(async (req, res) => {
//   const orders = await Order.find({ user: req.params.id });
//   if (orders) {
//     res.json(orders);
//   } else {
//     res.status(404);
//     throw new Error('No Orders found');
//   }
// });

// const getUsers = asyncHandler(async (req, res) => {
//   const users = await User.find({});
//   res.json(users);
// });

// const deleteUser = asyncHandler(async (req, res) => {
//   try {
//     const user = await User.findByIdAndRemove(req.params.id);
//     res.json(user);
//   } catch (error) {
//     res.status(404);
//     throw new Error('This user could not be found.');
//   }
// });

userRoutes.route('/login').post(loginUser);
userRoutes.route('/register').post(registerUser);
// userRoutes.route('/profile/:id').put(protectRoute, updateUserProfile);
// userRoutes.route('/:id').get(protectRoute, getUserOrders);
// userRoutes.route('/').get(protectRoute, admin, getUsers);
// userRoutes.route('/:id').delete(protectRoute, admin, deleteUser);

// export default userRoutes;
module.exports = userRoutes