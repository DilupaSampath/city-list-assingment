import { NgxLoggerLevel } from 'ngx-logger';

export const environment = {
  production: true,
  logLevel: NgxLoggerLevel.TRACE,
  serverLogLevel: NgxLoggerLevel.OFF,
  api_url: '',
  grant_type: 'password'
};

