
/**
 * Log generator:
 * DEBUG < INFO <  ERROR
 * @name logger
 */
class Logger {

    /**
     * @desc This function is being used to get debug logs
     * @author Innovify
     * @since 26/12/2018
     */
    static debug () {
        console.log.apply(null, arguments);
    }

    /**
     * @desc This function is being used to get info logs
     * @author Innovify
     * @since 26/12/2018
     */
    static info () {
        if (arguments.length) {
            console.info.apply(MOMENT()._d, arguments);
        }
    }

    /**
     * @desc This function is being used to error logs
     * @author Innovify
     * @since 26/12//2018
     */
    static error () {
        console.error.apply(null, arguments);
    }
}

module.exports = Logger;
