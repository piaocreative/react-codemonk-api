const AutoGenerator = require('../../models/autoGenerator.model');

class AutoGeneratorService {
    static async nextAutoGenerateNumber(type) {
        const autoGenerator = await AutoGenerator.findOne({ type: type });
        const number = autoGenerator.number + '';
        const formatNum = autoGenerator.prefix + number.padStart(autoGenerator.length, '0');

        await AutoGenerator.updateOne({ type: type }, {
            $set: { number: autoGenerator.number + 1 }
        })
        return formatNum;
    }
}
module.exports = AutoGeneratorService;