const mongoose = require('../config/db')
const Schema = mongoose.Schema

const loginDetails = new Schema({
    mobile: {
        type: String
    },
    email: {
        type: String
    }
}, {
    timestamps: true
})

const loginDetailsModel = mongoose.model('userLogin', loginDetails);

loginDetailsModel.findMobile = async(data)=>{
 const mobile = data.mobile

 let res = await loginDetailsModel.findOne({mobile:mobile})

 if(res)
 return {message:'mobile number already exits',status:210}
 else
 {  
    delete data.applicationId
    let result = await loginDetailsModel.save(data)
    return {messasge:'new user registered',status:200,userId:result._id,userData:result}
 }
}

loginDetailsModel.registerUser = async(data)=>{

}

loginDetailsModel.updateDetails = async(data)=>{
    delete data._id
    delete data.customerId
    await loginDetailsModel.findOneAndUpdate({
        firstName:data.firstName,
        lastName:data.lastName,
        address:data.address,
        dateOfBirth:data.dateOfBirth,
        email:data.email
    }, data, {
        new: true,
        upsert: true
    })
}

module.exports = loginDetailsModel
