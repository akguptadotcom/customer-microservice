const Leads = require("../models/lead");
const mongoose = require('../config/db');
const { getArcId,getQuote } = require("../affigee/affigee");

module.exports = {
    LIStepOne: async( parent , { input }, context) => {
        console.log(parent, input, context.queryParams);
        // console.log(firstName, lastName, address, unit);
        try{
            let arcid = await getArcId();
            let result = {};
            let data = {
                arcId:arcid,
                firstName:input.firstName,
                lastName:input.lastName,
                address:input.address,
                unit:input.unit
            }
            if(input.customerId) {
               result = await Leads.findByIdAndUpdate(input.customerId, {$set:{basic_detils:data}}, {new:true});
            } else {
                // data._id = new mongoose.Types.ObjectId
                let leads = new Leads({_id: new mongoose.Types.ObjectId, basic_detils:data});
                result = await leads.save();
            }
          
           
            return result;
        } catch (error) {
            throw new Error (error.message);
        }
    },

    LIStepTwo: async( parent , { input }, context) => {
        try{
            result = await Leads.findByIdAndUpdate(input.customerId, {$set: {"basic_detils.dob":input.dob, "basic_detils.gender":input.gender}}, {new:true});
            return result;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    LIStepThree: async( parent , { input }, context) => {
        try{
            let result = await Leads.findByIdAndUpdate(input.customerId,{$set: {"basic_detils.height.heightFeet":input.height.heightFeet,"basic_detils.height.heightInch":input.height.heightInch,"basic_detils.weight":input.weight,"basic_detils.tobaccoUse":input.tobaccoUse,"basic_detils.annual_income":input.annual_income}},{new:true, upsert: true})
            return result
        } catch (error) {
            throw new Error(error.message);
        }
    },
    // LIGetQuotes: async( parent , { input }, context) => {
    //     try{

    //     } catch (error) {

    //     }
    // }
}
