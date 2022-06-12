const Skills = require('../../models/skills.model');
const Skills_Col = require('../../models/skills_col.model');

const { SKILLS } = require('../../util/constants');
const { EventEmitter } = require('events');

/**
 * @name SkillService timesheet service
 */
class SkillService extends EventEmitter {

    /**
     * @desc This function is being used to add admin job post details
     * @author Innovify
     * @since 03/11/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {object} user Logged in admin user data
     */
    static async skills(req) {
        let result = JSON.parse(JSON.stringify(SKILLS));
        

        const skill2Array = await Skills_Col.aggregate([
            {
                $group: {
                    _id: null,
                    skills: {
                        $push: '$name'
                    }
                }
            }
        ]);
        if (skill2Array.length) {
            result = result.concat(skill2Array[0].skills);
        }
        
        if (req.query.q) {
            const searchQuery = new RegExp(req.query.q, 'i');
            result = result.filter((r) => {
                return searchQuery.test(r);
            });
        }
        return [...new Set(result)].sort((a, b) => {
            return a - b;
        });
    }


    static async addSkill(skill, hardSkill=1) {
        let existingSkills = await Skills_Col.find({
            'name': { $in: skill }
        })
        const makeSweeter = sweetItem => sweetItem.name;
        existingSkills = existingSkills.map(makeSweeter)
        const filterArray = (arr1, arr2) => {
            const filtered = arr1.filter(el => {
                return arr2.indexOf(el) === -1;
            });
            return filtered;
        };

        const newSkills = await filterArray(skill, existingSkills);
        const newLocal = await newSkills.map(s => { return { name: s, hardSkill: hardSkill }; });
        return await Skills_Col.create(newLocal);
    }


}

module.exports = SkillService;
