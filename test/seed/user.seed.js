const mongoose = require('mongoose');
const password = '66f843c337a83380f708d570a503b4a0:a9a910ce8fb6c5442cabf2b0a75698c8f04d\
258dd084924bcd493a05f9024c7ef5a3692c70ab6d15f3f7741501f60284ce0416308af4c02c1b7db22b8a6\
612fcb70ecf3551fc0d83b055edca0d7c89bc';
const industries = ['Accounting', 'Airlines/Aviation', 'Alternative Dispute Resolution', 'Alternative Medicine', 'Animation', 'Apparel & Fashion', 'Architecture & Planning', 'Arts and Crafts', 'Automotive', 'Aviation & Aerospace', 'Banking', 'Biotechnology', 'Broadcast Media', 'Building Materials', 'Business Supplies and Equipment', 'Capital Markets', 'Chemicals', 'Civic & Social Organization', 'Civil Engineering', 'Commercial Real Estate', 'Computer & Network Security', 'Computer Games', 'Computer Hardware', 'Computer Networking', 'Computer Software', 'Construction', 'Consumer Electronics', 'Consumer Goods', 'Consumer Services', 'Cosmetics', 'Dairy', 'Defense & Space', 'Design', 'Education Management', 'E-Learning', 'Electrical/Electronic Manufacturing', 'Entertainment', 'Environmental Services', 'Events Services', 'Executive Office', 'Facilities Services', 'Farming', 'Financial Services', 'Fine Art', 'Fishery', 'Food & Beverages', 'Food Production', 'Fund-Raising', 'Furniture', 'Gambling & Casinos', 'Glass, Ceramics & Concrete', 'Government Administration', 'Government Relations', 'Graphic Design', 'Health, Wellness and Fitness', 'Higher Education', 'Hospital & Health Care', 'Hospitality', 'Human Resources', 'Import and Export', 'Individual & Family Services', 'Industrial Automation', 'Information Services', 'Information Technology and Services', 'Insurance', 'International Affairs', 'International Trade and Development', 'Internet', 'Investment Banking', 'Investment Management', 'Judiciary', 'Law Enforcement', 'Law Practice', 'Legal Services', 'Legislative Office', 'Leisure, Travel & Tourism', 'Libraries', 'Logistics and Supply Chain', 'Luxury Goods & Jewelry', 'Machinery', 'Management Consulting', 'Maritime', 'Marketing and Advertising', 'Market Research', 'Mechanical or Industrial Engineering', 'Media Production', 'Medical Devices', 'Medical Practice', 'Mental Health Care', 'Military', 'Mining & Metals', 'Motion Pictures and Film', 'Museums and Institutions', 'Music', 'Nanotechnology', 'Newspapers', 'Nonprofit Organization Management', 'Oil & Energy', 'Online Media', 'Outsourcing/Offshoring', 'Package/Freight Delivery', 'Packaging and Containers', 'Paper & Forest Products', 'Performing Arts', 'Pharmaceuticals', 'Philanthropy', 'Photography', 'Plastics', 'Political Organization', 'Primary/Secondary Education', 'Printing', 'Professional Training & Coaching', 'Program Development', 'Public Policy', 'Public Relations and Communications', 'Public Safety', 'Publishing', 'Railroad Manufacture', 'Ranching', 'Real Estate', 'Recreational Facilities and Services', 'Religious Institutions', 'Renewables & Environment', 'Research', 'Restaurants', 'Retail', 'Security and Investigations', 'Semiconductors', 'Shipbuilding', 'Sporting Goods', 'Sports', 'Staffing and Recruiting', 'Supermarkets', 'Telecommunications', 'Textiles', 'Think Tanks', 'Tobacco', 'Translation and Localization', 'Transportation/Trucking/Railroad', 'Utilities', 'Venture Capital & Private Equity', 'Veterinary', 'Warehousing', 'Wholesale', 'Wine and Spirits', 'Wireless', 'Writing and Editing'];
const industriesArr = industries.map((i) => {
    return {
        name: i, active: 1,
        createdAt: new Date(),
        updatedAt: new Date()
    };
});

const cultures = [
    'Accountability', 'Commitment to Customers', 'Constant Improvement', 'Continuous Learning', 'Diversity', 'Fun', 'Honesty', 'Humility', 'Innovation', 'Integrity', 'Leadership', 'Ownership', 'Passion', 'Quality', 'Teamwork', 'Trust',
    'Creativity', 'Variety', 'Self-Development', 'Structure', 'Security', 'Influence', 'Prestige', 'Performance', 'Financial Reward', 'Work-Life Balance', 'Working Conditions', 'Work Relationships', 'Altruism', 'Autonomy'
];

