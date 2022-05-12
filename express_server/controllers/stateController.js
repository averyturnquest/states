// const data = {
//   states: require("../model/states.json"),
//   setStates: (data) => {
//     this.states = data;
//   },
// };

const State = require("../model/states");

//Get all states
const getStates = async (req, res) => {
    const states = await State.find();
    if (!states)
      return res.status(400).json({ message: "No states found." });
    res.json(states);
  };

//Create an state
const createNewState = async (req, res) => {
  if (!req?.body.firstname || !req?.body.lastname) {
    return res.status(400).json({ message: "First and lst name are required" });
  }
  try {
    const result = await State.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    });
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
  }
};

//Update State
const updateState = async (req, res) => {
  if (!req?.body.id) {
    return res.status(400).json({ message: "Id parameter is required. " });
  }
  const state = await State.findOne({ _id: req.body.id }).exec();

  if (!state) {
    return res
      .status(204)
      .json({ message: `No state matches Id ${req.body.id}` });
  }
  if (req.body?.firstname) state.firstname = req.body.firstname;
  if (req.body?.lastname) state.lastname = req.body.lastname;

  const result = await state.save();
  res.json(result);
};

//Delete state
const deleteState = async (req, res) => {
  if (!req?.body.id) {
    return res.status(400).json({ message: "State Id is required. " });
  }

  const state = await State.findOne({ _id: req.body.id }).exec();

  if (!state) {
    return res
      .status(204)
      .json({ message: `No State matches Id ${req.body.id}` });
  }
  const result = await state.deleteOne({ _id: req.body.id });
  res.json(result);
};

//Get state
const getState = async (req, res) => {
  if (!req?.params?.id) {
    return res.status(400).json({ message: "State Id is required. " });
  }

  const state = await State.findOne({ _id: req.params.id }).exec();

  if (!state) {
    return res
      .status(204)
      .json({ message: `No state matches Id ${req.params.id}` });
  }
  res.json(state);
};

module.exports = {
  getStates,
  updateState,
  deleteState,
  createNewState,
  getState,
};