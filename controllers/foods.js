import foodModel from '../models/food.js'


//[GET] Get All Foods
export const getFoods = (req, res, next) => {
    foodModel.findAll()
        .then(foodList => {
            res.status(200).json({
                message: "Get all food",
                foodData: foodList
            })
        })
        .catch(error => {
            res.status(500).json("No data");
        })
}

//[GET] Get Food By ID
export const getFoodByID = (req, res, next) => {
  const foodId = req.params.foodId;
  foodModel.findByPk(foodId)
      .then(food => {
        if(!food){
          res.status(200).json({
            status: false,
            message: "Can't find food",
          })
        }else{
          res.status(200).json({
              status: true,
              message: "Found the food",
              foodData: food
          })
        }
      })
      .catch(error => {
          res.status(500).json("No data");
      })
}

//[POST] Create A Food
export const createFoods = (req, res, next) => {
    const _title = req.body.title;
    const _desc = req.body.desc;
    const _img = req.body.img;
    const _price = req.body.price;
 
    const _food = new foodModel({
      title: _title,
      desc: _desc,
      img: _img,
      price: _price,
    });
 
    _food
      .save()
      .then((result) => {
        res.status(200).json({
          status: true,
          message: "Food has been created",
          data: _food,
        });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
}

// [POST] Update Food
export const updateFood = (req, res, next) => { 
  const _id = req.body.id;
  const _title = req.body.title;
  const _desc = req.body.desc;
  const _img = req.body.img;
  const _price = req.body.price;

  const _food = new Object({
      id: _id,
      title: _title,
      desc: _desc,
      img: _img,
      price: _price,
  });

  foodModel.findByPk(_id)
      .then(food => {
        if(!food){
          res.status(200).json({
            status: false,
            message: "Can't find food, can't update",
          })
        }else{
          foodModel
            .update(_food, {
              where: {id:_food.id}
            })
            .then((result) => {
              res.status(200).json({
                  status: true,
                  message: "Updated food successfully",
                  foodData: _food
              })
            });
        }
      })
      .catch(error => {
          res.status(500).json("No data");
      })
}

// [GET] Delete Food
export const deleteFood = (req, res, next) => {
  const foodId = req.params.foodId;
  foodModel.findByPk(foodId)
      .then(food => {
        if(!food){
          res.status(200).json({
            status: false,
            message: "Can't find food, Can't delete food",
          })
        }else{
          foodModel
            .destroy({
              where: {id: foodId}
            })
            .then((result) => {
              res.status(200).json({
                  status: true,
                  message: "Deleted food successfully",
              })
            });

        }
      })
      .catch(error => {
          res.status(500).json("No data");
      })
}





