require('dotenv').config({ silent: true }); // get local environment variables from .env
const fs = require('fs');
const pkg = require('./package.json');

const exec = grunt => ({
  build: {
    command: 'NODE_ENV=production npm run build',
  },
  resources: {
    command: () => {
      const appMinorVersion = pkg.version
        .split('.')
        .splice(0, 2)
        .join('.');

      return `mkdir -p resources &&
                cp -R other/designs/android resources &&

                cp other/designs/splash.svg resources &&
                sed -i.bak 's/{{APP_VERSION}}/${appMinorVersion}/g' resources/splash.svg &&

                ./node_modules/.bin/sharp -i resources/splash.svg -o resources/splash.png resize 2737 2737 -- removeAlpha &&
                ./node_modules/.bin/sharp -i other/designs/icon.svg -o resources/icon.png resize 1024 1024 -- removeAlpha &&

                ./node_modules/.bin/cordova-res ios --skip-config --resources resources --copy &&
                ./node_modules/.bin/cordova-res android --skip-config --resources resources --copy`;
    },
    stdout: false,
  },
  init: {
    command: `
      ./node_modules/.bin/cap add ios && 
      ./node_modules/.bin/cap add android &&
      ./node_modules/.bin/cap copy`,
    stdout: false,
  },
  build_android: {
    command() {
      if (!process.env.KEYSTORE_PATH) {
        throw new Error('KEYSTORE_PATH env variable is missing.');
      }

      if (!process.env.KEYSTORE_ALIAS) {
        throw new Error('KEYSTORE_ALIAS env variable is missing.');
      }

      const pass = grunt.config('keystore-password');
      if (!pass) {
        throw new Error('KEYSTORE_PATH password is missing.');
      }

      return `cd android && 
              ./gradlew assembleRelease && 
              cd app/build/outputs/apk/release &&
              jarsigner -keystore ${process.env.KEYSTORE_PATH} -storepass ${pass} app-release-unsigned.apk ${process.env.KEYSTORE_ALIAS} &&
              zipalign 4 app-release-unsigned.apk app-release.apk &&
              mv -f app-release.apk ../../../../../`;
    },

    stdout: false,
    stdin: true,
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
  keystore: {
    options: {
      questions: [
        {
          name: 'keystore-password',
          type: 'password',
          message: 'Please enter keystore password:',
        },
      ],
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

    'exec:init',
    'exec:resources',

    'prompt:keystore',
    'exec:build_android',

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
