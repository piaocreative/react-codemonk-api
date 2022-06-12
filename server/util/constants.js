const SKILL_CONSTANT = require('../services/skills/skillConstant');

module.exports = {
    LOG_LEVEL: 'debug',
    AWS_REGION: 'eu-west-1',
    AWS_S3_PUBLIC_BUCKET: 'dev-codemonk-static-content',
    AWS_S3_URL: 'https://s3-eu-west-1.amazonaws.com/',
    PROFILE_PICTURE: {
        MIN_SIZE: 5120,
        MAX_SIZE: 5242880,
        ALLOWED_TYPE: ['image/jpg', 'image/jpeg', 'image/png'],
        RESOLUTION: {
            WIDTH: 200,
            HEIGHT: 200
        }
    },
    COMPANY_LOGO: {
        RESOLUTION: {
            WIDTH: 200,
            HEIGHT: 200
        }
    },
    CERTIFICATION_LOGO: {
        RESOLUTION: {
            WIDTH: 200,
            HEIGHT: 200
        }
    },
    USER_DOCUMENT_FILE: {
        MIN_SIZE: 10240,
        MAX_SIZE: 5242880,
        ALLOWED_TYPE: ['image/jpg', 'image/jpeg', 'image/png', 'application/pdf'],
        ALLOWED_KEYS: ['idProof', 'addressProof', 'companyIncorporationCertificateUrl',
            'companyVatRegistrationCertificateUrl', 'companyInsuranceDocumentUrl']
    },
    REGEX: {
        EMAIL: /^[A-Za-z0-9](\.?[A-Za-z0-9_-]){0,}@[A-Za-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$/,
        FIRSTNAME: /^[a-zA-Z0-9,'~._^ -]*$/,
        SURNAME: /^[a-zA-Z0-9,'~._^ -]*$/,
        ALPHA_ONLY: /^[a-zA-Z']*$/,
        ALPHA_SPECIAL_CHAR: /^[ A-Za-z0-9_@./#&+-]*$/,
        ALPHA_SPECIAL_CHAR_EXCEPT_NUMBER: /^[ A-Za-z_@./#&+-]*$/,
        FULL_ACCESS: /^[^<> ?//\\]+$/,
        ALPHA_NUMARIC: /^[\w@ ]+$/,
        LINKEDIN_URL: /http(s)?:\/\/([\w]+\.)?linkedin\.com\/.*$/,
        GITHUB_URL: /http(s)?:\/\/([\w]+\.)?github\.com\/[A-z0-9_-]+\/?/,
        STACKOVERFLOW_URL: /http(s)?:\/\/([\w]+\.)?stackoverflow\.com\/users\/[0-9_-]+\/[A-z0-9_-]+\/?/,
        URL: /(http(s)?:\/\/www\.)?[-a-zA-Z0-9@:%.+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%+.~#?&//=]*)/,
        DRIBBLE_URL: /http(s)?:\/\/([\w]+\.)?dribbble\.com\/[A-z0-9_-]+\/?/,
        BEHANCE_URL: /http(s)?:\/\/([\w]+\.)?behance\.net\/[A-z0-9_-]+\/?/,
        CLUTCH_URL: /http(s)?:\/\/([\w]+\.)?clutch\.co\/[A-z0-9_-]+\/?/,
        GOODFIRMS_URL: /http(s)?:\/\/([\w]+\.)?goodfirms\.co\/[A-z0-9_-]+\/?/
    },
    LENGTH: {
        NAME: {
            MIN: 2,
            MAX: 100
        },
        PROFESSIONALSUMMARY: {
            MIN: 50,
            MAX: 1000
        },
        PROJECT_NAME: {
            MIN: 1,
            MAX: 100
        },
        PROJECT_DESCRIPTION: {
            MIN: 50,
            MAX: 1000
        },
        PROJECT_KEY_ACHIEVEMENT: {
            MIN: 2,
            MAX: 500
        },
        RATE: {
            MIN: 1,
            MAX: 10
        },
        SHORT_DESCRIPTION: {
            MIN: 2,
            MAX: 1000
        }
    },
    PHONE_NUMBER: {
        LENGTH: 12,
        COUNTRY_CODE_LENGTH: 4
    },
    OTPLENGTH: 6,
    GENDER: ['Male', 'Female', 'Other'],
    PRIMARY_ROLE: ['Product Manager',
        'UX Manager',
        'Product (UI) designer',
        'Data Scientist',
        'Developer',
        'Quality Analyst',
        'DevOps engineer',
        'Solution Architect',
        'Database Architect',
        'Delivery Manager',
        'Project Manager'],
    YEAR_OF_EXPERIENCE: [
        'Beginner - 0 - 2 yrs',
        'Junior - 2 - 5 yrs',
        'Intermediate - 5 - 8 yrs',
        'Senior - 8 - 12 yrs',
        'Principal - 12 - 15 yrs',
        'Distinguished - 15+ yrs'
    ],
    YEAR_OF_EXPERIENCE_LABEL: {
        'Beginner - 0 - 2 yrs': 'Beginner',
        'Junior - 2 - 5 yrs': 'Junior',
        'Intermediate - 5 - 8 yrs': 'Intermediate',
        'Senior - 8 - 12 yrs': 'Senior',
        'Principal - 12 - 15 yrs': 'Principal',
        'Distinguished - 15+ yrs': 'Distinguished'
    },
    SKILLS: SKILL_CONSTANT.SKILLS,
    TEAM_PREFERENCE: ['individuals',
        'small-team',
        'medium-team',
        'large-team',
        'x-large-team'],
    TEAM_PREFERENCE_LABEL: {'individuals' :'Individual',
        'small-team' : 'Small team (<6 members)',
        'medium-team' : 'Medium Team(7-12 members)',
        'large-team': 'Large team (12+ members)',
        'x-large-team':'Extra Large team (12+ members)'
    },
    TIME_HOURS: ['full', 'first', 'second'],
    ASSIGNMENTS: ['remote-only',
        'fully-in-office',
        'hybrid',
        'occational-site-visit',
        'short-term-onsite',
        'mid-term-onsite',
        'long-term-onsite'],
    ASSIGNMENTS_LABEL: {
        'remote-only': 'Remote Only',
        'fully-in-office': 'Fully in-office',
        'hybrid': 'Hybrid',
        'occational-site-visit': 'Occational Site Visit',
        'short-term-onsite': 'Short-term Onsite (< 3 months)',
        'mid-term-onsite': 'Mid-term Onsite (3 - 6 months)',
        'long-term-onsite': 'Long-term Onsite (6 - 12 months)'
    },
    EXPERTISE: ['junior', 'mid-level', 'senior', 'expert'],
    WORK_PREFERENCE: ['fulltime',
        'parttime-weekdays-am',
        'parttime-weekdays-pm',
        'parttime-weekends'],
    WORK_PREFERENCE_LABEL: {
        'fulltime': 'Full time',
        'parttime-weekdays-am': 'Weekdays-AM',
        'parttime-weekdays-pm': 'Weekdays-PM',
        'parttime-weekends': 'Weekends'
    },
    BILLING_TYPES: ['freelancer', 'company'],
    BILLING_TYPES_FL: 'freelancer',
    BILLING_TYPES_COMPANY: 'company',
    PAYOUT_TYPES: ['bank', 'paypal'],
    PAYOUT_TYPES_PAYPAL: 'paypal',
    PAYOUT_TYPES_BANK: 'bank',
    EMPLOYMENT_TYPE: ['Fulltime', 'Parttime',
        'Contract', 'Temporary', 'Apprenticeship'],
    STATUS: {
        PENDING: 0,
        ACTIVE: 1
    },
    SIGNUP_STEP: {
        MIN: 1,
        MAX: 7
    },
    TALENT: {
        REGITRATION_STATUS: {
            INITIAL_TYPE_STAGE: 0.1,
            BASIC_PROFILE: 1,
            PROFESSIONAL_PROFILE: 2,
            WORK_EXPERIENCE_DETAIL: 3,
            EDUCATION_DETAIL: 4,
            PROJECT_DETAIL: 5,
            PREFERENCE_DETAIL: 6,
            PAY_DETAIL: 7
        },
        V2: {
            REGITRATION_STATUS: {
                ABOUT_YOU: 1,
                EDUCATION_DETAIL: 2,
                WORK_EXPERIENCE_DETAIL: 3,
                PROJECT_DETAIL: 4,
                PREFERENCE_DETAIL: 5,
                BILLING_DETAIL: 6,
                UPLOAD_DOC: 7
            }
        },
        ACTIVE_STATUS: 6,
        EMPLOYMENT_TYPE: ['permanent-employee',
            'freelancer-consultant'],
        EMPLOYMENT_TYPE_LABEL: {
            'permanent-employee': 'Permanent employee',
            'freelancer-consultant': 'Freelancer / Consultant'
        },
        EMPLOYMENT_TYPE_LABEL_PE: 'permanent-employee',
        EMPLOYMENT_TYPE_LABEL_FR: 'freelancer-consultant',
        EMPLOYMENT_TYPE_LABEL2: {
            'permanent-employee': 'Permanent',
            'freelancer-consultant': 'Freelancer'
        }
    },
    CLIENT: {
        REGITRATION_STATUS: {
            INITIAL_TYPE_STAGE: 0.1,
            BASIC_PROFILE: 1,
            COMAPNY_DETAIL: 2,
            COMPANY_LOCATION: 3,
            ON_BOARDING: 3
        },
        ROLE: [
            'recruitment-manager',
            'hiring-manager',
            'billing-admin'
        ]
    },
    RECRUITER: {
        REGISTER_TYPE: ['individual', 'company'],
        REGITRATION_STATUS: {
            INITIAL_TYPE_STAGE: 0.1,
            BASIC_PROFILE: 1,
            COMAPNY_DETAIL: 2,
            ON_BOARDING: 3
        }
    },
    AMBASSADOR: {
        REGISTER_TYPE: ['individual', 'company'],
        REGISTRATION_STATUS: {
            INITIAL_TYPE_STAGE: 0.1,
            BASIC_PROFILE: 1,
            COMPANY_DETAIL: 2,
            ON_BOARDING: 3
        }
    },
    EDUCATION_DEGREE: ['Master’s or Higher',
        'Bachelor’s',
        'Associate’s',
        'Some College',
        'High School Diploma/GED'],
    EDUCATION_DEGREE_TITLE: {
        MIN: 2,
        MAX: 50
    },
    EDUCATION_COLLEGE_NAME: {
        MIN: 2,
        MAX: 100
    },
    EDUCATION_CERTIFICATE_NAME: {
        MIN: 2,
        MAX: 100
    },
    EDUCATION_ISSUED_BY: {
        MIN: 2,
        MAX: 100
    },
    EDUCATION_CERT_ID: {
        MIN: 2
    },
    ENVIRONMENT: {
        TESTING: 'testing',
        LOCAL: 'local',
        DEV: 'dev',
        PRODUCTION: 'production'
    },
    NOTIFICATION_FILTER: ['all', 'unread', 'read'],
    NOTIFICATION_STATUS: {
        UNFETCHED: 'unfetched',
        UNREAD: 'unread',
        READ: 'read'
    },
    NOTIFICATION_TYPE: {
        BRIEF_ADDED: 'BRIEF_ADDED',
        NEW_QUOTE: 'NEW_QUOTE',
        TALENT_ADDED: 'TALENT_ADDED',
        TIMESHEET_SUBMIT: 'TIMESHEET_SUBMIT',
        TIMESHEET_APPROVED: 'TIMESHEET_APPROVED',
        TIMESHEET_INREVIEW: 'TIMESHEET_INREVIEW',
        TIMESHEET_SETTELED: 'TIMESHEET_SETTELED',
        BRIEF_APPLY: 'BRIEF_APPLY'
    },
    NOTIFICATION_MESSAGE: {
        BRIEF_ADDED: 'A new Brief has been just been posted for you to apply.',
        NEW_QUOTE: 'A new project quote request has been just been posted for you to apply',
        TALENT_ADDED: 'You have been added to a new Project: ',
        TALENT_ADDED_CLIENT_TEXT: 'has been added to your project',
        TIMESHEET_SUBMIT_1: 'A new timesheet has been submitted by',
        TIMESHEET_SUBMIT_2: 'for project',
        TIMESHEET_APPROVED: 'Your timesheet has been approved by your client.',
        TIMESHEET_INREVIEW: 'Your timesheet has been disputed by your client. We will get in touch with you to discuss this.',
        TIMESHEET_SETTELED: 'Your timesheet has been settled. You should receive payout within next 21 days.',
        BRIEF_APPLY: '<TALENT_NAME> has applied for the role <ROLE> with job id <JOB_ID>.'
    },
    DEVELOPERS_EMAIL: 'futureofwork@codemonk.ai',
    SES_HOST: 'email-smtp.eu-west-1.amazonaws.com',
    ROLE: {
        TALENT: 1,
        CLIENT: 2,
        AGENCY: 3,
        ADMIN: 4,
        RECRUITER: 5,
        AMBASSADOR: 6
    },
    CLIENT_TYPES: ['individual', 'company'],
    CLIENT_TYPES_COMPANY: 'company',
    PROJECT: {
        NAME: {
            LENGTH: {
                MIN: 2,
                MAX: 50
            }
        },
        DESCRIPTION: {
            LENGTH: {
                MIN: 100,
                MAX: 1500
            }
        },
        BUILD_STATUS: ['inception', 'design', 'on-paper', 'alpha', 'live'],
        LOOKING_FOR: {
            DESING: ['reaserch', 'ux', 'branding'],
            SOFTWARE_DEVELOPMENT: ['web-development', 'mobile-app', 'dev-ops', 'project-management', 'agile-coach'],
            DEVELOPMENT_TEAM: ['front-end', 'back-end', 'full-stack'],
            DATA_AI_ML: ['analysis', 'development']
        },
        BUDGET: ['<$50K', '$50k-$150k', '$150k-$500k', '$500k+'],
        MESSAGE: {
            LENGTH: {
                MIN: 2,
                MAX: 1000
            }
        },
        SPEED: ['standard', 'fast', 'super-fast', 'super-duper-fast'],
        TEAM_MANAGEMENT: ['direct', 'project-manager'],
        TEAM_SALES: {
            local: ['vishal.amrutiya@codemonk.ai'],
            testing: ['vishal.amrutiya@codemonk.ai'],
            development: ['vishal.amrutiya@codemonk.ai', 'brinda.lakhani@codemonk.ai'],
            production: ['prakash@codemonk.ai']
        },
        STATUS: {
            'Requested': 0,
            'Proposed': 1,
            'Discovery': 2,
            'Kick-off': 3,
            'In Progress': 4,
            'On Hold': 5,
            'Suspended': 6,
            'Closed': 7
        },
        IMAGES: {
            RESOLUTION: {
                WIDTH: 500,
                HEIGHT: 350
            }
        }
    },
    FIXED_RATE: 0,
    HOURLY_RATE: {
        MIN: 0,
        MAX: 500
    },
    ANNUAL_RATE: {
        MIN: 0,
        MAX: 999999
    },
    RATE_MULTIPLIER: 1.30,
    TALENT_REGISTER_TYPE: {
        FREELANCER: 'freelancer',
        AGENCY: 'agency'
    },
    VAT: {
        COUNTRY: 'United Kingdom',
        PERCENTAGE: 20
    },
    AGENCY: {
        DESIGNATION: {
            MIN: 2,
            MAX: 30
        },
        NAME: {
            MIN: 2,
            MAX: 50
        },
        TRADE_NAME: {
            MIN: 2,
            MAX: 50
        },
        TRADE_SUMMARY: {
            MIN: 50,
            MAX: 1000
        },
        PAY_DETAILS: {
            BANK_NAME: {
                MIN: 2,
                MAX: 50
            },
            ACCOUNT_NUMBER: {
                MIN: 2,
                MAX: 40
            },
            IFSC_CODE: {
                MIN: 2,
                MAX: 50
            }
        },
        DOCUMENT_FILE: {
            MIN_SIZE: 10240,
            MAX_SIZE: 50 * 1024 * 1024,
            ALLOWED_TYPE: ['image/jpg', 'image/jpeg', 'image/png', 'application/pdf'],
            ALLOWED_KEYS: [
                'idProof0', 'addressProof0', 'idProof1',
                'addressProof1',
                'companyIncorporationCertificateUrl',
                'companyTaxRegistrationCertificateUrl',
                'utilityBillDocumentUrl'
            ]
        },
        REGITRATION_STATUS: {
            INITIAL_TYPE_STAGE: 0.1,
            BASIC_PROFILE: 1,
            TALENT_DETAIL: 2,
            CERTIFICATE_DETAIL: 3,
            PAY_DETAIL: 4,
            DIRECTORS_DETAIL: 5,
            INVITE_TALENT_DETAIL: 6
        },
        TALENT: {
            ACTIVE_STATUS: 5
        }
    },
    ENGAGEBAY: {
        GET_CONTACT_URL: 'https://app.engagebay.com/dev/api/search',
        CONTACT_URL: 'https://app.engagebay.com/dev/api/panel/subscribers/subscriber',
        DEAL_URL: 'https://app.engagebay.com/dev/api/panel/deals/deal',
        UPDATE_CONTACT_URL: 'https://app.engagebay.com/dev/api/panel/subscribers/update-partial',
        DELETE_CONTACT_TAG_URL: 'https://app.engagebay.com/dev/api/panel/subscribers/contact/tags/delete/'
    },
    AGENCY_UPLOAD_TALNET_FILE: {
        ALLOWED_TYPE: ['text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
    },
    INTERVIEW: {
        TIMESLOT: {
            MIN: 1,
            MAX: 3
        }
    },
    BRIEF: {
        TITLE: {
            LENGTH: {
                MIN: 2,
                MAX: 70
            }
        },
        DESCRIPTION: {
            LENGTH: {
                MIN: 2,
                MAX: 5000
            }
        },
        STATUS: {
            ACTIVE: 1,
            INACTIVE: 0
        },
        STEP: {
            BASIC_DETAILS: 1,
            PREFERRED_CANDIDATES: 2,
            ROLE: 1,
            ENGAGEMENT: 3
        },
        APPLY: {
            NOTES_OF_MOTIVATION: {
                LENGTH: {
                    MIN: 2,
                    MAX: 5000
                }
            }
        },
        TALENT: {
            STATUS: {
                APPLIED: 1,
                INTERVIEW: 2,
                SHORTLISTED: 3,
                HIRED: 4,
                REJECTED: 5,
                VALID_ACTION_LIST: { 1: [2, 3, 4, 5], 2: [3, 4, 5], 3: [4, 5], 4: [4, 5], 5: [2, 3, 4] }
            }
        }
    },
    QUOTE: {
        TITLE: {
            LENGTH: {
                MIN: 2,
                MAX: 70
            }
        },
        DESCRIPTION: {
            LENGTH: {
                MIN: 2,
                MAX: 1500
            }
        },
        ATTACHMENT: {
            SIZE: 50 * 1024 * 1024
        },
        ASSUMPTIONS: {
            LENGTH: {
                MIN: 2,
                MAX: 1000
            }
        },
        OUT_OF_SCOPE: {
            LENGTH: {
                MIN: 2,
                MAX: 1000
            }
        },
        TEAM_STRUCTURE: {
            LENGTH: {
                MIN: 2,
                MAX: 1000
            }
        },
        OTHER_INFO: {
            LENGTH: {
                MIN: 2,
                MAX: 1000
            }
        }
    },
    SUBMIT_QUOTE: {
        ATTACHMENT: {
            SIZE: 50 * 1024 * 1024
        }
    },
    TALENT_UPLOAD_CV_FILE: {
        ALLOWED_TYPE: ['application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'text/plain']
    },
    SOVERN_PARSE_URL: 'https://eu-rest.resumeparsing.com/v9/parser/resume',
    FEATURE_FLAG: {
        ACTIVE: 1,
        INACTIVE: 0
    },
    BRIEF_FILTERS: {
        DATE_POSTED: ['All', 'Last 24 hours', 'Last 7 days', 'Last 14 days', 'Last 30 days'],
        APPLIED: ['All', 'Applied', 'Not Applied']
    },
    TIMESHEET: {
        VALID_VALUES: [0, 1, 0.5],
        HOURS: {
            LENGTH: {
                MIN: 0,
                MAX: 18
            }
        },
        MINUTES: {
            LENGTH: {
                MIN: 0,
                MAX: 59
            }
        },
        STATUS: {
            SUBMITTED: 0,
            ACCEPT: 1,
            IN_REVIEW: 2,
            DRAFT: 3,
            SETTELED: 4
        },
        STATUS_STRING: ['Submitted', 'Accepted', 'In review', 'Draft', 'Setteled'],
        STATUS_LIST: [0, 1, 2, 3, 4],
        ADMIN_STATUS: [0, 1, 2, 3, 4],
        CLIENT_STATUS: [0, 1, 2, 4],
        TALENT_STATUS: [0, 1, 2, 3, 4],
        AGENT_STATUS: [0, 1, 2, 3, 4],
        DAY: {
            HOURS: 7.5
        }
    },
    SKILL_NAME: {
        LENGTH: {
            MIN: 2,
            MAX: 50
        },
        MAX: 40
    },
    PROJECT_SKILLS: {
        LENGTH: {
            MIN: 1,
            MAX: 7
        },
        RATING_LIMIT: {
            ALLOW: 2
        }
    },
    CERTIFICATIONS: {
        LENGTH: {
            MIN: 2,
            MAX: 200
        }
    },
    INDUSTRY: {
        LENGTH: {
            MIN: 2,
            MAX: 200
        }
    },
    TEAM_WORKING: [
        'Team Player', 'Individual Contributors', 'Efficiency Experts'
    ],
    DISC_PROFILE: [
        'D - Style',
        'I - Style',
        'S - Style',
        'C - Style',
        'DI - Style',
        'ID - Style',
        'DC - Style',
        'CD - Style',
        'IS - Style',
        'SI - Style',
        'SC - Style',
        'CS - Style'
    ],
    COMPANY_TYPE: [
        'start-up', 'scale-up', 'medium', 'large'
    ],
    COMPANY_TYPE_LABEL: {
        'start-up' :'Start-up (1 - 20 FTE)',
        'scale-up': 'Scale-up (21 - 150 FTE)', 
        'medium':'Medium enterprise (151 - 500 FTE)', 
        'large': 'Large enterprise  (500+ FTE)'
    },
    PREFERRED_PROJECT_DURATION: [
        'short-term', 'mid-term', 'long-term'
    ],
    PREFERRED_PROJECT_DURATION_LABEL: {
        'short-term':'Short-term (<6 months)', 'mid-term':'Mid-term (6 -12 months)', 'long-term':'Long-term (12 months or longer)'
    },
    COMPANY_CULTURE: {
        LENGTH: {
            MIN: 2,
            MAX: 200
        }
    },
    HR_EMAIL: {
        local: [ 'cm-talent@yopmail.com'],
        staging: [ 'cm-talent@yopmail.com'],
        testing: [ 'cm-talent@yopmail.com'],
        development: [ 'cm-talent@yopmail.com'],
        production: ['cm-talent@codemonk.ai']
    },
    REFERRAL: {
        REFEREE: {
            STATUS: ['Invited', 'Registered', 'Active', 'Verified', 'Hired']
        }
    },
    HUBSPOT: {
        PLATFORM_STATUSES: {
            REGISTERED: 'Signed-Up',
            ACTIVE: 'Active',
            SUSPENDED: 'Suspended'
        }
    }
};
