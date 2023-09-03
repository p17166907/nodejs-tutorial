// Define a class CustomAPIError that extends the built-in Error class
class CustomAPIError extends Error {

  // Constructor method that takes in a message and statusCode
  constructor(message) {

    // Call the constructor of the superclass (Error) with the message
    super(message);


  }
}

// Export the CustomAPIError class so it can be used in other files
module.exports = CustomAPIError;
