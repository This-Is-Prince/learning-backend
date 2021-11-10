import { RequestHandler } from "express";
import Task from "../models/Task";
import asyncWrapper from "../middleware/async";
import { createCustomError } from "../errors/custom-error";

const getALlTasks: RequestHandler = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
});

const createTask: RequestHandler = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json(task);
});

declare global {
  export interface Error {
    status: number;
  }
}

const getTask: RequestHandler = asyncWrapper(async (req, res, next) => {
  let { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });
  if (!task) {
    // 1.way
    // const error = new Error("Not Found");
    // error.status = 404;
    // error.message = `No task with id : ${taskID}`;
    // return next(error);

    // 2.way
    return next(createCustomError(`No task with id : ${taskID}`, 404));

    // By Default Way
    // return res.status(404).json({ msg: `No task with id : ${taskID}` });
  }
  res.status(200).json({ task });
});

const deleteTask: RequestHandler = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });
  if (!task) {
    return next(createCustomError(`No task with id : ${taskID}`, 404));
  }
  res.status(200).json({ task });
});

const updateTask: RequestHandler = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;

  const task = await Task.findOneAndReplace({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    return next(createCustomError(`No task with id : ${taskID}`, 404));
  }
  res.status(200).json({ task });
});

// 1.way

// const getALlTasks: RequestHandler = async (req, res) => {
//   try {
//     const tasks = await Task.find({});
//     res.status(200).json({ tasks });

//     // res.status(200).json({ tasks,amount:tasks.length });

//     // res
//     //   .status(200)
//     //   .json({ status: "success", data: { tasks, nbHits: tasks.length } });

//     // res
//     //   .status(200)
//     //   .json({ success: true, data: { tasks, nbHits: tasks.length } });
//   } catch (error) {
//     res.status(500).json({ msg: error });
//   }
// };

// const createTask: RequestHandler = async (req, res) => {
//   try {
//     const task = await Task.create(req.body);
//     res.status(201).json(task);
//   } catch (error) {
//     res.status(500).json({ msg: error });
//   }
// };

// const getTask: RequestHandler = async (req, res) => {
//   try {
//     let { id: taskID } = req.params;
//     const task = await Task.findOne({ _id: taskID });
//     if (!task) {
//       return res.status(404).json({ msg: `No task with id : ${taskID}` });
//     }
//     res.status(200).json({ task });
//   } catch (error) {
//     res.status(500).json({ msg: error });
//   }
// };

// const deleteTask: RequestHandler = async (req, res) => {
//   try {
//     const { id: taskID } = req.params;
//     const task = await Task.findOneAndDelete({ _id: taskID });
//     if (!task) {
//       return res.status(404).json({ msg: `No task with id : ${taskID}` });
//     }
//     res.status(200).json({ task });
//   } catch (error) {
//     res.status(500).json({ msg: error });
//   }
// };

// const updateTask: RequestHandler = async (req, res) => {
//   try {
//     const { id: taskID } = req.params;

//     const task = await Task.findOneAndReplace({ _id: taskID }, req.body, {
//       new: true,
//       runValidators: true,
//     });

//     if (!task) {
//       return res.status(404).json({ msg: `No task with id : ${taskID}` });
//     }
//     res.status(200).json({ task });
//   } catch (error) {
//     res.status(500).json({ msg: error });
//   }
// };

export { createTask, deleteTask, getALlTasks, getTask, updateTask };
