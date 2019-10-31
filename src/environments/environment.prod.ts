import { NgxLoggerLevel } from 'ngx-logger';

export const environment = {
  production: true,
  logger: {
    level: NgxLoggerLevel.DEBUG,
    disableConsoleLogging: true,
    enableSourceMaps: false,
    serverLogLevel: NgxLoggerLevel.OFF
  }
};
