const { sendAnnouncement } = require("./twilio");

module.exports = async function(context, req) {
    return sendAnnouncement(context, "Hello World")
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
            console.log("line 16");
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