module.exports = {
    preferenceDetails: [
        {
            it: 'As a user I should validate if team preference is passed incorrectly',
            options: {
                teamPreference: ['demoteam']
            },
            status: 0
        },
        {
            it: 'As a user I should validate if assignments is passed incorrectly',
            options: {
                teamPreference: ['individuals'],
                assignments: ['demoassignment']
            },
            status: 0
        },
        {
            it: 'As a user I should validate if workPreference is passed incorrectly',
            options: {
                teamPreference: ['individuals'],
                assignments: ['occational-site-visit'],
                workPreference: 'demotime'
            },
            status: 0
        },
        {
            it: 'As a user I should validate if workPreference is passed incorrectly',
            options: {
                teamPreference: ['individuals'],
                assignments: ['occational-site-visit'],
                workPreference: ['demotime']
            },
            status: 0
        },
        {
            it: 'As a user I should validate if availability is passed incorrectly',
            options: {
                teamPreference: ['individuals'],
                assignments: ['occational-site-visit'],
                workPreference: ['fulltime'],
                availability: {}
            },
            status: 0
        },
        {
            it: 'As a user I should validate if teamPreference is passed string incorrectly',
            options: {
                teamPreference: 'demo',
                assignments: ['occational-site-visit'],
                workPreference: ['fulltime'],
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
                        key: 'second'
                    }
                ]
            },
            status: 0
        },
        {
            it: 'As a user I should validate if assignments is passed string incorrectly',
            options: {
                teamPreference: ['individuals'],
                assignments: 'demo',
                workPreference: ['fulltime'],
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
        },
        {
            it: `As a user I can not save my preference details teamPreference
         array value passed incorrectly right`,
            options: {
                teamPreference: ['individuals', 'demo'],
                assignments: ['occational-site-visit'],
                workPreference: ['fulltime'],
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
                        key: 'second'
                    }
                ]
            },
            status: 0
        },
        {
            it: `As a user I can not save my preference details teamPreference
                    array value passed incorrectly left`,
            options: {
                teamPreference: ['demo', 'individuals'],
                assignments: ['occational-site-visit'],
                workPreference: ['fulltime'],
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
                        key: 'second'
                    }
                ]
            },
            status: 0
        },
        {
            it: `As a user I can not save my preference details assignments
                    array value passed incorrectly`,
            options: {
                teamPreference: ['individuals', 'small-team'],
                assignments: ['occational-site-visit', 'demo'],
                workPreference: ['fulltime'],
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
                        key: 'second'
                    }
                ]
            },
            status: 0
        },
        {
            it: `As a user I can not save my preference details unavailability
                    array value passed incorrectly`,
            options: {
                teamPreference: ['individuals', 'small-team'],
                assignments: ['occational-site-visit'],
                workPreference: ['fulltime'],
                availability: true,
                unavailability: [
                    {
                        date: '2020-04-06T05:16:08.717Z'
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
            it: `As a user I can not save my preference details unavailability
                    array value passed incorrectly`,
            options: {
                teamPreference: ['individuals', 'small-team'],
                assignments: ['occational-site-visit'],
                workPreference: ['fulltime'],
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
            it: `As a user I can not save my preference details unavailability
                    as object`,
            options: {
                teamPreference: ['individuals', 'small-team'],
                assignments: ['occational-site-visit'],
                workPreference: ['fulltime'],
                availability: true,
                unavailability: {}
            },
            status: 0
        }
    ]
};
