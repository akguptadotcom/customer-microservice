const leadModel = require('../models/lead')
const loginModel = require('../models/login')

const {PubSub} = require('@google-cloud/pubsub');
const projectId = "striped-graph-299014";
const keyFilename = "E:\\My First Project-09112224e732.json";
const pubSubClient = new PubSub({
    projectId,
    keyFilename
});
//console.log(pubSubClient);
async function publishMessage(topicName, data) {
    const dataBuffer = Buffer.from(data);
    console.log(data);
    try {
        const messageId = await pubSubClient.topic("projects/glass-turbine-295505/topics/NEW_USER").publish(dataBuffer);
        console.log(`Message ${messageId} published.`);
    } catch (error) {
        console.error(`Received error while publishing: ${error.message}`);
        process.exitCode = 1;
    }
}
module.exports = {
    aiSaveBasicInfo: async (parent, args) => {
        try {
            let data = JSON.parse(args.userInput.payload)
            if(!data.stage) {return {status: 400, message: "Stage error"}} 
            let result
            if (data.applicationId) {
                switch (data.stage) {
                    case 'personalInsured':
                        result = leadModel.updateDetails(data)
                        if (result.status == 200)
                            return {
                                status: result.status,
                                message: 'updated successfully'
                            }
                        else if (result.status == 400)
                            return {
                                status: result.status,
                                message: 'not updated successfully'
                            }
                    case 'currentlyInsured':
                        console.log(data)
                        result = await leadModel.updateDetails(data)
                        if (result.status == 200)
                            return {
                                status: result.status,
                                message: 'updated successfully',
                                data: result.data
                            }

                    case 'vehicleSection':
                        result = await leadModel.updateInsureds(data)
                        if (result.status == 200)
                            return {
                                status: result.status,
                                message: 'updated successfully',

                            }
                        else
                            return {
                                status: result.status,
                                message: 'updated successfully',

                            }
                    case 'driverSection':
                        result = await leadModel.updateInsureds(data)
                        console.log(result)
                        if (result.status == 200)
                            return {
                                status: result.status,
                                message: 'updated successfully'

                            }
                        else
                            return {
                                status: result.status,
                                message: 'updated successfully',

                            }
                    case 'mobileSection':
                        let mobile = data.mobile
                        let loginResult = await loginModel.findMobile(data)

                        if (loginResult.status == 200) {
                            let updateResponse = await leadModel.updateDetails({
                                customerId: loginResult.userId,
                                mobile: data.mobile
                            })
                            let updatePrimaryDetails = loginModel.updateDetails(updateResponse)

                            await publishMessage("NEW_USER", JSON.stringify(updateResponse))
                        } else if (loginResult.status == 210) {
                            return {
                                message: loginResult.message,
                                status: loginResult.status
                            }
                        } else
                            return {
                                message: 'user can not be regitered',
                                status: 400
                            }
                    case 'userApprovalSection':
                        if (data.userApproval == false) {
                            let leadDetails = await leadModel.getDetails(data)
                            if (leadDetails)
                                await publishMessage(TOPIC_NAME, JSON.stringify(leadDetails))
                            else
                                return {
                                    message: 'user not found',
                                    status: 400
                                }
                        } else if (data.userApproval == true) {
                            let leadDetails = await leadModel.getDetails(data)
                            let details = await loginModel.findMobile(leadDetails)
                            details.userData._id = data.applicationId
                            let updatedDetails = await leadModel.updateDetails(details)
                            await publishMessage("NEW_USER", JSON.stringify(updatedDetails))
                            return {
                                message: "new user created",
                                status: 200
                            }
                        }
                }

            } else {
                switch (data.stage) {
                    case 'personalInsured':
                        result = await leadModel.saveDetails(data)
                        if (result.status == 200)
                            return {
                                status: result.status,
                                message: 'saved successfully'
                            }
                        else if (result.status == 400)
                            return {
                                status: result.status,
                                message: 'not saved successfully'
                            }
                    default:
                        return { status: 400, message: 'Stage or ApplicationId does not exist' }
                }
            }

        } catch (error) {
            console.log(error);
            return { status: 500, message: 'Technical issue' }
        }
    }
}