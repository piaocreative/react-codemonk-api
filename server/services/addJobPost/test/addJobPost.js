module.exports = {
    add: [{
        it: 'As a admin, I should validate job post details must not be blank',
        options: {
        },
        status: 0
    },
    {
        it: 'As a admin, I should validate job post details with project id must not be blank',
        options: {
            projectName: ''
        },
        status: 0
    },
    {
        it: 'As a admin, I should validate job post details with project id must be valid',
        options: {
            projectName: 'ABC'
        },
        status: 0
    },
    {
        it: 'As a admin, I should validate job post details with name must not be blank',
        options: {
            projectName: '5f631e56d37cbb4801f0fa45',
            name: ''
        },
        status: 0
    },
    {
        it: 'As a admin, I should validate job post details with name must be less than minimum',
        options: {
            projectName: '5f631e56d37cbb4801f0fa45',
            name: 'A'
        },
        status: 0
    },
    {
        it: 'As a admin, I should validate job post details with name must be more than maximum',
        options: {
            projectName: '5f631e56d37cbb4801f0fa45',
            name: '12345678901234567890123456789012345678901234567890123456789012345678901'
        },
        status: 0
    },
    {
        it: 'As a admin, I should validate job post details with description must be passed',
        options: {
            projectName: '5f631e56d37cbb4801f0fa45',
            name: 'Codemonk first brief'
        },
        status: 0
    },
    {
        it: 'As a admin, I should validate job post details with description must not be blank',
        options: {
            projectName: '5f631e56d37cbb4801f0fa45',
            name: 'Codemonk first brief',
            description: ''
        },
        status: 0
    },
    {
        it: 'As a admin, I should validate job post details with description must not be less than minimum',
        options: {
            projectName: '5f631e56d37cbb4801f0fa45',
            name: 'Codemonk first brief',
            description: 'u'
        },
        status: 0
    },
    {
        it: 'As a admin, I should validate job post details with description must not be more than maximum',
        options: {
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
        it: 'As a admin, I should validate job post details with role must be passed',
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
        it: 'As a admin, I should validate job post details with role must not be blank',
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
        it: 'As a admin, I should validate job post details with role must not be invalid',
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
        it: 'As a admin, I should validate job post details with skills must be passed',
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
            role: 'Solution Architect'
        },
        status: 0
    },
    {
        it: 'As a admin, I should validate job post details with skills must be array',
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
            skills: 'AWS'
        },
        status: 0
    },
    {
        it: 'As a admin, I should validate job post details with skills must be blank',
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
            skills: []
        },
        status: 0
    },
    {
        it: 'As a admin, I should validate job post details with work preference must be passed',
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
            skills: ['AWS', 'AWS Lambda']
        },
        status: 0
    },
    {
        it: 'As a admin, I should validate job post details with work preference must be array',
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
            skills: ['AWS', 'AWS Lambda'],
            workPreference: 'parttime-weekdays-am'
        },
        status: 0
    },
    {
        it: 'As a admin, I should validate job post details with work preference must not be blank',
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
            skills: ['AWS', 'AWS Lambda'],
            workPreference: []
        },
        status: 0
    },
    {
        it: 'As a admin, I should validate job post details with work preference must not be an invalid option',
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
            skills: ['AWS', 'AWS Lambda'],
            workPreference: ['full']
        },
        status: 0
    },
    {
        it: 'As a admin, I should validate job post details with team preference must be array',
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
            skills: ['AWS', 'AWS Lambda'],
            workPreference: ['fulltime'],
            teamPreference: 'individuals'
        },
        status: 0
    },
    {
        it: 'As a admin, I should validate job post details with team preference must not invalid option',
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
            skills: ['AWS', 'AWS Lambda'],
            workPreference: ['fulltime'],
            teamPreference: ['full']
        },
        status: 0
    },
    {
        it: 'As a admin, I should validate job post details with assignments must be array',
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
            skills: ['AWS', 'AWS Lambda'],
            workPreference: ['fulltime'],
            teamPreference: ['individuals'],
            assignments: 'remote-only'
        },
        status: 0
    },
    {
        it: 'As a admin, I should validate job post details with assignments must not invalid option',
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
            skills: ['AWS', 'AWS Lambda'],
            workPreference: ['fulltime'],
            teamPreference: ['individuals'],
            assignments: ['remote']
        },
        status: 0
    },
    {
        it: 'As a admin, I should validate job post details with expertise must be passed',
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
            skills: ['AWS', 'AWS Lambda'],
            workPreference: ['fulltime'],
            teamPreference: ['individuals'],
            assignments: ['remote-only']
        },
        status: 0
    },
    {
        it: 'As a admin, I should validate job post details with expertise must not be empty',
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
            skills: ['AWS', 'AWS Lambda'],
            workPreference: ['fulltime'],
            teamPreference: ['individuals'],
            assignments: ['remote-only'],
            expertise: ''
        },
        status: 0
    },
    {
        it: 'As a admin, I should validate job post details with expertise must be valid option',
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
            skills: ['AWS', 'AWS Lambda'],
            workPreference: ['fulltime'],
            teamPreference: ['individuals'],
            assignments: ['remote-only'],
            expertise: 'superman'
        },
        status: 0
    },
    {
        it: 'As a admin, I should validate job post details with duration must be passed',
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
            skills: ['AWS', 'AWS Lambda'],
            workPreference: ['fulltime'],
            teamPreference: ['individuals'],
            assignments: ['remote-only'],
            expertise: CONSTANTS.YEAR_OF_EXPERIENCE[0]
        },
        status: 0
    },
    {
        it: 'As a admin, I should validate job post details with duration must be Positive value',
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
            skills: ['AWS', 'AWS Lambda'],
            workPreference: ['fulltime'],
            teamPreference: ['individuals'],
            assignments: ['remote-only'],
            expertise: CONSTANTS.YEAR_OF_EXPERIENCE[0],
            duration: -10
        },
        status: 0
    },
    {
        it: 'As a admin, I should validate job post details with duration must be Positive integer',
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
            skills: ['AWS', 'AWS Lambda'],
            workPreference: ['fulltime'],
            teamPreference: ['individuals'],
            assignments: ['remote-only'],
            expertise: CONSTANTS.YEAR_OF_EXPERIENCE[0],
            duration: 99.99
        },
        status: 0
    },
    {
        it: 'As a admin, I should validate job post details with for invalid project',
        options: {
            projectName: '5f631e56d37cbb4801f0fa4d',
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
                <b>The standard chunk of Lorem Ipsum used since the 1500s Sections "de Finibus Bonorum et"</b>`,
            role: 'Solution Architect',
            skills: ['AWS', 'AWS Lambda'],
            workPreference: ['fulltime'],
            teamPreference: ['individuals'],
            assignments: ['remote-only', 'occational-site-visit'],
            expertise: CONSTANTS.YEAR_OF_EXPERIENCE[0],
            duration: 3
        },
        status: 0
    }]
};
