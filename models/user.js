const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        require:true
    },
    profileImage:{
        type:String,
    },
    email:{
        type:String,
    },
    phone:{
        type:String,
    },
    password:{
        type:String,
        require:true
    },
    address:{
        type:String,
    },   
},
{timestamps:true}
);

// to avoid returning password field in json responses (to avoid password return)
userSchema.methods.toJSON = function(){
    var obj = this.toObject();
    delete obj.password;
    return obj;
};

module.exports = mongoose.model("User",userSchema);