import { NgxLoggerLevel } from 'ngx-logger';

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
