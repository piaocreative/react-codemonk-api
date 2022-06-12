const got = require('got');

const apiCallLimitTime = 5000;
class CallAPI {
    static async get(url, responseType, headers) {
        try {
            const response = await got.get(url, {
                headers,
                responseType
            });
            return response;
        } catch (error) {
            return error.response;
        }
    }
    static getWithTimeout(url, responseType, headers, msc = apiCallLimitTime) {
        return new Promise(async (resolve, reject) => {
            let response = null;
            setTimeout(() => {
                if (!response) {
                    reject(new Error("Data fetch failed in " + msc + " ms"));
                }
            }, msc);
            response = await this.get(url, responseType, headers);
            resolve(response);
        });
    };

    static async post(url, json, responseType, headers) {
        try {
            const response = await got.post(url, {
                json,
                headers,
                responseType
            });
            return response;
        } catch (error) {
            return error.response;
        }
    }

    static async put(url, json, responseType, headers) {
        try {
            const response = await got.put(url, {
                json,
                headers,
                responseType
            });
            return response;
        } catch (error) {
            return error.response;
        }
    }

    static async delete(url, responseType, headers) {
        try {
            const response = await got.delete(url, {
                headers,
                responseType
            });
            return response;
        } catch (error) {
            return error.response;
        }
    }
}

module.exports = CallAPI;
