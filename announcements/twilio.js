// database initialization
/*
const knex = require('knex')({
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME
    }
});
*/

const twilioConfig = {
    accSid: `${process.env.TWILIO_ACCOUNT_SID}`,
    authTok: `${process.env.TWILIO_AUTH_TOKEN}`,
    phoneNum: `${process.env.TWILIO_PHONE_NUMBER}`,
};

// initializing twilio client
const twilioClient = require('twilio')(twilioConfig.accSid, twilioConfig.authTok);


const sendAnnouncement = (functionContext, message) => {

    /*

    Testing

    const phoneNumbers = await knex.select('phoneNumber').from('hackers_test');

    phoneNumbers.forEach(v => {

    })
    
    */

    return twilioClient.messages.create({
        from: twilioConfig.phoneNum,
        to: 'test number',
        body: message
    }).then(response => {
        console.log(response);
        return Promise.resolve(true);
    }).catch(err => {
        console.log(err);
        functionContext.log.error(error.response.data.detail);
        return Promise.reject(new Error(`Twilio Error`));
    })
}

module.exports = {
    sendAnnouncement,
};