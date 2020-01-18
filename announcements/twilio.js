const { getAllAttendeesEmailEventBrite } = require("./eventbrite");
const {  getAllHackers } = require("./database");
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
    phoneNum1: `${process.env.TWILIO_PHONE_NUMBER_1}`,
    phoneNum2: `${process.env.TWILIO_PHONE_NUMBER_2}`
}

// initializing twilio client
const twilioClient = require('twilio')(twilioConfig.accSid, twilioConfig.authTok);

const sendMessageToTwilio = (message, hackerPhoneNum, twilioNum) => {
    const result = twilioClient.messages.create({
        from: twilioNum,
        to: hackerPhoneNum,
        body: message
    });
    return result;
}

const sendAnnouncement = async (functionContext, message) => {

    const hackers = await getAllHackers();
    const eventBriteEmail = await getAllAttendeesEmailEventBrite();
    
    const allPhoneNumbers = [];
    for (let i = 0; i < hackers.length; i++) {
        for (let j = 0; j < eventBriteEmail.length; j++) {
            if (hackers[i].email === eventBriteEmail[j]) {
                allPhoneNumbers.push(hackers[i].phone);
            }
        }
    }

    const nonDuplicatedPhoneNumbers = Array.from(new Set(allPhoneNumbers));
    
        
    let totalNumber = nonDuplicatedPhoneNumbers.length;

    let unsentNumberCount = 0;

    // 176
    for (let i = 0; i < 177; i++) {
        try { 
            sendMessageToTwilio(message, nonDuplicatedPhoneNumbers[i], twilioConfig.phoneNum);
        }
        catch (ex) {
            console.log(ex);
        }
    }
    // 176
    for (let i = 177; i < 353; i++) {
        try { 
            sendMessageToTwilio(message, nonDuplicatedPhoneNumbers[i], twilioConfig.phoneNum1);
        }
        catch (ex) {
            console.log(ex);
        }
    }
    //175
    for (let i = 353; i < 528; i++) {
        try { 
            sendMessageToTwilio(message, nonDuplicatedPhoneNumbers[i], twilioConfig.phoneNum2);
        }
        catch (ex) {
            console.log(ex);
        }
    }

    return { sentNumberCount: totalNumber - unsentNumberCount, unsentNumberCount: unsentNumberCount };
}

module.exports = {
    sendAnnouncement,
};