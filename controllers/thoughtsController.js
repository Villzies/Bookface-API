const { Thoughts, User} = require("../models");

const thoughtController = {
//Finds all thoughts.
    async getThoughts(req, res) {
        try {
          const thoughts = await Thoughts.find();
          res.json(thoughts);
        } catch (err) {
          res.status(500).json(err);
        }
      },
//Gets a single thought by its ID.
    async getSingleThought(req, res) {
        try {
          const thoughts = await Thoughts.findOne({ _id: req.params.id })
            .select('-__v');
    
          if (!thoughts) {
            return res.status(404).json({ message: 'You dun goofed. There is no thought with that ID!' });
          }
          res.json(thoughts);
          } catch (err) {
          res.status(500).json(err);
          }
        },

//Creates a thought.
    async createThought(req, res) {
            try {
              const thought = await Thoughts.create(req.body);
              res.json(thought);
            } catch (err) {
              res.status(500).json(err);
            }
          },

//Updates an existing thought.
async updateThought (req,res) {
    try {
        const thoughts = await Thoughts.findOneAndUpdate({_id: req.params.id}, body, {
            new: true,
            runValidators: true,
        });

     if (!thoughts) {
        return res.status(404).json({ message: 'You dun goofed. There is no thought with that ID!' });
     }
//User needs to be used here somewhere.
     res.json(thoughts);
    } catch (err) {
        res.status(500).json(err);
    }
  },

  //Deletes a thought
  async deleteThought(req, res) {
    try {
      const thought = await Thoughts.findOneAndDelete({ _id: req.params.id });

//If the thought's ID is not valid, throws an error
      if (!thought) {
        return res.status(404).json({ message: 'You dun goofed. There is no thought with that ID!' });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
}

module.exports = thoughtController;