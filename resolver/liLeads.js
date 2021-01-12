const Leads = require("../models/lead");

module.exports = {
    LIlead: async(_, {customerId}, req) => {
       try{
        
            let result = await Leads.findById(customerId);
            return result;
        } catch (error) {
            throw new Error (error.message);
        }
        
    }
}
