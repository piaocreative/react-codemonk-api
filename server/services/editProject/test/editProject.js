module.exports = {
    editProject: [{
        it: 'As a client I should validate client edit project details without project id',
        options: {
            projectId: '',
            name: 'CodeMonk new',
            description: `The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
                Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in
                    their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`
        },
        status: 0
    },
    {
        it: 'As a client I should validate client edit project details must not be blank',
        options: {
            projectId: '5f2abf4364712b10ad0e8e3c'
        },
        status: 0
    },
    {
        it: 'As a client I should validate client edit project details with project name as blank',
        options: {
            projectId: '5f2abf4364712b10ad0e8e3c',
            name: ''
        },
        status: 0
    },
    {
        it: 'As a client I should validate client edit project details with project name as minimum',
        options: {
            projectId: '5f2abf4364712b10ad0e8e3c',
            name: 'A'
        },
        status: 0
    },
    {
        it: 'As a client I should validate client edit project details with project name as maximum exceed',
        options: {
            projectId: '5f2abf4364712b10ad0e8e3c',
            name: '123456789012345678901234567890123456789012345678901'
        },
        status: 0
    },
    {
        it: 'As a client I should validate client edit project details with blank description',
        options: {
            projectId: '5f2abf4364712b10ad0e8e3c',
            name: 'Codemonk'
        },
        status: 0
    },
    {
        it: 'As a client I should validate client edit project details with description description as blank',
        options: {
            projectId: '5f2abf4364712b10ad0e8e3c',
            name: 'Codemonk',
            description: ''
        },
        status: 0
    },
    {
        it: 'As a client I should validate client edit project details with project description as minimum',
        options: {
            projectId: '5f2abf4364712b10ad0e8e3c',
            name: 'Codemonk',
            description: 'under 100'
        },
        status: 0
    },
    {
        it: 'As a client I should validate client edit project details with project description as maximum exceed',
        options: {
            projectId: '5f2abf4364712b10ad0e8e3c',
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
        it: 'As a client I should validate edit project not with the same name',
        options: {
            projectId: '5f2abf4364712b10ad0e8e3c',
            name: 'CodeMonk duplicate name',
            description: `The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
                Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in
                    their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`
        },
        status: 0
    }]
};
