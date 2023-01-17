import oracleDB from "oracledb";

const listeTiers = async (req, res) => {
  let connection;
  const tab = [];
  let n = 0;
  try {
    connection = await oracleDB.getConnection({
      user: "gestint",
      password: "changement",
      connectionString: process.env.DB_ORACLE_STRING,
    });
    console.log("connection avec oracle est succés");
    connection.execute(
      "SELECT * from emp_paie ",

      (err, resultat) => {
        if (resultat.rows.length == 0) {
          console.log("tableau est vide");
        } else {
          resultat.rows.map((r) => {
            tab.push(r);
            n++;
          });

          res.json(tab);
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
};

const listeParCritere = async (req, res) => {
  let connection;
  const tab = [];
  let n = 0;
  const donnee = req.params.data;
  try {
    connection = await oracleDB.getConnection({
      user: "gestint",
      password: "changement",
      connectionString: process.env.DB_ORACLE_STRING,
    });
    console.log("connection avec oracle est succés");
    if (req.params.crit == "cin") {
      connection.execute(
        "SELECT * FROM emloyees  ",

        (err, resultat) => {
          if (resultat.rows.length == 0) {
            console.log("tableau est vide");
          } else {
            resultat.rows.map((r) => {
              tab.push({ nom: r[0], prenom: r[1], code_tiers: r[2] });
              n++;
            });

            res.json(tab);
          }
        }
      );
    }
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
};
export { listeTiers, listeParCritere };
