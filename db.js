const sql = require('mssql');

const config = {
  user: 'nodeuser',                    // ✅ SQL login (not Windows auth)
  password: 'StrongP@ssword123',
  server: 'localhost',                // ✅ No instance names here
  port: 1433,                         // ✅ Default static TCP port
  database: 'Employee',
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log("✅ Connected to SQL Server");
    return pool;
  })
  .catch(err => {
    console.error("❌ DB Connection Failed:", JSON.stringify(err, null, 2));
  });

module.exports = { sql, poolPromise };
