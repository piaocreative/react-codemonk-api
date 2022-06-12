
/**
 * This class reprasents common utilities for application
 */
class CodeMonkError extends Error {
    constructor (message, statusCode = 500) {
        super(message);
        this.statusCode = statusCode;
    }
}

module.exports = CodeMonkError;
