import express from "express";
import tasks from "./routes/tasks";

const app = express();
const port = 3000;

// middleware
app.use(express.json());

// All Routes
app.use("/api/v1/tasks", tasks);

// app.get('/api/v1/tasks')         - get all the tasks
// app.post('/api/v1/tasks')        - create a new task
// app.get('/api/v1/tasks/:id')     - get single task
// app.patch('/api/v1/tasks/:id')   - update task
// app.delete('/api/v1/tasks/:id')  - delete task

app.listen(port, () => {
  console.log(`Server is listening on port ${port}....`);
});
