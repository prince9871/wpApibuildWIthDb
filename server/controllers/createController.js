const dbModel = require('../models/db');

const dbCreate = async (req, res) => {
  try {
    const newDbModel = new dbModel();

    newDbModel.name = req.body.name;
    newDbModel.code = req.body.code;
    newDbModel.quantity = req.body.quantity;

    await newDbModel.save();

   return res.status(201).json({ message: 'New entry created successfully!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



const dbGet = async (req, res) => {
  try {
    const name = req.query.name; 
   let result =  await dbModel.findOne({name :name})
   console.log(result)
   return res.send({data:result})
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




module.exports={dbCreate,dbGet}