const path = require('path');
const os = require('os');
global.appRoot = path.resolve(__dirname);
const winston = require('winston');
const winstonDaily = require('winston-daily-rotate-file');
const { colors, levels } = require('./config.js');

const { combine, timestamp, printf, colorize, json } = winston.format;
const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss:ms';

winston.addColors(colors);

export default function logModule(logOptions) {
  const logDirectory = logOptions.logBaseDirectoryPath ? logOptions.logBaseDirectoryPath : 'logs';

  const logFormat = [
    timestamp({ format: DATE_FORMAT }),
    printf(info => {
      return `[${info.timstamp}] [${info.level}] [${info}]`;
    }),
  ];

  if (logOptions.isJson) {
    logFormat.push(json());
  }

  const format = combine(...logFormat);

  const consoleOpts = {
    handleExceptions: true,
    level: 'access',
    levels,
    formet: combine(colorize({ all: true }), timestamp({ format: DATE_FORMAT })),
    stderrLevels: ['error'],
  };

  const transports = [new winston.transports.Console(consoleOpts)];

  if (logOptions.isFileWrite) {
    // eslint-disable-next-line new-cap
    const errorLog = new winstonDaily({
      level: 'error',
      datePattern: 'YYYY-MM-DD-HH',
      dirname: path.join(process.cwd(), `/${logDirectory}`, '/error'),
      filename: `${os.hostname}.%DATE%.error.log`,
    });

    transports.push(errorLog);

    // eslint-disable-next-line new-cap
    const allLog = new winstonDaily({
      level: 'debug',
      datePattern: 'YYYY-MM-DD-HH',
      dirname: path.join(process.cwd(), `/${logDirectory}`, '/all'),
      filename: `${os.hostname}.%DATE%.all.log`,
    });

    transports.push(allLog);
  }

  const Logger = winston.createLogger({
    levels,
    format,
    transports,
  });

  process.$nuxtLog = Logger;

  this.nuxt.hook('ready', () => {
    if (Logger) {
      Logger.info('nuxt log setting success prod by manbalboy');
    }
  });

  this.nuxt.hook('render:setupMiddleware', app => {
    app.use((req, res, next) => {
      res.on('finish', () => {
        Logger.log({
          level: 'access',
          message: '',
          resStatusCode: res.statusCode,
          reqUrl: req.url,
          // reqHeader: req.headers,
        });
      });

      next();
    });
  });

  this.nuxt.hook('render:errorMiddleware', app =>
    app.use((err, req, res, next) => {
      Logger.error(err);
      // const newError = new Error(err)
      // newError.stack = err.stack
      // logger.error(newError, {
      //   ...extractReqInfo(req),
      // })
      next(err);
    }),
  );
}
