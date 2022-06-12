const EngageBay = require('../engageBay/engageBay');

/**
 * Class represents services for client new letter subscription
 */
class AddSubscribeNewsLetterService {

    /**
     * @desc This function is being used to client new letter subscription
     * @author Innovify
     * @since 14/10/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {object} user Logged in client user data
     */
    static async subscribeNewsLetter (req, user) {
        const email = user.email;
        const contact = await EngageBay.getEngageBayContact(email);
        if (contact && contact.length) {
            const id = contact[0].id;
            const systemTags = ['Unsubscribe'];
            await EngageBay.deleteContactTags(id, contact[0].tags, systemTags);
        }
    }
}

module.exports = AddSubscribeNewsLetterService;
