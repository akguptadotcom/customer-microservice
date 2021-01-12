const { gql } = require('apollo-server-express');

const schema = gql`
type LIAddress {
    address_line_1:String
    address_line_2:String
    city:String
    state:String
    zip:String
    country:String
  }
  
  type LIHeight {
    heightFeet: String
    heightInch: String
  }
  
  input LIAddressInpupt {
    address_line_1:String!
    address_line_2:String
    city:String!
    state:String!
    zip:String!
    country:String!
  }
  
  input LIHeightInput {
      heightFeet:String!
      heightInch:String!
  }
  
  type LIBasicDetails {
      arcId:String
      distributorId:String
      productId:String
      firstName:String
      middleName:String
      lastName:String
      address:LIAddress
      unit:String
      coverage: String
      agentId: String
      term: String
      protecting_relation: String
      dob: String
      gender: String
      height: LIHeight
      annual_income:String
      ssn: String
      email: String
      weight:String
  }
  
  type LILead {
    _id:ID!
    basic_detils:LIBasicDetails
  }
  
  input LIStepOneInput {
    customerId:ID
    firstName:String!
    middleName:String
    lastName:String!
    address:LIAddressInpupt
    unit:String
  }
  
  input LIStepTwoInput {
    customerId:ID!
    arcId:String!
    dob: String!
    gender: String!
  }
  
  input LIStepThreeInput {
    customerId:ID!
    arcId:String!
    height: LIHeightInput,
    weight:String!
    tobaccoUse:Int!
    annual_income:Float!
  }
type RegisteredOwners{
    surname: String
    givenName: String
    suffix: String
    businessName: String
    entityType: String
    ownerType: String
    person: Boolean
}
type Details{
    firstName: String
    middleName: String
    lastName: String
    dateOfBirth: String
    gender: String
    maritalStatus: String
    memberCode: String
    verificationDate: String
    confidence: String
    description: String
    year: String
    make: String
    model: String
    type: String
    vin: String
    color: String
    trim: String
    registeredState: String
    expirationDate: String
    plateType: String
    leaseIndicator: Boolean
    brandedTitleIndicator: Boolean
    price: String
    manufacturerBasePrice: String
    driveSystem: String
    vinChangeIndicator: String
    bodyStyle: String
    transactionDate: String
    plateNumber: String
    brandedTitleCode: String
    weight: String
    registeredOwners:[RegisteredOwners]
}
type InsuredData{
   _id: String
   insureType: String
   details: Details
   isExcludedFromQuote: Boolean
}
type UserOutput{
status: Int
message: String
data: [InsuredData]
}

input UserInput{
    payload: String!
}

type Message{
    message: String
}

type Mutation{
    aiSaveBasicInfo(userInput: UserInput): UserOutput
    LIStepOne(input:LIStepOneInput): LILead
    LIStepTwo(input:LIStepTwoInput): LILead
    LIStepThree(input:LIStepThreeInput): LILead
}

type Query{
    sayHi:String!
    LIlead(customerId:ID!):LILead
}


`
module.exports = schema 