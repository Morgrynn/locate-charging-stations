let mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

let pool = null;
try {
  pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DATABASE,
  });
} catch (error) {
  console.log('Mysql pool create failed');
  console.log(error);
}

const api = {
  query: (query, ...parameters) => {
    let promise = new Promise(function (resolve, reject) {
      pool.query(query, ...parameters, (error, results, fields) => {
        if (error) {
          reject(error);
        }
        resolve(results);
      });
    });
    return promise;
  },
  closeAll: () => {
    pool.end();
  },
};

module.exports = api;
