module.exports = {
    add: [
        {
            it: 'As a admin, I should validate job post basic details must not be blank',
            options: {},
            status: 0
        },
        {
            it: 'As a admin, I should validate job post basic details with id must be passed',
            options: {
            },
            status: 0
        },
        {
            it: 'As a admin, I should validate job post basic details with project id must not be blank',
            options: {
                projectName: ''
            },
            status: 0
        },
        {
            it: 'As a admin, I should validate job post basic details with project id must be valid',
            options: {
                projectName: 'ABC'
            },
            status: 0
        },
        {
            it: 'As a admin, I should validate job post basic details with name must not be blank',
            options: {
                projectName: '5f631e56d37cbb4801f0fa45',
                name: ''
            },
            status: 0
        },
        {
            it: 'As a admin, I should validate job post basic details with name must be less than minimum',
            options: {
                projectName: '5f631e56d37cbb4801f0fa45',
                name: 'A'
            },
            status: 0
        },
        {
            it: 'As a admin, I should validate job post basic details with name must be more than maximum',
            options: {
                projectName: '5f631e56d37cbb4801f0fa45',
                name: '12345678901234567890123456789012345678901234567890123456789012345678901'
            },
            status: 0
        },
        {
            it: 'As a admin, I should validate job post basic details with description must be passed',
            options: {
                projectName: '5f631e56d37cbb4801f0fa45',
                name: 'Codemonk first brief'
            },
            status: 0
        },
        {
            it: 'As a admin, I should validate job post basic details with description must not be blank',
            options: {
                projectName: '5f631e56d37cbb4801f0fa45',
                name: 'Codemonk first brief',
                description: ''
            },
            status: 0
        },
        {
            it: 'As a admin, I should validate job post basic details with description must not be less than minimum',
            options: {
                projectName: '5f631e56d37cbb4801f0fa45',
                name: 'Codemonk first brief',
                description: 'u'
            },
            status: 0
        },
        {
            it: 'As a admin, I should validate job post basic details with description must not be more than maximum',
            options: {
                id: '60d1e5a0f97dc062965b807f',
                projectName: '5f631e56d37cbb4801f0fa45',
                name: 'Codemonk first brief',
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
                    The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
                Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in
                    their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
                    The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
                Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in
                    their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
                    The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
                Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in
                    their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
                    The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
                Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in
                    their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
                    The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
                Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in
                    their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
                    The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
                Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in
                    their exact original form, accompanied by Engish versions from the 1914 translation by H. Rackham
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
                    their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
                    The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
                Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in
                    their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
                    The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
                Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in
                    their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
                    The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
                Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in
                    their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
                    The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
                Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in
                    their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
                    The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
                Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in
                    their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
                    The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
                Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in
                    their exact original form, accompanied by Engish versions from the 1914 translation by H. Rackham
                    .`
            },
            status: 0
        },
        {
            it: 'As a admin, I should validate job post basic details with role must be passed',
            options: {
                projectName: '5f631e56d37cbb4801f0fa45',
                name: 'Codemonk first brief',
                description: `<p>Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
            Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia,
             looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage,
             and going through the cites of the word in classical literature, discovered the undoubtable source.
            Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"
            (The Extremes of Good and Evil) by Cicero, written in 45 BC.</p>
             <p>This book is a treatise on the theory of ethics, very popular during the Renaissance.
             The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p>
            <b>The standard chunk of Lorem Ipsum used since the 1500s Sections "de Finibus Bonorum et"
            real only the amoung us.</b>`
            },
            status: 0
        },
        {
            it: 'As a admin, I should validate job post basic details with role must not be blank',
            options: {
                projectName: '5f631e56d37cbb4801f0fa45',
                name: 'Codemonk first brief',
                description: `<p>Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
            Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia,
             looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage,
             and going through the cites of the word in classical literature, discovered the undoubtable source.
            Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"
            (The Extremes of Good and Evil) by Cicero, written in 45 BC.</p>
             <p>This book is a treatise on the theory of ethics, very popular during the Renaissance.
             The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p>
            <b>The standard chunk of Lorem Ipsum used since the 1500s Sections "de Finibus Bonorum et"
            real only the amoung us.</b>`,
                role: ''
            },
            status: 0
        },
        {
            it: 'As a admin, I should validate job post basic details with role must not be invalid',
            options: {
                projectName: '5f631e56d37cbb4801f0fa45',
                name: 'Codemonk first brief',
                description: `<p>Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
            Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia,
             looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage,
             and going through the cites of the word in classical literature, discovered the undoubtable source.
            Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"
            (The Extremes of Good and Evil) by Cicero, written in 45 BC.</p>
             <p>This book is a treatise on the theory of ethics, very popular during the Renaissance.
             The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p>
            <b>The standard chunk of Lorem Ipsum used since the 1500s Sections "de Finibus Bonorum et"
            real only the amoung us.</b>`,
                role: 'ABC'
            },
            status: 0
        },
        {
            it: 'As a admin, I should validate job post basic details with team preference must be array',
            options: {
                projectName: '5f631e56d37cbb4801f0fa45',
                name: 'Codemonk first brief',
                description: `<p>Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
            Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia,
             looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage,
             and going through the cites of the word in classical literature, discovered the undoubtable source.
            Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"
            (The Extremes of Good and Evil) by Cicero, written in 45 BC.</p>
             <p>This book is a treatise on the theory of ethics, very popular during the Renaissance.
             The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p>
            <b>The standard chunk of Lorem Ipsum used since the 1500s Sections "de Finibus Bonorum et"
            real only the amoung us.</b>`,
                role: 'Solution Architect',
                workPreference: ['fulltime'],
                teamPreference: 'individuals'
            },
            status: 0
        },
        {
            it: 'As a admin, I should validate job post basic details with team preference must not invalid option',
            options: {
                projectName: '5f631e56d37cbb4801f0fa45',
                name: 'Codemonk first brief',
                description: `<p>Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
            Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia,
             looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage,
             and going through the cites of the word in classical literature, discovered the undoubtable source.
            Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"
            (The Extremes of Good and Evil) by Cicero, written in 45 BC.</p>
             <p>This book is a treatise on the theory of ethics, very popular during the Renaissance.
             The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p>
            <b>The standard chunk of Lorem Ipsum used since the 1500s Sections "de Finibus Bonorum et"
            real only the amoung us.</b>`,
                role: 'Solution Architect',
                workPreference: ['fulltime'],
                teamPreference: ['full']
            },
            status: 0
        },
        {
            it: 'As a admin, I should validate job post preferred candidates with expertise must be passed',
            options: {
                id: '60d0aa5c9bd946556f56c10e',
                hardSkills: ['Angular'],
                softSkills: ['Excel', 'Docs'],
                certifications: ['ADOBE CERTIFIED ASSOCIATE (ACA)'],
                industry: 'Accounting',
                teamWorking: 'Team Player',
                discProfile: 'D - Style',
                timeZone: 'Asia/Kolkata',
                ratePerHour: 40
            },
            status: 0
        },

        {
            it: 'As a admin, I should validate job post preferred candidates must not be blank',
            options: {},
            status: 0
        },
        {
            it: 'As a admin, I should validate job post preferred candidates with hard skills must not be blank',
            options: {
                id: '60d0aa5c9bd946556f56c10e',
                hardSkills: []
            },
            status: 0
        },
        {
            it: 'As a admin, I should validate job post preferred candidates with hard skills must be valid',
            options: {
                id: '60d0aa5c9bd946556f56c10e',
                hardSkills: ['Angular']
            },
            status: 0
        },
        {
            it: 'As a admin, I should validate job post preferred candidates with hard skills must be less than maximum',
            options: {
                id: '60d0aa5c9bd946556f56c10e',
                hardSkills: ['Angular', 'Node', 'NodeJs', 'Amazon Redshift', 'Java', 'MySQL', 'DevOps', 'SSL']
            },
            status: 0
        },
        {
            it: 'As a admin, I should validate job post preferred candidates with soft skills must not be blank',
            options: {
                id: '60d0aa5c9bd946556f56c10e',
                hardSkills: ['Angular'],
                softSkills: []
            },
            status: 0
        },
        {
            it: 'As a admin, I should validate job post preferred candidates with soft skills must be less than maximum',
            options: {
                id: '60d0aa5c9bd946556f56c10e',
                hardSkills: ['Angular'],
                softSkills: ['Excel', 'Docs', 'Internet', 'Communication']
            },
            status: 0
        },
        {
            it: 'As a admin, I should validate job post preferred candidates with industry must be passed',
            options: {
                id: '60d0aa5c9bd946556f56c10e',
                hardSkills: ['Angular'],
                softSkills: ['Excel', 'Docs']
            },
            status: 0
        },
        {
            it: 'As a admin, I should validate job post preferred candidates with industry must not be blank',
            options: {
                id: '60d0aa5c9bd946556f56c10e',
                hardSkills: ['Angular'],
                softSkills: ['Excel', 'Docs'],
                certifications: ['ADOBE CERTIFIED ASSOCIATE (ACA)'],
                industry: ''
            },
            status: 0
        },
        {
            it: 'As a admin, I should validate job post preferred candidates with industry must not be less than minimum',
            options: {
                id: '60d0aa5c9bd946556f56c10e',
                hardSkills: ['Angular'],
                softSkills: ['Excel', 'Docs'],
                certifications: ['ADOBE CERTIFIED ASSOCIATE (ACA)'],
                industry: 'u'
            },
            status: 0
        },
        {
            it: 'As a admin, I should validate job post preferred candidates with industry must not be more than maximum',
            options: {
                id: '60d0aa5c9bd946556f56c10e',
                hardSkills: ['Angular'],
                softSkills: ['Excel', 'Docs'],
                certifications: ['ADOBE CERTIFIED ASSOCIATE (ACA)'],
                industry: 'IT sector1 IT sector2 IT sector3 IT sector4 IT sector5 IT sector6 IT sector7 IT sector8 IT sector9 IT sector10'
            },
            status: 0
        },
        {
            it: 'As a admin, I should validate job post preferred candidates with team working must not be blank',
            options: {
                id: '60d0aa5c9bd946556f56c10e',
                hardSkills: ['Angular'],
                softSkills: ['Excel', 'Docs'],
                certifications: ['ADOBE CERTIFIED ASSOCIATE (ACA)'],
                industry: 'Accounting',
                teamWorking: ''
            },
            status: 0
        },
        {
            it: 'As a admin, I should validate job post preferred candidates with team working must not be invalid',
            options: {
                id: '60d0aa5c9bd946556f56c10e',
                hardSkills: ['Angular'],
                softSkills: ['Excel', 'Docs'],
                certifications: ['ADOBE CERTIFIED ASSOCIATE (ACA)'],
                industry: 'Accounting',
                teamWorking: 'ABC'
            },
            status: 0
        },
        {
            it: 'As a admin, I should validate job post preferred candidates with DISC profile must be passed',
            options: {
                id: '60d0aa5c9bd946556f56c10e',
                hardSkills: ['Angular'],
                softSkills: ['Excel', 'Docs'],
                certifications: ['ADOBE CERTIFIED ASSOCIATE (ACA)'],
                industry: 'Accounting',
                teamWorking: 'Team Player'
            },
            status: 0
        },
        {
            it: 'As a admin, I should validate job post preferred candidates with DISC profile must not be blank',
            options: {
                id: '60d0aa5c9bd946556f56c10e',
                hardSkills: ['Angular'],
                softSkills: ['Excel', 'Docs'],
                certifications: ['ADOBE CERTIFIED ASSOCIATE (ACA)'],
                industry: 'Accounting',
                teamWorking: 'Team Player',
                discProfile: ''
            },
            status: 0
        },
        {
            it: 'As a admin, I should validate job post preferred candidates with DISC profile must not be an invalid option',
            options: {
                id: '60d0aa5c9bd946556f56c10e',
                hardSkills: ['Angular'],
                softSkills: ['Excel', 'Docs'],
                certifications: ['ADOBE CERTIFIED ASSOCIATE (ACA)'],
                industry: 'Accounting',
                teamWorking: 'Team Player',
                discProfile: 'ABC'
            },
            status: 0
        },
        {
            it: 'As a admin, I should validate job post preferred candidates with language must not be empty',
            options: {
                id: '60d0aa5c9bd946556f56c10e',
                hardSkills: ['Angular'],
                softSkills: ['Excel', 'Docs'],
                certifications: ['ADOBE CERTIFIED ASSOCIATE (ACA)'],
                industry: 'Accounting',
                teamWorking: 'Team Player',
                discProfile: 'D - Style',
                timeZone: 'Asia/Kolkata',
                ratePerHour: 40,
                currency: 'GBP',
                languages: []
            },
            status: 0
        },
        {
            it: 'As a admin, I should validate job post preferred candidates with language must be valid option',
            options: {
                id: '60d0aa5c9bd946556f56c10e',
                hardSkills: ['Angular'],
                softSkills: ['Excel', 'Docs'],
                certifications: ['ADOBE CERTIFIED ASSOCIATE (ACA)'],
                industry: 'Accounting',
                teamWorking: 'Team Player',
                discProfile: 'D - Style',
                timeZone: 'Asia/Kolkata',
                ratePerHour: 40,
                currency: 'GBP',
                languages: ['ABC']
            },
            status: 0
        },

        {
            it: 'As a admin, I should validate job post preferred candidates with time zone must not blank',
            options: {
                id: '60d0aa5c9bd946556f56c10e',
                hardSkills: ['Angular'],
                softSkills: ['Excel', 'Docs'],
                certifications: ['ADOBE CERTIFIED ASSOCIATE (ACA)'],
                industry: 'Accounting',
                teamWorking: 'Team Player',
                discProfile: 'D - Style',
                timeZone: ''
            },
            status: 0
        },
        {
            it: 'As a admin, I should validate job post preferred candidates with time zone must not invalid option',
            options: {
                id: '60d0aa5c9bd946556f56c10e',
                hardSkills: ['Angular'],
                softSkills: ['Excel', 'Docs'],
                certifications: ['ADOBE CERTIFIED ASSOCIATE (ACA)'],
                industry: 'Accounting',
                teamWorking: 'Team Player',
                discProfile: 'D - Style',
                timeZone: 'ABC'
            },
            status: 0
        },
        {
            it: 'As a admin, I should validate job post preferred candidates with rate must be greater than zero',
            options: {
                id: '60d0aa5c9bd946556f56c10e',
                hardSkills: ['Angular'],
                softSkills: ['Excel', 'Docs'],
                certifications: ['ADOBE CERTIFIED ASSOCIATE (ACA)'],
                industry: 'Accounting',
                teamWorking: 'Team Player',
                discProfile: 'D - Style',
                timeZone: 'Asia/Kolkata',
                ratePerHour: 0
            },
            status: 0
        },
        {
            it: 'As a admin, I should validate job post preferred candidates with currency must not be empty',
            options: {
                id: '60d0aa5c9bd946556f56c10e',
                hardSkills: ['Angular'],
                softSkills: ['Excel', 'Docs'],
                certifications: ['ADOBE CERTIFIED ASSOCIATE (ACA)'],
                industry: 'Accounting',
                teamWorking: 'Team Player',
                discProfile: 'D - Style',
                timeZone: 'Asia/Kolkata',
                ratePerHour: 40,
                currency: ''
            },
            status: 0
        },
        {
            it: 'As a admin, I should validate job post preferred candidates with currency must be valid option',
            options: {
                id: '60d0aa5c9bd946556f56c10e',
                hardSkills: ['Angular'],
                softSkills: ['Excel', 'Docs'],
                certifications: ['ADOBE CERTIFIED ASSOCIATE (ACA)'],
                industry: 'Accounting',
                teamWorking: 'Team Player',
                discProfile: 'D - Style',
                timeZone: 'Asia/Kolkata',
                ratePerHour: 40,
                currency: 'ABC'
            },
            status: 0
        },
    ]
};
