var Generator = require('yeoman-generator')

module.exports = class extends Generator {

    constructor(args, opts) {
        
        super(args, opts);

        this.option('babel'); // Add support for a '--babel' flag

    }

    method1() {
        this.log('method 1 just ran')
    }

    _private_method2() {
        this.log('this should not be printed')
    }

    // Prioritized method
    initializing() {
        this.log('Initializing ACE project')
    }

    async prompting() {

        this.answers = await this.prompt([
            {
                type: "input",
                name: "name",
                message: "What is the name of your ACE project?",
            },
            {
                type: "confirm",
                name: "m3",
                message: "Will this project make use of the M3 API?"
            },
            {
                type: "checkbox",
                name: "libraries",
                message: "Which common libraries will this project use?",
                choices: [
                    {
                        name: "Common logging",
                        value: "tip000-common-logging-lib"
                    },
                    {
                        name: "Common fault handling",
                        value: "tip000-common-faulthandling-lib"
                    },
                    {
                        name: "ConfigMaps & Secrets",
                        value: "tip000-configmap-lib"
                    }
                ]
            }
        ])
    }

    writing() {
        this.log("Project name:", this.answers.name)
        this.log("Uses M3:", this.answers.m3)
        this.log("Libraries: ", this.answers.libraries)

        this.log("Destination root: ", this.destinationRoot())
        this.log("Destination path: ", this.destinationPath(this.answers.name))

        this.log("Source root: ", this.sourceRoot())
        this.log(".project file: ", this.templatePath('.project'))

        this.fs.copyTpl(
            this.templatePath('.project'),
            this.destinationPath(this.answers.name + '/.project'),
            { projectName: this.answers.name }
        )
    }

}
