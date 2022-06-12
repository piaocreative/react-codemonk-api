// const { MessageEmbed, WebhookClient } = require('discord.js');
// const { webhookId, webhookToken } = require('./config.json');
// const webhookId = '917768252191567942';
// const webhookToken = 'adx5CxgdGcaYHvTb1VvVKQV4kZeb0vUoTT5q259yHAyAApGPf28F9cegsF-WlXvwV_wH';
// const webhookClient = new WebhookClient({ id: webhookId, token: webhookToken });
const CallAPI = require('./callAPI');
const webhookUrl = process.env.DISCORD_REMOTE_JOB_WEBHOOK_URL;
// 'https://discordapp.com/api/webhooks/917768252191567942/adx5CxgdGcaYHvTb1VvVKQV4kZeb0vUoTT5q259yHAyAApGPf28F9cegsF-WlXvwV_wH';


class BotService {

    static async sendMessage (title, description, url) {
        if (process.env.NODE_ENV !== 'testing') {
            // const embed = new MessageEmbed()
            //     .setTitle(title)
            // // .setColor('#0099ff')
            //     .description(description)
            //     .url(url);

            // return webhookClient.send({
            //     // content: 'Webhook test',
            //     username: 'CodeMonk',
            //     avatarURL: 'https://uploads-ssl.webflow.com/613613fef7c8dc8f957742f7/6139f28ca256e503064b7f2c_logo.png',
            //     embeds: [embed]
            // });

            const embed = { title, description, url };
            const data = {
                content: '@everyone a new opportunity has just come alive, apply now using your CodeMonk profile',
                username: 'CodeMonk',
                avatar_url: `${process.env.BASE_URL}/images/codemonk_logo.png`,
                embeds: [embed]
            };
            const headers = {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            };

            const response = await CallAPI.post(
                webhookUrl,
                data, 'json', headers);
            return response.body;
        }
        return {};
    }
}

module.exports = BotService;
