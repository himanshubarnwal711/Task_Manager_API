const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const Tasks = require("../models/task");

// Create a Task
router.post("/tasks", auth, async (req, res) => {
  // const tasks = new Tasks(req.body);
  const tasks = new Tasks({
    ...req.body,
    owner: req.user._id,
  });
  try {
    await tasks.save();
    res.status(201).send(tasks);
  } catch (e) {
    res.status(400).send(e);
  }

  //   tasks
  //     .save()
  //     .then(() => {
  //       res.status(201).send(tasks);
  //     })
  //     .catch((e) => {
  //       res.status(400).send(e);
  //     });
});

// Read all tasks
// GET /tasks?completed=true
// GET /tasks?limit=10&skip=0
// GET /tasks?sortBy=createdAt:desc
router.get("/tasks", auth, async (req, res) => {
  const match = {};
  const sort = {};
  if (req.query.completed) {
    match.completed = req.query.completed === "true";
  }
  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(":");
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
  }
  try {
    // const tasks = await Tasks.find({owner:req.user._id});
    await req.user.populate({
      path: "tasks",
      match,
      options: {
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip),
        sort,
      },
    });
    res.send(req.user.tasks);
  } catch (e) {
    res.status(500).send();
  }

  //   Tasks.find({})
  //     .then((tasks) => {
  //       res.send(tasks);
  //     })
  //     .catch((e) => {
  //       res.status(500).send();
  //     });
});

// Read a task by id
router.get("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;

  try {
    // const tasks = await Tasks.findById(_id);
    const tasks = await Tasks.findOne({ _id, owner: req.user._id });
    if (!tasks) {
      return res.status(404).send();
    }
    res.send(tasks);
  } catch (e) {
    res.status(500).send();
  }

  //   Tasks.findById(_id)
  //     .then((tasks) => {
  //       if (!tasks) {
  //         return res.status(404).send();
  //       }
  //       res.send(tasks);
  //     })
  //     .catch((e) => {
  //       res.status(500).send();
  //     });
});

// Update a task by ID
router.patch("/tasks/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const tasks = await Tasks.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });
    // const tasks = await Tasks.findById(req.params.id);

    // const tasks = await Tasks.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });

    if (!tasks) {
      return res.status(404).send();
    }
    updates.forEach((update) => (tasks[update] = req.body[update]));
    await tasks.save();

    res.send(tasks);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Delete a task
router.delete("/tasks/:id", auth, async (req, res) => {
  try {
    // const tasks = await Tasks.findByIdAndDelete(req.params.id);
    const tasks = await Tasks.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!tasks) {
      return res.status(404).send();
    }
    res.send(tasks);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
