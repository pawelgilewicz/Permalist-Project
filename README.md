# Permalist-Project
## Firstly you need to initialize npm 
## secondly you need to install modules for this app 
npm i pg
npm i express
## thirdly you need to set necessarry info for your database
const db = new pg.Client(
  {
    port:"your port"         //my process.env.DB_PORT,
    host:"your host"         //my process.env.DB_HOST,
    user:"your user login"   //my process.env.DB_USER,
    password:"your password" //my process.env.DB_PASSWORD,
    database:"your database" //my process.env.DB_BASE
  }
);

## Finaly create a table in your database
CREATE TABLE items (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL
);
