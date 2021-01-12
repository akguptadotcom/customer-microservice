 const mongoose = require('../config/db')
 const apiData = require('../testData')
 const Schema = mongoose.Schema
 const InsuredDetails = new Schema({
     isSelected: {
         type: Boolean
     },
     firstName: {
         type: String
     },
     lastName: {
         type: String
     },
     middleName: {
         type: String
     },
     dateOfBirth: {
         type: String
     },
     gender: {
         type: String
     },
     maritalStatus: {
         type: String
     },
     isEmployed: {
         type: Boolean
     },
     occupationId: {
         type: String
     },
     homeownerStatus: {
         type: String
     },
     ageFirstLicensed: {
         type: String
     },
     creditScore: {
         type: String
     },
     yearsCurrentlyInsured: {
         type: String
     },
     yearsWithCurrentInsurer: {
         type: String
     },
     relationshipToApplicant: {
         type: String
     },
     licenseNo: {
         type: String
     },
     licenseState: {
         type: String
     },
     isExcludedFromQuote: {
         type: !String
     },
     memberCode: {
         type: String
     },
     verificationDate: {
         type: String
     },
     vin: {
         type: String
     },
     year: {
         type: String
     },
     confidence: {
         type: Number
     },
     description: {
         type: String
     },
     vin: {
         type: String
     },
     make: {
         type: String
     },
     model: {
         type: String
     },
     year: {
         type: String
     },
     color: {
         type: String
     },
     trim: {
         type: String
     },
     registeredState: {
         type: String
     },
     expirationDate: {
         type: String
     },
     plateType: {
         type: String
     },
     leaseIndicator: {
         type: Boolean
     },
     brandedTitleIndicator: {
         type: Boolean
     },
     price: {
         type: String
     },
     manufacturerBasePrice: {
         type: String
     },
     driveSystem: {
         type: String
     },
     registeredOwners: [{
         surname: {
             type: String,
             required: false,
             default: null
         },
         givenName: {
             type: String,
             required: false,
             default: null
         },
         suffix: {
             type: String,
             required: false,
             default: null
         },
         businessName: {
             type: String,
             required: false,
             default: null
         },
         entityType: {
             type: String,
             required: false,
             default: null
         },
         ownerType: {
             type: String,
             required: false,
             default: null
         },
         person: {
             type: Boolean,
             required: false,
             default: null
         }
     }],
     vinChangeIndicator: {
         type: String
     },
     bodyStyle: {
         type: String
     },
     transactionDate: {
         type: String
     },
     plateNumber: {
         type: String
     },
     brandedTitleCode: {
         type: String
     },
     // addressLine1: { type: String },
     // city: { type: String },
     // state: { type: String },
     // zipCode: { type: String },
     // addressType: { type: String },
     weight: {
         type: String
     },
     type: {
         type: String
     },
     newOrUsed: {
         type: String
     },
     //ticketViolation: [ticketViolation],
     //accidentClaim: [accidentClaim]
 }, {
     _id: false
 }, {
     strict: false
 })


 const Insureds = new Schema({
     insureType: {
         type: String,
     },
     details: InsuredDetails,
     isExcludedFromQuote: {
         type: Boolean
     }
 }, {
     strict: false
 })

 const BasicDetails = new Schema({
    arcId: {type:String},
    distributorId:{type:String},
    productId: {type:String},
    firstName: {type:String},
    middleName: {type:String},
    lastName: {type:String},
    unit:{type:String},
    address:{
        address_line_1:{type:String},
        address_line_2:{type:String},
        city:{type:String},
        state:{type:String},
        zip:{type:String},
        country:{type:String},
    },
    coverage: {type:String},
    agentId: {type:String},
    term: {type:String},
    protecting_relation: {type:String},
    dob: {type:String},
    gender: {type:String, enum:["Male", "Female", "Transgender"]},
    height: {
                heightFeet:{type:String}, 
                heightInch:{type:String}
            },
    weight: {type:String},
    tobaccoUse:{type:Number},
    annual_income:{type:String},
    ssn: {type:String},
    email: {type:String},
    coverage:{type:Number}
}, {_id:false});

 ////////////           MAIN SCHEMA        ////////////
 const LeadSchema = new Schema({
     stage: {
         type: String
     },
     typeOfInsurance: {
         type: String,
         required: false,
         default: null
     },
     firstName: {
         type: String,
         required: false,
         default: null
     },
     lastName: {
         type: String,
         required: false,
         default: null
     },
     addressLine1: {
         type: String,
         required: false,
         default: null
     },
     city: {
         type: String,
         required: false,
         default: null
     },
     state: {
         type: String,
         required: false,
         default: null
     },
     zipCode: {
         type: String,
         required: false,
         default: null
     },
     addressType: {
         type: String,
         required: false,
         default: null
     },
     unit: {
         type: String,
         required: false,
         default: null
     },
     birthday: {
         type: String,
         required: false,
         default: null
     },
     currentlyInsured: {
         type: String,
         required: false,
         default: null
     },
     email: {
         type: String,
         required: false,
         default: null
     },
     phone: {
         type: String,
         required: false,
         default: null
     },
     insureds: [Insureds],
     basic_detils:BasicDetails,
     insured_type: {type:String, enum:["lifeInsurance"], default:"lifeInsurance"}
 }, {
     timestamps: true
 }, {
     strict: false
 })


 let leadSchemaModel = mongoose.model('Lead', LeadSchema);

