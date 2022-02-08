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
                name: "repoName",
                message: "What is the name of your Git repo?",
            },
            {
                type: "input",
                name: "projectName",
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

    // This part creates file and directory structures
    writing() {
        this.log("Repo name:", this.answers.projectName)
        this.log("Application name:", this.answers.projectName)
        this.log("Uses M3:", this.answers.m3)
        this.log("Libraries: ", this.answers.libraries)

        this.log("Destination root: ", this.destinationRoot())
        this.log("Destination path: ", this.destinationPath(this.answers.repoName))

        this.log("Source root: ", this.sourceRoot())
        this.log(".project file: ", this.templatePath('ace-app/.project'))

        // Copy .project file
        this.fs.copyTpl(
            this.templatePath('ace-app/projects/project-folder/.project'),
            this.destinationPath(this.answers.repoName + '/projects/' + this.answers.projectName + '/.project'),
            { projectName: this.answers.projectName }
        )

        // Create local override
        this.fs.copyTpl(
            this.templatePath('ace-app/config/bar_overrides/repo_name.env.properties'),
            this.destinationPath(this.answers.repoName + '/config/local/bar_overrides/' + this.answers.projectName + '.local.properties'),
        )

        // Create QA override
        this.fs.copyTpl(
            this.templatePath('ace-app/config/bar_overrides/repo_name.env.properties'),
            this.destinationPath(this.answers.repoName + '/config/qa/bar_overrides/' + this.answers.projectName + '.qa.properties')
        )

        // Create prod override
        this.fs.copyTpl(
            this.templatePath('ace-app/config/bar_overrides/repo_name.env.properties'),
            this.destinationPath(this.answers.repoName + '/config/prod/bar_overrides/' + this.answers.projectName + '.prod.properties')
        )

        // Create tests folder and ReadyAPI project file
        this.fs.copyTpl(
            this.templatePath('ace-app/tests/testproject-readyapi-project.xml'),
            this.destinationPath(this.answers.repoName + '/tests/' + this.answers.projectName + '-readyapi-project.xml')
        )
    }

}
