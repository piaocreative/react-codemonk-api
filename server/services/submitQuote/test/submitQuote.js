module.exports = {
    add: [{
        it: 'As a agency, I should validate submit qoute details must not be blank',
        options: {
        },
        status: 0
    },
    {
        it: 'As a agency, I should validate submit qoute details with quote id must not be blank',
        options: {
            quoteId: ''
        },
        status: 0
    },
    {
        it: 'As a agency, I should validate submit qoute details with quote id must not be invalid',
        options: {
            quoteId: 'ABC'
        },
        status: 0
    },
    {
        it: 'As a agency, I should validate submit qoute details with project id must not be blank',
        options: {
            quoteId: '5fa500eea79f873b8ef67b17',
            projectId: ''
        },
        status: 0
    },
    {
        it: 'As a agency, I should validate submit qoute details with project id must be valid',
        options: {
            quoteId: '5fa500eea79f873b8ef67b17',
            projectId: 'ABC'
        },
        status: 0
    },
    {
        it: 'As a agency, I should validate submit qoute details with assumptions must not be blank',
        options: {
            quoteId: '5fa500eea79f873b8ef67b17',
            projectId: '5f631e56d37cbb4801f0fa45',
            assumptions: ''
        },
        status: 0
    },
    {
        it: 'As a agency, I should validate submit qoute details with assumptions must be less than minimum',
        options: {
            quoteId: '5fa500eea79f873b8ef67b17',
            projectId: '5f631e56d37cbb4801f0fa45',
            assumptions: 'A'
        },
        status: 0
    },
    {
        it: 'As a agency, I should validate submit qoute details with name must be more than maximum',
        options: {
            quoteId: '5fa500eea79f873b8ef67b17',
            projectId: '5f631e56d37cbb4801f0fa45',
            assumptions: `Contrary to popular belief, Lorem Ipsum is not simply random text.
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
        it: 'As a agency, I should validate submit qoute details with out of scope must not be blank',
        options: {
            quoteId: '5fa500eea79f873b8ef67b17',
            projectId: '5f631e56d37cbb4801f0fa45',
            assumptions: `Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
            Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia,
             looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage,
             and going through the cites of the word in classical literature, discovered the undoubtable source.
            Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"
            (The Extremes of Good and Evil) by Cicero, written in 45 BC.
             This book is a treatise on the theory of ethics, very popular during the Renaissance.
             The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.`
        },
        status: 0
    },
    {
        it: 'As a agency, I should validate submit qoute details with out of scope must be less than minimum',
        options: {
            quoteId: '5fa500eea79f873b8ef67b17',
            projectId: '5f631e56d37cbb4801f0fa45',
            assumptions: `Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
            Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia,
             looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage,
             and going through the cites of the word in classical literature, discovered the undoubtable source.
            Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"
            (The Extremes of Good and Evil) by Cicero, written in 45 BC.
             This book is a treatise on the theory of ethics, very popular during the Renaissance.
             The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.`,
            outOfScope: 'A'
        },
        status: 0
    },
    {
        it: 'As a agency, I should validate submit qoute details with out of scope must be more than maximum',
        options: {
            quoteId: '5fa500eea79f873b8ef67b17',
            projectId: '5f631e56d37cbb4801f0fa45',
            assumptions: `Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
            Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia,
             looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage,
             and going through the cites of the word in classical literature, discovered the undoubtable source.
            Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"
            (The Extremes of Good and Evil) by Cicero, written in 45 BC.
             This book is a treatise on the theory of ethics, very popular during the Renaissance.
             The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.`,
            outOfScope: `Contrary to popular belief, Lorem Ipsum is not simply random text.
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
        it: 'As a agency, I should validate submit qoute details with team structure must not be blank',
        options: {
            quoteId: '5fa500eea79f873b8ef67b17',
            projectId: '5f631e56d37cbb4801f0fa45',
            assumptions: `Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
            Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia,
             looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage,
             and going through the cites of the word in classical literature, discovered the undoubtable source.
            Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"
            (The Extremes of Good and Evil) by Cicero, written in 45 BC.
             This book is a treatise on the theory of ethics, very popular during the Renaissance.
             The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.`,
            outOfScope: `Contrary to popular belief, Lorem Ipsum is not simply random text.
             It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
             Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia,
              looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage,
              and going through the cites of the word in classical literature, discovered the undoubtable source.
             Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"
             (The Extremes of Good and Evil) by Cicero, written in 45 BC.
              This book is a treatise on the theory of ethics, very popular during the Renaissance.
              The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.`
        },
        status: 0
    },
    {
        it: 'As a agency, I should validate submit qoute details with team structure must be less than minimum',
        options: {
            quoteId: '5fa500eea79f873b8ef67b17',
            projectId: '5f631e56d37cbb4801f0fa45',
            assumptions: `Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
            Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia,
             looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage,
             and going through the cites of the word in classical literature, discovered the undoubtable source.
            Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"
            (The Extremes of Good and Evil) by Cicero, written in 45 BC.
             This book is a treatise on the theory of ethics, very popular during the Renaissance.
             The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.`,
            outOfScope: `Contrary to popular belief, Lorem Ipsum is not simply random text.
             It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
             Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia,
              looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage,
              and going through the cites of the word in classical literature, discovered the undoubtable source.
             Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"
             (The Extremes of Good and Evil) by Cicero, written in 45 BC.
              This book is a treatise on the theory of ethics, very popular during the Renaissance.
              The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.`,
            teamStructure: 'A'
        },
        status: 0
    },
    {
        it: 'As a agency, I should validate submit qoute details with team structure must be more than maximum',
        options: {
            quoteId: '5fa500eea79f873b8ef67b17',
            projectId: '5f631e56d37cbb4801f0fa45',
            assumptions: `Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
            Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia,
             looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage,
             and going through the cites of the word in classical literature, discovered the undoubtable source.
            Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"
            (The Extremes of Good and Evil) by Cicero, written in 45 BC.
             This book is a treatise on the theory of ethics, very popular during the Renaissance.
             The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.`,
            outOfScope: `Contrary to popular belief, Lorem Ipsum is not simply random text.
             It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
             Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia,
              looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage,
              and going through the cites of the word in classical literature, discovered the undoubtable source.
             Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"
             (The Extremes of Good and Evil) by Cicero, written in 45 BC.
              This book is a treatise on the theory of ethics, very popular during the Renaissance.
              The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.`,
            teamStructure: `Contrary to popular belief, Lorem Ipsum is not simply random text.
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
        it: 'As a agency, I should validate submit qoute details with cost must not be empty',
        options: {
            quoteId: '5fa500eea79f873b8ef67b17',
            projectId: '5f631e56d37cbb4801f0fa45',
            assumptions: `Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
            Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia,
             looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage,
             and going through the cites of the word in classical literature, discovered the undoubtable source.
            Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"
            (The Extremes of Good and Evil) by Cicero, written in 45 BC.
             This book is a treatise on the theory of ethics, very popular during the Renaissance.
             The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.`,
            outOfScope: `Contrary to popular belief, Lorem Ipsum is not simply random text.
             It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
             Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia,
              looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage,
              and going through the cites of the word in classical literature, discovered the undoubtable source.
             Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"
             (The Extremes of Good and Evil) by Cicero, written in 45 BC.
              This book is a treatise on the theory of ethics, very popular during the Renaissance.
              The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.`,
            teamStructure: `Contrary to popular belief, Lorem Ipsum is not simply random text.
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
        it: 'As a agency, I should validate submit qoute details with cost must be integer value',
        options: {
            quoteId: '5fa500eea79f873b8ef67b17',
            projectId: '5f631e56d37cbb4801f0fa45',
            assumptions: `Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
            Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia,
             looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage,
             and going through the cites of the word in classical literature, discovered the undoubtable source.
            Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"
            (The Extremes of Good and Evil) by Cicero, written in 45 BC.
             This book is a treatise on the theory of ethics, very popular during the Renaissance.
             The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.`,
            outOfScope: `Contrary to popular belief, Lorem Ipsum is not simply random text.
             It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
             Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia,
              looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage,
              and going through the cites of the word in classical literature, discovered the undoubtable source.
             Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"
             (The Extremes of Good and Evil) by Cicero, written in 45 BC.
              This book is a treatise on the theory of ethics, very popular during the Renaissance.
              The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.`,
            teamStructure: `Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
            Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia,
             looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage,
             and going through the cites of the word in classical literature, discovered the undoubtable source.
            Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"
            (The Extremes of Good and Evil) by Cicero, written in 45 BC.
             This book is a treatise on the theory of ethics, very popular during the Renaissance.
             The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.`,
            totalCost: 'Some  Text'
        },
        status: 0
    },
    {
        it: 'As a agency, I should validate submit qoute details with cost must be postive integer value',
        options: {
            quoteId: '5fa500eea79f873b8ef67b17',
            projectId: '5f631e56d37cbb4801f0fa45',
            assumptions: `Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
            Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia,
             looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage,
             and going through the cites of the word in classical literature, discovered the undoubtable source.
            Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"
            (The Extremes of Good and Evil) by Cicero, written in 45 BC.
             This book is a treatise on the theory of ethics, very popular during the Renaissance.
             The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.`,
            outOfScope: `Contrary to popular belief, Lorem Ipsum is not simply random text.
             It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
             Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia,
              looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage,
              and going through the cites of the word in classical literature, discovered the undoubtable source.
             Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"
             (The Extremes of Good and Evil) by Cicero, written in 45 BC.
              This book is a treatise on the theory of ethics, very popular during the Renaissance.
              The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.`,
            teamStructure: `Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
            Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia,
             looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage,
             and going through the cites of the word in classical literature, discovered the undoubtable source.
            Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"
            (The Extremes of Good and Evil) by Cicero, written in 45 BC.
             This book is a treatise on the theory of ethics, very popular during the Renaissance.
             The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.`,
            totalCost: -100
        },
        status: 0
    },
    {
        it: 'As a agency, I should validate submit qoute details with additional info must not be blank',
        options: {
            quoteId: '5fa500eea79f873b8ef67b17',
            projectId: '5f631e56d37cbb4801f0fa45',
            assumptions: `Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
            Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia,
             looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage,
             and going through the cites of the word in classical literature, discovered the undoubtable source.
            Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"
            (The Extremes of Good and Evil) by Cicero, written in 45 BC.
             This book is a treatise on the theory of ethics, very popular during the Renaissance.
             The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.`,
            outOfScope: `Contrary to popular belief, Lorem Ipsum is not simply random text.
             It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
             Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia,
              looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage,
              and going through the cites of the word in classical literature, discovered the undoubtable source.
             Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"
             (The Extremes of Good and Evil) by Cicero, written in 45 BC.
              This book is a treatise on the theory of ethics, very popular during the Renaissance.
              The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.`,
            teamStructure: `Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
              Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia,
               looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage,
               and going through the cites of the word in classical literature, discovered the undoubtable source.
              Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"
              (The Extremes of Good and Evil) by Cicero, written in 45 BC.
               This book is a treatise on the theory of ethics, very popular during the Renaissance.
               The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.`,
            totalCost: 1000
        },
        status: 0
    },
    {
        it: 'As a agency, I should validate submit qoute details with additional info must be less than minimum',
        options: {
            quoteId: '5fa500eea79f873b8ef67b17',
            projectId: '5f631e56d37cbb4801f0fa45',
            assumptions: `Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
            Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia,
             looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage,
             and going through the cites of the word in classical literature, discovered the undoubtable source.
            Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"
            (The Extremes of Good and Evil) by Cicero, written in 45 BC.
             This book is a treatise on the theory of ethics, very popular during the Renaissance.
             The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.`,
            outOfScope: `Contrary to popular belief, Lorem Ipsum is not simply random text.
             It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
             Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia,
              looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage,
              and going through the cites of the word in classical literature, discovered the undoubtable source.
             Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"
             (The Extremes of Good and Evil) by Cicero, written in 45 BC.
              This book is a treatise on the theory of ethics, very popular during the Renaissance.
              The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.`,
            teamStructure: `Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
              Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia,
               looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage,
               and going through the cites of the word in classical literature, discovered the undoubtable source.
              Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"
              (The Extremes of Good and Evil) by Cicero, written in 45 BC.
               This book is a treatise on the theory of ethics, very popular during the Renaissance.
               The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.`,
            totalCost: 1000,
            otherInfo: 'A'
        },
        status: 0
    },
    {
        it: 'As a agency, I should validate submit qoute details with additional info must be more than maximum',
        options: {
            quoteId: '5fa500eea79f873b8ef67b17',
            projectId: '5f631e56d37cbb4801f0fa45',
            assumptions: `Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
            Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia,
             looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage,
             and going through the cites of the word in classical literature, discovered the undoubtable source.
            Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"
            (The Extremes of Good and Evil) by Cicero, written in 45 BC.
             This book is a treatise on the theory of ethics, very popular during the Renaissance.
             The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.`,
            outOfScope: `Contrary to popular belief, Lorem Ipsum is not simply random text.
             It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
             Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia,
              looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage,
              and going through the cites of the word in classical literature, discovered the undoubtable source.
             Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"
             (The Extremes of Good and Evil) by Cicero, written in 45 BC.
              This book is a treatise on the theory of ethics, very popular during the Renaissance.
              The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.`,
            teamStructure: `Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
              Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia,
               looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage,
               and going through the cites of the word in classical literature, discovered the undoubtable source.
              Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"
              (The Extremes of Good and Evil) by Cicero, written in 45 BC.
               This book is a treatise on the theory of ethics, very popular during the Renaissance.
               The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.`,
            totalCost: 1000,
            otherInfo: `Contrary to popular belief, Lorem Ipsum is not simply random text.
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
    }]
};
