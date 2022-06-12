module.exports = {
    workExperienceDetails: [
        {
            it: 'As a user I should validate if work experience details is not passed',
            options: {
            },
            status: 0
        },
        {
            it: 'As a user I should validate if work experience  details is as empty',
            options: {
                workExperience: ''
            },
            status: 0
        },
        {
            it: 'As a user I should validate if work experience  details is as string not array',
            options: {
                workExperience: 'some value'
            },
            status: 0
        },
        {
            it: 'As a user I should validate if work experience  details is as empty array',
            options: {
                workExperience: []
            },
            status: 0
        },
        {
            it: 'As a user I should validate if work experience details job title is passed empty',
            options: {
                workExperience: [{
                    'jobTitle': ''
                }]
            },
            status: 0
        },
        {
            it: 'As a user I should validate if work experience details employment type is not passed',
            options: {
                workExperience: [{
                    'jobTitle': 'Software Engineer'
                }]
            },
            status: 0
        },
        {
            it: 'As a user I should validate if work experience details employment type is empty',
            options: {
                workExperience: [{
                    'jobTitle': 'Software Engineer',
                    'employmentType': ''
                }]
            },
            status: 0
        },
        {
            it: 'As a user I should validate if work experience details employer is not passed',
            options: {
                workExperience: [{
                    'jobTitle': 'Software Engineer',
                    'employmentType': 'Fulltime'
                }]
            },
            status: 0
        },
        {
            it: 'As a user I should validate if work experience details employer is empty',
            options: {
                workExperience: [{
                    'jobTitle': 'Software Engineer',
                    'employmentType': 'Fulltime',
                    'employer': ''
                }]
            },
            status: 0
        },
        {
            it: 'As a user I should validate if work experience details country is not passed',
            options: {
                workExperience: [{
                    'jobTitle': 'Software Engineer',
                    'employmentType': 'Fulltime',
                    'employer': 'codemonk'
                }]
            },
            status: 0
        },
        {
            it: 'As a user I should validate if work experience details country is empty',
            options: {
                workExperience: [{
                    'jobTitle': 'Software Engineer',
                    'employmentType': 'Fulltime',
                    'employer': 'codemonk',
                    'country': ''
                }]
            },
            status: 0
        },
        {
            it: 'As a user I should validate if work experience details start date is not passed',
            options: {
                workExperience: [{
                    'jobTitle': 'Software Engineer',
                    'employmentType': 'Fulltime',
                    'employer': 'codemonk',
                    'country': 'India'

                }]
            },
            status: 0
        },
        {
            it: 'As a user I should validate if work experience details start date is empty',
            options: {
                workExperience: [{
                    'jobTitle': 'Software Engineer',
                    'employmentType': 'Fulltime',
                    'employer': 'codemonk',
                    'country': 'India',
                    'startDate': ''
                }]
            },
            status: 0
        },
        {
            it: 'As a user I should validate if work experience details start date is passed invalid format',
            options: {
                workExperience: [{
                    'jobTitle': 'Software Engineer',
                    'employmentType': 'Fulltime',
                    'employer': 'codemonk',
                    'country': 'India',
                    'startDate': '2020-01-061T05:16:08.717Z'
                }]
            },
            status: 0
        },
        {
            it: 'As a user I should validate if work experience details end date is empty',
            options: {
                workExperience: [{
                    'jobTitle': 'Software Engineer',
                    'employmentType': 'Fulltime',
                    'employer': 'codemonk',
                    'country': 'India',
                    'startDate': '14/06/2019',
                    'endDate': ''
                }]
            },
            status: 0
        },
        {
            it: 'As a user I should validate if work experience details end date is passed incorrectly',
            options: {
                workExperience: [{
                    'jobTitle': 'Software Engineer',
                    'employmentType': 'Fulltime',
                    'employer': 'codemonk',
                    'country': 'India',
                    'startDate': '14/06/2019',
                    'endDate': '2020-07-01T05:16:08.717Z'
                }]
            },
            status: 0
        },
        {
            it: 'As a user I should validate if work experience details short description is empty',
            options: {
                workExperience: [{
                    'jobTitle': 'Software Engineer',
                    'employmentType': 'Fulltime',
                    'employer': 'codemonk',
                    'country': 'India',
                    'startDate': '14/06/2019',
                    'endDate': '14/06/2020',
                    'shortDescription': ''
                }]
            },
            status: 0
        },
        {
            it: 'As a user I should validate if work experience details job title is minimum',
            options: {
                workExperience: [{
                    'jobTitle': 'S',
                    'employmentType': 'Fulltime',
                    'employer': 'codemonk',
                    'country': 'India',
                    'startDate': '14/06/2019',
                    'endDate': '14/06/2020',
                    'shortDescription': 'I was software developer'
                }]
            },
            status: 0
        },
        {
            it: 'As a user I should validate if work experience details job title is maximum',
            options: {
                workExperience: [{
                    'jobTitle': ` placerat sagittis.
                    Duis vestibulum justo ac mi molestie ultrices. Sed accumsan
                    eleifend purus, at dignissim
                    lacus hendrerit eu.Phasellus tempor sollicitudin
                    odio ac posuere. Integer eros urna`,
                    'employmentType': 'Fulltime',
                    'employer': 'codemonk',
                    'country': 'India',
                    'startDate': '14/06/2019',
                    'endDate': '14/06/2020',
                    'shortDescription': 'I was software developer'
                }]
            },
            status: 0
        },
        {
            it: 'As a user I should validate if work experience details employer is minimum',
            options: {
                workExperience: [{
                    'jobTitle': 'Software Engineer',
                    'employmentType': 'Fulltime',
                    'employer': 'c',
                    'country': 'India',
                    'startDate': '14/06/2019',
                    'endDate': '14/06/2020',
                    'shortDescription': 'I was software developer'
                }]
            },
            status: 0
        },
        {
            it: 'As a user I should validate if work experience details employer is maximum',
            options: {
                workExperience: [{
                    'jobTitle': 'Software Engineer',
                    'employmentType': 'Fulltime',
                    'employer': ` placerat sagittis.
                    Duis vestibulum justo ac mi molestie ultrices. Sed accumsan
                    eleifend purus, at dignissim
                    lacus hendrerit eu.Phasellus tempor sollicitudin
                    odio ac posuere. Integer eros urna`,
                    'country': 'India',
                    'startDate': '14/06/2019',
                    'endDate': '14/06/2020',
                    'shortDescription': 'I was software developer'
                }]
            },
            status: 0
        },
        {
            it: 'As a user I should validate if work experience details short description is maximum',
            options: {
                workExperience: [{
                    'jobTitle': 'Software Engineer',
                    'employmentType': 'Fulltime',
                    'employer': 'codemonk',
                    'country': 'India',
                    'startDate': '14/06/2019',
                    'endDate': '14/06/2020',
                    'shortDescription': 'a'
                }]
            },
            status: 0
        },
        {
            it: 'As a user I should validate if work experience details short description is maximum',
            options: {
                workExperience: [{
                    'jobTitle': 'Software Engineer',
                    'employmentType': 'Fulltime',
                    'employer': 'codemonk',
                    'country': 'India',
                    'startDate': '14/06/2019',
                    'endDate': '14/06/2020',
                    'shortDescription': `
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                     at efficitur metus.
                    Duis convallis enim eu turpis convallis hendrerit. Quisque vestibulum id magna
                    placerat sagittis.Duis vestibulum justo ac mi molestie ultrices. Sed accumsan
                    eleifend purus, at dignissim lacus hendrerit eu.Phasellus tempor sollicitudin
                    odio ac posuere. Integer eros urna,
                     venenatis ac felis quis, tempus fringilla quam.
                    Curabitur gravida faucibus aliquet. Vestibulum elementum laoreet accumsan.
                    Suspendisse imperdiet orci ut quam mattis, eu molestie enim viverra. Nulla
                    porta eros feugiat porttitor ultrices.
                    Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit. Nullam at efficitur metus.
                    Duis convallis enim eu turpis convallis hendrerit. Quisque vestibulum id magna
                    placerat sagittis.Duis vestibulum justo ac mi molestie ultrices. Sed accumsan
                    eleifend purus, at dignissim lacus hendrerit eu.Phasellus tempor sollicitudin
                    odio ac posuere. Integer eros urna, venenatis
                    ac felis quis, tempus fringilla quam.
                    Curabitur gravida faucibus aliquet. Vestibulum elementum laoreet accumsan.
                    Suspendisse imperdiet orci ut quam mattis, eu molestie enim viverra. Nulla
                    porta eros feugiat porttitor ultrices.
                    Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit. Nullam at efficitur metus.
                    Duis convallis enim eu turpis convallis hendrerit. Quisque vestibulum id magna
                    placerat sagittis.Duis vestibulum justo ac mi molestie ultrices. Sed accumsan
                    eleifend purus, at dignissim lacus hendrerit eu.Phasellus tempor sollicitudin
                    odio ac posuere. Integer eros urna, venenati
                    s ac felis quis, tempus fringilla quam.
                    Curabitur gravida faucibus aliquet. Vestibulum elementum laoreet accumsan.
                    Suspendisse imperdiet orci ut quam mattis, eu molestie enim viverra. Nulla
                    porta eros feugiat porttitor ultrices`
                }]
            },
            status: 0
        },
        {
            it: 'As a user I cant save my work experience details if job title details is not passed',
            options: {
                workExperience: [{
                    'employmentType': 'Fulltime',
                    'employer': 'codemonk',
                    'country': 'India',
                    'startDate': '2020-01-061T05:16:08.717Z',
                    'endDate': '2020-07-01T05:16:08.717Z',
                    'shortDescription': 'I was software developer'
                }]
            },
            status: 0
        },
        {
            it: 'As a user I cant save my work experience details if employment Type details is not passed',
            options: {
                workExperience: [{
                    'jobTitle': 'Software Engineer',
                    'employer': 'codemonk',
                    'country': 'India',
                    'startDate': '2020-01-061T05:16:08.717Z',
                    'endDate': '2020-07-01T05:16:08.717Z',
                    'shortDescription': 'I was software developer'
                }]
            },
            status: 0
        },
        {
            it: 'As a user I cant save my work experience details if employer details is not passed',
            options: {
                workExperience: [{
                    'jobTitle': 'Software Engineer',
                    'employmentType': 'Fulltime',
                    'country': 'India',
                    'startDate': '2020-01-061T05:16:08.717Z',
                    'endDate': '2020-07-01T05:16:08.717Z',
                    'shortDescription': 'I was software developer'
                }]
            },
            status: 0
        },
        {
            it: 'As a user I cant save my work experience details if country details is not passed',
            options: {
                workExperience: [{
                    'jobTitle': 'Software Engineer',
                    'employmentType': 'Fulltime',
                    'employer': 'codemonk',
                    'startDate': '2020-01-061T05:16:08.717Z',
                    'endDate': '2020-07-01T05:16:08.717Z',
                    'shortDescription': 'I was software developer'
                }]
            },
            status: 0
        },
        {
            it: 'As a user I cant save my work experience details if start Date details is not passed',
            options: {
                workExperience: [{
                    'jobTitle': 'Software Engineer',
                    'employmentType': 'Fulltime',
                    'employer': 'codemonk',
                    'country': 'India',
                    'endDate': '2020-07-01T05:16:08.717Z',
                    'shortDescription': 'I was software developer'
                }]
            },
            status: 0
        },
        {
            it: 'As a user I cant save my work experience details if end Date details is not passed',
            options: {
                workExperience: [{
                    'jobTitle': 'Software Engineer',
                    'employmentType': 'Fulltime',
                    'employer': 'codemonk',
                    'country': 'India',
                    'startDate': '2020-01-061T05:16:08.717Z',
                    'shortDescription': 'I was software developer'
                }]
            },
            status: 0
        },
        {
            it: 'As a user I cant save my work experience details if short Description details is not passed',
            options: {
                workExperience: [{
                    'jobTitle': 'Software Engineer',
                    'employmentType': 'Fulltime',
                    'employer': 'codemonk',
                    'country': 'India',
                    'startDate': '2020-01-061T05:16:08.717Z',
                    'endDate': '2020-07-01T05:16:08.717Z'
                }]
            },
            status: 0
        },
        {
            it: 'As a user I cant save my work experience details employmentType is entered wrong',
            options: {
                workExperience: [{
                    'jobTitle': 'Software Engineer',
                    'employmentType': 'demo',
                    'employer': 'codemonk',
                    'country': 'India',
                    'startDate': '2020-01-061T05:16:08.717Z',
                    'endDate': '2020-07-01T05:16:08.717Z',
                    'shortDescription': 'I was software developer'
                }]
            },
            status: 0
        },
        {
            it: 'As a user I cant save my work experience details if employer is maximum',
            options: {
                workExperience: [{
                    'jobTitle': 'Software Engineer',
                    'employmentType': 'Fulltime',
                    'employer': `Lorem ipsum dummy text is used by many
                                web-developers to test how their HTML templates
                                will look with real data.`,
                    'country': 'India',
                    'startDate': '14/06/2019',
                    'endDate': '14/06/2020',
                    'shortDescription': 'I was software developer'
                }]
            },
            status: 0
        },
        {
            it: 'As a user I cant save my work experience details if start date is greater',
            options: {
                workExperience: [{
                    'jobTitle': 'Software Engineer',
                    'employmentType': 'Fulltime',
                    'employer': 'codemonk',
                    'country': 'India',
                    'startDate': '14/06/2020',
                    'endDate': '14/06/2019',
                    'shortDescription': 'I was software developer'
                }]
            },
            status: 0
        },
        {
            it: 'As a user I cant save my work experience details if country is passed incorrectly',
            options: {
                workExperience: [{
                    'jobTitle': 'Software Engineer',
                    'employmentType': 'Fulltime',
                    'employer': 'codemonk',
                    'country': 'demo',
                    'startDate': '14/06/2019',
                    'endDate': '14/06/2020',
                    'shortDescription': 'I was software developer'
                }]
            },
            status: 0
        }
    ]
};
