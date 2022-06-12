const message = require('../../locales/en');
const {
    YEAR_OF_EXPERIENCE, ASSIGNMENTS, WORK_PREFERENCE,
    PRIMARY_ROLE, TEAM_PREFERENCE, EDUCATION_DEGREE, SKILLS, DISC_PROFILE, TEAM_WORKING
} = CONSTANTS;
const countryList = require('../../util/country');
const languages = require('../../util/languageISO');
const Currencies = require('../../util/currency');

const parameters = [{
    in: 'query',
    name: 'q',
    description: 'Comma seperated Filters'
},
{
    in: 'query',
    name: 'type',
    type: 'array',
    items: {
        enum: ['freelancer', 'agency']
    },
    description: 'User type filter'
},
{
    in: 'query',
    name: 'role',
    enum: ['all'].concat(PRIMARY_ROLE)
},
{
    in: 'query',
    name: 'yearsOfExperience',
    type: 'array',
    items: {
        enum: YEAR_OF_EXPERIENCE
    }
},
{
    in: 'query',
    name: 'teamPreference',
    type: 'array',
    items: {
        enum: TEAM_PREFERENCE
    }
},
{
    in: 'query',
    name: 'workPreference',
    type: 'array',
    items: {
        enum: WORK_PREFERENCE
    }
},
{
    in: 'query',
    name: 'assignment',
    type: 'array',
    items: {
        enum: ASSIGNMENTS
    }
},
{
    in: 'query',
    name: 'availability',
    enum: ['all', 'yes', 'no']
},
{
    in: 'query',
    name: 'location',
    type: 'array',
    items: {
        enum: ['all'].concat(countryList.map((d) => {
            return d.name;
        }))
    }
},
{
    in: 'query',
    name: 'degreeLevel',
    type: 'array',
    items: {
        enum: EDUCATION_DEGREE
    }
},
{
    in: 'query',
    name: 'language',
    type: 'array',
    items: {
        enum: languages.map((d) => {
            return d.code;
        })
    }
},
{
    in: 'query',
    name: 'skills',
    items: {
        enum: SKILLS
    },
    type: 'array'
}, {
    in: 'query',
    name: 'sort',
    description: { name: 1 },
    default: 'name',
    type: 'string',
    // enum: ['{"_id":1}',
    //  '{"_id":-1}','{"name":1}', '{"name":-1}', '{"description":1}', '{"description":-1}']
    enum: [
        '_id',
        '-_id',
        'name',
        '-name',
        'description',
        '-description'
    ]
},
{
    in: 'query',
    name: 'limit',
    description: 'limit for result set'
},
{
    in: 'query',
    name: 'page',
    description: 'page of result set'
},
{
    in: 'query',
    name: 'dayRate',
    description: 'Daily rate for the project(first number is min limit and secound number is max limit)',
    type: 'string',
    example: '0,100'
},
{
    in: 'query',
    name: 'currency',
    description: 'Currency of daily rate',
    type: 'array',
    items: {
        enum: Currencies.map(c => { return c.label; })
    },
    enum: Currencies.map(c => { return c.label; })
},
{
    in: 'query',
    name: 'industry',
    description: 'Talent is belongs to the Industry',
    type: 'array',
    items: {
        enum: ['Accounting', 'Airlines/Aviation', 'Alternative Dispute Resolution', 'Alternative Medicine', 'Animation', 'Apparel & Fashion', 'Architecture & Planning', 'Arts and Crafts', 'Automotive', 'Aviation & Aerospace', 'Banking', 'Biotechnology', 'Broadcast Media', 'Building Materials', 'Business Supplies and Equipment', 'Capital Markets', 'Chemicals', 'Civic & Social Organization', 'Civil Engineering', 'Commercial Real Estate', 'Computer & Network Security', 'Computer Games', 'Computer Hardware', 'Computer Networking', 'Computer Software', 'Construction', 'Consumer Electronics', 'Consumer Goods', 'Consumer Services', 'Cosmetics', 'Dairy', 'Defense & Space', 'Design', 'Education Management', 'E-Learning', 'Electrical/Electronic Manufacturing', 'Entertainment', 'Environmental Services', 'Events Services', 'Executive Office', 'Facilities Services', 'Farming', 'Financial Services', 'Fine Art', 'Fishery', 'Food & Beverages', 'Food Production', 'Fund-Raising', 'Furniture', 'Gambling & Casinos', 'Glass, Ceramics & Concrete', 'Government Administration', 'Government Relations', 'Graphic Design', 'Health, Wellness and Fitness', 'Higher Education', 'Hospital & Health Care', 'Hospitality', 'Human Resources', 'Import and Export', 'Individual & Family Services', 'Industrial Automation', 'Information Services', 'Information Technology and Services', 'Insurance', 'International Affairs', 'International Trade and Development', 'Internet', 'Investment Banking', 'Investment Management', 'Judiciary', 'Law Enforcement', 'Law Practice', 'Legal Services', 'Legislative Office', 'Leisure, Travel & Tourism', 'Libraries', 'Logistics and Supply Chain', 'Luxury Goods & Jewelry', 'Machinery', 'Management Consulting', 'Maritime', 'Marketing and Advertising', 'Market Research', 'Mechanical or Industrial Engineering', 'Media Production', 'Medical Devices', 'Medical Practice', 'Mental Health Care', 'Military', 'Mining & Metals', 'Motion Pictures and Film', 'Museums and Institutions', 'Music', 'Nanotechnology', 'Newspapers', 'Nonprofit Organization Management', 'Oil & Energy', 'Online Media', 'Outsourcing/Offshoring', 'Package/Freight Delivery', 'Packaging and Containers', 'Paper & Forest Products', 'Performing Arts', 'Pharmaceuticals', 'Philanthropy', 'Photography', 'Plastics', 'Political Organization', 'Primary/Secondary Education', 'Printing', 'Professional Training & Coaching', 'Program Development', 'Public Policy', 'Public Relations and Communications', 'Public Safety', 'Publishing', 'Railroad Manufacture', 'Ranching', 'Real Estate', 'Recreational Facilities and Services', 'Religious Institutions', 'Renewables & Environment', 'Research', 'Restaurants', 'Retail', 'Security and Investigations', 'Semiconductors', 'Shipbuilding', 'Sporting Goods', 'Sports', 'Staffing and Recruiting', 'Supermarkets', 'Telecommunications', 'Textiles', 'Think Tanks', 'Tobacco', 'Translation and Localization', 'Transportation/Trucking/Railroad', 'Utilities', 'Venture Capital & Private Equity', 'Veterinary', 'Warehousing', 'Wholesale', 'Wine and Spirits', 'Wireless', 'Writing and Editing']
    }
},
{
    in: 'query',
    name: 'discProfile',
    type: 'array',
    description: 'Talent\'s DISC profile',
    items: {
        enum: DISC_PROFILE
    }
},
{
    in: 'query',
    name: 'teamWorking',
    type: 'array',
    description: 'Talent/Agency working type',
    items: {
        enum: TEAM_WORKING
    }
},
{
    in: 'query',
    name: 'companyCultures',
    type: 'array',
    description: 'Talent preference : Company culture',
    items: {
        enum: ['Accountability', 'Commitment to Customers', 'Constant Improvement', 'Continuous Learning', 'Diversity', 'Fun', 'Honesty', 'Humility', 'Innovation', 'Integrity', 'Leadership', 'Ownership', 'Passion', 'Quality', 'Teamwork', 'Trust', 'Creativity', 'Variety', 'Self-Development', 'Structure', 'Security', 'Influence', 'Prestige', 'Performance', 'Financial Reward', 'Work-Life Balance', 'Working Conditions', 'Work Relationships', 'Altruism', 'Autonomy']
    }
},
{
    in: 'query',
    name: 'certification',
    type: 'array',
    description: 'Talent having the certification',
    items: {
        enum: [
            'A+ (COMPTIA)', 'ADOBE CERTIFIED ASSOCIATE (ACA)', 'ADOBE CERTIFIED EXPERT (ACE)', 'ADOBE CERTIFICATION EXAMS (ALL)', 'ADVANCED INFORMATION SECURITY (AIS)', 'AMAZON WEB SERVICES CERTIFICATION (AWS)', 'APPLE CERTIFIED SUPPORT PROFESSIONAL (ACSP) – MACOS', 'APPLE CERTIFIED SUPPORT ESSENTIALS 10.14 – MACOS', 'APPLE CERTIFIED PRO (FOR FINAL CUT PRO X AND LOGIC PRO X)', 'APPLECARE SERVICE CERTIFICATIONS – ACMT & ACIT', 'ARUBA CERTIFIED CLEARPASS EXPERT (ACCX)', 'CERTIFIED BROADCAST NETWORKING TECHNOLOGIST (CBNT)', 'CERTIFIED COMPUTER EXAMINER (CCE)', 'CERTIFIED ELECTRONICS TECHNICIAN BY THE ETA (CET)', 'CERTIFIED TECHNICAL TRAINER (CTT)', 'CERTIFIED HARDWARE ASSET MANAGEMENT PROFESSIONAL (CHAMP)', 'CERTIFIED INFORMATION SYSTEMS AUDITOR (CISA)', 'CERTIFIED INFORMATION SECURITY MANAGER (CISM)', 'CERTIFIED INFORMATION SYSTEMS SECURITY PROFESSIONAL (CISSP)', 'CERTIFIED INFORMATION TECHNOLOGY ASSET MANAGER (CITAM)', 'CERTIFIED INTERNET WEBMASTER (CIW)', 'CERTIFIED SOFTWARE ASSET MANAGER (CSAM)', 'CERTIFIED SOFTWARE DEVELOPER PROGRAM (CSDP)', 'CERTIFIED SOFTWARE TESTER (CSTE)', 'CISCO CERTIFIED TECHNICIANS (CCT)', 'CISCO CERTIFIED ENTRY NETWORKING TECHNICIAN (CCENT)', 'CISCO CERTIFIED NETWORK ASSOCIATE (CCNA)', 'CISCO CERTIFIED NETWORK PROFESSIONAL ENTERPRISE (CCNP)', 'CISCO CERTIFIED ARCHITECT (CCAR)', 'CITRIX CERTIFIED EXPERT – VIRTUALIZATION (CCE-V)', 'CITRIX CERTIFIED PROFESSIONAL – VIRTUALIZATION (CCP-V)', 'CITRIX CERTIFIED ASSOCIATE – VIRTUALIZATION (CCA-V)', 'CITRIX CERTIFIED PROFESSIONAL – NETWORKING (CCP-N)', 'CITRIX CERTIFIED ASSOCIATE – NETWORKING (CCA-N)', 'CITRIX NETSCALER SD-WAN CERTIFIED (CC-SDWAN)', 'CITRIX CERTIFIED PROFESSIONAL – MOBILITY (CCP-M)', 'CHECK POINT CERTIFIED SECURITY ADMINISTRATOR (CCSA) R80', 'CHECK POINT CERTIFIED SECURITY (OTHER)', 'CLOUD+ (COMPTIA)', 'CSA+ (COMPTIA)', 'DELL EMC CERTIFICATION (ALL CERTIFICATIONS: EMCISA, EMCDS, VCE-CIA)', 'GIAC SECURITY EXPERT (GSE)', 'GOOGLE CLOUD CERTIFICATION (ASSOCIATE)', 'GOOGLE CLOUD CERTIFICATION (PROFESSIONAL)', 'GOOGLE CLOUD CERTIFICATION (G SUITE)', 'HELP DESK INSTITUTE (HDI)', 'HPE CERTIFICATION (ALL)', 'IBM PROFESSIONAL CERTIFICATIONS', 'INTERNET AND COMPUTING CORE CERTIFICATION (IC3)', 'LINUX+ (COMPTIA)', 'MICROSOFT TECHNOLOGY ASSOCIATE (MTA)', 'MICROSOFT CERTIFIED SOLUTIONS ASSOCIATE (MCSA)', 'MICROSOFT CERTIFIED SOLUTIONS EXPERT (MCSE)', 'MICROSOFT CERTIFICATIONS (ALL)', 'MICRO FOCUS IDENTITY MANAGER CERTIFICATION', 'MICRO FOCUS OPEN ENTERPRISE SERVER CERTIFICATION (OES)', 'MICRO FOCUS ZENWORKS CERTIFICATION', 'ORACLE CRM ON DEMAND CERTIFICATIONS', 'ORACLE CLOUD CERTIFICATIONS', 'ORACLE DATABASE CERTIFICATIONS', 'ORACLE JAVA CERTIFICATIONS', 'PALO ALTO NETWORKS CERTIFIED CYBERSECURITY ASSOCIATE (PCCSA)', 'PALO ALTO NETWORKS CERTIFIED NETWORK SECURITY ADMINISTRATOR (PCNSA)', 'PROJECT+ (COMPTIA)', 'RED HAT CERTIFIED SYSTEM ADMINISTRATOR (RHCSA)', 'RED HAT OPENSTACK CERTIFICATIONS', 'SALESFORCE CERTIFIED TECHNICAL ARCHITECT (CERTIFICATION)', 'SALESFORCE APPLICATION ARCHITECT (CERTIFICATION)', 'SALESFORCE SYSTEM ARCHITECT (CERTIFICATION)', 'SCRUM CERTIFICATION', 'SCRUM ALLIANCE – CERTIFIED SCRUMMASTER (CSM)', 'SCRUM ALLIANCE – CERTIFIED SCRUM DEVELOPERS (CSD)', 'SCRUM.ORG – PROFESSIONAL SCRUM MASTER (PSM)', 'SIMPLILEARN – AGILE SCRUM MASTER (ASM)', 'SERVER+ (COMPTIA)'
        ]
    }
}];

