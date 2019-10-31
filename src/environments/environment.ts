import { NgxLoggerLevel } from 'ngx-logger';

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyDESgYvH4l028Jy1eQ7gcdiVb3KZrpNuCE',
    authDomain: 'mafia-game-9f539.firebaseapp.com',
    databaseURL: 'https://mafia-game-9f539.firebaseio.com',
    projectId: 'mafia-game-9f539',
    storageBucket: '',
    messagingSenderId: '1038753330286',
    appId: '1:1038753330286:web:8adc3ee7113e75963fe27f'
  },
  logger: {
    level: NgxLoggerLevel.DEBUG,
    disableConsoleLogging: false,
    enableSourceMaps: true,
    serverLogLevel: NgxLoggerLevel.OFF
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
