import mysql2 from "mysql2/promise";

export default async function query(props) {
  let dbconnection;

  try {
    dbconnection = await mysql2.createConnection({
      host: process.env.MYSQL_HOSTNAME,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    });

    const [results] = await dbconnection.execute(props.query, props.values);
    dbconnection.end();
    return results;
  } catch (error) {
    console.log(error);

    dbconnection.end();
    return { error };
  } finally {
    dbconnection.end();
  }
}
