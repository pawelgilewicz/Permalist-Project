import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = 3000;
const db = new pg.Client(
  {
    port:process.env.DB_PORT,
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_BASE
  }
);
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


let items = [
  { id: 1, title: "Buy milk" },
  { id: 2, title: "Finish homework" },
];

app.get("/",async (req, res) => {
  
  items = await db.query("SELECT * FROM items");
 
  const data = items.rows;
  
  res.render("index.ejs", {
    listTitle: "Today",
    listItems: data,
  });
});

app.post("/add", (req, res) => {
  const item = req.body.newItem;
  // items.push({ title: item });
  db.query("INSERT INTO items (title) VALUES($1) RETURNING *",[item])
  res.redirect("/");
});

app.post("/edit", (req, res) => {
  const id = req.body.updatedItemId;
  const changedTitle = req.body.updatedItemTitle;
  
  db.query("UPDATE items SET title=$1 WHERE id=$2",
    [changedTitle,id]
  );
  res.redirect("/");
});

app.post("/delete", (req, res) => {
  const id = req.body.deleteItemId;
  db.query("DELETE from items WHERE id=$1",[id]);
  res.redirect("/")
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
