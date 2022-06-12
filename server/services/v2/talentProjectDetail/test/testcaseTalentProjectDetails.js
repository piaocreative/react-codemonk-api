module.exports = {
    projectDetails: [{
        it: 'As a user I should validate if project detaiils is not passed',
        options: {
        },
        status: 0
    },
    {
        it: 'As a user I should validate if project detaiils is as empty',
        options: {
            projectDetails: ''
        },
        status: 0
    },
    {
        it: 'As a user I should validate if project detaiils is as string not array',
        options: {
            projectDetails: 'some value'
        },
        status: 0
    },
    {
        it: 'As a user I cant save my project details if project name details is passed as empty',
        options: {
            projectDetails: [{
                'name': '',
                'url': 'http://www.codemonk.ai',
                'description': 'This is for devlopers',
                'role': 'Developer',
                'keyAchievements': 'I delivered the sprint 1 and sprint 2 on time'
            }]
        },
        status: 0
    },
    {
        it: 'As a user I cant save my project details if project description details is minimum',
        options: {
            projectDetails: [{
                'name': 'CodeMonk',
                'url': 'http://www.codemonk.ai',
                'description': 'd',
                'role': 'Developer',
                'keyAchievements': 'I delivered the sprint 1 and sprint 2 on time',
                employer: 'Codemonk',
                industry: 'Apparel & Fashion',
                skills: [{ name: 'Android', rate: 9 }]
            }]
        },
        status: 0
    },
    {
        it: 'As a user I cant save my project details if project description details is maximum',
        options: {
            projectDetails: [{
                'name': 'CodeMonk',
                'url': 'http://www.codemonk.ai',
                'description': ` Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nullam at efficitur metus.
                Duis convallis enim eu turpis convallis hendrerit. Quisque vestibulum id magna
                placerat sagittis.Duis vestibulum justo ac mi molestie ultrices. Sed accumsan
                eleifend purus, at dignissim lacus hendrerit eu.Phasellus tempor sollicitudin
                odio ac posuere. Integer eros urna, venenatis ac felis quis,
                tempus fringilla quam.
                Curabitur gravida faucibus aliquet. Vestibulum elementum laoreet accumsan.
                Suspendisse imperdiet orci ut quam mattis, eu molestie enim viverra. Nulla
                porta eros feugiat porttitor ultrices.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                 Nullam at efficitur metus.
                Duis convallis enim eu turpis convallis hendrerit. Quisque vestibulum id magna
                placerat sagittis.Duis vestibulum justo ac mi molestie ultrices. Sed accumsan
                eleifend purus, at dignissim lacus hendrerit eu.Phasellus tempor sollicitudin
                odio ac posuere. Integer eros urna, venenatis ac felis quis,
                tempus fringilla quam.
                Curabitur gravida faucibus aliquet. Vestibulum elementum laoreet accumsan.
                Suspendisse imperdiet orci ut quam mattis, eu molestie enim viverra. Nulla
                porta eros feugiat porttitor ultrices.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                 Nullam at efficitur metus.
                Duis convallis enim eu turpis convallis hendrerit. Quisque vestibulum id magna
                placerat sagittis.Duis vestibulum justo ac mi molestie ultrices. Sed accumsan
                eleifend purus, at dignissim lacus hendrerit eu.Phasellus tempor sollicitudin
                odio ac posuere. Integer eros urna, venenatis ac felis quis,
                 tempus fringilla quam.
                Curabitur gravida faucibus aliquet. Vestibulum elementum laoreet accumsan.
                Suspendisse imperdiet orci ut quam mattis, eu molestie enim viverra. Nulla
                porta eros feugiat porttitor ultrices`,
                'role': 'Developer',
                'keyAchievements': 'I delivered the sprint 1 and sprint 2 on time',
                employer: 'Codemonk',
                industry: 'Apparel & Fashion',
                skills: [{ name: 'Android', rate: 9 }]
            }]
        },
        status: 0
    },
    {
        it: 'As a user I cant save my project details if project role details is passed incorrectly',
        options: {
            projectDetails: [{
                'name': 'CodeMonk',
                'url': 'http://www.codemonk.ai',
                'description': `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nullam at efficitur metus.
                    Duis convallis enim eu turpis convallis hendrerit. Quisque vestibulum id magna
                    placerat sagittis.Duis vestibulum justo ac mi molestie ultrices. Sed accumsan
                    eleifend purus, at dignissim lacus hendrerit eu.Phasellus tempor sollicitudin
                    odio ac posuere. Integer eros urna, venenatis ac felis quis,
                    tempus fringilla quam.`,
                'role': 'demo',
                'keyAchievements': 'I delivered the sprint 1 and sprint 2 on time',
                employer: 'Codemonk',
                industry: 'Apparel & Fashion',
                skills: [{ name: 'Android', rate: 9 }]
            }]
        },
        status: 0
    },
    {
        it: 'As a user I cant save my project details if project name details is not passed',
        options: {
            projectDetails: [{
                url: 'http://www.codemonk.ai',
                description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nullam at efficitur metus.
                    Duis convallis enim eu turpis convallis hendrerit. Quisque vestibulum id magna
                    placerat sagittis.Duis vestibulum justo ac mi molestie ultrices. Sed accumsan
                    eleifend purus, at dignissim lacus hendrerit eu.Phasellus tempor sollicitudin
                    odio ac posuere. Integer eros urna, venenatis ac felis quis,
                    tempus fringilla quam.`,
                role: 'Developer',
                keyAchievements: 'I delivered the sprint 1 and sprint 2 on time',
                employer: 'Codemonk',
                industry: 'Apparel & Fashion',
                skills: [{ name: 'Android', rate: 9 }]
            }]
        },
        status: 0
    },
    {
        it: 'As a user I cant save my project details, if project description details is not passed',
        options: {
            projectDetails: [{
                name: 'CodeMonk',
                url: 'http://www.codemonk.ai',
                role: 'Developer',
                keyAchievements: 'I delivered the sprint 1 and sprint 2 on time',
                employer: 'Codemonk',
                industry: 'Apparel & Fashion',
                skills: [{ name: 'Android', rate: 9 }]
            }]
        },
        status: 0
    },
    {
        it: 'As a user I cant save my project details if project role details is not passed',
        options: {
            projectDetails: [{
                name: 'CodeMonk',
                url: 'http://www.codemonk.ai',
                description: 'This is for devlopers',
                keyAchievements: 'I delivered the sprint 1 and sprint 2 on time',
                employer: 'Codemonk',
                industry: 'Apparel & Fashion',
                skills: [{ name: 'Android', rate: 9 }]
            }]
        },
        status: 0
    },
    {
        it: 'As a user I cant save my project details if project url details is passed incorrectly',
        options: {
            projectDetails: [{
                name: 'CodeMonk',
                url: 'codemonk',
                description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nullam at efficitur metus.
                    Duis convallis enim eu turpis convallis hendrerit. Quisque vestibulum id magna
                    placerat sagittis.Duis vestibulum justo ac mi molestie ultrices. Sed accumsan
                    eleifend purus, at dignissim lacus hendrerit eu.Phasellus tempor sollicitudin
                    odio ac posuere. Integer eros urna, venenatis ac felis quis,
                    tempus fringilla quam.`,
                role: 'Developer',
                keyAchievements: 'I delivered the sprint 1 and sprint 2 on time',
                employer: 'Codemonk',
                industry: 'Apparel & Fashion',
                skills: [{ name: 'Android', rate: 9 }]
            }]
        },
        status: 0
    },
    {
        it: 'As a user I cant save my project details if project description details html text is maximum',
        options: {
            projectDetails: [{
                name: 'CodeMonk',
                url: 'http://www.codemonk.ai',
                description: ` <h2>Welcome To The Best Online HTML Web
                        Editor!</h2> <h3>Welcome To The Best Online HTML Web Editor
                        !</h3> <h4>Welcome To The Best Online HTML Web Editor!</h4>
                         <p style="font-size: 1.5em;">You can
                         <strong style="background-color: #317399; padding: 0 5px; color: #fff;">
                         type your text</strong> directly in the editor or paste it from
                          a Word Doc, PDF, Excel etc.</p> <p style="font-size: 1.5em;">
                          The <strong>visual editor</strong> on the right and the
                           <strong>source editor</strong> on the left
                           are linked together and the changes are reflected
                            in the other one as you type!
                             <img src="https://html5-editor.net/images/smiley.png" alt="smiley" />
                             </p> <table class="editorDemoTable"> <tbody> <tr>
                              <td><strong>Name</strong></td>
                               <td><strong>City</strong></td>
                                <td><strong>Age</strong></td>
                                 </tr> <tr> <td>John</td> <td>Chicago</td>
                                  <td>23</td> </tr> <tr> <td>Lucy</td>
                                   <td>Wisconsin</td> <td>19</td>
                                   </tr> <tr> <td>Amanda</td> <td>Madison</td>
                                    <td>22</td> </tr> </tbody> </table>
                                     <p>This is a table you can experiment with.</p>`,
                role: 'Developer',
                keyAchievements: 'I delivered the sprint 1 and sprint 2 on time',
                employer: 'Codemonk',
                industry: 'Apparel & Fashion',
                skills: [{ name: 'Android', rate: 9 }]
            }]
        },
        status: 0
    }
    ]
};
