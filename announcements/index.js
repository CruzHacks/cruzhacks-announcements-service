const { authenticateApiKey, authenticatePassword, parseRequestBody } = require("./middleware");
// const { getAllAttendeesEmailEventBrite } = require("./eventbrite");
const { sendAnnouncement } = require("./twilio");
const { insertAnnouncement, getAllAnnouncement } = require("./database");

module.exports = async function(context, req) {

    const isAuthenticated = authenticateApiKey(context, req);

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

    if (req.method === "GET") {
        const announcementResults = await getAllAnnouncement();
        return {
            status: 200,
            body: {
                error: false,
                status: 200,
                data: announcementResults,
            },
        }
    }
    else if (req.method === "POST") {

        const passwordAuthentication = authenticatePassword(context, req);
        const isValidBody = parseRequestBody(context, req);
        
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
        if (!isValidBody) {
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
            const isInserted = true;
            // const isInserted = insertAnnouncement(req.body.announcement, req.body.announcementDate);
            return sendAnnouncement(context, req.body.announcement)
            .then((val) => {
                if (isInserted) {
                    return {
                        status: 200,
                        body: {
                            error: false,
                            status: 200,
                            message: `Announcement saved into database. Messages sent succesfully: ${val.sentNumberCount}, Messages not sent succesfully: ${val.unsentNumberCount}`,
                        },
                    };
                }
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
            console.log("LINE 84");
            const isInserted = insertAnnouncement(req.body.announcement, req.body.announcementDate);
            if (isInserted) {
                return {
                    status: 200,
                    body: {
                        error: false,
                        status: 200,
                        message: `Announcement saved into database.`,
                    }
                }
            }
            else {
                return {
                    status: 500,
                    body: {
                        error: true,
                        status: 500,
                        message: `Annoucement unable to be saved into database.`,
                    }
                }
            }
        }
    }
};