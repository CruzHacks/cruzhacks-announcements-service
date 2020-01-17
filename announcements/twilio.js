// database initialization
const knex = require('knex')({
    client: 'pg',
    connection: {
      host: `${process.env.DATABASE_HOST}`,
      user: `${process.env.DATABASE_USER}`,
      password: `${process.env.DATABASE_PASSWORD}`,
      database: `${process.env.DATABASE_NAME}`
    }
});

const twilioConfig = {
    accSid: `${process.env.TWILIO_ACCOUNT_SID}`,
    authTok: `${process.env.TWILIO_AUTH_TOKEN}`,
    phoneNum: `${process.env.TWILIO_PHONE_NUMBER}`,
}

// initializing twilio client
const twilioClient = require('twilio')(twilioConfig.accSid, twilioConfig.authTok);

const sendMessageToTwilio = (message, hackerPhoneNum) => {

    const result = twilioClient.messages.create({
        from: twilioConfig.phoneNum,
        to: hackerPhoneNum,
        body: message
    });
    return result;
}

const sendAnnouncement = async (functionContext, message) => {

    const phoneNumbersObj = await knex.select('phoneNumber').from('hackers_test');
    
    let totalNumber = phoneNumbersObj.length;
    let unsentNumberCount = 0;

    for (const phoneNumber of phoneNumbersObj) {
        try {
            await sendMessageToTwilio(message, phoneNumber.phoneNumber);
        }
        catch (ex) {
            unsentNumberCount++;
            console.log(`Error for number: ${phoneNumber.phoneNumber} Reason:${ex}`)
        }
    }

    return { sentNumberCount: totalNumber - unsentNumberCount, unsentNumberCount: unsentNumberCount };
}

module.exports = {
    sendAnnouncement,
};