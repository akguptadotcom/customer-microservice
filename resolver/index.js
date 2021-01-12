const lileadResolver = require("./liLeads"); 
const aiLeadResolver = require("./AiLeads");
const rootResolver = {
    ...lileadResolver,
    ...aiLeadResolver
};

module.exports = rootResolver;