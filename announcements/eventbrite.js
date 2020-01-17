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

const axios = require('axios');

const eventBriteConfiguration = {
    endpoint: `${process.env.EVENTBRITE_ATTENDEE_ENDPOINT}`
}

const getAllAttendeesEmailEventBrite = async (functionContext) => {
    
    let numOfPages = 0;
    let pageSize = 0;

    let results;
    
    try {
        results = await axios.get(eventBriteConfiguration.endpoint, { headers: { Authorization: `Bearer ${process.env.EVENTBRITE_BEARER_TOK}` }});
    }
    catch (ex) {
        console.log(ex);
    }

    numOfPages = results.data.pagination.page_count;
    pageSize = results.data.pagination.page_size;


    let attendeesProfile = [];

    
    for (let i = 0; i < pageSize; i++) {
        attendeesProfile.push(results.data.attendees[i].profile);
    }

    // console.log(attendeesProfile);

    for (let i = 1; i < numOfPages; i++) {

        // last continuation page doesnt contain continuation url
        const continuationURL = results.data.pagination.continuation;

        try {
            results = await axios.get(`${eventBriteConfiguration.endpoint}?continuation=${continuationURL}`, { headers: { Authorization: `Bearer ${process.env.EVENTBRITE_BEARER_TOK}` }});
        }
        catch (ex) {
            console.log(ex);
        }

        pageSize = results.data.pagination.page_size;
        
        for (let i = 0 ; i < pageSize; i++) {
            if (results.data.attendees[i] !== undefined) {
                attendeesProfile.push(results.data.attendees[i].profile.email);
            }
        }
    }
    return attendeesProfile;
}

module.exports = { 
    getAllAttendeesEmailEventBrite,
}