leadSchemaModel.getDetails = async (data) =>{
    let result = await leadSchemaModel.findById(data.applicationId)
    if(result)
      return {message:result,status:200}
    else
      return {message:'data not found',status:400}
    
}


 leadSchemaModel.saveDetails = async (data) => {
     let savedGeneralData = new leadSchemaModel(data)
     let result = await savedGeneralData.save()
     console.log(result)
     if (result)
         return {
             status: 200,
             message: result._id
         }
     else
         return {
             status: 400,
             message: "Data not found"
         }
 }

 leadSchemaModel.updateDetails = async (data) => {
     let result
     result = await leadSchemaModel.findOneAndUpdate({
         _id: data.applicationId
     }, data, {
         new: true,
         upsert: true
     })
     //console.log(doc)
     if (data.stage == 'currentlyInsured') { // api hit
         const demoData = apiData
         const drivers = demoData.drivers
         const vehicles = demoData.vehicles
         const vehiclesEnhanced = demoData.vehiclesEnhanced
         let insureds = await leadSchemaModel.findById(data.applicationId);
         insureds.insureds = []
         drivers.forEach((element, index) => {
             insureds.insureds.push({
                 insureType: 'driver',
                 details: element,
                 isExcludedFromQuote: false
             });
         })
         vehicles.forEach((element, index) => {
             insureds.insureds.push({
                 insureType: 'vehicle',
                 details: element,
                 isExcludedFromQuote: false
             })
         })
         if (vehiclesEnhanced.length != 0) {
             vehiclesEnhanced.forEach((element, index) => {
                 insureds.insureds.push({
                     insureType: 'vehicle',
                     details: element,
                     isExcludedFromQuote: false
                 })
             })
         }
         result = await insureds.save()


         console.log(result)
     }
     if (result) {
         return {
             status: 200,
             data: result.insureds
         }
     }

 }

 leadSchemaModel.updateInsureds = async (data) => {
     let response;
     await leadSchemaModel.findOne({
             "_id": data.applicationId
         })
         .sort({
             createdAt: -1
         }).limit(1)
         .populate('insureds')
         //.exec()
         .then(async result => {
             let insuredListUpdate = data.insuredInfo;
             result.stage = data.stage?data.stage:result.stage;
             insuredListUpdate.forEach((element, index) => {
                 let insureds = result.insureds.id({
                     "_id": element.insuredId
                 });
                 if(insureds){
                    insureds.set(element.dataToUpdate);
                 }else{
                    result.insureds.push(element.dataToUpdate);
                 }
             })
             response =await result.save();
         })
    if(response){     
        return {status : 200};
    }else{
        return {status : 400};
    }
 }



 





 module.exports = leadSchemaModel;