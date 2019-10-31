import { NgxLoggerLevel } from 'ngx-logger';

export const environment = {
    production: false,
    logger: {
        level: NgxLoggerLevel.DEBUG,
        disableConsoleLogging: false,
        enableSourceMaps: true,
        serverLogLevel: NgxLoggerLevel.OFF
    }
};
