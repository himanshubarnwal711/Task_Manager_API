const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL);

// const User = mongoose.model("User", {
//     name: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       trim: true,
//       lowercase: true,
//       validate(value) {
//         if (!validator.isEmail(value)) {
//           throw new Error("Email is invalid.");
//         }
//       },
//     },
//     password: {
//       type: String,
//       required: true,
//       trim: true,
//       minLength: 7,
//       validate(value) {
//         if (value.toLowerCase().includes("password")) {
//           throw new Error("Passowrd cannot be same as 'password'.");
//         }
//         if (value.length < 6) {
//           throw new Error("Password must be greater than 6 characters.");
//         }
//       },
//     },
//     age: {
//       type: Number,
//       default: 12,
//       validate(value) {
//         if (value < 0) {
//           throw new Error("Age must be a positive number!");
//         }
//       },
//     },
//   });

// const Tasks = mongoose.model("Tasks", {
//   description: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   completed: {
//     type: Boolean,
//     default: false,
//   },
// });

// const me = new User({
//   name: "Sushma",
//   email: "pagli@baklol.com",
//   password: "lalluuiuy@23",
//   age: 104,
// });

// me.save()
//   .then(() => {
//     console.log(me);
//   })
//   .catch((error) => {
//     console.log("Error!", error);
//   });

// const task1 = new Tasks({
//   description: "Status report meeting till 11 AM.",
//   completed: false,
// });

// task1
//   .save()
//   .then(() => {
//     console.log(task1);
//   })
//   .catch((error) => {
//     console.log("Error!", error);
//   });
