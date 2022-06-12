module.exports = {
    addInterview: [{
        it: 'As a client I should validate interview request must not be blank object',
        options: {
        },
        status: 0
    },
    {
        it: 'As a client I should validate interview request talent id must not be blank',
        options: {
            talentId: ''
        },
        status: 0
    },
    {
        it: 'As a client I should validate interview request talent id must be valid',
        options: {
            talentId: 'A'
        },
        status: 0
    },
    {
        it: 'As a client I should validate interview request project name must not be as blank',
        options: {
            talentId: '5f083c352a7908662c334532',
            name: ''
        },
        status: 0
    },
    {
        it: 'As a client I should validate interview request project name must not be less than minimum characters',
        options: {
            talentId: '5f083c352a7908662c334532',
            name: 'A'
        },
        status: 0
    },
    {
        it: 'As a client I should validate interview request project name must not exceed maximum character',
        options: {
            talentId: '5f083c352a7908662c334532',
            name: '123456789012345678901234567890123456789012345678901'
        },
        status: 0
    },
    {
        it: 'As a client I should validate interview request project description must be passed',
        options: {
            talentId: '5f083c352a7908662c334532',
            name: 'Codemonk'
        },
        status: 0
    },
    {
        it: 'As a client I should validate interview request project description must not be blank',
        options: {
            talentId: '5f083c352a7908662c334532',
            name: 'Codemonk',
            description: ''
        },
        status: 0
    },
    {
        it: 'As a client I should validate interview request project description must greater than minimum characters',
        options: {
            talentId: '5f083c352a7908662c334532',
            name: 'Codemonk',
            description: 'under 100'
        },
        status: 0
    },
    {
        it: 'As a client I should validate interview request project description must be less maximum characters',
        options: {
            talentId: '5f083c352a7908662c334532',
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
        it: 'As a client I should validate interview request time slot must not be blank',
        options: {
            talentId: '5f083c352a7908662c334532',
            name: 'CodeMonk',
            description: `The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
                Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in
                    their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`
        },
        status: 0
    },
    {
        it: 'As a client I should validate interview request time slot must not be other than array',
        options: {
            talentId: '5f083c352a7908662c334532',
            name: 'CodeMonk',
            description: `The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
                Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in
                    their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
            timeSlots: '12/31/2020'
        },
        status: 0
    },
    {
        it: 'As a client I should validate interview request time slot must not be empty',
        options: {
            talentId: '5f083c352a7908662c334532',
            name: 'CodeMonk',
            description: `The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
                Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in
                    their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
            timeSlots: []
        },
        status: 0
    },
    {
        it: 'As a client I should validate interview request time slot must not be more than three',
        options: {
            talentId: '5f083c352a7908662c334532',
            name: 'CodeMonk',
            description: `The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
                Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in
                    their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
            timeSlots: [MOMENT(), MOMENT(), MOMENT(), MOMENT()]
        },
        status: 0
    },
    {
        it: 'As a client I should validate interview request time slot must not be future date',
        options: {
            talentId: '5f083c352a7908662c334532',
            name: 'CodeMonk',
            description: `The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
                Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in
                    their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
            timeSlots: [MOMENT().add(1, 'days'), MOMENT().add(2, 'days'), MOMENT().subtract(1, 'days')]
        },
        status: 0
    },
    {
        it: 'As a client I should not able to add interview for talent that already exists',
        options: {
            talentId: '5f083e2f069b6c6a7de3a950',
            projectId: '5f631e56d37cbb4801f0fa45',
            name: 'My new project',
            description: `The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
            Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in
                their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
            timeSlots: [MOMENT().add(1, 'days'), MOMENT().add(2, 'days'), MOMENT().add(3, 'days')]
        },
        status: 0
    }]
};
