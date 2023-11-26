const { Thoughts, User  } = require('../models');

const userController = {
    // Gets all users
    async getUsers(req, res) {
      try {
        const users = await User.find();
        res.json(users);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    // Gets a single user by their ID
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'You dun goofed. There is no user with that ID!' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //Creates a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //Updates an existing user
  async updateUser (req,res) {
    try {
        const user = await User.findOneAndUpdate({_id: req.params.userId}, body, {
            new: true,
            runValidators: true,
        });

     if (!user) {
        return res.status(404).json({ message: 'You dun goofed. There is no user with that ID!' });
     }

     res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
  },

  //Deletes a user
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

//If the user's ID is not valid, throws an error
      if (!user) {
        return res.status(404).json({ message: 'You dun goofed. There is no user with that ID!' });
      }
//Deletes the thoughts assoicated with the user
      await Thoughts.deleteMany({ _id: { $in: user.applications } });
      res.json({ message: 'The user and their associated thoughts have been deleted!' })
    } catch (err) {
      res.status(500).json(err);
    }
  },
}