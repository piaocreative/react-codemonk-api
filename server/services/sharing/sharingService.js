const Talent = require('../../models/talent.model');
const User = require('../../models/user.model');
const { capitalizeFirstLetter } = require('../../util/utilFunctions');

/**
 * Class represents services for Talent details
 */
class SharingService {
    /**
     * @desc This function is being used to get Talent details
     * @author Innovify
     * @since 17/08/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     * @param {Object} user Logged in user details
     */
    static async profile(req, res, next) {
        const talent = await Talent.findOne({
            code: req.params.code
        }).select('userId yearsOfExperience primaryRole city country');
        if (talent) {
            const user = await User.findById(talent.userId).select('firstName profilePicture');
            const firstName = capitalizeFirstLetter(user.firstName);
            res.writeHead(200, { 'Content-Type': 'text/html' });
            const experience = talent.yearsOfExperience ? talent.yearsOfExperience : '';
            const title = `${firstName} - ${experience.split(' - ')[0]} ${talent.primaryRole}, ${talent.city}, ${talent.country}`;
            const description = `Available to hire now via CodeMonk.ai. Build your global product development teams without hassle and easily manage through a easy to use dashboard.`;
            var body = `
            <html xmlns:og="http://ogp.me/ns#">
                <title>Codemonk</title>
                <link rel="shortcut icon" type="image/x-icon" href="../images/favicon.ico"/>
                <head>
                    <meta prefix="og: http://ogp.me/ns#" http-equiv="Content-Type" content="text/html" charset="UTF-8"/>
                    <meta prefix="og: http://ogp.me/ns#" property="og:title" content="${title}" />
                    <meta prefix="og: http://ogp.me/ns#" property="og:description" content="${description}" />
                    <meta prefix="og: http://ogp.me/ns#" property="og:site_name" content="Codemonk" />
                    <meta prefix="og: http://ogp.me/ns#" property="og:image" content="${user.profilePicture}" />
                    <meta prefix="og: http://ogp.me/ns#" property="og:url" content="${process.env.FRONTEND_URL}"/>
                    <meta name='author' content="www.codemonk.ai"/>
                    <meta name='description' content="${description}"/>
                    <meta name='title' content="www.codemonk.ai"/>
                    <meta name="pinterest-rich-pin" content="true" />
                    <meta prefix="og: http://ogp.me/ns#" property="og:type" content="website" />
                    <meta name="twitter:site" content="www.codemonk.ai" />
                    <meta prefix="og: http://ogp.me/ns#" name="twitter:title" content="${title}" />
                    <meta prefix="og: http://ogp.me/ns#" name="twitter:description" content="${description}" />
                    <meta prefix="og: http://ogp.me/ns#" name="twitter:image" content="${user.profilePicture}" />
                    <meta prefix="og: http://ogp.me/ns#" name="twitter:card" content="summary_large_image" ></meta>
                </head>
                <body>
                <script> location.href="${process.env.FRONTEND_URL}/user/profile-view/${talent._id}"</script>
                </body>
            </html>`;
            res.write(body);
            res.end();
        } else {
            next();
        }
    }

    /**
     * This function is being used to redirect user to page not found as link is not valid
     * @param {Object} res response object
     */
    static pageNotFound(res) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        var body = `
        <html>
            <head></head>
            <body>
                <script> 
                    location.href=""
                </script>
            </body>
        </html>`;
        res.write(body);
        res.end();
    }
}

module.exports = SharingService;
