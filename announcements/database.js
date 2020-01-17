// database initialization
const knex = require('knex')({
    client: 'pg',
    connection: {
      host: `${process.env.DATABASE_HOST}`,
      user: `${process.env.DATABASE_USER}`,
      password: `${process.env.DATABASE_PASSWORD}`,
      database: `${process.env.DATABASE_NAME}`,
      ssl: `${process.env.DATABASE_USE_SSL}`
    }
});

// const getAllAttendees

const insertAnnouncement = async (announcement) => {
    try {
        await knex('announcements').insert({announcedatetime: `${Date(Date.now()).toString()}`, announcement: announcement});
    }
    catch (ex) {
        console.log(ex);
        console.log("Error in inserting into announcement table");
        return false;
    }
    return true;
};


const getAllAnnouncement = async () => {
    const allAnnouncement = knex.select().from('announcements').then(results => {
        console.log("Getting all announcements");
        return results;
    }).catch(err => {
        console.log("Error in getting all announcements");
        return false;
    })
    return allAnnouncement;
}


module.exports = {
    getAllAnnouncement,
    insertAnnouncement,
}