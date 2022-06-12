const User = require('../../../models/user.model');
const mongoose = require('mongoose');


module.exports = {
    events: () => {
        return ['Event 1', 'Event 2', 'Event 3'];
    },
    createEvent: (args, req) => {
        console.log('Result', req.res.locals.user);
        
        return args.name;
    },

    updateFirstName: async (args, req) => {
        console.log('Result updateFirstName',args);
        await User.updateOne({_id: req.res.locals.user._id},{firstName: args.firstName})
        return 'First name updated successfully!!!';
    },

    updateLastName: async (args, req) => {
        console.log('Result updateLastName',args);

        await User.updateOne({_id: req.res.locals.user._id},{lastName: args.lastName})
        return 'Last name updated successfully!!!';
    }
};