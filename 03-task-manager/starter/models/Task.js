// Import the Mongoose library
const mongoose = require('mongoose');

// Define the Mongoose Schema for the 'task' collection.
// The schema specifies the structure of documents in the collection.
const TaskSchema = new mongoose.Schema({
  name: String,      // A field 'name' of type String to store the name of the task.
  completed: Boolean // A field 'completed' of type Boolean to indicate whether the task is completed or not.
});

// Export the Mongoose model for the 'task' collection, based on the defined TaskSchema.
// This allows other parts of the application to interact with the 'task' collection using this model.
module.exports = mongoose.model('task', TaskSchema);
