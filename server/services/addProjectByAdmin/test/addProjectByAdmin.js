module.exports = {
    addProject: [{
        it: 'As a admin I should validate add project details must not be blank',
        options: {
        },
        status: 0
    },
    {
        it: 'As a admin I should validate add project details client id must not be blank',
        options: {
            clientId: ''
        },
        status: 0
    },
    {
        it: 'As a admin I should validate add project details client id must be valid',
        options: {
            clientId: 'A'
        },
        status: 0
    },
    {
        it: 'As a admin I should validate add project name must not be as blank',
        options: {
            clientId: '5f083c352a7908662c334533',
            name: ''
        },
        status: 0
    },
    {
        it: 'As a admin I should validate add project name as minimum characters',
        options: {
            clientId: '5f083c352a7908662c334533',
            name: 'A'
        },
        status: 0
    },
    {
        it: 'As a admin I should validate add project name as maximum character',
        options: {
            clientId: '5f083c352a7908662c334533',
            name: '123456789012345678901234567890123456789012345678901'
        },
        status: 0
    },
    {
        it: 'As a admin I should validate add project description must be passed',
        options: {
            clientId: '5f083c352a7908662c334533',
            name: 'Codemonk'
        },
        status: 0
    },
    {
        it: 'As a admin I should validate add project description must not be blank',
        options: {
            clientId: '5f083c352a7908662c334533',
            name: 'Codemonk',
            description: ''
        },
        status: 0
    },
    {
        it: 'As a admin I should validate add project description must greater than minimum characters',
        options: {
            clientId: '5f083c352a7908662c334533',
            name: 'Codemonk',
            description: 'under 100'
        },
        status: 0
    },
    {
        it: 'As a admin I should validate add project description must be less maximum characters',
        options: {
            clientId: '5f083c352a7908662c334533',
            name: 'Codemonk',
            description: `Contrary to popular belief, Lorem Ipsum is not simply random text.
                It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
                Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia,
                 looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage,
                 and going through the cites of the word in classical literature, discovered the undoubtable source.
                Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"
                (The Extremes of Good and Evil) by Cicero, written in 45 BC.
                 This book is a treatise on the theory of ethics, very popular during the Renaissance.
                 The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

                The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
                Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in
                    their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.

                    Contrary to popular belief, Lorem Ipsum is not simply random text.
                    It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
                    Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia,
                     looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage,
                     and going through the cites of the word in classical literature, discovered the undoubtable source.
                    Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"
                    (The Extremes of Good and Evil) by Cicero, written in 45 BC.
                     This book is a treatise on the theory of ethics, very popular during the Renaissance.
                     The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

                    The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
                    Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in
                        their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`
        },
        status: 0
    },
    {
        it: 'As a admin I should validate add project details start date must not be blank',
        options: {
            clientId: '5f083c352a7908662c334533',
            name: 'CodeMonk',
            description: `The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
                Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in
                    their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`
        },
        status: 0
    },
    {
        it: 'As a admin I should validate add project details start date must not be invalid',
        options: {
            clientId: '5f083c352a7908662c334533',
            name: 'CodeMonk',
            description: `The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
                Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in
                    their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
            startDate: '12/31/2020'
        },
        status: 0
    },
    {
        it: 'As a admin I should validate add project details end date must not be blank',
        options: {
            clientId: '5f083c352a7908662c334533',
            name: 'CodeMonk',
            description: `The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
                Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in
                    their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
            startDate: '31/12/2020'
        },
        status: 0
    },
    {
        it: 'As a admin I should validate add project details end date must not be invalid',
        options: {
            clientId: '5f083c352a7908662c334533',
            name: 'CodeMonk',
            description: `The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
                Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in
                    their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
            startDate: '31/12/2020',
            endDate: '12/14/2021'
        },
        status: 0
    },
    {
        it: 'As a admin I should validate add project status must be passed',
        options: {
            clientId: '5f083c352a7908662c334533',
            name: 'CodeMonk',
            description: `The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
                    Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in
                        their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
            startDate: '31/12/2020',
            endDate: '12/06/2021'
        },
        status: 0
    },
    {
        it: 'As a admin I should validate add project status must be passed from defined status',
        options: {
            clientId: '5f083c352a7908662c334533',
            name: 'CodeMonk',
            description: `The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
                    Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in
                        their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
            startDate: '31/12/2020',
            endDate: '12/06/2021',
            status: 0
        },
        status: 0
    },
    {
        it: 'As a admin I should validate add project status must be passed from defined status from maximum',
        options: {
            clientId: '5f083c352a7908662c334533',
            name: 'CodeMonk',
            description: `The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
                    Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in
                        their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
            startDate: '31/12/2020',
            endDate: '12/06/2021',
            status: 0
        },
        status: 8
    },
    {
        it: 'As a admin I should validate add project client must be valid active',
        options: {
            clientId: '5f083c352a7908662c334532',
            name: 'CodeMonk',
            description: `The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
                Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in
                their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
            startDate: '31/12/2020',
            endDate: '12/06/2021',
            status: 1
        },
        status: 0
    },
    {
        it: 'As a admin I should validate same client can not same name project',
        options: {
            clientId: '5f083c352a7908662c334533',
            name: 'CodeMonk',
            description: `The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
                Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in
                their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
            startDate: '31/12/2020',
            endDate: '12/06/2021',
            status: 1
        }
    }]
};
