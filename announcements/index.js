const { sendAnnouncement } = require("./twilio");

module.exports = async function(context, req) {
    return sendAnnouncement(context, req.body.message)
        .then(() => {
            return {
                status: 200,
                body: {
                    error: false,
                    status: 200,
                    message: 'message sent successfully',
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
};