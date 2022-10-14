import userModel from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'



//[GET] Get All Users
export const getUsers = (req, res, next) => {
  userModel
    .findAll()
    .then((userList) => {
      res.status(200).json({
        message: "Get all user",
        userData: userList,
      });
    })
    .catch((error) => {
      res.status(500).json("No data");
    });
};

//[GET] Get User By ID
export const getUserByID = (req, res, next) => {
  const userId = req.params.userId;
  userModel
    .findByPk(userId)
    .then((user) => {
      if (!user) {
        res.status(200).json({
          status: false,
          message: "Can't find user",
        });
      } else {
        res.status(200).json({
          status: true,
          message: "Found the user",
          userData: user,
        });
      }
    })
    .catch((error) => {
      res.status(500).json("No data");
    });
};

//[POST] Create An User
export const createUsers = (req, res, next) => {
  const _email = req.body.email;
  const _fullname = req.body.fullname;
  const _password = req.body.password;
  const _phone = req.body.phone;
  const _gender = req.body.gender;
  const _age = req.body.age;

  userModel
    .findOne({
      where: {email: _email}
    })
    .then(user => {
      if(user){
        return res.status(400).json({
          status: false,
          message: "Email Exist"
        })
      }
      return bcrypt.hash(_password, 12);
    })
    .then(hashedPassword => {
      const _user = new userModel({
        email: _email,
        fullname: _fullname,
        password: hashedPassword,
        phone: _phone,
        gender: _gender,
        age: _age,
      });
      return _user.save()
    })
    .then(user => {
      res.status(200).json({
        status: true,
        message: "Created User Successfully",
        userData: user
      })
    })
    .catch((error) => {
      res.status(404).json("No data");
    })
      

  // _user
  //   .save()
  //   .then((result) => {
  //     res.status(200).json({
  //       status: true,
  //       message: "User has been created",
  //       data: _user,
  //     });
  //   })
  //   .catch((err) => {
  //     res.status(500).json(err);
  //   });
};

// [POST] Update User
export const updateUser = (req, res, next) => {
  const _email = req.body.email;
  const _fullname = req.body.fullname;
  const _password = req.body.password;
  const _phone = req.body.phone;
  const _gender = req.body.gender;
  const _age = req.body.age;

  userModel
    .findOne({
      where: {email: _email}
    })
    .then(user => {
      if(!user){
        return res.status(400).json({
          status: false,
          message: "Email does not exist"
        })
      }
      return bcrypt.hash(_password, 12);
    })
    .then(hashedPassword => {
      const _user = new Object({
        email: _email,
        fullname: _fullname,
        password: hashedPassword,
        phone: _phone,
        gender: _gender,
        age: _age,
      });
      return userModel.update(_user, {where:{email:_user.email}})
    })
    .then(number => {
      if(number == 1){
        return res.status(200).json({
          status: true,
          message: "Update Successfully",
          userData: number
        })
      }else{
        return res.status(200).json({
          status: false,
          message: "Update Failed",
          userData: number
        })
      }
    })
    .catch((error) => {
      res.status(404).json("No data");
    })
};


// export const updateUser = (req, res, next) => {
//   const _id = req.body.id;
//   const _email = req.body.email;
//   const _fullname = req.body.fullname;
//   const _password = req.body.password;
//   const _phone = req.body.phone;
//   const _gender = req.body.gender;
//   const _age = req.body.age;

//   const _user = new Object({
//     id: _id,
//     email: _email,
//     fullname: _fullname,
//     password: _password,
//     phone: _phone,
//     gender: _gender,
//     age: _age,
//   });

//   userModel
//     .findByPk(_id)
//     .then((user) => {
//       if (!user) {
//         res.status(200).json({
//           status: false,
//           message: "Can't find user, can't update",
//         });
//       } else {
//         userModel
//           .update(_user, {
//             where: { id: _user.id },
//           })
//           .then((result) => {
//             res.status(200).json({
//               status: true,
//               message: "Updated user successfully",
//               userData: _user,
//             });
//           });
//       }
//     })
//     .catch((error) => {
//       res.status(500).json("No data");
//     });
// };


// [GET] Delete User
export const deleteUser = (req, res, next) => {
  const userId = req.params.userId;
  userModel.findByPk(userId)
      .then(user => {
        if(!user){
          res.status(200).json({
            status: false,
            message: "Can't find user, Can't delete user",
          })
        }else{
          userModel
            .destroy({
              where: {id: userId}
            })
            .then((result) => {
              res.status(200).json({
                  status: true,
                  message: "Deleted user successfully",
              })
            });
        }
      })
      .catch(error => {
          res.status(500).json("No data");
      })
}

// Check Login
export const checkLogin = (req, res, next) => {
  const _email = req.body.email;
  const _password = req.body.password;

  userModel
    .findOne({where: {email: _email}})
    .then(user => {
      if(!user){
        return res.status(200).json({
          status: false,
          message: "Email does not exits"
        })
      }
      return Promise.all([bcrypt.compare(_password, user.password), user]);
    })
    .then(result => {
      const isMatch = result[0];
      const user = result[1];
      if(!isMatch) {
        return res.status(200).json({
          status: false,
          message: "Password does not match"
        })
      }
      const payLoad = {
        email: user.email
      }
      return jwt.sign(payLoad, 'LOVEDXC', {expiresIn: 3600});
    })
    .then(token => {
      res.status(200).json({
        status: true,
        message: 'Login Successfully',
        token
      })
    })
    .catch(error => {
      return res.status(500).json("No data");
    })
}




// export const checkLogin = (req, res, next) => {

//   const _id = req.body.id;
//   const _email = req.body.email;
//   const _password = req.body.password;

//   userModel
//     .findByPk(_id)
//     .then((user) => {
//       if (!user) {
//         res.status(200).json({
//           status: false,
//           message: "Can't find UserName and Pasword",
//         });
//       } else {
//         if(user.password == _password){
//           res.status(200).json({
//             status: true,
//             message: "Login Successfully",
//             userLoginData: user
//           });
//         }else{
//           res.status(200).json({
//             status: false,
//             message: "Password does not exist",
//           })
//         }
//       }
//     })
//     .catch((error) => {
//       res.status(500).json("No data");
//     });
// }
