const mysql = require('./mysql')

function promisifySql(target) {
    return new Proxy(
      {},
      {
        get(_, name) {
          return (obj) =>
            new Promise((resolve, reject) => {
              target[name](obj.sql,obj.value, (err, res) => {
                if (err) {
                    reject(err)
                    return
                }
                resolve(res)
              });
            });
        },
      }
    );
}

module.exports = promisifySql(mysql)