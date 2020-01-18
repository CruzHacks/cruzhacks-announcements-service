const authenticateApiKey = (functionContext, requestObject ) => {
    const { headers } = requestObject;
    const correctKey = `${process.env.REACT_APP_API_KEY}`;
    if (correctKey === undefined) {
        functionContext.log.error("ERROR: UNSET API KEY ENV VAR");
        return false;
    }
    return headers.authentication === correctKey;
}

const authenticatePassword = (functionContext, requestObject) => {

    const { body } = requestObject;
    const correctPassword = `${process.env.API_PASSWORD}`;

    if (correctPassword === undefined) {
        functionContext.log.error("ERROR: UNSET API PASSWORD KEY ENV VAR");
        return false;
    }

    return body.password === correctPassword;

}

const parseRequestBody = (functionContext, requestObject ) => {
    if (requestObject.body === undefined 
        || requestObject.body.announcement === undefined
        || requestObject.body.announcementDate == undefined
        || requestObject.body.password === undefined
        || requestObject.body.twilio === undefined
    ) {
        return false
    }
    if (requestObject.body.announcement.length > 160 || requestObject.body.announcement.length <= 0) {
        return false
    }
    return true;
}

module.exports = {
    authenticateApiKey,
    authenticatePassword,
    parseRequestBody
}