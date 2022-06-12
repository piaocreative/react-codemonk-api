const api = require('twitter-api-v2').default;
const OAuthCredentials = require('../../models/credentials.model');

const twitterClient = new api({
    clientId: process.env.TWITTER_CLIENT,
    clientSecret: process.env.TWITTER_SEC
});
const callback = `${process.env.BASE_URL}/twitter/callback`;

class TwitterBotService {

    /**
     * @desc Generates an authentication link for account holder (CodeMonk)
     */
    static async generateAuthLink () {
        //  Clear any credentials present
        try {
            const stuff = await OAuthCredentials.findOne({ name: 'twitter' });
            if (stuff._id) await OAuthCredentials.deleteOne({ _id: stuff._id });
        } catch (e) {
            CONSOLE_LOGGER.info('Relax')
        }

        const { url, codeVerifier, state } = twitterClient.generateOAuth2AuthLink(
            callback, { scope: ['tweet.read', 'tweet.write', 'users.read', 'offline.access'] }
        );
        const credentialObj = {
            name: 'twitter',
            'codeVerifier': codeVerifier,
            'state': state
        };
        await OAuthCredentials.create(credentialObj);
        return url;
    }

    /**
     * @desc This function is called internally via callback from Twitter
     * @param code
     * @param codeVerifier
     */
    static async login (code, codeVerifier) {
        const { client, accessToken, refreshToken } = await twitterClient.loginWithOAuth2({
            code, codeVerifier,
            redirectUri: callback
        });

        const updated = await TwitterBotService.updateTokens(accessToken, refreshToken);
        CONSOLE_LOGGER.info(updated);
        return client;
    }

    /**
     * @desc This function retrieves saved credentials
     */
    static async getCredentials () {
        return OAuthCredentials.findOne({ name: 'twitter' });
    }

    /**
     * @desc: This function updates credentials with OAuth tokens
     * @param accessToken
     * @param refreshToken
     */
    static async updateTokens (accessToken, refreshToken) {
        return OAuthCredentials.updateOne({ name: 'twitter' }, {
            accessToken: accessToken,
            refreshToken: refreshToken
        }, { upsert: true });
    }

    /**
     * @desc: This function is used to confirm whether Twitter client is authenticated
     */
    static async verify() {
        const tokens = await TwitterBotService.getCredentials();
        if (!tokens) {
            return 'Authentication required';
        } else {
            const refreshToken = tokens.refreshToken;
            const {
                client: refreshedClient,
                accessToken,
                refreshToken: newRefreshToken
            } = await twitterClient.refreshOAuth2Token(refreshToken);
            await TwitterBotService.updateTokens(accessToken, newRefreshToken);
            const { data } = await refreshedClient.v2.me();
            return data;
        }
    }

    /**
     * @desc: This function posts a tweet to CodeMonk's Twitter
     * @param tweet
     */
    static async postTweet (tweet) {
        if (!['testing', 'local'].includes(process.env.NODE_ENV)) {
            const tokens = await TwitterBotService.getCredentials();
            if (!tokens) {
                return false;
            } else {
                const refreshToken = tokens.refreshToken;
                const {
                    client: refreshedClient,
                    accessToken,
                    refreshToken: newRefreshToken
                } = await twitterClient.refreshOAuth2Token(refreshToken);
                await TwitterBotService.updateTokens(accessToken, newRefreshToken);
                const { data } = await refreshedClient.v2.tweet(tweet);
                return data;
            }
        }
    }
}

module.exports = TwitterBotService;