const listStatus = [{
    in: 'query',
    name: 'status',
    type: 'array',
    items: {
        enum: ['all', 'unregistered', 'active', 'suspended']
    },
    description: `Filter radio option for talent status
    0 = Unregistered, 1 = Active or 2 = Suspended`
}];

module.exports = swaggerJson => {
    swaggerJson.paths['/talent/list'] = {
        get: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Talent'
            ],
            parameters: [].concat(parameters, listStatus),
            description: 'talent list',
            summary: 'talent list',
            responses: {
                200: {
                    description: 'talent list',
                    schema: {
                        $ref: '#/definitions/talentListSuccess'
                    }
                },
                400: {
                    description: 'Invalid request',
                    schema: {
                        $ref: '#/definitions/validationError'
                    }
                },
                401: {
                    description: 'Unauthorized Access',
                    schema: {
                        $ref: '#/definitions/unauthorisedAccess'
                    }
                },
                500: {
                    description: 'Something went wrong. Try again.',
                    schema: {
                        $ref: '#/definitions/unexpextedError'
                    }
                }
            }
        }
    };

    swaggerJson.paths['/talent/log/{id}'] = {
        get: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Talent'
            ],
            parameters: [{
                'in': 'path',
                'name': 'id',
                'description': 'id of talent'
            }],
            description: 'talent log',
            summary: 'talent log',
            responses: {
                200: {
                    description: 'talent log',
                    schema: {
                        $ref: '#/definitions/successTalentLog'
                    }
                },
                400: {
                    description: 'Invalid request',
                    schema: {
                        $ref: '#/definitions/validationError'
                    }
                },
                401: {
                    description: 'Unauthorized Access',
                    schema: {
                        $ref: '#/definitions/unauthorisedAccess'
                    }
                },
                500: {
                    description: 'Something went wrong. Try again.',
                    schema: {
                        $ref: '#/definitions/unexpextedError'
                    }
                }
            }
        }
    };

    swaggerJson.definitions.unexpextedError = {
        properties: {
            status: {
                type: 'number',
                example: 0
            },
            message: {
                example: message.ERROR_MSG
            }
        }
    };

    swaggerJson.definitions.validationError = {
        properties: {
            status: {
                type: 'number',
                example: 0
            },
            message: {
                example: message.INVALID_REQUEST
            }
        }
    };

    swaggerJson.definitions.unauthorisedAccess = {
        properties: {
            status: {
                type: 'number',
                example: 0
            },
            message: {
                example: message.ACCESS_DENIED
            }
        }
    };

    swaggerJson.definitions.talentListSuccess = {
        properties: {
            status: {
                type: 'number',
                example: 1
            },
            data: {
                type: 'object',
                example: {
                    'docs': [{
                        _id: '5f17135a677e5734addddcae',
                        email: 'inactive@mailinator.com',
                        registerType: 'freelancer',
                        talentUserId: '5f17135a677e5734addddcad',
                        name: null,
                        phoneNumber: null,
                        status: 'Unregistered'
                    },
                    {
                        _id: '5f475a9ef25e122eb21d68a9',
                        email: 'freelancer@mailinator.com',
                        registerType: 'freelancer',
                        talentUserId: '5f475a9ef25e122eb21d68a8',
                        name: null,
                        phoneNumber: null,
                        status: 'Unregistered'
                    },
                    {
                        _id: '5fbe671356281b08441faf54',
                        registerType: 'agency',
                        talentUserId: '5fbe671356281b08441faf53',
                        name: 'Agency Name',
                        phoneNumber: '+44 1234567890',
                        status: 'Active'
                    },
                    {
                        _id: '5f155daa4a4f44532bcdef68',
                        email: 'testlocal@yopmail.com',
                        registerType: 'freelancer',
                        talentUserId: '5f155daa4a4f44532bcdef67',
                        name: null,
                        phoneNumber: null,
                        status: 'Unregistered'
                    },
                    {
                        _id: '5f171359677e5734addddcac',
                        email: 'john@mailinator.com',
                        registerType: 'freelancer',
                        talentUserId: '5f171359677e5734addddcab',
                        name: null,
                        phoneNumber: null,
                        status: 'Unregistered'
                    },
                    {
                        _id: '5f86a2f04cb66123bfa86183',
                        email: 'developer@mailinator.com',
                        talentUserId: '5f86a2f04cb66123bfa86182',
                        registerType: 'freelancer',
                        name: 'Freelancer anem`',
                        phoneNumber: '+91 991234567',
                        status: 'Suspend'
                    },
                    {
                        _id: '5fbb9c9580927b6a79d5a09f',
                        email: 'uploadcv@mailinator.com',
                        talentUserId: '5fbb9c9580927b6a79d5a09e',
                        name: null,
                        phoneNumber: null,
                        status: 'Unregistered'
                    },
                    {
                        _id: '5f24132fcf50317b33a08678',
                        email: 'emailtemplate@mailinator.com',
                        registerType: 'freelancer',
                        talentUserId: '5f24132fcf50317b33a08677',
                        name: null,
                        phoneNumber: null,
                        status: 'Unregistered'
                    },
                    {
                        _id: '5f211e9e4c22111d5ef9010f',
                        email: 'localtest@mailinator.com',
                        registerType: 'freelancer',
                        talentUserId: '5f211e9e4c22111d5ef9010e',
                        name: null,
                        phoneNumber: null,
                        status: 'Unregistered'
                    },
                    {
                        _id: '5f71e21a108d252bdb5cde9b',
                        email: 'agency@mailinator.com',
                        talentUserId: '5f71e21a108d252bdb5cde9a',
                        name: null,
                        phoneNumber: null,
                        status: 'Unregistered'
                    },
                    {
                        _id: '5f8070b8e1d9c727b2428978',
                        email: 'super@codemok.ai',
                        talentUserId: '5f8070b8e1d9c727b2428977',
                        name: null,
                        phoneNumber: null,
                        status: 'Unregistered'
                    },
                    {
                        _id: '5f8070aee1d9c727b2428976',
                        email: 'suoer@codemok.ai',
                        talentUserId: '5f8070aee1d9c727b2428975',
                        name: null,
                        phoneNumber: null,
                        status: 'Unregistered'
                    },
                    {
                        _id: '5f57991249599e3e54b4ae74',
                        email: 'anewtalentagency@mailinator.com',
                        registerType: 'agency',
                        talentUserId: '5f57991249599e3e54b4ae73',
                        name: 'A New Talent',
                        phoneNumber: null,
                        status: 'Unregistered'
                    },
                    {
                        _id: '5f7455f2d072fd4e65f0a4c6',
                        email: '4abc@mailinator.com',
                        registerType: 'agency',
                        talentUserId: '5f7455f2d072fd4e65f0a4a8',
                        name: 'AB XYZ',
                        phoneNumber: null,
                        status: 'Unregistered'
                    },
                    {
                        _id: '5f7455f2d072fd4e65f0a4c5',
                        email: '3abc@mailinator.com',
                        registerType: 'agency',
                        talentUserId: '5f7455f2d072fd4e65f0a4a7',
                        name: 'AB XYZ',
                        phoneNumber: null,
                        status: 'Unregistered'
                    },
                    {
                        _id: '5f7455f2d072fd4e65f0a4c8',
                        email: '6abc@mailinator.com',
                        registerType: 'agency',
                        talentUserId: '5f7455f2d072fd4e65f0a4aa',
                        name: 'AB XYZ',
                        phoneNumber: null,
                        status: 'Unregistered'
                    },
                    {
                        _id: '5f7454d8d072fd4e65f0a486',
                        email: 'abc@mailinator.com',
                        registerType: 'agency',
                        talentUserId: '5f7454d8d072fd4e65f0a485',
                        name: 'AB XYZ',
                        phoneNumber: null,
                        status: 'Unregistered'
                    },
                    {
                        _id: '5f7455f2d072fd4e65f0a4cb',
                        email: '9abc@mailinator.com',
                        registerType: 'agency',
                        talentUserId: '5f7455f2d072fd4e65f0a4ad',
                        name: 'AB XYZ',
                        phoneNumber: null,
                        status: 'Unregistered'
                    },
                    {
                        _id: '5f7455f2d072fd4e65f0a4ca',
                        email: '8abc@mailinator.com',
                        registerType: 'agency',
                        talentUserId: '5f7455f2d072fd4e65f0a4ac',
                        name: 'AB XYZ',
                        phoneNumber: null,
                        status: 'Unregistered'
                    },
                    {
                        _id: '5f7455f2d072fd4e65f0a4c9',
                        email: '7abc@mailinator.com',
                        registerType: 'agency',
                        talentUserId: '5f7455f2d072fd4e65f0a4ab',
                        name: 'AB XYZ',
                        phoneNumber: null,
                        status: 'Unregistered'
                    }
                    ],
                    totalDocs: 111,
                    limit: 20,
                    page: 1,
                    totalPages: 6,
                    pagingCounter: 1,
                    hasPrevPage: false,
                    hasNextPage: true,
                    prevPage: null,
                    nextPage: 2
                }
            },
            message: {
                example: message.SUCCESS
            }
        }
    };

    swaggerJson.definitions.successTalentLog = {
        properties: {
            status: {
                type: 'number',
                example: 1
            },
            data: {
                docs: [{
                    '_id': '5f2d3e4eba0dae43224ae38e',
                    'createdAt': "2022-01-31T15:22:40.157+00:00",
                    'userId': "61f7ffd744c670e052e4765a",
                    'type': 'invited',
                    'content': "Invited by Brinda Lakhani"
                }],
                'totalDocs': 1,
                'limit': 10,
                'page': 1,
                'totalPages': 1,
                'pagingCounter': 1,
                'hasPrevPage': false,
                'hasNextPage': false,
                'prevPage': null,
                'nextPage': null
            },
            message: {
                example: message.SUCCESS
            }
        }
    };

    return swaggerJson;
};
