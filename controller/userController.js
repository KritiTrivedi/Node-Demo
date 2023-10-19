const User = require("../models/user");
const jwt = require('jsonwebtoken');
const getAll = async(req,res) =>{
    const users = await User.find();
    res.status(200).json({users})
}
 
const createRecord = async(req,res)=>{
    console.log('OUTPUT : post call',);
    let token;
    const existingUser = await User.findOne({email:req.body.email})
    if(existingUser){
        return res.status(500).json({message:"User Already Exists"})
    }
    const newUser = new User({
        name : req.body.name,
        password : req.body.password,
        email : req.body.email
      });
      try{
        token = jwt.sign(
            {UserId: existingUser.id,email:existingUser.email },
            "secretkeyappearshere",
            {expiresIn: "1h" }
        );
      }catch(error){
        console.log('ERROR: ',error);
      }
    await newUser.save()
    res.status(200).json({success: true,data:{ UserId: existingUser.id,
        email: existingUser.email,
        token: token,
    },
    });
}
    const createRecords= ("/signup", async (req, res, next) => {
        const { name, email, password } = req.body;
        const newUser = User({
          name,
          email,
          password,
        });
       
        try {
          await newUser.save();
        } catch {
          const error = new Error("Error! Something went wrong.");
          return next(error);
        }
        let token;
        try {
          token = jwt.sign(
            { userId: newUser.id, email: newUser.email },
            "secretkeyappearshere",
            { expiresIn: "1h" }
          );
        } catch (err) {
          const error = new Error("Error! Something went wrong.");
          return next(error);
        }
        res
          .status(201)
          .json({
            success: true,
            data: { userId: newUser.id,
                email: newUser.email, token: token },
          });
      });


const updateRecord = async(req,res)=>{
            const existingUser = await User.findById({_id:req.params.id})
            console.log('OUTPUT :',existingUser);
              existingUser.name=req.body.name;
                await existingUser.save();
                res.status(201).json(existingUser); 
}

const deleteRecord = async(req,res)=>{

    try{
        console.log('OUTPUT : deleteRecords Call');
        await User.findByIdAndDelete({_id:req.params.id});
        res.status(200).json({message:"User Deleted"})
    }catch(error){
        res.status(500).send(error);
    }

}
module.exports = {getAll,createRecord,createRecords,updateRecord,deleteRecord}
