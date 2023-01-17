import oracleDB from "oracledb";
const connectOracle = async () => {
  let connection;
  try {
    connection = await oracleDB.getConnection({
      user: "gestint",
      password: "changement",
      connectionString: "localhost/dblocal",
    });
    console.log("connection avec oracle est succés");
    connection.execute(
      "select 'Nom culitvateur:'||nom,'prenon cultuvateur:'||prenom from tiers ",

      (err, resultat) => {
        if (resultat.rows.length == 0) {
          console.log("tableau est vide");
        } else {
          console.log(resultat);
        }
      }
    );
  } catch (error) {
    console.log(error.message);
  } finally {
    if (connection) {
      try {
        await connection.close();
        console.log("connection arréter avec succés");
      } catch (error) {
        console.log(error.message);
      }
    }
  }

  /*connection.execute(
        "select 'Nom culitvateur:'||nom,'prenon cultuvateur:'||prenom from tiers ",
        [],
        (err, resultat) => {
          if (err) {
            console.log(err);
            return;
          }
          let comptes = resultat.rows;
          console.log(comptes);
        }
      );*/
};

export default connectOracle;
