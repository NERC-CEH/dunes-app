require('dotenv').config({ silent: true }); // get local environment variables from .env
const fs = require('fs');
const pkg = require('./package.json');

const exec = () => ({
  build: {
    command: 'NODE_ENV=production npm run build',
  },
});

const updateVersionAndBuild = ({ version, build }) => {
  let file = fs.readFileSync('./package.json', 'utf8');
  if (pkg.version !== version) {
    file = file.replace(pkg.version, version);
    file = file.replace(/"build": "\d+"/i, '"build": "1"');
    pkg.version = version;
    pkg.build = 1;
  } else {
    file = file.replace(/"build": "\d+"/i, `"build": "${build}"`);
    pkg.build = build;
  }
  fs.writeFileSync('./package.json', file, 'utf8');
};

const prompt = {
  version: {
    options: {
      questions: [
        {
          config: 'version',
          type: 'input',
          message: 'Enter new app version?',
          default: pkg.version,
        },
        {
          config: 'build',
          type: 'input',
          message: 'Enter new app build version?',
          default: pkg.build,
          when: ({ version }) => pkg.version === version,
        },
      ],
      then: updateVersionAndBuild,
    },
  },
};

function init(grunt) {
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-prompt');

  grunt.initConfig({
    exec: exec(grunt),
    prompt,
  });
}

module.exports = grunt => {
  init(grunt);

  grunt.registerTask('default', [
    'prompt:version',
    'exec:build',

    // build production

    'checklist',
  ]);

  grunt.registerTask('checklist', () => {
    const Reset = '\x1b[0m';
    const FgGreen = '\x1b[32m';
    const FgYellow = '\x1b[33m';
    const FgCyan = '\x1b[36m';

    const changelog = fs.readFileSync('./CHANGELOG.md', 'utf8');

    const versionExistsInChangelog = changelog.includes(pkg.version);
    if (!versionExistsInChangelog) {
      console.log(FgYellow);
      console.log('WARN:');
      console.log(`* Have you updated CHANGELOG.md?`);
    } else {
      console.log(FgGreen);
      console.log('Success! 👌');
    }

    console.log(FgCyan);
    console.log('NEXT:');
    console.log(`* Update screenshots.`);
    console.log(`* Update descriptions.`);

    console.log(Reset);
  });
};