const culturesArr = cultures.map((i) => {
    return {
        name: i, active: 1,
        createdAt: new Date(),
        updatedAt: new Date()
    };
});
module.exports = {
    users: [{
        _id: mongoose.Types.ObjectId('5f155daa4a4f44532bcdef67'),
        isActive: 1,
        otp: 123456,
        phoneOtp: 0,
        isDelete: 0,
        email: 'perfecttalent@mailinator.com',
        password: password,
        role: 1,
        firstName: 'Perfect',
        lastName: 'Talent'
    },
    {
        _id: mongoose.Types.ObjectId('5f083c352a7908662c334532'),
        email: 'talent@mailinator.com',
        password: password,
        role: 1,
        isActive: 1,
        opt: 123456,
        firstName: 'talent',
        lastName: 'last'
    },
    {
        _id: mongoose.Types.ObjectId('5f083c352a7908662c334533'),
        email: 'client@mailinator.com',
        password: password,
        role: 2,
        isActive: 1,
        firstName: 'client',
        lastName: 'last'
    },
    {
        _id: mongoose.Types.ObjectId('5f083c352a7908662c334534'),
        email: 'clientonboard@mailinator.com',
        password: password,
        role: 2,
        isActive: 1
    },
    {
        _id: mongoose.Types.ObjectId('5f083c352a7908662c334535'),
        email: 'inactive@mailinator.com',
        password: password,
        role: 1,
        isActive: 0
    },
    {
        _id: mongoose.Types.ObjectId('5f05c940aff1590c69b00906'),
        email: 'clientcompany@mailinator.com',
        password: password,
        role: 2,
        isActive: 1
    },
    {
        _id: mongoose.Types.ObjectId('5f084e0cd8282d0262380eac'),
        email: 'clientindividual@mailinator.com',
        password: password,
        role: 2,
        isActive: 1
    },
    {
        _id: mongoose.Types.ObjectId('5f08589760b8ea193e426d5f'),
        email: 'clientindividualcompany@mailinator.com',
        password: password,
        role: 2,
        isActive: 1
    },
    {
        _id: mongoose.Types.ObjectId('5f2d3e4eba0dae43224ae38d'),
        email: 'clientcompanyprofile@mailinator.com',
        password: password,
        role: 2,
        isActive: 1
    },
    {
        _id: mongoose.Types.ObjectId('5f5335172317791e189ac32d'),
        email: 'agencybefore@mailinator.com',
        password: password,
        role: 3,
        isActive: 1
    },
    {
        _id: mongoose.Types.ObjectId('5f475a9ef25e122eb21d68a8'),
        email: 'agency@mailinator.com',
        password: password,
        role: 3,
        isActive: 1
    },
    {
        _id: mongoose.Types.ObjectId('5f4754eb3fc8842306a8220d'),
        isActive: 1,
        otp: 365736,
        phoneOtp: 0,
        isDelete: 0,
        email: 'agencystart@mailinator.com',
        password: '4c84c82de705aabcf74009e221cebcd8:068fe00aef80d4ee1d94e0c59b250a2986a1552a1918faddf3fc446927e56205b3fba7c3943c708c18f6c30f66b60a891cc2c7b0cce978c84a7e3625462ac21cbecfe020a72d2575f68930f63644bf45',
        role: 3,
        firstName: 'Agency',
        lastName: 'Last'
    },
    {
        _id: mongoose.Types.ObjectId('5f523e4a7e416a76f64ea920'),
        firstName: 'Talent One',
        lastName: 'Talent Last One',
        email: 'talent1@mailinator.com',
        password: password,
        isActive: 1,
        role: 1
    },
    {
        _id: mongoose.Types.ObjectId('5f523e4a7e416a76f64ea921'),
        firstName: 'Talent Two',
        lastName: 'Talent Last Two',
        email: 'talent2@mailinator.com',
        password: password,
        isActive: 1,
        role: 1
    },
    {
        _id: mongoose.Types.ObjectId('60a39696e4e06c845b06fe19'),
        firstName: 'Talent Two',
        lastName: 'Talent Last Two',
        email: 'resetpasstalent@mailinator.com',
        password: password,
        isActive: 0,
        role: 1
    },
    {
        _id: mongoose.Types.ObjectId('5f5f2cd2f1472c3303b6b861'),
        email: 'super@codemonk.ai',
        password: password,
        role: 4,
        isActive: 1,
        firstName: 'Codemonk',
        lastName: 'Admin'
    },
    {
        _id: mongoose.Types.ObjectId('5f30f3920997b6547a590f94'),
        email: 'clientsuspend@mailinator.com',
        password: password,
        role: 2,
        isActive: 2
    }, {
        _id: mongoose.Types.ObjectId('5f4e0dcbae932622307694d1'),
        email: 'agencyuser@yopmail.com',
        password: password,
        role: 3,
        isActive: 1
    },
    {
        _id: mongoose.Types.ObjectId('5f1e76e1035cad67d670f41f'),
        email: 'clientemailchange@mailinator.com',
        password: password,
        role: 2,
        isActive: 1,
        firstName: 'client',
        lastName: 'Email change'
    },
    {
        _id: mongoose.Types.ObjectId('5f155e494a4f44532bcdef69'),
        email: 'skippedwithoutrate@mailinator.com',
        password: password,
        role: 1,
        isActive: 1,
        firstName: 'Skipped',
        lastName: 'Step 7'
    },
    {
        _id: mongoose.Types.ObjectId('5f06d38bdc117a399f7c295e'),
        email: 'skippedwitoutproof@mailinator.com',
        password: password,
        role: 1,
        isActive: 1,
        firstName: 'Skipped',
        lastName: 'Step 7'
    },
    {
        _id: mongoose.Types.ObjectId('5f8ee575c4336d791164610e'),
        email: 'skippedwithoutpay@mailinator.com',
        password: password,
        role: 1,
        isActive: 1,
        firstName: 'Skipped',
        lastName: 'Step 7'
    },
    {
        _id: mongoose.Types.ObjectId('5f57356134ed4c3769525b2c'),
        email: 'skippedwithoutbilling@mailinator.com',
        password: password,
        role: 1,
        isActive: 1,
        firstName: 'Skipped',
        lastName: 'Step 7'
    },
    {
        _id: mongoose.Types.ObjectId('5fb610d69a7dce1aaf7b419d'),
        email: 'fullto@mailinator.com',
        password: password,
        role: 1,
        isActive: 1,
        firstName: 'Skipped',
        lastName: 'Step 7'
    },
    {
        _id: mongoose.Types.ObjectId('5f171359677e5734addddcab'),
        email: 'uploadcv@mailinator.com',
        password: password,
        role: 1,
        isActive: 1,
        firstName: 'Upload',
        lastName: 'CV'
    },
    {
        _id: mongoose.Types.ObjectId('61f92818101d1714199f282d'),
        email: 'not_verified_profile_user1@mailinator.com',
        password: password,
        role: 1,
        isActive: 1,
        firstName: 'User1',
        lastName: 'verified_profile'
    },
    {
        _id: mongoose.Types.ObjectId('61f92824db5ea8bd184ad731'),
        email: 'verified_profile_user2@mailinator.com',
        password: password,
        role: 1,
        isActive: 1,
        firstName: 'User2',
        lastName: 'verified_profile'
    },
    {
        _id: mongoose.Types.ObjectId('61f9282f8f88637cc19d7fba'),
        email: 'verified_profile_user3@mailinator.com',
        password: password,
        role: 1,
        isActive: 1,
        firstName: 'User3',
        lastName: 'verified_profile'
    },
    {
        _id: mongoose.Types.ObjectId('620a449b8ecd7f654bf64b87'),
        email: 'recruiter@mailinator.com',
        password: password,
        role: 5,
        isActive: 1,
        opt: 123456,
        firstName: 'recruiter',
        lastName: 'last'
    },
    {
        _id: mongoose.Types.ObjectId('620b2fa709dae3d2df2279a9'),
        email: 'recruitercompanyprofile@mailinator.com',
        password: password,
        role: 5,
        isActive: 1
    },
    {
        _id: mongoose.Types.ObjectId('620b308de128d8fad6ff95cd'),
        email: 'recruitersuspend@mailinator.com',
        password: password,
        role: 2,
        isActive: 2
    },
    {
        _id: mongoose.Types.ObjectId('62139448f1245be0da3a7360'),
        email: 'downloaddocument@mailinator.com',
        password: password,
        role: 1,
        isActive: 1,
        firstName: 'Download',
        lastName: 'Docs'
    },
    {
        _id: mongoose.Types.ObjectId('621def15252b22fd20837dd6'),
        email: 'ambassadorcompanyprofile@mailinator.com',
        password: password,
        role: 6,
        isActive: 1
    },
    {
        _id: mongoose.Types.ObjectId('621e21ccecb647c370940ab1'),
        email: 'ambassadorsuspend@mailinator.com',
        password: password,
        role: 6,
        isActive: 2
    }],
    talent: [{
        _id: mongoose.Types.ObjectId('61f9292ce72261c29294318f'),
        userId: mongoose.Types.ObjectId('61f92818101d1714199f282d')
    },
    {
        _id: mongoose.Types.ObjectId('61f9293704f4b80bc8e0ccb1'),
        userId: mongoose.Types.ObjectId('61f92824db5ea8bd184ad731'),
        verifiedProfile: true
    },
    {
        _id: mongoose.Types.ObjectId('61f9293fb9716e26fc54eff7'),
        userId: mongoose.Types.ObjectId('61f9282f8f88637cc19d7fba'),
        verifiedProfile: true
    },
    {
        _id: mongoose.Types.ObjectId('5f1e76e1035cad67d670f420'),
        teamPreference: ['individuals'],
        assignments: [],
        userId: mongoose.Types.ObjectId('5f155daa4a4f44532bcdef67'),
        language: [{
            _id: mongoose.Types.ObjectId('5f57340234ed4c3769525b29'),
            name: 'af',
            rate: 6
        }, {
            _id: mongoose.Types.ObjectId('5f57340234ed4c3769525b2a'),
            name: 'sq',
            rate: 9
        }],
        skills: [{
            _id: mongoose.Types.ObjectId('5f57338b34ed4c3769525b24'),
            name: 'Adobe Illustrator',
            rate: 8
        }, {
            _id: mongoose.Types.ObjectId('5f57338b34ed4c3769525b25'),
            name: 'Amazon Kinesis',
            rate: 9
        }],
        projectDetails: [{
            _id: mongoose.Types.ObjectId('5f1e82535cf4ab74c62a36b6'),
            name: 'test',
            url: '',
            description: '<p>e the 1500s, when an unknown printer/p>\n',
            role: 'Product (UI) designer',
            keyAchievements: '<p>so the leap into electronic typesetting, remaining essentially unchanged.</p>\n'
        }],
        educationDetails: [{
            _id: mongoose.Types.ObjectId('5f5733ee34ed4c3769525b28'),
            degreeLevel: 'Bachelor’s',
            degreeTitle: 'Computer Science',
            collegeName: 'IETE',
            country: 'Albania',
            startYear: 2017,
            endYear: 2017
        }],
        certificateDetails: [],
        unavailability: [],
        workExperience: [{
            _id: mongoose.Types.ObjectId('5f1e82755cf4ab74c62a36b7'),
            jobTitle: 'Sr. Software En',
            employmentType: 'Temporary',
            employer: 'Temp',
            country: 'Benin',
            startDate: new Date('2020-07-01T00:00:00.000Z'),
            endDate: new Date('2020-07-27T00:00:00.000Z'),
            shortDescription: '<p>It has survived not only five centuries,psum passages, f Lorem Ipsum.</span></p>\n'
        }],
        addressLineOne: 'Del street',
        addressLineTwo: '',
        city: 'East, United Kingdom',
        country: 'Spain',
        dob: new Date('2002-06-30T00:00:00.000Z'),
        gender: 'Male',
        postcode: 'DEW321',
        signupStep: 7,
        timeZone: 'Etc/GMT-11',
        gitHubUrl: '',
        linkedInUrl: 'https://www.linkedin.com/in/parikh-hitesh-8035b217/',
        primaryRole: 'UX Manager',
        professionalSummary: '<p>Lorem Ipsum is simply dummy text of aining essentially unchanged. It was popul</p>\n',
        stackOverFlowUrl: '',
        yearsOfExperience: 'Senior - 8 - 12 yrs',
        isActive: 1,
        registerType: 'freelancer',
        availability: false,
        workPreference: ['fulltime'],
        addressProofUrl: 'local-documents/5f1e76e1035cad67d670f41f/addressProof/openw.jpg',
        idProofUrl: 'local-documents/5f1e76e1035cad67d670f41f/idProof/men.jpg',
        billing: {
            type: 'freelancer'
        },
        currency: 'GBP',
        pay: {
            type: 'bank',
            bankDetails: {
                name: 'State Bank of India',
                accNumber: '1234567890',
                bankCode: 'SBII12346'
            }
        },
        ratePerHour: 56,
        code: 'abc123'
    },
    {
        _id: mongoose.Types.ObjectId('5f083e2f069b6c6a7de3a951'),
        userId: mongoose.Types.ObjectId('5f083c352a7908662c334532')
    },
    {
        _id: mongoose.Types.ObjectId('5f083e2f069b6c6a7de3a950'),
        userId: mongoose.Types.ObjectId('5f523e4a7e416a76f64ea920'),
        registerType: 'agency',
        currency: 'USD',
        ratePerHour: 25,
        primaryRole: 'Developer',
        availability: true,
        workPreference: ['fulltime']
    },
    {
        _id: mongoose.Types.ObjectId('5f083e2f069b6c6a7de3a952'),
        userId: mongoose.Types.ObjectId('5f523e4a7e416a76f64ea921'),
        registerType: 'agency',
        currency: 'USD',
        ratePerHour: 25,
        primaryRole: 'Project Manager',
        signupStep: 6,
        projectDetails: [{
            _id: mongoose.Types.ObjectId('5f8eedf1c4336d7911646112'),
            name: 'Test',
            url: '',
            description: '<p>test0123456789test0123456789test0123456789test0123456789</p>',
            role: 'Product (UI) designer',
            keyAchievements: '<p>test0123456789test0123456789test0123456789test0123456789</p>'
        }],
        workExperience: [{
            _id: mongoose.Types.ObjectId('5f8eedffc4336d7911646113'),
            jobTitle: 'Sr. Software Engineer',
            employmentType: 'Parttime',
            employer: 'Innovify Business intelligence',
            country: 'Algeria',
            startDate: new Date('2020-10-19'),
            endDate: new Date('2020-10-20'),
            isPresent: false,
            ShortDescription: '<p>sd sd sadsadsad</p>'
        }],
        educationDetails: [{
            _id: mongoose.Types.ObjectId('5f8eee0bc4336d7911646114'),
            degreeLevel: 'Bachelor’s',
            degreeTitle: 'Computer Science',
            collegeName: 'IETE',
            country: 'Albania',
            startYear: 2017,
            endYear: 2020
        }],
        certificateDetails: [{
            _id: mongoose.Types.ObjectId('5fbcb0a43b00df2f745de965'),
            name: 'shaping-up-with-angular-js'
        }]
    },
    {
        _id: mongoose.Types.ObjectId('5f155e494a4f44532bcdef6a'),
        teamPreference: [],
        assignments: [],
        userId: mongoose.Types.ObjectId('5f155e494a4f44532bcdef69'),
        language: [{
            _id: mongoose.Types.ObjectId('5f1572b576230703279490cb'),
            name: 'aa',
            rate: 7
        }],
        skills: [{
            _id: mongoose.Types.ObjectId('5f1572bf76230703279490cc'),
            name: 'Amazon Redshift',
            rate: 9
        }],
        projectDetails: [{
            _id: mongoose.Types.ObjectId('5f1572c276230703279490cd'),
            name: 'Test',
            url: '',
            description: '<p>test0123456789test0123456789test0123456789test0123456789</p>\n',
            role: 'Product (UI) designer',
            keyAchievements: '<p>test0123456789test0123456789test0123456789test0123456789</p>\n'
        }],
        educationDetails: [{
            _id: mongoose.Types.ObjectId('5f1572c876230703279490cf'),
            degreeLevel: 'Bachelor’s',
            degreeTitle: 'test',
            collegeName: 'test',
            country: 'Algeria',
            startDate: '2020-06-29T00:00:00.000Z',
            endDate: '2020-07-15T00:00:00.000Z',
            startYear: 2020,
            endYear: 2020
        }],
        certificateDetails: [],
        unavailability: [],
        workExperience: [{
            _id: mongoose.Types.ObjectId('5f1572c576230703279490ce'),
            jobTitle: 'test',
            employmentType: 'Parttime',
            employer: 'test',
            country: 'Algeria',
            startDate: '2020-06-29T00:00:00.000Z',
            endDate: '2020-07-20T00:00:00.000Z',
            shortDescription: '<p>wefdsfdsf</p>\n'
        }],
        updatedAt: '2020-07-20T09:05:13.406Z',
        __v: 0,
        addressLineOne: 'Del street',
        addressLineTwo: null,
        city: 'East, United Kingdom',
        country: 'Albania',
        dob: '2002-06-30T18:30:00.000Z',
        gender: 'Male',
        postcode: 'DEW321',
        signupStep: 6,
        timeZone: 'Etc/GMT-12',
        professionalSummary: '<p>sadasdasdsadsadsadasadasdasdsadsadsadasadasdasdsadsadsada</p>\n',
        primaryRole: 'Product (UI) designer',
        gitHubUrl: '',
        linkedInUrl: '',
        stackOverFlowUrl: '',
        yearsOfExperience: 'Senior - 8 - 12 yrs',
        availability: true,
        workPreference: ['fulltime'],
        isActive: 1,
        registerType: 'freelancer',
        pay: {
            type: 'bank',
            bankDetails: {
                name: 'State Bank of India',
                accNumber: '1234567890',
                bankCode: 'SBII12346'
            }
        },
        billing: {
            companyDetails: {
                addressLineOne: 'My Address',
                addressLineTwo: '',
                city: 'Ahmedabad',
                country: 'American Samoa',
                name: 'My Com',
                registeredNumber: 'AVCC',
                vatNumber: '',
                website: '',
                postcode: '380015'
            },
            companyInsurance: {
                employerInsuranceValue: 1111,
                professionInsuranceValue: 12233,
                publicInsurancesValue: 1122
            },
            type: 'company',
            companyDocument: {
                incorporationCertificateUrl: 'companyIncorporationCertificateUrl/men.jpg',
                vatRegistrationCertificateUrl: 'companyVatRegistrationCertificateUrl/RecOut_Branch_Strategy.pdf',
                insuranceDocumentUrl: 'companyInsuranceDocumentUrl/INV-0045.pdf'
            }
        },
        idProofUrl: 'idProof/big.jpg',
        addressProofUrl: 'addressProof/openw.jpg'
    },
    {
        _id: mongoose.Types.ObjectId('5f06d38bdc117a399f7c295f'),
        teamPreference: ['x-large-team'],
        assignments: [],
        userId: mongoose.Types.ObjectId('5f06d38bdc117a399f7c295e'),
        language: [{
            _id: mongoose.Types.ObjectId('5f06d403dc117a399f7c2960'),
            name: 'sq',
            rate: 9
        }],
        skills: [{
            _id: mongoose.Types.ObjectId('5f06d411dc117a399f7c2961'),
            name: 'Amazon Kinesis',
            rate: 8
        }],
        projectDetails: [{
            _id: mongoose.Types.ObjectId('5f06d42fdc117a399f7c2962'),
            name: 'sds sdsad',
            url: '',
            description: '<p>dsaddssadsadsadsadsadsa sadsadsadsa dsad</span></p>\n',
            role: 'Data Scientist',
            keyAchievements: '<p>dsaddssadsadsadsadsadsa dsaddssadsadsadsadsadsa dsad</span></p>\n'
        }],
        educationDetails: [],
        certificateDetails: [],
        unavailability: [],
        workExperience: [{
            _id: mongoose.Types.ObjectId('5f06d43edc117a399f7c2963'),
            jobTitle: 'sdsad dsfsadsa',
            employmentType: 'Fulltime',
            employer: 'HDFC',
            country: 'Albania',
            startDate: '2020-06-30T00:00:00.000Z',
            endDate: '2020-07-02T00:00:00.000Z',
            shortDescription: '<p>dssadsadsadsadsadsa dsad</span></p>\n'
        }],
        updatedAt: '2020-07-09T08:21:31.673Z',
        __v: 0,
        addressLineOne: 'Aviation House, 125 Kingsway',
        addressLineTwo: 'uhkjhjk',
        city: 'London',
        country: 'Algeria',
        dob: '2002-07-07T18:30:00.000Z',
        gender: 'Male',
        postcode: 'WC2B 6NH',
        signupStep: 6,
        timeZone: 'Etc/GMT-11',
        gitHubUrl: '',
        linkedInUrl: '',
        primaryRole: 'UX Manager',
        professionalSummary: '<p>sadsadsadsadsadsadsadsadsa dsad sadsa dsa dsa dsad sa dsadasdsadsa dq</p>\n',
        stackOverFlowUrl: '',
        yearsOfExperience: 'Senior - 8 - 12 yrs',
        availability: true,
        workPreference: ['fulltime'],
        currency: 'USD',
        ratePerHour: 400,
        pay: {
            type: 'bank',
            bankDetails: {
                name: 'State Bank of India',
                accNumber: '1234567890',
                bankCode: 'SBII12346'
            }
        },
        billing: {
            companyDetails: {
                addressLineOne: 'My Address',
                addressLineTwo: '',
                city: 'Ahmedabad',
                country: 'American Samoa',
                name: 'My Com',
                registeredNumber: 'AVCC',
                vatNumber: '',
                website: '',
                postcode: '380015'
            },
            companyInsurance: {
                employerInsuranceValue: 1111,
                professionInsuranceValue: 12233,
                publicInsurancesValue: 1122
            },
            type: 'company',
            companyDocument: {
                incorporationCertificateUrl: 'companyIncorporationCertificateUrl/men.jpg',
                vatRegistrationCertificateUrl: 'companyVatRegistrationCertificateUrl/RecOut_Branch_Strategy.pdf',
                insuranceDocumentUrl: 'companyInsuranceDocumentUrl/INV-0045.pdf'
            }
        },
        isActive: 1,
        registerType: 'freelancer',
        isPaymenySkipped: true
    },
    {
        _id: mongoose.Types.ObjectId('5f8ee575c4336d791164610f'),
        teamPreference: [],
        assignments: [],
        userId: mongoose.Types.ObjectId('5f8ee575c4336d791164610e'),
        language: [{
            _id: mongoose.Types.ObjectId('5f1572b576230703279490cb'),
            name: 'aa',
            rate: 7
        }],
        skills: [{
            _id: mongoose.Types.ObjectId('5f1572bf76230703279490cc'),
            name: 'Amazon Redshift',
            rate: 9
        }],
        projectDetails: [{
            _id: mongoose.Types.ObjectId('5f1572c276230703279490cd'),
            name: 'Test',
            url: '',
            description: '<p>test0123456789test0123456789test0123456789test0123456789</p>\n',
            role: 'Product (UI) designer',
            keyAchievements: '<p>test0123456789test0123456789test0123456789test0123456789</p>\n'
        }],
        educationDetails: [{
            _id: mongoose.Types.ObjectId('5f1572c876230703279490cf'),
            degreeLevel: 'Bachelor’s',
            degreeTitle: 'test',
            collegeName: 'test',
            country: 'Algeria',
            startDate: '2020-06-29T00:00:00.000Z',
            endDate: '2020-07-15T00:00:00.000Z',
            startYear: 2020,
            endYear: 2020
        }],
        certificateDetails: [],
        unavailability: [],
        workExperience: [{
            _id: mongoose.Types.ObjectId('5f1572c576230703279490ce'),
            jobTitle: 'test',
            employmentType: 'Parttime',
            employer: 'test',
            country: 'Algeria',
            startDate: '2020-06-29T00:00:00.000Z',
            endDate: '2020-07-20T00:00:00.000Z',
            shortDescription: '<p>wefdsfdsf</p>\n'
        }],
        updatedAt: '2020-07-20T09:05:13.406Z',
        __v: 0,
        addressLineOne: 'Del street',
        addressLineTwo: null,
        city: 'East, United Kingdom',
        country: 'Albania',
        dob: '2002-06-30T18:30:00.000Z',
        gender: 'Male',
        postcode: 'DEW321',
        signupStep: 6,
        timeZone: 'Etc/GMT-12',
        professionalSummary: '<p>sadasdasdsadsadsadasadasdasdsadsadsadasadasdasdsadsadsada</p>\n',
        primaryRole: 'Product (UI) designer',
        gitHubUrl: '',
        linkedInUrl: '',
        stackOverFlowUrl: '',
        yearsOfExperience: 'Senior - 8 - 12 yrs',
        availability: true,
        workPreference: ['fulltime'],
        isActive: 1,
        registerType: 'freelancer',
        idProofUrl: 'idProof/big.jpg',
        addressProofUrl: 'addressProof/openw.jpg',
        currency: 'USD',
        ratePerHour: 400,
        billing: {
            companyDetails: {
                addressLineOne: 'My Address',
                addressLineTwo: '',
                city: 'Ahmedabad',
                country: 'American Samoa',
                name: 'My Com',
                registeredNumber: 'AVCC',
                vatNumber: '',
                website: '',
                postcode: '380015'
            },
            companyInsurance: {
                employerInsuranceValue: 1111,
                professionInsuranceValue: 12233,
                publicInsurancesValue: 1122
            },
            type: 'company',
            companyDocument: {
                incorporationCertificateUrl: 'companyIncorporationCertificateUrl/men.jpg',
                vatRegistrationCertificateUrl: 'companyVatRegistrationCertificateUrl/RecOut_Branch_Strategy.pdf',
                insuranceDocumentUrl: 'companyInsuranceDocumentUrl/INV-0045.pdf'
            }
        }
    },
    {
        _id: mongoose.Types.ObjectId('5f57356134ed4c3769525b2d'),
        teamPreference: ['x-large-team'],
        assignments: [],
        userId: mongoose.Types.ObjectId('5f57356134ed4c3769525b2c'),
        language: [{
            _id: mongoose.Types.ObjectId('5f06d403dc117a399f7c2960'),
            name: 'sq',
            rate: 9
        }],
        skills: [{
            _id: mongoose.Types.ObjectId('5f06d411dc117a399f7c2961'),
            name: 'Amazon Kinesis',
            rate: 8
        }],
        projectDetails: [{
            _id: mongoose.Types.ObjectId('5f06d42fdc117a399f7c2962'),
            name: 'sds sdsad',
            url: '',
            description: '<p>dsaddssadsadsadsadsadsa sadsadsadsa dsad</span></p>\n',
            role: 'Data Scientist',
            keyAchievements: '<p>dsaddssadsadsadsadsadsa dsaddssadsadsadsadsadsa dsad</span></p>\n'
        }],
        educationDetails: [],
        certificateDetails: [],
        unavailability: [],
        workExperience: [{
            _id: mongoose.Types.ObjectId('5f06d43edc117a399f7c2963'),
            jobTitle: 'sdsad dsfsadsa',
            employmentType: 'Fulltime',
            employer: 'HDFC',
            country: 'Albania',
            startDate: '2020-06-30T00:00:00.000Z',
            endDate: '2020-07-02T00:00:00.000Z',
            shortDescription: '<p>dssadsadsadsadsadsa dsad</span></p>\n'
        }],
        updatedAt: '2020-07-09T08:21:31.673Z',
        __v: 0,
        addressLineOne: 'Aviation House, 125 Kingsway',
        addressLineTwo: 'uhkjhjk',
        city: 'London',
        country: 'Algeria',
        dob: '2002-07-07T18:30:00.000Z',
        gender: 'Male',
        postcode: 'WC2B 6NH',
        signupStep: 6,
        timeZone: 'Etc/GMT-11',
        gitHubUrl: '',
        linkedInUrl: '',
        primaryRole: 'UX Manager',
        professionalSummary: '<p>sadsadsadsadsadsadsadsadsa dsad sadsa dsa dsa dsad sa dsadasdsadsa dq</p>\n',
        stackOverFlowUrl: '',
        yearsOfExperience: 'Senior - 8 - 12 yrs',
        availability: true,
        workPreference: ['fulltime'],
        idProofUrl: 'idProof/big.jpg',
        addressProofUrl: 'addressProof/openw.jpg',
        currency: 'USD',
        ratePerHour: 400,
        pay: {
            type: 'paypal',
            paypalEmail: 'example@example.com'
        },
        isActive: 1,
        registerType: 'freelancer',
        isPaymenySkipped: true
    },
    {
        _id: mongoose.Types.ObjectId('5fb610d69a7dce1aaf7b419e'),
        teamPreference: [],
        assignments: [],
        userId: mongoose.Types.ObjectId('5fb610d69a7dce1aaf7b419d'),
        language: [{
            _id: mongoose.Types.ObjectId('5f1572b576230703279490cb'),
            name: 'aa',
            rate: 7
        }],
        skills: [{
            _id: mongoose.Types.ObjectId('5f1572bf76230703279490cc'),
            name: 'Amazon Redshift',
            rate: 9
        }],
        projectDetails: [{
            _id: mongoose.Types.ObjectId('5f1572c276230703279490cd'),
            name: 'Test',
            url: '',
            description: '<p>test0123456789test0123456789test0123456789test0123456789</p>\n',
            role: 'Product (UI) designer',
            keyAchievements: '<p>test0123456789test0123456789test0123456789test0123456789</p>\n'
        }],
        educationDetails: [{
            _id: mongoose.Types.ObjectId('5f1572c876230703279490cf'),
            degreeLevel: 'Bachelor’s',
            degreeTitle: 'test',
            collegeName: 'test',
            country: 'Algeria',
            startDate: '2020-06-29T00:00:00.000Z',
            endDate: '2020-07-15T00:00:00.000Z',
            startYear: 2020,
            endYear: 2020
        }],
        certificateDetails: [],
        unavailability: [],
        workExperience: [{
            _id: mongoose.Types.ObjectId('5f1572c576230703279490ce'),
            jobTitle: 'test',
            employmentType: 'Parttime',
            employer: 'test',
            country: 'Algeria',
            startDate: '2020-06-29T00:00:00.000Z',
            endDate: '2020-07-20T00:00:00.000Z',
            shortDescription: '<p>wefdsfdsf</p>\n'
        }],
        updatedAt: '2020-07-20T09:05:13.406Z',
        __v: 0,
        addressLineOne: 'Del street',
        addressLineTwo: null,
        city: 'East, United Kingdom',
        country: 'Albania',
        dob: '2002-06-30T18:30:00.000Z',
        gender: 'Male',
        postcode: 'DEW321',
        signupStep: 6,
        timeZone: 'Etc/GMT-12',
        professionalSummary: '<p>sadasdasdsadsadsadasadasdasdsadsadsadasadasdasdsadsadsada</p>\n',
        primaryRole: 'Product (UI) designer',
        gitHubUrl: '',
        linkedInUrl: '',
        stackOverFlowUrl: '',
        yearsOfExperience: 'Senior - 8 - 12 yrs',
        availability: true,
        workPreference: ['fulltime'],
        isActive: 1,
        registerType: 'freelancer',
        pay: {
            type: 'bank',
            bankDetails: {
                name: 'State Bank of India',
                accNumber: '1234567890',
                bankCode: 'SBII12346'
            }
        },
        billing: {
            companyDetails: {
                addressLineOne: 'My Address',
                addressLineTwo: '',
                city: 'Ahmedabad',
                country: 'American Samoa',
                name: 'My Com',
                registeredNumber: 'AVCC',
                vatNumber: '',
                website: '',
                postcode: '380015'
            },
            companyInsurance: {
                employerInsuranceValue: 1111,
                professionInsuranceValue: 12233,
                publicInsurancesValue: 1122
            },
            type: 'company',
            companyDocument: {
                incorporationCertificateUrl: 'companyIncorporationCertificateUrl/men.jpg',
                vatRegistrationCertificateUrl: 'companyVatRegistrationCertificateUrl/RecOut_Branch_Strategy.pdf',
                insuranceDocumentUrl: 'companyInsuranceDocumentUrl/INV-0045.pdf'
            }
        },
        currency: 'USD',
        ratePerHour: 400,
        idProofUrl: 'idProof/big.jpg',
        addressProofUrl: 'addressProof/openw.jpg'
    },
    {
        _id: mongoose.Types.ObjectId('5f171359677e5734addddcac'),
        userId: mongoose.Types.ObjectId('5f171359677e5734addddcab')
    }, {
        userId: mongoose.Types.ObjectId('5f083c352a7908662c334535'),
        registerType: 'freelancer'
    },
    {
        _id: mongoose.Types.ObjectId('62139455382565277d07d281'),
        userId: mongoose.Types.ObjectId('62139448f1245be0da3a7360'),
        billing: {
            type: 'company',
            companyDocument: {
                incorporationCertificateUrl: 'companyIncorporationCertificateUrl/men.jpg',
                vatRegistrationCertificateUrl: 'companyVatRegistrationCertificateUrl/RecOut_Branch_Strategy.pdf',
                insuranceDocumentUrl: 'companyInsuranceDocumentUrl/INV-0045.pdf'
            }
        },
        idProofUrl: 'idProof/big.jpg',
        addressProofUrl: 'addressProof/openw.jpg'
    }],
    client: [{
        _id: mongoose.Types.ObjectId('5f083e30069b6c6a7de3a952'),
        userId: mongoose.Types.ObjectId('5f083c352a7908662c334533'),
        signupStep: 1
    },
    {
        _id: mongoose.Types.ObjectId('5f084070e699916d8f75d611'),
        userId: mongoose.Types.ObjectId('5f083c352a7908662c334534'),
        signupStep: 1
    },
    {
        _id: mongoose.Types.ObjectId('5f05c941aff1590c69b00907'),
        userId: mongoose.Types.ObjectId('5f05c940aff1590c69b00906'),
        addressLineOne: 'Some House, Some Buildding',
        addressLineTwo: 'Some Road, Somewhere',
        registerType: 'individual',
        billing: {
            type: 'company',
            companyDetails: {
                addressLineOne: 'Some Building',
                addressLineTwo: 'Some Stree',
                city: 'Ahmedabad', country: 'India',
                name: 'Soft Silicon',
                postcode: '380015',
                registeredNumber: 'ABC',
                vatNumber: 'ABC',
                website: 'http://www.codemonk.ai'
            }
        },
        signupStep: 2
    },
    {
        _id: mongoose.Types.ObjectId('5f084e0cd8282d0262380ead'),
        userId: mongoose.Types.ObjectId('5f084e0cd8282d0262380eac'),
        registerType: 'individual',
        billing: {
            type: 'individual'
        },
        signupStep: 2
    },
    {
        _id: mongoose.Types.ObjectId('5f08589760b8ea193e426d60'),
        userId: mongoose.Types.ObjectId('5f08589760b8ea193e426d5f'),
        addressLineOne: 'Some House, Some Buildding',
        addressLineTwo: 'Some Road, Somewhere',
        registerType: 'company',
        authority: {
            firstName: 'Authority\'sFirst',
            lastName: 'authority\'s Last',
            email: 'authrity@example.com',
            countryCode: '91',
            phoneNumber: '9925061220',
            jobTitle: 'CEO',
            postcode: '380015',
            timeZone: 'Asia/Kolkata',
            addressLineOne: 'Some House, Some Buildding',
            addressLineTwo: 'Some Road, Somewhere',
            city: 'Ahmedabad',
            country: 'India'
        },
        billing: {
            type: 'company',
            companyDetails: {
                name: 'Soft Silicon',
                registeredNumber: 'ABC',
                postcode: '380015',
                city: 'Ahmedabad',
                country: 'India',
                addressLineOne: null,
                addressLineTwo: 'Some Stree',
                website: 'http://www.codemonk.ai',
                vatNumber: 'ABC'
            }
        },
        signupStep: 2
    },
    {
        _id: mongoose.Types.ObjectId('5f2d3e4eba0dae43224ae38e'),
        userId: mongoose.Types.ObjectId('5f2d3e4eba0dae43224ae38d'),
        jobTitle: 'CTO',
        postcode: '380015',
        addressLineOne: 'Some House, Some Buildding',
        addressLineTwo: 'Some Road, Somewhere',
        city: 'Ahmedabad',
        country: 'India',
        timeZone: 'Asia/Kolkata',
        registerType: 'company',
        billing: {
            type: 'company',
            companyDetails: {
                name: 'Soft Silicon',
                registeredNumber: 'ABC',
                postcode: '380015',
                city: 'Ahmedabad',
                country: 'India',
                addressLineOne: null,
                addressLineTwo: 'Some Stree',
                website: 'http://www.codemonk.ai',
                vatNumber: 'ABC'
            },
            companyInsurance: {
                professionInsuranceValue: 10000,
                publicInsurancesValue: 20000,
                employerInsuranceValue: 50000
            },
            companyDocument: {
                incorporationCertificateUrl: 'test',
                vatRegistrationCertificateUrl: 'test1',
                insuranceDocumentUrl: 'test2'
            }
        },
        authority: {
            firstName: 'Authority\'sFirst',
            lastName: 'authority\'s Last',
            email: 'authrity@example.com',
            countryCode: '91',
            phoneNumber: '9925061220',
            jobTitle: 'CEO',
            postcode: '380015',
            timeZone: 'Asia/Kolkata',
            addressLineOne: 'Some House, Some Buildding',
            addressLineTwo: 'Some Road, Somewhere',
            city: 'Ahmedabad',
            country: 'India'
        },
        pay: {
            type: 'paypal',
            bankDetails: 'Kotak'
        },
        signupStep: 2,
        isActive: 1
    },
    {
        _id: mongoose.Types.ObjectId('5f30f3930997b6547a590f95'),
        userId: mongoose.Types.ObjectId('5f30f3920997b6547a590f94'),
        addressLineOne: 'Some House, Some Buildding',
        addressLineTwo: 'Some Road, Somewhere',
        registerType: 'individual',
        billing: {
            type: 'company',
            companyDetails: {
                addressLineOne: 'Some Building',
                addressLineTwo: 'Some Stree',
                city: 'Ahmedabad', country: 'India',
                name: 'Soft Silicon',
                postcode: '380015',
                registeredNumber: 'ABC',
                vatNumber: 'ABC',
                website: 'http://www.codemonk.ai'
            }
        },
        signupStep: 2,
        isActive: 2
    }],
    recruiter: [{
        _id: mongoose.Types.ObjectId('620b2fd550e116c3cbbd5aa1'),
        userId: mongoose.Types.ObjectId('620b2fa709dae3d2df2279a9'),
        jobTitle: 'CTO',
        postcode: '380015',
        addressLineOne: 'Some House, Some Buildding',
        addressLineTwo: 'Some Road, Somewhere',
        city: 'Ahmedabad',
        country: 'India',
        timeZone: 'Asia/Kolkata',
        registerType: 'company',
        billing: {
            type: 'company',
            companyDetails: {
                name: 'Soft Silicon',
                registeredNumber: 'ABC',
                postcode: '380015',
                city: 'Ahmedabad',
                country: 'India',
                addressLineOne: null,
                addressLineTwo: 'Some Stree',
                website: 'http://www.codemonk.ai',
                vatNumber: 'ABC'
            },
            companyInsurance: {
                professionInsuranceValue: 10000,
                publicInsurancesValue: 20000,
                employerInsuranceValue: 50000
            },
            companyDocument: {
                incorporationCertificateUrl: 'test',
                vatRegistrationCertificateUrl: 'test1',
                insuranceDocumentUrl: 'test2'
            }
        },
        authority: {
            firstName: 'Authority\'sFirst',
            lastName: 'authority\'s Last',
            email: 'authrity@example.com',
            countryCode: '91',
            phoneNumber: '9925061220',
            jobTitle: 'CEO',
            postcode: '380015',
            timeZone: 'Asia/Kolkata',
            addressLineOne: 'Some House, Some Buildding',
            addressLineTwo: 'Some Road, Somewhere',
            city: 'Ahmedabad',
            country: 'India'
        },
        pay: {
            type: 'paypal',
            bankDetails: 'Kotak'
        },
        signupStep: 2,
        isActive: 1
    },
    {
        _id: mongoose.Types.ObjectId('620b311ffae02025266fe66a'),
        userId: mongoose.Types.ObjectId('620b308de128d8fad6ff95cd'),
        addressLineOne: 'Some House, Some Buildding',
        addressLineTwo: 'Some Road, Somewhere',
        registerType: 'individual',
        billing: {
            type: 'company',
            companyDetails: {
                addressLineOne: 'Some Building',
                addressLineTwo: 'Some Stree',
                city: 'Ahmedabad', country: 'India',
                name: 'Soft Silicon',
                postcode: '380015',
                registeredNumber: 'ABC',
                vatNumber: 'ABC',
                website: 'http://www.codemonk.ai'
            }
        },
        signupStep: 2,
        isActive: 2
    }],
    ambassador: [{
        _id: mongoose.Types.ObjectId('621e23401b5212a821d90af2'),
        userId: mongoose.Types.ObjectId('621def15252b22fd20837dd6'),
        jobTitle: 'CTO',
        postcode: '380015',
        addressLineOne: 'Some House, Some Buildding',
        addressLineTwo: 'Some Road, Somewhere',
        city: 'Ahmedabad',
        country: 'India',
        timeZone: 'Asia/Kolkata',
        registerType: 'company',
        billing: {
            type: 'company',
            companyDetails: {
                name: 'Soft Silicon',
                registeredNumber: 'ABC',
                postcode: '380015',
                city: 'Ahmedabad',
                country: 'India',
                addressLineOne: null,
                addressLineTwo: 'Some Stree',
                website: 'http://www.codemonk.ai',
                vatNumber: 'ABC'
            },
            companyInsurance: {
                professionInsuranceValue: 10000,
                publicInsurancesValue: 20000,
                employerInsuranceValue: 50000
            },
            companyDocument: {
                incorporationCertificateUrl: 'test',
                vatRegistrationCertificateUrl: 'test1',
                insuranceDocumentUrl: 'test2'
            }
        },
        authority: {
            firstName: 'Authority\'sFirst',
            lastName: 'authority\'s Last',
            email: 'authrity@example.com',
            countryCode: '91',
            phoneNumber: '9925061220',
            jobTitle: 'CEO',
            postcode: '380015',
            timeZone: 'Asia/Kolkata',
            addressLineOne: 'Some House, Some Buildding',
            addressLineTwo: 'Some Road, Somewhere',
            city: 'Ahmedabad',
            country: 'India'
        },
            pay: {
                    type: 'paypal',
                bankDetails: 'Kotak'
        },
            signupStep: 2,
            isActive: 1
    },
        {
                _id: mongoose.Types.ObjectId('621e2361e606ca2236472f66'),
            userId: mongoose.Types.ObjectId('621e21ccecb647c370940ab1'),
            addressLineOne: 'Some House, Some Buildding',
            addressLineTwo: 'Some Road, Somewhere',
            registerType: 'individual',
            billing: {
                    type: 'company',
                companyDetails: {
                        addressLineOne: 'Some Building',
                    addressLineTwo: 'Some Stree',
                    city: 'Ahmedabad', country: 'India',
                    name: 'Soft Silicon',
                    postcode: '380015',
                    registeredNumber: 'ABC',
                    vatNumber: 'ABC',
                    website: 'http://www.codemonk.ai'
            }
        },
            signupStep: 2,
            isActive: 2
    }],
    agency: [{
        _id: mongoose.Types.ObjectId('5f4e0e2ecf759d928bda1fdb'),
        userId: mongoose.Types.ObjectId('5f5335172317791e189ac32d')
    },
    {
        _id: mongoose.Types.ObjectId('5f4e0e2ecf759d928bda1fcc'),
        userId: mongoose.Types.ObjectId('5f4754eb3fc8842306a8220d'),
        signupStep: 0.1,
        isActive: 1
    },
    {
        _id: mongoose.Types.ObjectId('5f4e0e2ecf759d928bda1fdc'),
        userId: mongoose.Types.ObjectId('5f475a9ef25e122eb21d68a8'),
        isActive: 1,
        signupStep: 6,
        payDetails: {
            bankName: 'Kotak Bank',
            accNumber: 'ABC12345',
            bankCode: 'ABSS21222'
        },
        agency: {
            name: 'My Agency',
            registeredNumber: 'ABCC',
            addressLineOne: 'Address liine one',
            addressLineTwo: 'Add line two',
            city: 'Ahmedabad',
            country: 'India',
            duns: 'DUNS',
            vatNumber: '',
            postcode: '380015'
        },
        designation: 'CEO',
        trading: {
            name: 'Trasddd',
            website: 'https://google.com',
            summary: 'Testteeetewtewr TestteeetewtewrTestteeetewtewrTestteeetewtewrTestteeetewtewrTestteeetewtewr',
            logo: 'https://s3-eu-west-1.amazonaws.com/local-trading-logo/',
            postcode: '380098',
            addressLineOne: 'Trade Address one',
            addressLineTwo: '',
            city: 'Ahmedabad',
            country: 'India'
        },
        directorDocuments: {
            0: {
                idProofUrl: 'https://s3-eu-west-1.amazonaws.com/',
                addressProofUrl: 'https://s3-eu-west-1.amazonaws.com/big.jpg'
            },
            1: {
                idProofUrl: '',
                addressProofUrl: ''
            }
        },
        incorporationCertificateUrl: 'https://s3-eu-west-1.amazonaws.com/openw.jpg',
        taxRegistrationCertificateUrl: 'https://s3-eu-west-1.amazonaws.com/openw.jpg',
        utilityBillDocumentUrl: 'https://s3-eu-west-1.amazonaws.com/men.jpg',
        certificateDetails: [],
        socialProfile: {
            clutchUrl: '',
            dribbbleUrl: '',
            gitHubUrl: '',
            goodfirmsUrl: '',
            linkedInUrl: '',
            otherWebsiteUrl: ''
        },
        directors: [{
            _id: mongoose.Types.ObjectId('5f5798f949599e3e54b4ae72'),
            firstName: 'test',
            lastName: 'test',
            dob: new Date('2005-08-28T00:00:00.000Z'),
            postcode: '380015',
            city: 'Ahmedabad',
            country: 'Algeria',
            addressLineOne: 'My Address',
            isShareHolder: false,
            isDirector: true
        }]

    },
    {
        _id: mongoose.Types.ObjectId('5f533531f5c646a54562a5e8'),
        userId: mongoose.Types.ObjectId('5f4e0dcbae932622307694d1'),
        isActive: 1,
        signupStep: 6,
        payDetails: {
            bankName: 'Kotak Bank',
            accNumber: 'ABC12345',
            bankCode: 'ABSS21222'
        },
        agency: {
            name: 'My Agency',
            registeredNumber: 'ABCC',
            addressLineOne: 'Address liine one',
            addressLineTwo: 'Add line two',
            city: 'Ahmedabad',
            country: 'India',
            duns: 'DUNS',
            vatNumber: '',
            postcode: '380015'
        },
        designation: 'CEO',
        trading: {
            name: 'Trasddd',
            website: 'https://google.com',
            summary: 'Testteeetewtewr TestteeetewtewrTestteeetewtewrTestteeetewtewrTestteeetewtewrTestteeetewtewr',
            logo: 'https://s3-eu-west-1.amazonaws.com/local-trading-logo/',
            postcode: '380098',
            addressLineOne: 'Trade Address one',
            addressLineTwo: '',
            city: 'Ahmedabad',
            country: 'India'
        },
        directorDocuments: {
            0: {
                idProofUrl: 'https://s3-eu-west-1.amazonaws.com/',
                addressProofUrl: 'https://s3-eu-west-1.amazonaws.com/big.jpg'
            },
            1: {
                idProofUrl: '',
                addressProofUrl: ''
            }
        },
        incorporationCertificateUrl: 'https://s3-eu-west-1.amazonaws.com/openw.jpg',
        taxRegistrationCertificateUrl: 'https://s3-eu-west-1.amazonaws.com/openw.jpg',
        utilityBillDocumentUrl: 'https://s3-eu-west-1.amazonaws.com/men.jpg',
        certificateDetails: [],
        socialProfile: {
            clutchUrl: '',
            dribbbleUrl: '',
            gitHubUrl: '',
            goodfirmsUrl: '',
            linkedInUrl: '',
            otherWebsiteUrl: ''
        },
        directors: [{
            _id: mongoose.Types.ObjectId('5f5798f949599e3e54b4ae72'),
            firstName: 'test',
            lastName: 'test',
            dob: new Date('2005-08-28T00:00:00.000Z'),
            postcode: '380015',
            city: 'Ahmedabad',
            country: 'Algeria',
            addressLineOne: 'My Address',
            isShareHolder: false,
            isDirector: true
        }]
    }],
    agencyTalent: [{
        _id: mongoose.Types.ObjectId('5f494469970abb3a70a556c7'),
        agencyId: mongoose.Types.ObjectId('5f475a9ef25e122eb21d68a8'),
        talents: [{
            _id: mongoose.Types.ObjectId('5f523e4a7e416a76f64ea920'),
            firstName: 'Talent One',
            lastName: 'Talent Last One',
            email: 'talent1@mailinator.com',
            currency: 'USD',
            rate: 40
        }, {
            _id: mongoose.Types.ObjectId('5f523e4a7e416a76f64ea921'),
            firstName: 'Talent Two',
            lastName: 'Talent Last Two',
            email: 'talent2@mailinator.com',
            currency: 'GBP',
            rate: 25
        }, {
            _id: mongoose.Types.ObjectId('5f523e4a7e416a76f64ea922'),
            firstName: 'Talent Three',
            lastName: 'Talent Last Three',
            email: 'talent3@mailinator.com',
            currency: 'EUR',
            'rate': 50
        }, {
            _id: mongoose.Types.ObjectId('5f525a7fa45c881d4bf945ca'),
            firstName: 'Talent One',
            lastName: 'Talent Last One',
            email: 'talentnew2@mailinator.com',
            currency: 'USD',
            rate: 40
        }]
    },
    {
        _id: mongoose.Types.ObjectId('5f4e0fb2cf759d928bda2075'),
        agencyId: mongoose.Types.ObjectId('5f4e0dcbae932622307694d1'),
        talents: []
    },
    {
        _id: mongoose.Types.ObjectId('5f4e0fb2cf759d928bda2074'),
        agencyId: mongoose.Types.ObjectId('5f4754eb3fc8842306a8220d'),
        talents: [{
            _id: mongoose.Types.ObjectId('5f525a7fa45c881d4bf945cb'),
            firstName: 'Agency',
            lastName: 'Onboard Talent',
            email: 'agencyonboardtalent1@mailinator.com',
            currency: 'USD',
            rate: 40
        }]
    }, {
        _id: mongoose.Types.ObjectId('5f083c352a7908662c334533'),
        agencyId: mongoose.Types.ObjectId('5f4e0e2ecf759d928bda1fdc'),
        talents: [{
            _id: mongoose.Types.ObjectId('60a39696e4e06c845b06fe19'),
            firstName: 'Talent One',
            lastName: 'Talent Last One',
            email: 'resetpasstalent@mailinator.com',
            currency: 'USD',
            rate: 40
        }]
    }],
    project: [{
        _id: mongoose.Types.ObjectId('5f631e56d37cbb4801f0fa45'),
        lookingFor: { design: [], softwareDevelopment: [], developmentTeam: [], dataAiMl: [] },
        status: 1,
        clientId: mongoose.Types.ObjectId('5f083c352a7908662c334533'),
        name: 'CodeMonk',
        description: `The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
            Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in
            their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
        startDate: new Date('2020-09-30T00:00:00.000Z'),
        endDate: new Date('2020-12-31T00:00:00.000Z'),
        addedBy: mongoose.Types.ObjectId('5f5f2cd2f1472c3303b6b861'),
        talents: [{
            talentId: mongoose.Types.ObjectId('5f083c352a7908662c334532'),
            startDate: new Date('2020-09-30T00:00:00.000Z'),
            endDate: new Date('2020-12-31T00:00:00.000Z'),
            status: 1
        },
        {
            talentId: mongoose.Types.ObjectId('5f523e4a7e416a76f64ea921'),
            startDate: new Date('2020-09-30T00:00:00.000Z'),
            endDate: new Date('2020-12-31T00:00:00.000Z'),
            status: 1
        },
        {
            talentId: mongoose.Types.ObjectId('5f523e4a7e416a76f64ea920'),
            startDate: new Date('2020-09-30T00:00:00.000Z'),
            endDate: new Date('2020-12-31T00:00:00.000Z'),
            status: 1
        }]
    },
    {
        _id: mongoose.Types.ObjectId('5f2abf4364712b10ad0e8e3c'),
        lookingFor: { design: [], softwareDevelopment: [], developmentTeam: [], dataAiMl: [] },
        status: 1,
        clientId: mongoose.Types.ObjectId('5f05c940aff1590c69b00906'),
        name: 'CodeMonk Without talent',
        description: `The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
            Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in
            their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
        startDate: new Date('2020-09-30T00:00:00.000Z'),
        endDate: new Date('2020-12-31T00:00:00.000Z'),
        addedBy: mongoose.Types.ObjectId('5f5f2cd2f1472c3303b6b861'),
        talents: []
    },
    {
        _id: mongoose.Types.ObjectId('5f2abf4364712b10ad0e8e3d'),
        lookingFor: { design: [], softwareDevelopment: [], developmentTeam: [], dataAiMl: [] },
        status: 1,
        clientId: mongoose.Types.ObjectId('5f083c352a7908662c334533'),
        name: 'CodeMonk duplicate name',
        description: `The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
            Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in
            their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
        startDate: new Date('2020-09-30T00:00:00.000Z'),
        endDate: new Date('2020-12-31T00:00:00.000Z'),
        addedBy: mongoose.Types.ObjectId('5f5f2cd2f1472c3303b6b861'),
        talents: []
    },
    {
        _id: mongoose.Types.ObjectId('62137f034f3285aad50b3424'),
        lookingFor: { design: [], softwareDevelopment: [], developmentTeam: [], dataAiMl: [] },
        status: 1,
        clientId: mongoose.Types.ObjectId('5f083c352a7908662c334533'),
        name: 'Brief test 1',
        description: `The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
            Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in
            their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
        startDate: new Date('2020-09-30T00:00:00.000Z'),
        endDate: new Date('2020-12-31T00:00:00.000Z'),
        addedBy: mongoose.Types.ObjectId('5f5f2cd2f1472c3303b6b861'),
        talents: []
    },
    {
        _id: mongoose.Types.ObjectId('62137f92eba80adf3bef218b'),
        lookingFor: { design: [], softwareDevelopment: [], developmentTeam: [], dataAiMl: [] },
        status: 1,
        clientId: mongoose.Types.ObjectId('5f083c352a7908662c334533'),
        name: 'Brief test 2',
        description: `The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
            Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in
            their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
        startDate: new Date('2020-09-30T00:00:00.000Z'),
        endDate: new Date('2020-12-31T00:00:00.000Z'),
        addedBy: mongoose.Types.ObjectId('5f5f2cd2f1472c3303b6b861'),
        talents: []
    },
    {
        _id: mongoose.Types.ObjectId('6213801c8c84dd84b737d740'),
        lookingFor: { design: [], softwareDevelopment: [], developmentTeam: [], dataAiMl: [] },
        status: 1,
        clientId: mongoose.Types.ObjectId('5f083c352a7908662c334533'),
        name: 'Brief test 3',
        description: `The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
            Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in
            their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
        startDate: new Date('2020-09-30T00:00:00.000Z'),
        endDate: new Date('2020-12-31T00:00:00.000Z'),
        addedBy: mongoose.Types.ObjectId('5f5f2cd2f1472c3303b6b861'),
        talents: []
    },
    {
        _id: mongoose.Types.ObjectId('62138059a28df2778f34ee14'),
        lookingFor: { design: [], softwareDevelopment: [], developmentTeam: [], dataAiMl: [] },
        status: 1,
        clientId: mongoose.Types.ObjectId('5f083c352a7908662c334533'),
        name: 'Brief test 4',
        description: `The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
            Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in
            their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
        startDate: new Date('2020-09-30T00:00:00.000Z'),
        endDate: new Date('2020-12-31T00:00:00.000Z'),
        addedBy: mongoose.Types.ObjectId('5f5f2cd2f1472c3303b6b861'),
        talents: []
    },
    {
        _id: mongoose.Types.ObjectId('6213809351df873a63332c8e'),
        lookingFor: { design: [], softwareDevelopment: [], developmentTeam: [], dataAiMl: [] },
        status: 1,
        clientId: mongoose.Types.ObjectId('5f083c352a7908662c334533'),
        name: 'Brief test 5',
        description: `The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
            Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in
            their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
        startDate: new Date('2020-09-30T00:00:00.000Z'),
        endDate: new Date('2020-12-31T00:00:00.000Z'),
        addedBy: mongoose.Types.ObjectId('5f5f2cd2f1472c3303b6b861'),
        talents: []
    },
    {
        _id: mongoose.Types.ObjectId('62138a33252ff817c9fc2215'),
        lookingFor: { design: [], softwareDevelopment: [], developmentTeam: [], dataAiMl: [] },
        status: 1,
        clientId: mongoose.Types.ObjectId('5f083c352a7908662c334533'),
        name: 'Brief test 6',
        description: `The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
            Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in
            their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
        startDate: new Date('2020-09-30T00:00:00.000Z'),
        endDate: new Date('2020-12-31T00:00:00.000Z'),
        addedBy: mongoose.Types.ObjectId('5f5f2cd2f1472c3303b6b861'),
        talents: []
    },
    {
        _id: mongoose.Types.ObjectId('62138a73732cbbbbc4e084d0'),
        lookingFor: { design: [], softwareDevelopment: [], developmentTeam: [], dataAiMl: [] },
        status: 1,
        clientId: mongoose.Types.ObjectId('5f083c352a7908662c334533'),
        name: 'Brief test 7',
        description: `The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
            Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in
            their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
        startDate: new Date('2020-09-30T00:00:00.000Z'),
        endDate: new Date('2020-12-31T00:00:00.000Z'),
        addedBy: mongoose.Types.ObjectId('5f5f2cd2f1472c3303b6b861'),
        talents: []
    }],
    interviews: [{
        _id: mongoose.Types.ObjectId('5f75c1489bdaa265fc6214de'),
        clientId: mongoose.Types.ObjectId('5f083c352a7908662c334533'),
        talentId: mongoose.Types.ObjectId('5f083e2f069b6c6a7de3a950'),
        projectId: mongoose.Types.ObjectId('5f631e56d37cbb4801f0fa45'),
        name: 'CodeMonk',
        description: `The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those
                interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also
                reproduced in their exact original form, accompanied by English versions from the 1914 translation
                by H. Rackham.`,
        timeSlots: [{
            isAccepted: 0,
            requestedSlot: '2020-10-02T11:32:19.334Z'
        },
        {
            isAccepted: 0,
            requestedSlot: '2020-10-03T11:32:19.334Z'
        },
        {
            isAccepted: 0,
            requestedSlot: '2020-10-04T11:32:19.334Z'
        }]
    }],
    jobPosts: [{
        _id: mongoose.Types.ObjectId('5f97c8f0a350e416d1a5ebae'),
        projectId: mongoose.Types.ObjectId('5f631e56d37cbb4801f0fa45'),
        name: 'Test',
        description: 'This is test',
        role: 'Database Architect',
        skills: ['Workday', 'Oracle', 'Oracle Netsuite'],
        workPreference: ['parttime-weekends'],
        teamPreference: ['x-large-team'],
        assignments: ['long-term-onsite'],
        status: 1,
        applications: [{
            talentId: mongoose.Types.ObjectId('5f523e4a7e416a76f64ea921'),
            status: 1
        }]
    }, {
        _id: mongoose.Types.ObjectId('5f97c8e2a350e416d1a5ebac'),
        name: 'Test 123',
        description: 'This is test',
        role: 'Database Architect',
        skills: ['Workday', 'Oracle', 'Oracle Netsuite'],
        workPreference: ['parttime-weekends'],
        teamPreference: ['x-large-team'],
        assignments: ['long-term-onsite'],
        status: 1,
        applications: []
    }, {
        _id: mongoose.Types.ObjectId('60d0aa5c9bd946556f56c10e'),
        projectId: mongoose.Types.ObjectId('5f631e56d37cbb4801f0fa45'),
        clientId: mongoose.Types.ObjectId('5f083c352a7908662c334533'),
        name: 'New Skill added job brief',
        role: 'Solution Architect',
        workPreference: ['fulltime'],
        teamPreference: ['individuals'],
        assignments: ['remote-only', 'occational-site-visit'],
        expertise: CONSTANTS.YEAR_OF_EXPERIENCE[0],
        step: 1,
        status: 0,
        applications: []
    },
    {
        _id: mongoose.Types.ObjectId('61aa0cffaad5a25c272753ef'),
        projectId: mongoose.Types.ObjectId('5f631e56d37cbb4801f0fa45'),
        clientId: mongoose.Types.ObjectId('5f05c940aff1590c69b00906'),
        name: 'Test',
        description: 'This is test',
        role: 'Database Architect',
        skills: ['Workday', 'Oracle', 'Oracle Netsuite'],
        workPreference: ['parttime-weekends'],
        teamPreference: ['x-large-team'],
        assignments: ['long-term-onsite'],
        status: 1,
        applications: [{
            talentId: mongoose.Types.ObjectId('5f523e4a7e416a76f64ea921'),
            status: 1
        }]
    },
    {
        _id: mongoose.Types.ObjectId('620e5aea12e4011366db2e22'),
        projectId: mongoose.Types.ObjectId('62138a33252ff817c9fc2215'),
        clientId: mongoose.Types.ObjectId('5f083c352a7908662c334533'),
        name: 'Brief 1',
        description: 'This is test. Talent applied on job brief',
        step: 3,
        status: 1,
        applications: [{
            talentId: mongoose.Types.ObjectId('5f523e4a7e416a76f64ea921'),
            status: 1
        }]
    },
    {
        _id: mongoose.Types.ObjectId('62136faa8fa779d61a4ba40e'),
        projectId: mongoose.Types.ObjectId('62138a73732cbbbbc4e084d0'),
        clientId: mongoose.Types.ObjectId('5f083c352a7908662c334533'),
        name: 'Brief 2',
        description: 'This is test. Talent applied on job brief',
        step: 3,
        status: 1,
        applications: [{
            talentId: mongoose.Types.ObjectId('5f523e4a7e416a76f64ea921'),
            status: 1
        }]
    },
    {
        _id: mongoose.Types.ObjectId('6213703d08d02d3434f3131d'),
        projectId: mongoose.Types.ObjectId('5f631e56d37cbb4801f0fa45'),
        clientId: mongoose.Types.ObjectId('5f083c352a7908662c334533'),
        name: 'Brief Applied',
        description: 'This is test. Talent applied on job brief',
        step: 3,
        status: 1,
        applications: [{
            talentId: mongoose.Types.ObjectId('5f523e4a7e416a76f64ea921'),
            status: 1
        }]
    },
    {
        _id: mongoose.Types.ObjectId('621370cf92b1bd5d8adf535c'),
        projectId: mongoose.Types.ObjectId('5f631e56d37cbb4801f0fa45'),
        clientId: mongoose.Types.ObjectId('5f083c352a7908662c334533'),
        name: 'Brief Interview',
        description: 'This is test. Talent Interview on job brief',
        step: 3,
        status: 1,
        applications: [{
            talentId: mongoose.Types.ObjectId('5f523e4a7e416a76f64ea921'),
            status: 2
        }]
    },
    {
        _id: mongoose.Types.ObjectId('62137329992e7df843db1ed8'),
        projectId: mongoose.Types.ObjectId('5f631e56d37cbb4801f0fa45'),
        clientId: mongoose.Types.ObjectId('5f083c352a7908662c334533'),
        name: 'Brief Shortlisted',
        description: 'This is test. Talent Shortlisted on job brief',
        step: 3,
        status: 1,
        applications: [{
            talentId: mongoose.Types.ObjectId('5f523e4a7e416a76f64ea921'),
            status: 3
        }]
    },
    {
        _id: mongoose.Types.ObjectId('6213738897ae9fbe2b5d0fae'),
        projectId: mongoose.Types.ObjectId('5f631e56d37cbb4801f0fa45'),
        clientId: mongoose.Types.ObjectId('5f083c352a7908662c334533'),
        name: 'Brief Hired',
        description: 'This is test. Talent Hired on job brief',
        step: 3,
        status: 1,
        applications: [{
            talentId: mongoose.Types.ObjectId('5f523e4a7e416a76f64ea921'),
            status: 4
        }]
    },
    {
        _id: mongoose.Types.ObjectId('621373ad3cb0390204b48c91'),
        projectId: mongoose.Types.ObjectId('5f631e56d37cbb4801f0fa45'),
        clientId: mongoose.Types.ObjectId('5f083c352a7908662c334533'),
        name: 'Brief Rejected',
        description: 'This is test. Talent Rejected on job brief',
        step: 3,
        status: 1,
        applications: [{
            talentId: mongoose.Types.ObjectId('5f523e4a7e416a76f64ea921'),
            status: 5
        }]
    },
    {
        _id: mongoose.Types.ObjectId('62137624a1cdd9261d08020c'),
        projectId: mongoose.Types.ObjectId('5f631e56d37cbb4801f0fa45'),
        clientId: mongoose.Types.ObjectId('5f083c352a7908662c334533'),
        name: 'Brief applied',
        description: 'This is test. Talent applied on job brief for interview.',
        step: 3,
        status: 1,
        applications: [{
            talentId: mongoose.Types.ObjectId('5f523e4a7e416a76f64ea921'),
            status: 1
        }]
    },
    {
        _id: mongoose.Types.ObjectId('621376a0ee1499e321261e4a'),
        projectId: mongoose.Types.ObjectId('5f631e56d37cbb4801f0fa45'),
        clientId: mongoose.Types.ObjectId('5f083c352a7908662c334533'),
        name: 'Brief applied',
        description: 'This is test. Talent applied on job brief for shortlisted.',
        step: 3,
        status: 1,
        applications: [{
            talentId: mongoose.Types.ObjectId('5f523e4a7e416a76f64ea921'),
            status: 1
        }]
    },
    {
        _id: mongoose.Types.ObjectId('6213773ac7bf345da8c511da'),
        projectId: mongoose.Types.ObjectId('6213809351df873a63332c8e'),
        clientId: mongoose.Types.ObjectId('5f083c352a7908662c334533'),
        name: 'Brief applied',
        description: 'This is test. Talent applied on job brief for hired.',
        step: 3,
        status: 1,
        applications: [{
            talentId: mongoose.Types.ObjectId('5f523e4a7e416a76f64ea921'),
            status: 1
        }]
    },
    {
        _id: mongoose.Types.ObjectId('621377882d492bfb3b437f0b'),
        projectId: mongoose.Types.ObjectId('5f631e56d37cbb4801f0fa45'),
        clientId: mongoose.Types.ObjectId('5f083c352a7908662c334533'),
        name: 'Brief applied',
        description: 'This is test. Talent applied on job brief for rejection.',
        step: 3,
        status: 1,
        applications: [{
            talentId: mongoose.Types.ObjectId('5f523e4a7e416a76f64ea921'),
            status: 1
        }]
    },
    {
        _id: mongoose.Types.ObjectId('62137903a2221ae3d0504f3a'),
        projectId: mongoose.Types.ObjectId('5f631e56d37cbb4801f0fa45'),
        clientId: mongoose.Types.ObjectId('5f083c352a7908662c334533'),
        name: 'Brief interview',
        description: 'This is test. Talent interviewed on job brief for shortlisting.',
        step: 3,
        status: 1,
        applications: [{
            talentId: mongoose.Types.ObjectId('5f523e4a7e416a76f64ea921'),
            status: 2
        }]
    },
    {
        _id: mongoose.Types.ObjectId('62137927fb4521cf3a36cad3'),
        projectId: mongoose.Types.ObjectId('62138059a28df2778f34ee14'),
        clientId: mongoose.Types.ObjectId('5f083c352a7908662c334533'),
        name: 'Brief interview',
        description: 'This is test. Talent interviewed on job brief for hired.',
        step: 3,
        status: 1,
        applications: [{
            talentId: mongoose.Types.ObjectId('5f523e4a7e416a76f64ea921'),
            status: 2
        }]
    },
    {
        _id: mongoose.Types.ObjectId('6213793b7d0525d9c5b4543a'),
        projectId: mongoose.Types.ObjectId('5f631e56d37cbb4801f0fa45'),
        clientId: mongoose.Types.ObjectId('5f083c352a7908662c334533'),
        name: 'Brief interview',
        description: 'This is test. Talent interviewed on job brief for rejection.',
        step: 3,
        status: 1,
        applications: [{
            talentId: mongoose.Types.ObjectId('5f523e4a7e416a76f64ea921'),
            status: 2
        }]
    },
    {
        _id: mongoose.Types.ObjectId('6213798ee97caacfbe4aa582'),
        projectId: mongoose.Types.ObjectId('6213801c8c84dd84b737d740'),
        clientId: mongoose.Types.ObjectId('5f083c352a7908662c334533'),
        name: 'Brief shortlisted',
        description: 'This is test. Talent shortlisted on job brief for hired.',
        step: 3,
        status: 1,
        applications: [{
            talentId: mongoose.Types.ObjectId('5f523e4a7e416a76f64ea921'),
            status: 3
        }]
    },
    {
        _id: mongoose.Types.ObjectId('621379e465505c173d25486f'),
        projectId: mongoose.Types.ObjectId('5f631e56d37cbb4801f0fa45'),
        clientId: mongoose.Types.ObjectId('5f083c352a7908662c334533'),
        name: 'Brief shortlisted',
        description: 'This is test. Talent shortlisted on job brief for rejection.',
        step: 3,
        status: 1,
        applications: [{
            talentId: mongoose.Types.ObjectId('5f523e4a7e416a76f64ea921'),
            status: 3
        }]
    },
    {
        _id: mongoose.Types.ObjectId('62137abc2f0465c43b4c7389'),
        projectId: mongoose.Types.ObjectId('62137f92eba80adf3bef218b'),
        clientId: mongoose.Types.ObjectId('5f083c352a7908662c334533'),
        name: 'Brief hired',
        description: 'This is test. Talent hired on job brief for hired.',
        step: 3,
        status: 1,
        applications: [{
            talentId: mongoose.Types.ObjectId('5f523e4a7e416a76f64ea921'),
            status: 4
        }]
    },
    {
        _id: mongoose.Types.ObjectId('62137af041e47a00ae23c12f'),
        projectId: mongoose.Types.ObjectId('5f631e56d37cbb4801f0fa45'),
        clientId: mongoose.Types.ObjectId('5f083c352a7908662c334533'),
        name: 'Brief hired',
        description: 'This is test. Talent hired on job brief for rejection.',
        step: 3,
        status: 1,
        applications: [{
            talentId: mongoose.Types.ObjectId('5f523e4a7e416a76f64ea921'),
            status: 4
        }]
    },
    {
        _id: mongoose.Types.ObjectId('62137b555e740ea3ae1ad9cc'),
        projectId: mongoose.Types.ObjectId('5f631e56d37cbb4801f0fa45'),
        clientId: mongoose.Types.ObjectId('5f083c352a7908662c334533'),
        name: 'Brief rejected',
        description: 'This is test. Talent rejected on job brief for interview.',
        step: 3,
        status: 1,
        applications: [{
            talentId: mongoose.Types.ObjectId('5f523e4a7e416a76f64ea921'),
            status: 5
        }]
    },
    {
        _id: mongoose.Types.ObjectId('62137b6dc0ae36ce396a9347'),
        projectId: mongoose.Types.ObjectId('5f631e56d37cbb4801f0fa45'),
        clientId: mongoose.Types.ObjectId('5f083c352a7908662c334533'),
        name: 'Brief rejected',
        description: 'This is test. Talent rejected on job brief for shortlisting.',
        step: 3,
        status: 1,
        applications: [{
            talentId: mongoose.Types.ObjectId('5f523e4a7e416a76f64ea921'),
            status: 5
        }]
    },
    {
        _id: mongoose.Types.ObjectId('62137b84a98b8092634034e9'),
        projectId: mongoose.Types.ObjectId('62137f034f3285aad50b3424'),
        clientId: mongoose.Types.ObjectId('5f083c352a7908662c334533'),
        name: 'Brief rejected',
        description: 'This is test. Talent rejected on job brief for hired.',
        step: 3,
        status: 1,
        applications: [{
            talentId: mongoose.Types.ObjectId('5f523e4a7e416a76f64ea921'),
            status: 5
        }]
    }],
    quotes: [{
        _id: mongoose.Types.ObjectId('5fa500eea79f873b8ef67b17'),
        status: 1,
        projectId: '5f8ef124236a1d065262cc0f',
        name: 'First Brief',
        description: 'relying on meaningful content.',
        addedBy: '5f5f2cd2f1472c3303b6b861',
        quoteUrl: 'local-quotes/5f5f2cd2f1472c3303b6b861/Barbossa.jpg',
        applications: []
    }],
    industries: industriesArr,
    cultures: culturesArr,
    autoGenerator: [{
        type: 'bill', prefix: 'BILL-',
        length: 10,
        number: 1
    },
    {
        type: 'job-post', prefix: '',
        length: 4,
        number: 1
    }],
    eventlog: [{
        createdAt: '2022-02-01T17:33:15.172',
        userId: mongoose.Types.ObjectId('61f96ee2d9c606b9675500df'),
        type: 'invited',
        content: 'Invited by Nikola Dev'
    },
    {
        createdAt: '2022-02-01T17:36:15.172',
        userId: mongoose.Types.ObjectId('61f96ee2d9c606b9675500df'),
        type: 'signup',
        content: 'Signed-up'
    }],
    timesheet: [{
        "_id":mongoose.Types.ObjectId("62176b7c13f1e04658f81b97"),
        "status":4,
        "dateStart": '2022-02-01T17:36:15.172',
        "currency":"USD",
        "ratePerHour":87,
        "ratePerDay":652.5,
        "earning":652.5,
        "commission":195.75,
        "clientVat":0,
        "cost":848.25,
        "createdBy":mongoose.Types.ObjectId("6217557f18ddb72f57cc34d4"),
        "histories":[{
                "status":0,"_id":mongoose.Types.ObjectId("62176b7d13f1e04658f81b98"),
                "dateStart":'2022-02-01T17:36:15.172',
                "currency":"USD",
                "ratePerHour":87,
                "ratePerDay":652.5,
                "earning":652.5,
                "commission":195.75,
                "clientVat":0,
                "cost":848.25,
                "createdBy":mongoose.Types.ObjectId("6217557f18ddb72f57cc34d4"),
                "createdAt":'2022-02-01T17:36:15.172'
            },
            {
                "status":1,
                "_id":mongoose.Types.ObjectId("62176ba0557c9646603bc611"),
                "billId":mongoose.Types.ObjectId("62176ba0557c9646603bc60f"),
                "createdBy":mongoose.Types.ObjectId("6217557f18ddb72f57cc34d4"),
                "week":[],
                "createdAt":'2022-02-01T17:36:15.172'
            },
            {
                "status":4,
                "_id":mongoose.Types.ObjectId("62176baf557c9646603bc619"),
                "billId":mongoose.Types.ObjectId("62176ba0557c9646603bc60f"),
                "createdBy":mongoose.Types.ObjectId("5f60c2d6d381375246a7e76b"),
                "week":[],
                "createdAt":'2022-02-01T17:36:15.172'
            }
        ],
        "updatedAt":'2022-02-01T17:36:15.172',
        "createdAt":'2022-02-01T17:36:15.172',
        "approvedOn":'2022-02-01T17:36:15.172'
    }]
};
