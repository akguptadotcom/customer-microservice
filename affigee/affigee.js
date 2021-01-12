const axios = require("axios");
const mongoose = require("mongoose");
// const Affigee = require("../models/Affigees");

const getRedirectURL = async () => {
    try{
        // const affigeeConfig = await Affigee.findOne().sort({created_at: -1}).exec();
        // console.log("affigeeConfig", response.data.data)
        /**
         * In future we will replace this with the Vault URL
         */
        
        let affigeeConfig = {
            provision_key:"F42q0IVBHr1V7XGDgHMap3hcsouLUzjt",
            client_id:"IJBPRM3yi1qDFZFdHQHmNMddKj9cUfJ6",
            authenticated_userid:"Covertree-Access",
            client_secret:"CxNXcC2wosQXVOnF47iaLA9CVVyLKq1t",
            distributorId:"8989",
            productId:"8141"
        };

        var config = {
            method: 'post',
            url: `https://afficiency-live.whitetac.com/initAPP/oauth2/authorize?response_type=code&provision_key=${affigeeConfig.provision_key}&client_id=${affigeeConfig.client_id}&authenticated_userid=${affigeeConfig.authenticated_userid}`,
            headers: { }
        };
        
        let response = await  axios(config);
        response = response.data;
        let redirect_url;
        let code;
        if(response.redirect_uri){
            let result = response.redirect_uri.split("?");
            redirect_url = result[0];
            code = result[1].split("=")[1];
        }
        return {affigeeConfig, redirect_url, code};
    } catch(error){
        console.log("error.message", error.message);
        return error.message;
    }
}

const getAccessToken = async () => {
    try{
        const resData = await getRedirectURL();
        // console.log(resData);
        var data = JSON.stringify({"grant_type":"authorization_code","client_id":`${resData.affigeeConfig.client_id}`,"client_secret":`${resData.affigeeConfig.client_secret}`,"redirect_url":`${resData.redirect_url}`,"code":`${resData.code}`});

        var config = {
            method: 'post',
            url: 'https://afficiency-live.whitetac.com/initAPP/oauth2/token/',
            headers: { 
                'Content-Type': 'application/json'
            },
            data : data
        };
        const response  = await axios(config);
        return {access_token:response.data.access_token, resData};
    } catch(error) {
        console.log(error.message);
        throw new Error(error.message);
    }
}

exports.getArcId = async () => {
    try{
        let accessToken = await getAccessToken()
        var data = JSON.stringify({"distributorId":8989,"productId":8141});

        var config = {
            method: 'post',
            url: 'https://afficiency-live.whitetac.com/initSESSION',
            headers: { 
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${accessToken.access_token}`
            },
            data : data
        };

        let response = await axios(config)
        console.log(JSON.stringify(response.data));
        return response.data.arcId;
    } catch(error){
        console.log(error.message);
        throw new Error(error.message);
    }
}

exports.getQuote = async (requirdParams) => {
    try{
        let accessToken = await getAccessToken()
    } catch (error){
        console.log(error.message);
        throw new Error(error.message);
    }
}