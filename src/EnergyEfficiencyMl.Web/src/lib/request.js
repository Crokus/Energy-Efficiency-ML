import xhr from 'xhr';
import extend from 'xtend';
import Promise from 'bluebird';

const defaultOpts = {
  method: 'GET',
  headers: {
    'Accept': 'application/json'
  }
};

export default function request(opts) {
  return new Promise((resolve, reject) =>
    xhr(extend(defaultOpts, opts), (err, resp, body) => {
      if (err) {
        return reject(err);
      }

      const statusCode = resp.statusCode;

      if (statusCode >= 200 && statusCode < 300) {
        try {
          resolve(JSON.parse(body));
        } catch(ex) {
          reject(ex);
        }
      } else {
        reject(new Error(statusCode + ': ' + body));
      }
    }));
}
