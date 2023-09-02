// Define a class CustomAPIError that extends the built-in Error class
class CustomAPIError extends Error {

  // Constructor method that takes in a message and statusCode
  constructor(message, statusCode) {

    // Call the constructor of the superclass (Error) with the message
    super(message);

    // Attach an additional property statusCode to the error object
    this.statusCode = statusCode;
  }
}

// Export the CustomAPIError class so it can be used in other files
module.exports = CustomAPIError;
