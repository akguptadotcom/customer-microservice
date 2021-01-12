const LileadMutation = require("./Lileads");
const AileadMutation = require("./AiLeads");

const rootResolver = {
    ...LileadMutation,
    ...AileadMutation
};

module.exports = rootResolver;