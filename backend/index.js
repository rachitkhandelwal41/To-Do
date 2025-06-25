const express = require("express");
const { createTodo, updateTodo } = require("./types");
const { todo } = require("./db");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

app.post("/todo", async function(req, res) {
    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload);

    if (!parsedPayload.success) {
        res.status(411).json({
            msg: "You sent the wrong inputs",
        })
        return;
    }
    // put it in mongodb
    await todo.create({
        title: createPayload.title,
        description: createPayload.description,
        completed: false
    })

    res.json({
        msg: "Todo created"
    })
})

app.get("/todos", async function(req, res) {
  const todos = await todo.find({});
  res.json({
    todos: todos
  });
});


app.put("/completed", async function (req, res) {
  const { id } = req.body;

  try {
    await todo.updateOne({ _id: id }, { completed: true });
    res.json({ message: "Marked as complete" });
  } catch (e) {
    res.status(500).json({ error: "Could not update todo" });
  }
});

app.listen(3000);