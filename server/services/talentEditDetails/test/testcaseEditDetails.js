module.exports = {
    editDetails: [{
        it: 'As a user, I should validate firstName is only passed',
        options: {
            firstName: 'Talent'
        },
        status: 0
    },
    {
        it: 'As a user, I should validate lastName is only passed',
        options: {
            firstName: 'Talent',
            lastName: 'Last'
        },
        status: 0
    },
    {
        it: 'As a user, I should validate primaryRole is only passed',
        options: {
            firstName: 'Talent',
            lastName: 'Last',
            primaryRole: 'Developer'
        },
        status: 0
    },
    {
        it: 'As a user, I should validate invalid yearsOfExperience',
        options: {
            firstName: 'Talent',
            lastName: 'Last',
            countryCode: '91',
            phoneNumber: '9925061220',
            dob: '31/08/1986',
            gender: 'Male',
            postcode: '380015',
            timeZone: 'Asia/Kolkata',
            addressLineOne: 'Some House, Some Buildding',
            addressLineTwo: 'Some Road, Somewhere',
            city: 'Ahmedabad',
            country: 'India',
            primaryRole: 'Developer',
            yearsOfExperience: 'some years'
        },
        status: 0
    },
    {
        it: 'As a user, I should validate yearsOfExperience is only passed',
        options: {
            firstName: 'Talent',
            lastName: 'Last',
            primaryRole: 'Developer',
            yearsOfExperience: 'Beginner - 0 - 2 yrs'
        },
        status: 0
    },
    {
        it: 'As a user, I should validate city is only passed',
        options: {
            firstName: 'Talent',
            lastName: 'Last',
            primaryRole: 'Developer',
            yearsOfExperience: 'Beginner - 0 - 2 yrs',
            city: 'Ahmedabad'

        },
        status: 0
    },
    {
        it: 'As a user, I should validate country is only passed',
        options: {
            firstName: 'Talent',
            lastName: 'Last',
            primaryRole: 'Developer',
            yearsOfExperience: 'Beginner - 0 - 2 yrs',
            city: 'Ahmedabad',
            country: 'India'

        },
        status: 0
    },
    {
        it: 'As a user, I should validate timeZone is only passed',
        options: {
            firstName: 'Talent',
            lastName: 'Last',
            primaryRole: 'Developer',
            yearsOfExperience: 'Beginner - 0 - 2 yrs',
            city: 'Ahmedabad',
            country: 'India',
            timeZone: 'Asia/Kolkata'

        },
        status: 0
    },
    {
        it: 'As a user, I shouldnt be able to edit invalid timezone data',
        options: {
            firstName: 'Talent',
            lastName: 'Last',
            primaryRole: 'Developer',
            yearsOfExperience: 'Beginner - 0 - 2 yrs',
            city: 'Ahmedabad',
            country: 'India',
            timeZone: 'demo'
        },
        status: 0
    },
    {
        it: 'As a user, I shouldnt be able to edit countryCode is only passed',
        options: {
            firstName: 'Talent',
            lastName: 'Last',
            primaryRole: 'Developer',
            yearsOfExperience: 'Beginner - 0 - 2 yrs',
            city: 'Ahmedabad',
            country: 'India',
            timeZone: 'Asia/Kolkata',
            countryCode: '91'
        },
        status: 0
    },
    {
        it: 'As a user, I shouldnt be able to edit phoneNumber is only passed',
        options: {
            firstName: 'Talent',
            lastName: 'Last',
            primaryRole: 'Developer',
            yearsOfExperience: 'Beginner - 0 - 2 yrs',
            city: 'Ahmedabad',
            country: 'India',
            timeZone: 'Asia/Kolkata',
            countryCode: '91',
            phoneNumber: '9925061220'
        },
        status: 0
    },
    {
        it: 'As a user, I shouldnt be able to edit dob is only passed',
        options: {
            firstName: 'Talent',
            lastName: 'Last',
            primaryRole: 'Developer',
            yearsOfExperience: 'Beginner - 0 - 2 yrs',
            city: 'Ahmedabad',
            country: 'India',
            timeZone: 'Asia/Kolkata',
            countryCode: '91',
            phoneNumber: '9925061220',
            dob: '31/08/1986'
        },
        status: 0
    },
    {
        it: 'As a user, I shouldnt be able to edit gender is only passed',
        options: {
            firstName: 'Talent',
            lastName: 'Last',
            primaryRole: 'Developer',
            yearsOfExperience: 'Beginner - 0 - 2 yrs',
            city: 'Ahmedabad',
            country: 'India',
            timeZone: 'Asia/Kolkata',
            countryCode: '91',
            phoneNumber: '9925061220',
            dob: '31/08/1986',
            gender: 'Male'
        },
        status: 0
    },
    {
        it: 'As a user, I shouldnt be able to edit postcode is only passed',
        options: {
            firstName: 'Talent',
            lastName: 'Last',
            primaryRole: 'Developer',
            yearsOfExperience: 'Beginner - 0 - 2 yrs',
            city: 'Ahmedabad',
            country: 'India',
            timeZone: 'Asia/Kolkata',
            countryCode: '91',
            phoneNumber: '9925061220',
            dob: '31/08/1986',
            gender: 'Male',
            postcode: '380015'
        },
        status: 0
    },
    {
        it: 'As a user, I shouldnt be able to edit addressLineTwo is only passed',
        options: {
            firstName: 'Talent',
            lastName: 'Last',
            primaryRole: 'Developer',
            yearsOfExperience: 'Beginner - 0 - 2 yrs',
            city: 'Ahmedabad',
            country: 'India',
            timeZone: 'Asia/Kolkata',
            countryCode: '91',
            phoneNumber: '9925061220',
            dob: '31/08/1986',
            gender: 'Male',
            postcode: '380015',
            addressLineTwo: 'Some Road, Somewhere'
        },
        status: 0
    },
    {
        it: 'As a user, I shouldnt be able to edit all details but invalid gender',
        options: {
            firstName: 'Talent',
            lastName: 'Last',
            primaryRole: 'Developer',
            yearsOfExperience: 'Beginner - 0 - 2 yrs',
            city: 'Ahmedabad',
            country: 'India',
            timeZone: 'Asia/Kolkata',
            countryCode: '91',
            phoneNumber: '9925061220',
            dob: '31/08/1986',
            gender: 'demo',
            postcode: '380015',
            addressLineOne: 'Some House, Some Buildding',
            addressLineTwo: 'Some Road, Somewhere'
        },
        status: 0
    },
    {
        it: 'As a user, I shouldnt be able to edit all details but invalid primaryRole',
        options: {
            firstName: 'Talent',
            lastName: 'Last',
            primaryRole: 'demo',
            yearsOfExperience: 'Beginner - 0 - 2 yrs',
            city: 'Ahmedabad',
            country: 'India',
            timeZone: 'Asia/Kolkata',
            countryCode: '91',
            phoneNumber: '9925061220',
            dob: '31/08/1986',
            gender: 'Male',
            postcode: '380015',
            addressLineOne: 'Some House, Some Buildding',
            addressLineTwo: 'Some Road, Somewhere'
        },
        status: 0
    }],
    summary: [{
        it: 'As a user, I shouldnt be able to save summary becuase of no key passed',
        options: {

        },
        status: 0
    }, {
        it: 'As a user, I shouldnt be able to summary because of minimum numbers',
        options: {
            professionalSummary: '<p>Eum facete intellegat ei, ut mazim melius usu.</p>'
        },
        status: 0
    }, {
        it: 'As a user, I shouldnt be able to summary because of maximum numbers',
        options: {
            professionalSummary: `<p>Lorem ipsum dolor sit amet, nonumes voluptatum mel ea,
             cu case ceteros cum. Novum commodo malorum vix ut. Dolores consequuntur in ius,
             sale electram dissentiunt quo te. Cu duo omnes invidunt, eos eu mucius fabellas.
              Stet facilis ius te, quando voluptatibus eos in. Ad vix mundi alterum,
              integre urbanitas intellegam vix in.</p>
            <p>Eum facete intellegat ei, ut mazim melius usu. Has elit simul primis ne,
             regione minimum id cum. Sea deleniti dissentiet ea. Illud mollis moderatius ut per,
             at qui ubique populo. Eum ad cibo legimus, vim ei quidam fastidii.</p>
            <p>Lorem ipsum dolor sit amet, nonumes voluptatum mel ea, cu case ceteros cum.
             Novum commodo malorum vix ut. Dolores consequuntur in ius, sale electram dissentiunt quo te.
              Cu duo omnes invidunt, eos eu mucius fabellas. Stet facilis ius te, quando voluptatibus eos in.
              Ad vix mundi alterum, integre urbanitas intellegam vix in.</p>
            <p>Eum facete intellegat ei, ut mazim melius usu. Has elit simul primis ne,
             regione minimum id cum. Sea deleniti dissentiet ea. Illud mollis moderatius ut per,
              at qui ubique populo. Eum ad cibo legimus, vim ei quidam fastidii.</p>`
        },
        status: 0
    }],
    rate: [{
        it: 'As a user, I shouldnt be able to save rate without currency',
        options: {},
        status: 0
    }, {
        it: 'As a user, I shouldnt be able to save rate with invalid currency',
        options: {
            currency: 'INVALID'

        },
        status: 0
    }, {
        it: 'As a user, I shouldnt be able to save rate without ratePerHour',
        options: {
            currency: 'GBP'

        },
        status: 0
    }, {
        it: 'As a user, I shouldnt be able to save rate with ratePerHour as 0',
        options: {
            currency: 'GBP',
            ratePerHour: 0
        },
        status: 0
    }, {
        it: 'As a user, I shouldnt be able to save rate with invalid ratePerHour',
        options: {
            currency: 'GBP',
            ratePerHour: 'Some String'
        },
        status: 0
    }],
    skills: [{
        it: 'As a user, I shouldnt be able to save empty skills',
        options: {
            skills: []
        },
        status: 0
    },
    {
        it: 'As a user,I shouldnt be able to save with only skills name',
        options: {
            skills: [
                {
                    name: 'Node'
                }
            ]
        },
        status: 0
    },
    {
        it: 'As a user,I shouldnt be able to save with only skills rate',
        options: {
            skills: [
                {
                    rate: 8
                }
            ]
        },
        status: 0
    },
    {
        it: 'As a user, I should be able to edit invalid rate',
        options: {
            skills: [
                {
                    name: 'demo',
                    rate: 12
                }
            ]
        },
        status: 0
    },
    {
        it: 'As a user, I should be able to edit invalid rate',
        options: {
            skills: [
                {
                    name: 'demo',
                    rate: -5
                }
            ]
        },
        status: 0
    }],
    professionalURL: [{
        it: 'As a user, I should able to edit invalid linkedInUrl',
        options: {
            linkedInUrl: 'https://www.link.com/williamhgates'
        },
        status: 0
    },
    {
        it: 'As a user, I should able to edit invalid gitHubUrl',
        options: {
            gitHubUrl: 'https://github.con/in/bill-gates'
        },
        status: 0
    },
    {
        it: 'As a user, I should able to edit invalid stackOverFlowUrl',
        options: {
            stackOverFlowUrl: 'https://stackoverflow.com/users/jon-skeet'
        },
        status: 0
    }],
    addProject: [{
        it: 'As a user, I should not be able to add partial project object',
        options: {

        },
        status: 0
    },
    {
        it: 'As a user, I should not be able to add project object with only name',
        options: {
            name: 'CodeMonk',
            employer: 'SLPM SELF CARE',
            industry: 'Accounting',
            skills: [{ name: "Amazon Kinesis", rate: 5 }]
        },
        status: 0
    },
    {
        it: 'As a user, I should not be able to add project object with name and description',
        options: {
            name: 'CodeMonk',
            description: 'This is for devlopers',
            employer: 'SLPM SELF CARE',
            industry: 'Accounting',
            skills: [{ name: "Amazon Kinesis", rate: 5 }]
        },
        status: 0
    },
    {
        it: 'As a user, I should not be able to add project object without role',
        options: {
            name: 'CodeMonk',
            description: 'This is for devlopers',
            role: '',
            employer: 'SLPM SELF CARE',
            industry: 'Accounting',
            skills: [{ name: "Amazon Kinesis", rate: 5 }]
        },
        status: 0
    },
    {
        it: 'As a user, I should not be able to add project object invalid role',
        options: {
            name: 'CodeMonk',
            description: 'This is for devlopers',
            role: 'invalid role',
            employer: 'SLPM SELF CARE',
            industry: 'Accounting',
            skills: [{ name: "Amazon Kinesis", rate: 5 }]
        },
        status: 0
    },
    {
        it: 'As a user, I should not be able to add project object without keyachivements',
        options: {
            name: 'CodeMonk',
            description: 'This is for devlopers',
            role: 'Developer',
            employer: 'SLPM SELF CARE',
            industry: 'Accounting',
            skills: [{ name: "Amazon Kinesis", rate: 5 }]
        },
        status: 0
    },
    {
        it: 'As a user, I should not be able to add project object with invalid url',
        options: {
            name: 'CodeMonk',
            url: 'Invalid url',
            description: 'This is for devlopers',
            role: 'Developer',
            keyAchievements: 'I delivered the sprint 1 and sprint 2 on time',
            employer: 'SLPM SELF CARE',
            industry: 'Accounting',
            skills: [{ name: "Amazon Kinesis", rate: 5 }]
        },
        status: 0
    },
    {
        it: 'As a user, I should not be able to add project object with wrong role',
        options: {
            name: 'CodeMonk',
            url: 'http://www.codemonk.ai',
            description: 'This is for devlopers',
            role: 'INVALID ROLE',
            keyAchievements: 'I delivered the sprint 1 and sprint 2 on time',
            employer: 'SLPM SELF CARE',
            industry: 'Accounting',
            skills: [{ name: "Amazon Kinesis", rate: 5 }]
        },
        status: 0
    }],
    deleteProject: [{
        it: 'As a user, I should not be able to add project object with wrong role',
        options: {
            _id: ''
        },
        status: 0
    }],
    editProject: [{
        it: 'As a user, I should not be able to edit project object with only name',
        options: {
            name: 'CodeMonk',
            employer: 'SLPM SELF CARE',
            industry: 'Accounting',
            skills: [{ name: "Amazon Kinesis", rate: 5 }]
        },
        status: 0
    },
    {
        it: 'As a user, I should not be able to edit project object with name and description',
        options: {
            name: 'CodeMonk',
            description: 'This is for devlopers',
            employer: 'SLPM SELF CARE',
            industry: 'Accounting',
            skills: [{ name: "Amazon Kinesis", rate: 5 }]
        },
        status: 0
    },
    {
        it: 'As a user, I should not be able to edit project object without keyachivements',
        options: {
            name: 'CodeMonk',
            description: 'This is for devlopers',
            role: 'Developer',
            employer: 'SLPM SELF CARE',
            industry: 'Accounting',
            skills: [{ name: "Amazon Kinesis", rate: 5 }]
        },
        status: 0
    },
    {
        it: 'As a user, I should not be able to edit project object with invalid url',
        options: {
            name: 'CodeMonk',
            url: 'Invalid url',
            description: 'This is for devlopers',
            role: 'Developer',
            keyAchievements: 'I delivered the sprint 1 and sprint 2 on time',
            employer: 'SLPM SELF CARE',
            industry: 'Accounting',
            skills: [{ name: "Amazon Kinesis", rate: 5 }]
        },
        status: 0
    },
    {
        it: 'As a user, I should not be able to edit project object with wrong role',
        options: {
            name: 'CodeMonk',
            url: 'http://www.codemonk.ai',
            description: 'This is for devlopers',
            role: 'INVALID ROLE',
            keyAchievements: 'I delivered the sprint 1 and sprint 2 on time',
            employer: 'SLPM SELF CARE',
            industry: 'Accounting',
            skills: [{ name: "Amazon Kinesis", rate: 5 }]
        },
        status: 0
    },
    {
        it: 'As a user, I should not be able to edit project object with wrong id',
        options: {
            id: 'abc',
            name: 'CodeMonk',
            url: 'http://www.codemonk.ai',
            description: 'This is for devlopers',
            role: 'INVALID ROLE',
            keyAchievements: 'I delivered the sprint 1 and sprint 2 on time',
            employer: 'SLPM SELF CARE',
            industry: 'Accounting',
            skills: [{ name: "Amazon Kinesis", rate: 5 }]
        },
        status: 0
    }],
    preferences: [{
        it: 'As a user, I should able to edit only teamPreference',
        options: {
            teamPreference: ['demo', 'small-team'],
            companyCultures:["Trust"],
            companyType: ["start-up"],
            industries: ["Business Supplies and Equipment"],
            preferredProjectDuration: ["short-term"]
        },
        status: 0
    },
    {
        it: 'As a user, I should able to edit only assignments',
        options: {
            assignments: ['demo', 'remote-only'],
            companyCultures:["Trust"],
            companyType: ["start-up"],
            industries: ["Business Supplies and Equipment"],
            preferredProjectDuration: ["short-term"]
        },
        status: 0
    },
    {
        it: 'As a user, I should able to edit only workPreference',
        options: {
            workPreference: ['demo'],
            companyCultures:["Trust"],
            companyType: ["start-up"],
            industries: ["Business Supplies and Equipment"],
            preferredProjectDuration: ["short-term"]
        },
        status: 0
    },
    {
        it: 'As a user, I should able to edit invalid teamPreference',
        options: {
            teamPreference: ['demo'],
            assignments: ['occational-site-visit', 'remote-only'],
            workPreference: ['fulltime'],
            companyCultures:["Trust"],
            companyType: ["start-up"],
            industries: ["Business Supplies and Equipment"],
            preferredProjectDuration: ["short-term"]
        },
        status: 0
    },
    {
        it: 'As a user, I should able to edit invalid assignments',
        options: {
            teamPreference: ['individuals', 'small-team'],
            assignments: ['demo'],
            workPreference: ['fulltime'],
            companyCultures:["Trust"],
            companyType: ["start-up"],
            industries: ["Business Supplies and Equipment"],
            preferredProjectDuration: ["short-term"]
        },
        status: 0
    },
    {
        it: 'As a user, I should able to edit invalid workPreference',
        options: {
            teamPreference: ['individuals', 'small-team'],
            assignments: ['occational-site-visit', 'remote-only'],
            workPreference: ['demo'],
            companyCultures:["Trust"],
            companyType: ["start-up"],
            industries: ["Business Supplies and Equipment"],
            preferredProjectDuration: ["short-term"]
        },
        status: 0
    }],
    availability: [{
        it: 'As a user, I should able to edit invalid availability',
        options: {
            availability: 'demo',
            unavailability: [
                {
                    date: '2020-04-06T05:16:08.717Z',
                    key: 'full'
                }, {
                    date: '2020-04-07T05:16:08.717Z',
                    key: 'first'
                }, {
                    date: '2020-04-06T05:16:08.717Z',
                    key: 'second'
                }
            ]
        },
        status: 0
    },
    {
        it: 'As a user, I should able to edit invalid availability',
        options: {
            availability: true,
            unavailability: [
                {
                    date: '2020-04-06T05:16:08.717Z',
                    key: 'demo'
                }, {
                    date: '2020-04-07T05:16:08.717Z',
                    key: 'first'
                }, {
                    date: '2020-04-06T05:16:08.717Z',
                    key: 'second'
                }
            ]
        },
        status: 0
    },
    {
        it: 'As a user, I should able to edit invalid availability',
        options: {
            availability: true,
            unavailability: [
                {
                    date: '2020-04-06T05:16:08.717Z',
                    key: 'full'
                }, {
                    date: '2020-04-07T05:16:08.717Z',
                    key: 'first'
                }, {
                    date: '2020-04-06T05:16:08.717Z',
                    key: 'demo'
                }
            ]
        },
        status: 0
    }],
    addEducation: [{
        it: 'As a user, I should not be able to add education object with only degreelevel',
        options: {
            degreeLevel: 'Master’s or Higher'
        },
        status: 0
    },
    {
        it: `As a user, I should not be able to add education
        object with degreeLevel and degreeTitle`,
        options: {
            degreeLevel: 'Master’s or Higher',
            degreeTitle: 'Master in Computer Application'
        },
        status: 0
    },
    {
        it: `As a user, I should not be able to add education
        object with degreeLevel , degreeTitle & collegeName`,
        options: {
            degreeLevel: 'Master’s or Higher',
            degreeTitle: 'Master in Computer Application',
            collegeName: 'IETE, New Delhi'
        },
        status: 0
    },
    {
        it: `As a user, I should not be able to add education
        object with degreeLevel , degreeTitle , collegeName & country`,
        options: {
            degreeLevel: 'Master’s or Higher',
            degreeTitle: 'Master in Computer Application',
            collegeName: 'IETE, New Delhi',
            country: 'India'
        },
        status: 0
    },
    {
        it: `As a user, I should not be able to add education
        object with degreeLevel , degreeTitle , collegeName , country & startdate`,
        options: {
            degreeLevel: 'Master’s or Higher',
            degreeTitle: 'Master in Computer Application',
            collegeName: 'IETE, New Delhi',
            country: 'India',
            startYear: 2019
        },
        status: 0
    },
    {
        it: `As a user, I should not be able to add education
            object start date is greater`,
        options: {
            degreeLevel: 'Master’s or Higher',
            degreeTitle: 'Master in Computer Application',
            collegeName: 'IETE, New Delhi',
            country: 'India',
            startYear: 2020,
            endYear: 2019
        },
        status: 0
    }],
    deleteEducation: [{
        it: 'As a user, I should not be able to delete education object with wrong id',
        options: {
            _id: ''
        },
        status: 0
    }],
    editEducation: [{
        it: 'As a user, I should not be able to edit education object with only degreelevel',
        options: {
            degreeLevel: 'Master’s or Higher'
        },
        status: 0
    },
    {
        it: `As a user, I should not be able to edit education
            object with degreeLevel and degreeTitle`,
        options: {
            degreeLevel: 'Master’s or Higher',
            degreeTitle: 'Master in Computer Application'
        },
        status: 0
    },
    {
        it: `As a user, I should not be able to edit education
            object with degreeLevel , degreeTitle & collegeName`,
        options: {
            degreeLevel: 'Master’s or Higher',
            degreeTitle: 'Master in Computer Application',
            collegeName: 'IETE, New Delhi'
        },
        status: 0
    },
    {
        it: `As a user, I should not be able to edit education
            object with degreeLevel , degreeTitle , collegeName & country`,
        options: {
            degreeLevel: 'Master’s or Higher',
            degreeTitle: 'Master in Computer Application',
            collegeName: 'IETE, New Delhi',
            country: 'India'
        },
        status: 0
    },
    {
        it: `As a user, I should not be able to edit education
            object with degreeLevel , degreeTitle , collegeName , country & startdate`,
        options: {
            degreeLevel: 'Master’s or Higher',
            degreeTitle: 'Master in Computer Application',
            collegeName: 'IETE, New Delhi',
            country: 'India',
            startDate: '14/06/2019'
        },
        status: 0
    },
    {
        it: `As a user, I should not be able to edit education
            object with invalid country`,
        options: {
            degreeLevel: 'Master’s or Higher',
            degreeTitle: 'Master in Computer Application',
            collegeName: 'IETE, New Delhi',
            country: 'demo',
            startDate: '14/06/2019',
            endDate: '14/06/2020'
        },
        status: 0
    },
    {
        it: `As a user, I should not be able to edit education
                object start date is greater`,
        options: {
            degreeLevel: 'Master’s or Higher',
            degreeTitle: 'Master in Computer Application',
            collegeName: 'IETE, New Delhi',
            country: 'India',
            startDate: '14/06/2020',
            endDate: '14/06/2019'
        },
        status: 0
    }],
    addWorkExperience: [{
        it: 'As a user, I should not be able to add partial work experience',
        options: {

        },
        status: 0
    },
    {
        it: 'As a user, I should not be able to add work experience with only jobTitle',
        options: {
            jobTitle: 'Software Engineer'
        },
        status: 0
    },
    {
        it: `As a user, I should not be able to add work experience with
            jobTitle and employmentType`,
        options: {
            jobTitle: 'Software Engineer',
            employmentType: 'Fulltime'
        },
        status: 0
    },
    {
        it: `As a user, I should not be able to add work experience
            with jobTitle, employmentType and employer`,
        options: {
            jobTitle: 'Software Engineer',
            employmentType: 'Fulltime',
            employer: 'codemonk'
        },
        status: 0
    },
    {
        it: `As a user, I should not be able to add work experience
            with jobTitle, employmentType, employer and country`,
        options: {
            jobTitle: 'Software Engineer',
            employmentType: 'Fulltime',
            employer: 'codemonk',
            country: 'India'
        },
        status: 0
    },
    {
        it: `As a user, I should not be able to add work experience
            with jobTitle, employmentType, employer, country and startDate`,
        options: {
            jobTitle: 'Software Engineer',
            employmentType: 'Fulltime',
            employer: 'codemonk',
            country: 'India',
            startDate: '14/06/2019'
        },
        status: 0
    },
    {
        it: 'As a user, I should not be able to add work experience without shortDescription',
        options: {
            jobTitle: 'Software Engineer',
            employmentType: 'Fulltime',
            employer: 'codemonk',
            country: 'India',
            startDate: '14/06/2019',
            endDate: '14/06/2020'
        },
        status: 0
    },
    {
        it: `As a user, I should not be able to add work experience
            with invalid country`,
        options: {
            jobTitle: 'Software Engineer',
            employmentType: 'Fulltime',
            employer: 'codemonk',
            country: 'INVALID country',
            startDate: '14/06/2019',
            endDate: '14/06/2020',
            shortDescription: 'I was software developer'
        },
        status: 0
    },
    {
        it: 'As a user, I should not be able to add work experience with invalid country',
        options: {
            jobTitle: 'Software Engineer',
            employmentType: 'Fulltime',
            employer: 'codemonk',
            country: 'INVALID country',
            startDate: '14/06/2019',
            endDate: '14/06/2020',
            shortDescription: 'I was software developer'
        },
        status: 0
    },
    {
        it: 'As a user, I should not be able to add work experience with invalid date',
        options: {
            jobTitle: 'Software Engineer',
            employmentType: 'Fulltime',
            employer: 'codemonk',
            country: 'India',
            startDate: '14/06/2019',
            endDate: '14/06/2018',
            shortDescription: 'I was software developer'
        },
        status: 0
    }],
    deleteWorkExperience: [{
        it: 'As a user, I should not be able to delete work experience object with blank id',
        options: {
            _id: ''
        },
        status: 0
    }],
    editWorkExperience: [{
        it: 'As a user, I should not be able to edit partial work experience',
        options: {

        },
        status: 0
    },
    {
        it: 'As a user, I should not be able to edit work experience with only jobTitle',
        options: {
            jobTitle: 'Software Engineer'
        },
        status: 0
    },
    {
        it: `As a user, I should not be able to edit work experience with
            jobTitle and employmentType`,
        options: {
            jobTitle: 'Software Engineer',
            employmentType: 'Fulltime'
        },
        status: 0
    },
    {
        it: `As a user, I should not be able to edit work experience
            with jobTitle, employmentType and employer`,
        options: {
            jobTitle: 'Software Engineer',
            employmentType: 'Fulltime',
            employer: 'codemonk'
        },
        status: 0
    },
    {
        it: `As a user, I should not be able to edit work experience
            with jobTitle, employmentType, employer and country`,
        options: {
            jobTitle: 'Software Engineer',
            employmentType: 'Fulltime',
            employer: 'codemonk',
            country: 'India'
        },
        status: 0
    },
    {
        it: `As a user, I should not be able to edit work experience
            with jobTitle, employmentType, employer, country and startDate`,
        options: {
            jobTitle: 'Software Engineer',
            employmentType: 'Fulltime',
            employer: 'codemonk',
            country: 'India',
            startDate: '14/06/2019'
        },
        status: 0
    },
    {
        it: 'As a user, I should not be able to edit work experience without shortDescription',
        options: {
            jobTitle: 'Software Engineer',
            employmentType: 'Fulltime',
            employer: 'codemonk',
            country: 'India',
            startDate: '14/06/2019',
            endDate: '14/06/2020'
        },
        status: 0
    },
    {
        it: `As a user, I should not be able to edit work experience
            with invalid country`,
        options: {
            jobTitle: 'Software Engineer',
            employmentType: 'Fulltime',
            employer: 'codemonk',
            country: 'INVALID country',
            startDate: '14/06/2019',
            endDate: '14/06/2020',
            shortDescription: 'I was software developer'
        },
        status: 0
    },
    {
        it: 'As a user, I should not be able to edit work experience with invalid country',
        options: {
            jobTitle: 'Software Engineer',
            employmentType: 'Fulltime',
            employer: 'codemonk',
            country: 'INVALID country',
            startDate: '14/06/2019',
            endDate: '14/06/2020',
            shortDescription: 'I was software developer'
        },
        status: 0
    },
    {
        it: 'As a user, I should not be able to edit work experience with invalid date',
        options: {
            jobTitle: 'Software Engineer',
            employmentType: 'Fulltime',
            employer: 'codemonk',
            country: 'India',
            startDate: '14/06/2019',
            endDate: '14/06/2018',
            shortDescription: 'I was software developer'
        },
        status: 0
    }],
    addCertificate: [{
        it: 'As a user, I should not be able to add certificate object with only name',
        options: {
            name: 'AWS Solution Architect'
        },
        status: 0
    },
    {
        it: `As a user, I should not be able to add certificate
            object with name and dateObtained`,
        options: {
            name: 'AWS Solution Architect',
            dateObtained: '30/08/2019'
        },
        status: 0
    },
    {
        it: `As a user, I should not be able to add certificate
            object with name, dateObtained & issuedBy`,
        options: {
            name: 'AWS Solution Architect',
            dateObtained: '30/08/2019',
            issuedBy: 'Amazon'
        },
        status: 0
    },
    {
        it: `As a user, I should not be able to add certificate
            object with invalid certificateid`,
        options: {
            name: 'AWS Solution Architect',
            dateObtained: '30/08/2019',
            issuedBy: 'Amazon',
            certificateId: 'A'
        },
        status: 0
    }],
    deleteCertificate: [{
        it: 'As a user, I should not be able to delete certificate object with wrong id',
        options: {
            _id: ''
        },
        status: 0
    }],
    editCertificate: [{
        it: 'As a user, I should not be able to add certificate object with only name',
        options: {
            name: 'AWS Solution Architect'
        },
        status: 0
    },
    {
        it: `As a user, I should not be able to add certificate
            object with name and dateObtained`,
        options: {
            name: 'AWS Solution Architect',
            dateObtained: '30/08/2019'
        },
        status: 0
    },
    {
        it: `As a user, I should not be able to add certificate
            object with name, dateObtained & issuedBy`,
        options: {
            name: 'AWS Solution Architect',
            dateObtained: '30/08/2019',
            issuedBy: 'Amazon'
        },
        status: 0
    },
    {
        it: `As a user, I should not be able to add certificate
            object with invalid certificateid`,
        options: {
            name: 'AWS Solution Architect',
            dateObtained: '30/08/2019',
            issuedBy: 'Amazon',
            certificateId: 'A'
        },
        status: 0
    }],
    billing: [{
        it: 'As a user, I should able to edit invalid billing',
        options: {
            billingType: ''
        },
        status: 0
    },
    {
        it: 'As a user, I should able to edit invalid billing',
        options: {
            billingType: 'SomeType'
        },
        status: 0
    },
    {
        it: 'As a user, I should able to edit only billingType',
        options: {
            billingType: 'company'
        },
        status: 0
    },
    {
        it: 'As a user, I should able to edit only billingType ,companyName',
        options: {
            billingType: 'company',
            companyName: 'Soft Silicon'
        },
        status: 0
    },
    {
        it: `As a user, I should able to edit only billingType ,
            companyName,companyregisteredNumber`,
        options: {
            billingType: 'company',
            companyName: 'Soft Silicon',
            companyregisteredNumber: 'ABC'
        },
        status: 0
    },
    {
        it: `As a user, I should able to edit only billingType ,
            companyName,companyregisteredNumber,companyPincode`,
        options: {
            billingType: 'company',
            companyName: 'Soft Silicon',
            companyregisteredNumber: 'ABC',
            companyPincode: '380015'
        },
        status: 0
    },
    {
        it: `As a user, I should able to edit only billingType ,
            companyName,companyregisteredNumber,companyPincode,companyCity`,
        options: {
            billingType: 'company',
            companyName: 'Soft Silicon',
            companyregisteredNumber: 'ABC',
            companyPincode: '380015',
            companyCity: 'Ahmedabad'
        },
        status: 0
    },
    {
        it: `As a user, I should able to edit only billingType ,
            companyName,companyregisteredNumber,companyPincode,companyCity,companyCountry`,
        options: {
            billingType: 'company',
            companyName: 'Soft Silicon',
            companyregisteredNumber: 'ABC',
            companyPincode: '380015',
            companyCity: 'Ahmedabad',
            companyCountry: 'India'
        },
        status: 0
    }],
    payment: [{
        it: 'As a user, I should able to edit invalid paytype',
        options: {
            payType: 'sometype'
        },
        status: 0
    },
    {
        it: 'As a user, I should able to edit without paypalemail',
        options: {
            payType: 'paypal'
        },
        status: 0
    },
    {
        it: 'As a user, I should able to edit paypalemail empty ',
        options: {
            payType: 'paypal',
            payPalEmail: ''
        },
        status: 0
    },
    {
        it: 'As a user, I should able to edit payType demo ',
        options: {
            payType: 'demo',
            payPalEmail: 'hitesh@paypal.com'
        },
        status: 0
    },
    {
        it: 'As a user, I should able to edit invalid payment paytype bank only',
        options: {
            payType: 'bank'
        },
        status: 0
    },
    {
        it: 'As a user, I should able to edit invalid payment paytype bank & bankname only',
        options: {
            payType: 'bank',
            bankName: 'Kotak'
        },
        status: 0
    },
    {
        it: 'As a user, I should able to edit invalid payment without bankcode',
        options: {
            payType: 'bank',
            bankName: 'Kotak',
            bankAccountNumber: 'ABC'
        },
        status: 0
    },
    {
        it: 'As a user, I should able to edit invalid payment invalid paytype',
        options: {
            payType: 'demo',
            bankName: 'Kotak',
            bankAccountNumber: 'ABC',
            bankCode: 'KT1234'
        },
        status: 0
    }],
    languages: [{
        it: 'As a user, I shouldnt be able to save empty languages',
        options: {
            languages: []
        },
        status: 0
    },
    {
        it: 'As a user,I shouldnt be able to save with only languages name',
        options: {
            languages: [{
                name: 'fr'
            }]
        },
        status: 0
    },
    {
        it: 'As a user,I shouldnt be able to save with only languages rate',
        options: {
            languages: [{
                rate: 8
            }]
        },
        status: 0
    },
    {
        it: 'As a user, I should be able to edit invalid rate',
        options: {
            languages: [{
                name: 'en',
                rate: 12
            }]
        },
        status: 0
    },
    {
        it: 'As a user, I should be able to edit invalid rate',
        options: {
            languages: [{
                name: 'en',
                rate: -5
            }]
        },
        status: 0
    }]
};
