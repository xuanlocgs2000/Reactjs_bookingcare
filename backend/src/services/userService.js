import db from "../models/index";
import bcrypt from "bcryptjs";
var salt = bcrypt.genSaltSync(10);

let hashUserPasswords = (password) => {
  return new Promise(async (resolve, reject) => {
    // var bcrypt = require("bcryptjs");
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};
let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await checkUserEmail(email);
      if (isExist) {
        //user are already exist
        let user = await db.User.findOne({
          attributes: ["email", "roleId", "password"],
          where: { email: email },
          raw: true, //show data
          // attributes: {
          //   include: ["email", "roleId"], //lay ra truong mong muon
          //   //exclude:[]
          // },
        });
        if (user) {
          //compareUserPassword
          let check = bcrypt.compareSync(password, user.password); // true
          // let check = true;
          if (check) {
            userData.errCode = 0;
            userData.errMessage = "Ok";
            console.log(user);
            delete user.password;
            userData.user = user;
          } else {
            userData.errCode = 3;
            userData.errMessage = "Wrong password";
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = `user's not found`;
        }

        // resolve();
      } else {
        userData.errCode = 1;
        userData.errMessage = "email chua co tai khoan";
      }
      resolve(userData);
    } catch (e) {
      reject(e);
    }
  });
};

let checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: userEmail },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getAllUsers = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      if (userId === "ALL") {
        users = await db.User.findAll({
          attributes: {
            exclude: ["password"],
          },
        });
      }
      if (userId && userId !== "ALL") {
        users = await db.User.findOne({
          where: { id: userId },
          attributes: {
            exclude: ["password"],
          },
        });
      }
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};
let createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      //check email is exist?
      let check = await checkUserEmail(data.email);
      if (check === true) {
        resolve({
          errCode: 1,
          errMessage: "Tài khoản email đã đăng kí,bạn hãy chọn tài khoản khác",
        });
      } else {
        let hashPasswordFromBcrypt = await hashUserPasswords(data.password);
        await db.User.create({
          email: data.email,
          password: hashPasswordFromBcrypt,
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          phoneNumber: data.phoneNumber,
          gender: data.gender === "1" ? true : false,
          // image: data.image,
          roleId: data.roleId,
          // positionID: DataTypes.STRING,
        });
        resolve({
          errCode: 0,
          message: "Ok",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let deleteUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    let user = await db.User.findOne({
      where: { id: userId },
    });
    if (!user) {
      resolve({
        errCode: 2,
        errMessage: "Tài khoản không tồn tại!",
      });
    }
    await db.User.destroy({
      where: { id: userId }, //xao truc tiep tren db
    });
    // await user.destroy();
    // dung chi khi chuan hoa sequelize
    resolve({
      errCode: 0,
      errMessage: "Người dùng đã bị xoá!",
    });
  });
};
let updateUserData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          message: "Missing require parameters",
        });
      }
      let user = await db.User.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (user) {
        (user.firstName = data.firstName),
          (user.lastName = data.lastName),
          (user.address = data.address),
          await user.save();
        // await db.User.save({
        //   firstName: data.firstName,
        //   lastName: data.lastName,
        //   address: data.address,
        // });
        // await user.save();

        resolve({
          errCode: 0,
          message: "Update successfull",
        });
      } else {
        resolve({
          errCode: 1,
          message: "User's not found to update",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  handleUserLogin: handleUserLogin,
  getAllUsers: getAllUsers,
  createNewUser: createNewUser,
  deleteUser: deleteUser,
  updateUserData: updateUserData,
};
