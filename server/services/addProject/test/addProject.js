module.exports = {
    add: [{
        it: 'As a client I should validate client add project details must not be blank',
        options: {
        },
        status: 0
    },
    {
        it: 'As a client I should validate client add project details with project name as blank',
        options: {
            name: ''
        },
        status: 0
    },
    {
        it: 'As a client I should validate client add project details with project name as minimum',
        options: {
            name: 'A'
        },
        status: 0
    },
    {
        it: 'As a client I should validate client add project details with project name as maximum exceed',
        options: {
            name: '123456789012345678901234567890123456789012345678901'
        },
        status: 0
    },
    {
        it: 'As a client I should validate client add project details with blank description',
        options: {
            name: 'Codemonk'
        },
        status: 0
    },
    {
        it: 'As a client I should validate client add project details with description description as blank',
        options: {
            name: 'Codemonk',
            description: ''
        },
        status: 0
    },
    {
        it: 'As a client I should validate client add project details with project description as minimum',
        options: {
            name: 'Codemonk',
            description: 'under 100'
        },
        status: 0
    },
    {
        it: 'As a client I should validate client add project details with project description as maximum exceed',
        options: {
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
        it: 'As a client I should validate client add project details with project build status not passed',
        options: {
            name: 'CodeMonk',
            description: `The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
                Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in
                    their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`
        },
        status: 0
    },
    {
        it: 'As a client I should validate client add project details with project build status passed as invalid option',
        options: {
            name: 'CodeMonk',
            description: `The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
                    Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in
                        their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
            buildStatus: 'Invalid'
        },
        status: 0
    },
    {
        it: 'As a client I should validate client add project details with project looking for desing passed as invalid',
        options: {
            name: 'CodeMonk',
            description: `The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
                Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in
                    their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
            buildStatus: 'inception',
            lookingForDesign: 'invalid'
        },
        status: 0
    },
    {
        it: 'As a client I should validate client add project details with project looking for software development passed as invalid',
        options: {
            name: 'CodeMonk',
            description: `The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
                Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in
                    their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
            buildStatus: 'inception',
            lookingForDesign: ['branding'],
            lookingForSoftwareDevelopment: 'invalid'
        },
        status: 0
    },
    {
        it: 'As a client I should validate client add project details with project looking for development option passed as invalid',
        options: {
            name: 'CodeMonk',
            description: `The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
                Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in
                    their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
            buildStatus: 'inception',
            lookingForDesign: ['branding'],
            lookingForSoftwareDevelopment: ['web-development'],
            lookingForDevelopmentTeam: 'invalid'
        },
        status: 0
    },
    {
        it: 'As a client I should validate client add project details with project looking for ai/ml passed as invalid',
        options: {
            name: 'CodeMonk',
            description: `The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
                Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in
                    their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
            buildStatus: 'inception',
            lookingForDesign: ['branding'],
            lookingForSoftwareDevelopment: ['web-development'],
            lookingForDevelopmentTeam: ['full-stack'],
            lookingForDataAiMl: 'invalid'
        },
        status: 0
    },
    {
        it: 'As a client I should validate client add project details with project looking for growth hacker passed as invalid',
        options: {
            name: 'CodeMonk',
            description: `The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
                    Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in
                        their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
            buildStatus: 'inception',
            lookingForDesign: ['branding'],
            lookingForDevelopmentTeam: ['full-stack'],
            lookingForSoftwareDevelopment: ['web-development'],
            lookingForDataAiMl: ['analysis'],
            lookingForGrowthHacking: 'test'
        },
        status: 0
    },
    {
        it: 'As a client I should validate client add project details with project looking for agile coach passed as invalid',
        options: {
            name: 'CodeMonk',
            description: `The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
                    Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in
                        their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
            buildStatus: 'inception',
            lookingForDesign: ['branding'],
            lookingForDevelopmentTeam: ['full-stack'],
            lookingForSoftwareDevelopment: ['web-development'],
            lookingForDataAiMl: ['analysis'],
            lookingForGrowthHacking: false,
            lookingForAgileCoach: 'false',
            lookingForOther: 'Need a delivery manager as well'
        },
        status: 0
    },
    {
        it: 'As a client I should validate client add project details with project budget not passed',
        options: {
            name: 'CodeMonk',
            description: `The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
                        Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in
                            their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
            buildStatus: 'inception',
            lookingForDesign: ['branding'],
            lookingForDevelopmentTeam: ['full-stack'],
            lookingForSoftwareDevelopment: ['web-development'],
            lookingForDataAiMl: ['analysis'],
            lookingForGrowthHacking: false,
            lookingForAgileCoach: false,
            lookingForOther: 'Need a delivery manager as well'
        },
        status: 0
    },
    {
        it: 'As a client I should validate client add project details with project budget passed as invalid',
        options: {
            name: 'CodeMonk',
            description: `The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
                            Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in
                                their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
            buildStatus: 'inception',
            lookingForDesign: ['branding'],
            lookingForDevelopmentTeam: ['full-stack'],
            lookingForSoftwareDevelopment: ['web-development'],
            lookingForDataAiMl: ['analysis'],
            lookingForGrowthHacking: false,
            lookingForAgileCoach: false,
            lookingForOther: 'Need a delivery manager as well',
            budget: 'invalid'
        },
        status: 0
    },
    {
        it: 'As a client I should validate client add project details with project message to pre-sales team as blank',
        options: {
            name: 'CodeMonk',
            description: `The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
                                Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in
                                    their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
            buildStatus: 'inception',
            lookingForDesign: ['branding'],
            lookingForDevelopmentTeam: ['full-stack'],
            lookingForSoftwareDevelopment: ['web-development'],
            lookingForDataAiMl: ['analysis'],
            lookingForGrowthHacking: false,
            lookingForAgileCoach: false,
            lookingForOther: 'Need a delivery manager as well',
            budget: '$150k-$500k',
            messageToPreSales: ''
        },
        status: 0
    },
    {
        it: 'As a client I should validate client add project details with project message to pre-sales team not minimum',
        options: {
            name: 'CodeMonk',
            description: `The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
                                Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in
                                    their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
            buildStatus: 'inception',
            lookingForDesign: ['branding'],
            lookingForDevelopmentTeam: ['full-stack'],
            lookingForSoftwareDevelopment: ['web-development'],
            lookingForDataAiMl: ['analysis'],
            lookingForGrowthHacking: false,
            lookingForAgileCoach: false,
            lookingForOther: 'Need a delivery manager as well',
            budget: '$150k-$500k',
            messageToPreSales: 'A'
        },
        status: 0
    },
    {
        it: 'As a client I should validate client add project details with project message to pre-sales team exceed maximum',
        options: {
            name: 'CodeMonk',
            description: `The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
                                Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in
                                    their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
            buildStatus: 'inception',
            lookingForDesign: ['branding'],
            lookingForDevelopmentTeam: ['full-stack'],
            lookingForSoftwareDevelopment: ['web-development'],
            lookingForDataAiMl: ['analysis'],
            lookingForGrowthHacking: false,
            lookingForAgileCoach: false,
            lookingForOther: 'Need a delivery manager as well',
            budget: '$150k-$500k',
            messageToPreSales: `Contrary to popular belief, Lorem Ipsum is not simply random text.
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
        it: 'As a client I should validate client add project details with project speed option as blank',
        options: {
            name: 'CodeMonk',
            description: `The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
                                Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in
                                    their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
            buildStatus: 'inception',
            lookingForDesign: ['branding'],
            lookingForDevelopmentTeam: ['full-stack'],
            lookingForSoftwareDevelopment: ['web-development'],
            lookingForDataAiMl: ['analysis'],
            lookingForGrowthHacking: false,
            lookingForAgileCoach: false,
            lookingForOther: 'Need a delivery manager as well',
            budget: '$150k-$500k',
            messageToPreSales: 'Contant me',
            speed: ''
        },
        status: 0
    },
    {
        it: 'As a client I should validate client add project details with project speed option passed as invalid',
        options: {
            name: 'CodeMonk',
            description: `The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
                Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in
                their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
            buildStatus: 'inception',
            lookingForDesign: ['branding'],
            lookingForDevelopmentTeam: ['full-stack'],
            lookingForSoftwareDevelopment: ['web-development'],
            lookingForDataAiMl: ['analysis'],
            lookingForGrowthHacking: false,
            lookingForAgileCoach: false,
            lookingForOther: 'Need a delivery manager as well',
            budget: '$150k-$500k',
            messageToPreSales: 'Contant me',
            speed: 'invalid'
        },
        status: 0
    },
    {
        it: 'As a client I should validate client add project details with project team manage type as blank',
        options: {
            name: 'CodeMonk',
            description: `The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
                Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in
                their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
            buildStatus: 'inception',
            lookingForDesign: ['branding'],
            lookingForDevelopmentTeam: ['full-stack'],
            lookingForSoftwareDevelopment: ['web-development'],
            lookingForDataAiMl: ['analysis'],
            lookingForGrowthHacking: false,
            lookingForAgileCoach: false,
            lookingForOther: 'Need a delivery manager as well',
            budget: '$150k-$500k',
            messageToPreSales: 'Contant me',
            speed: 'fast',
            teamManageType: ''
        },
        status: 0
    },
    {
        it: 'As a client I should validate client add project details with project team manage type passed as invalid',
        options: {
            name: 'CodeMonk',
            description: `The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
                Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in
                their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
            buildStatus: 'inception',
            lookingForDesign: ['branding'],
            lookingForDevelopmentTeam: ['full-stack'],
            lookingForSoftwareDevelopment: ['web-development'],
            lookingForDataAiMl: ['analysis'],
            lookingForGrowthHacking: false,
            lookingForAgileCoach: false,
            lookingForOther: 'Need a delivery manager as well',
            budget: '$150k-$500k',
            messageToPreSales: 'Contant me',
            speed: 'fast',
            teamManageType: 'invalid'
        },
        status: 0
    },
    {
        it: 'As a client I should validate client add project details with project with live status and invalid url',
        options: {
            name: 'CodeMonk',
            description: `The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
        Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in
            their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
            buildStatus: 'live',
            projectUrl: 'invalid',
            lookingForDesign: ['branding'],
            lookingForDevelopmentTeam: ['full-stack'],
            lookingForSoftwareDevelopment: ['web-development'],
            lookingForDataAiMl: ['analysis'],
            lookingForGrowthHacking: false,
            lookingForAgileCoach: true,
            lookingForOther: 'Need a delivery manager as well',
            budget: '$500k+',
            messageToPreSales: 'Do contant me',
            speed: 'super-duper-fast',
            teamManageType: 'project-manager'
        },
        status: 0
    },
    {
        it: 'As a client I should validate client add project without any looking for options',
        options: {
            name: 'CodeMonk',
            description: `The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
            Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in
                their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
            buildStatus: 'live',
            projectUrl: 'invalid',
            budget: '$500k+',
            messageToPreSales: 'Do contant me',
            speed: 'super-duper-fast',
            teamManageType: 'project-manager'
        },
        status: 0
    },
    {
        it: 'As a client I should validate client add project with invalid looking for design options',
        options: {
            name: 'CodeMonk',
            description: `The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
    Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in
        their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
            buildStatus: 'live',
            projectUrl: 'https://github.com',
            lookingForDesign: ['branding', 'invalid'],
            budget: '$500k+',
            messageToPreSales: 'Do contant me',
            speed: 'super-duper-fast',
            teamManageType: 'project-manager'
        },
        status: 0
    },
    {
        it: 'As a client I should validate client add project with invalid looking for Software Development options',
        options: {
            name: 'CodeMonk',
            description: `The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
        Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in
            their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
            buildStatus: 'live',
            projectUrl: 'https://github.com',
            lookingForSoftwareDevelopment: ['branding'],
            budget: '$500k+',
            messageToPreSales: 'Do contant me',
            speed: 'super-duper-fast',
            teamManageType: 'project-manager'
        },
        status: 0
    },
    {
        it: 'As a client I should validate client add project with with invalid looking for development team options',
        options: {
            name: 'CodeMonk',
            description: `The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
        Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in
            their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
            buildStatus: 'live',
            projectUrl: 'https://github.com',
            lookingForDevelopmentTeam: ['branding'],
            budget: '$500k+',
            messageToPreSales: 'Do contant me',
            speed: 'super-duper-fast',
            teamManageType: 'project-manager'
        },
        status: 0
    },
    {
        it: 'As a client I should validate client add project without any looking for options',
        options: {
            name: 'CodeMonk',
            description: `The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
        Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in
            their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
            buildStatus: 'live',
            projectUrl: 'https://github.com',
            lookingForDataAiMl: ['branding'],
            budget: '$500k+',
            messageToPreSales: 'Do contant me',
            speed: 'super-duper-fast',
            teamManageType: 'project-manager'
        },
        status: 0
    },
    {
        it: 'As a client I should validate client add project with existing name',
        options: {
            name: 'CodeMonk',
            description: `The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
    Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in
        their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
            buildStatus: 'live',
            projectUrl: 'https://github.com',
            lookingForDesign: ['branding'],
            budget: '$500k+',
            messageToPreSales: 'Do contant me',
            speed: 'super-duper-fast',
            teamManageType: 'project-manager'
        },
        status: 0
    }]
};
