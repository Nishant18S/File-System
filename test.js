const sql = require('mssql/msnodesqlv8');

const config = {
  server: 'NISHANT\\SQLEXPRESS',
  database: 'Employee',
  driver: 'msnodesqlv8',
  options: {
    trustedConnection: true,
    trustServerCertificate: true
  }
};

sql.connect(config)
  .then(pool => {
    console.log("✅ Connection successful");
    return pool.request().query('SELECT GETDATE() AS CurrentTime');
  })
  .then(result => {
    console.log("Query Result:", result.recordset);
    sql.close();
  })
  .catch(err => {
    console.error("❌ Connection test failed:", JSON.stringify(err, null, 2));
  });