// database initialization
const knex = require('knex')({
    client: 'pg',
    connection: {
      host: `localhost`,
      user: `joseph`,
      password: `joseph`,
      database: `cruzhacks-2020`
    }
});

const twilioConfig = {
    accSid: `AC2a169cef76f51004f1b67066172a746f`,
    authTok: `3567e9d9790528b42252cd3e642a33cd`,
    phoneNum: `+16193892265`,
};

// initializing twilio client
const twilioClient = require('twilio')(twilioConfig.accSid, twilioConfig.authTok);

const sendMessage = (message, hackerPhoneNum) => {

    const result = await twilioClient.messages.create({
        from: twilioConfig.phoneNum,
        to: hackerPhoneNum,
        body: message
    });

    return result;

}

const sendAnnouncement = async (functionContext, message) => {

    const phoneNumbersObj = await knex.select('phoneNumber').from('hackers_test');
    
    /*
    // Batching promises together (test)
    const promises = [];
    phoneNumbersObj.forEach(v => {
        promises.push(twilioClient.messages.create({from: twilioConfig.phoneNum, to: `${v["phoneNumber"]}`, body: message}))
    });
    Promise.all(promises).then(val => successful.push(val));
    console.log("line3444");
    console.log(successful);
    */
    /*
    const result = await Promise.all(phoneNumbersObj.map(v => {
        twilioClient.messages.create({from: twilioConfig.phoneNum, to: `${v["phoneNumber"]}`, body: message})
    }));

    console.log(result);
    */

    for (const phoneNumber of phoneNumbersObj) {

        const result = await 


    }
        /*
        twilioClient.messages.create({
            from: twilioConfig.phoneNum,
            to: `${phoneNumbersObj[i]["phoneNumber"]}`,
            body: message
        }).then(message => {
            successful.push({ "phoneNumber": v["phoneNumber"] });
            console.log(`success: ${successful}`);
            // functionContext.log(JSON.stringify(response.data, null, 2));
            // return Promise.resolve(true);
        }).catch(error => {
            errors.push({ "phoneNumber": v["phoneNumber"] });
            console.log(`error: ${errors}`);
            //functionContext.log.error(error.response.data.detail);
            // return Promise.reject(new Error(`Twilio Error`));
        });
        */
    }
   /*
    phoneNumbersObj.forEach(async v => {
        twilioClient.messages.create({
            from: twilioConfig.phoneNum,
            to: `${v["phoneNumber"]}`,
            body: message
        }).then(message => {
            successful.push({ "phoneNumber": v["phoneNumber"] });
            console.log(successful);
            // functionContext.log(JSON.stringify(response.data, null, 2));
            // return Promise.resolve(true);
        }).catch(error => {
            errors.push({ "phoneNumber": v["phoneNumber"] });
            console.log(errors);
            //functionContext.log.error(error.response.data.detail);
            // return Promise.reject(new Error(`Twilio Error`));
        });
    });
    */
}

module.exports = {
    sendAnnouncement,
};