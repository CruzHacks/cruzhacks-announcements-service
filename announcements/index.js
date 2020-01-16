const { authenticateApiKey, authenticatePassword, parseRequestBody } = require("./middleware");
const { sendAnnouncement } = require("./twilio");

module.exports = async function(context, req) {

    const isAuthenticated = authenticateApiKey(context, req);
    const passwordAuthentication = authenticatePassword(context, req);
    const parseAnnouncement = parseAnnouncement(context, req);

    if (!isAuthenticated) {
        return {
            status: 401,
            body: {
                error: true,
                status: 401,
                message: "Unable to authenticate request",       
            },
        };
    };

    if (!passwordAuthentication) {
        return {
            status: 403,
            body: {
                error: true,
                status: 403,
                message: "Incorrect API password",
            }
        }
    }

    if (!parseRequestBody) {
        return {
            status: 400,
            body: {
                error: true,
                status: 400,
                message: "Incorrect request body.",
            }
        }
    }

    if (req.body.twilio) {
        return sendAnnouncement(context, req.body.announcement)
        .then((val) => {
            return {
                status: 200,
                body: {
                    error: false,
                    status: 200,
                    message: `Messages sent succesfully: ${val.sentNumberCount}, Messages not sent succesfully: ${val.unsentNumberCount}`,
                },
            };
        })
        .catch(err => {
            return {
                status: 500,
                body: {
                    error: true,
                    status: 500,
                    message: err.message,
                },
            };
        });
    }
    else {
        
    }
};