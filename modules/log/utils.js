import fs from 'fs';
import chalk from 'chalk';

export function extractNetworkInfo(req, res = {}) {
  return {
    'req.url': req.url,
    'req.method': req.method,
    // 'req.headers': req.headers,
    'res.statusCode': res.statusCode,
  };
}

export function makeStringMessage(conversionTargets) {
  const arrayExclusionKey = ['level', 'label', 'timestamp'];

  const returnLogMessage = Object.entries(conversionTargets)
    .filter(([key, _]) => !arrayExclusionKey.includes(key))
    .map(([key, value]) => {
      if (typeof value === 'object') {
        value = JSON.stringify(value);
      }
      if (key === 'message') {
        return `${value}`;
      }
      return `${key}: ${value}`;
    })
    .join(', ');

  return returnLogMessage;
}

export function mkdirIfNotExists(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
}

export function checkHeadersAccepts(headers, accepted) {
  const hasAcceptHeaders = headers.accept;
  if (hasAcceptHeaders) {
    return accepted.some(x => headers.accept.includes(x));
  }
  return false;
}

export function checkHeadersContentType(headers, contentTypes) {
  const hasContentType = headers['content-type'];
  if (hasContentType) {
    return contentTypes.some(x => headers['content-type'].includes(x));
  }
  return false;
}

export function showBanner(bannerWord) {
  console.log(chalk.blue.bold(bannerWord));
}
