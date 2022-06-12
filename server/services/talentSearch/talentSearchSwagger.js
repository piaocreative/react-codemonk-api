const message = require('../../locales/en');
const {
    YEAR_OF_EXPERIENCE, ASSIGNMENTS, WORK_PREFERENCE, SKILLS, PRIMARY_ROLE, TEAM_PREFERENCE, EDUCATION_DEGREE,
    DISC_PROFILE, TEAM_WORKING
} = CONSTANTS;
const countryList = require('../../util/country');
const languages = require('../../util/languageISO');
const Currencies = require('../../util/currency');

const parameters = [
    {
        in: 'query',
        name: 'q',
        description: 'Comma seperated Filters'
    },
    {
        in: 'query',
        name: 'jobPostId',
        type: 'string',
        description: 'id of job post (optional) - This is used to search for recommended candidates. If the user is client, jobPostId should be matched with the client\'s job.  If the user is admin, jobPostId can be any jobpostId which is existing.',
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
    },
    {
        in: 'query',
        name: 'limit',
        type: 'integer',
        description: 'limit for result set'
    },
    {
        in: 'query',
        name: 'page',
        type: 'integer',
        description: 'page of result set'
    },
    {
        in: 'query',
        name: 'sort',
        type: 'string',
        default: '-_id',
        enum: [
            'recommend',
            '_id',
            '-_id',
            'name',
            '-name',
            'description',
            '-description'
        ],
        description: 'Sort candidates'
    }
];

const searchStatus = [{
    in: 'query',
    name: 'status',
    type: 'array',
    items: {
        enum: [0, 1, 2]
    },
    description: `Filter radio option for talent status
    0 = Unregistered, 1 = Active or 2 = Suspended`
}];

module.exports = swaggerJson => {
    swaggerJson.paths['/talent/search'] = {
        'get': {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'Talent'
            ],
            description: 'search talent',
            summary: 'search talent',
            parameters: [].concat(parameters, searchStatus),
            responses: {
                200: {
                    description: 'Update project details',
                    'schema': {
                        '$ref': '#/definitions/successTalentSearchList'
                    }
                },
                400: {
                    description: 'Invalid request',
                    'schema': {
                        '$ref': '#/definitions/validationError'
                    }
                },
                401: {
                    description: 'Unauthorized Access',
                    'schema': {
                        '$ref': '#/definitions/unauthorisedAccess'
                    }
                },
                500: {
                    description: 'Something went wrong. Try again.',
                    'schema': {
                        '$ref': '#/definitions/unexpextedError'
                    }
                }
            }
        }
    };

    swaggerJson.definitions.successTalentSearchList = {
        properties: {
            status: {
                type: 'number',
                example: 1
            },
            data: {
                docs: [{
                    _id: "61028fcb13407f1ad091f9b9",
                    profilePicture: "https://s3-eu-west-1.amazonaws.com/dev-codemonk-static-content/development-proflie-pictures/61028fcb13407f1ad091f9b8",
                    name: "Agency 29 July",
                    industries: [
                        "Business Supplies and Equipment",
                        "Investment Management"
                    ],
                    companyCultures: [
                        "Quality"
                    ],
                    teamPreference: [
                        "individuals"
                    ],
                    assignments: [
                        "remote-only",
                        "occational-site-visit",
                        "mid-term-onsite"
                    ],
                    workPreference: [
                        "fulltime"
                    ],
                    currency: "USD",
                    skills: [
                        {
                            _id: "6102939013407f1ad091f9c5",
                            name: "Apache Kafka",
                            rate: 10
                        },
                        {
                            _id: "6102949513407f1ad091f9da",
                            name: "Amazon Kinesis",
                            rate: 6
                        },
                        {
                            _id: "6102949513407f1ad091f9db",
                            name: "Android",
                            rate: 5
                        },
                        {
                            _id: "610293f513407f1ad091f9cc",
                            name: "Angular",
                            rate: 3
                        },
                        {
                            _id: "610293f513407f1ad091f9cd",
                            name: "Logo and Icon design",
                            rate: 2
                        }
                    ],
                    certificateDetails: [],
                    workExperience: [
                        {
                            _id: "6102932ab6e8cc1ad83e1e0a",
                            jobTitle: "Software Engineer",
                            employmentType: "Fulltime",
                            employer: "Codemonk",
                            country: "India",
                            startDate: "2021-07-01T00:00:00.000Z",
                            endDate: "2021-07-29T00:00:00.000Z",
                            isPresent: false,
                            shortDescription: "<p>Testing Testing Testing Testing Testing Testing Testing Testing Testing Testing Testing Testing Testing&nbsp;</p>\n"
                        }
                    ],
                    city: "Chennai",
                    country: "India",
                    timeZone: "Asia/Kolkata",
                    experienceOrder: "3",
                    primaryRole: "Product Manager",
                    availability: true,
                    recommendOrder: 1000,
                    firstName: "Agency 29",
                    lastName: "J",
                    yearsOfExperience: "Senior ",
                    ratePerHour: 3.47,
                    formerEmployer: "Codemonk",
                    isRecommended: false
                }],
                status: 1,
                data: {
                    docs: [
                        {

                        }
                    ],
                    totalDocs: 92,
                    limit: 5,
                    page: 1,
                    totalPages: 19,
                    pagingCounter: 1,
                    hasPrevPage: false,
                    hasNextPage: true,
                    prevPage: null,
                    nextPage: 2
                },
                message: "Success",
                newTimesheet: false,
                newNotification: false
            },
            message: {
                example: message.SUCCESS
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

    return swaggerJson;
};
