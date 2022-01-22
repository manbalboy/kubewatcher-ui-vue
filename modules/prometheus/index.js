import http from 'http';
import Prometheus from 'prom-client';
import chalk from 'chalk';
import defaults from './defaults';

module.exports = function PrometheusModule(_option = {}) {
  if (process.env.NODE_ENV === 'production') {
    const options = {
      ...defaults,
      ..._option,
    };

    const { metrics, host, port } = options;
    const { collectDefault, requestDuration } = metrics;

    if (collectDefault) {
      const metricsInterval = Prometheus.collectDefaultMetrics(
        typeof collectDefault === 'object' ? collectDefault : {},
      );
      process.on('SIGTERM', () => {
        clearInterval(metricsInterval);
      });
    }

    if (requestDuration) {
      const httpRequestDurationMicroseconds = new Prometheus.Histogram({
        name: 'http_request_duration_ms',
        help: 'Duration of HTTP requests in ms',
        labelNames: ['method', 'route', 'code'],
        buckets: [0.1, 5, 15, 50, 100, 200, 300, 400, 500],
      });

      this.addServerMiddleware((req, res, next) => {
        const startEpoch = Date.now();
        res.once('finish', () => {
          const responseTimeInMs = Date.now() - startEpoch;
          httpRequestDurationMicroseconds.labels(req.method, req.originalUrl, res.statusCode).observe(responseTimeInMs);
        });
        next();
      });
    }

    this.nuxt.hook('listen', () => {
      http
        .createServer(async (req, res) => {
          res.writeHead(200, { 'Content-Type': Prometheus.register.contentType });
          res.end(await Prometheus.register.metrics());
        })
        .listen(port, host, () => {
          console.log(chalk.blue.bgRed.bold(`prometheus-server on : ${host}:${port}`));
        });
    });
  }
};
