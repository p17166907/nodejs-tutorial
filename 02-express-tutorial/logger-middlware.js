// req => middleware => res
//middleware as checkpoints that your requests pass through, 
//where you can perform tasks, modify data, 
//or control the flow of the request before it reaches the final route handler.
const logger = (req, res, next) => {
    const { method, url } = req;
    const time = new Date().getFullYear();
    console.log(`method: ${method}, url: ${url}`);
    console.log(time);
    //res.send(`middleware checkpoint ${time}`)
    next(); // Call next to pass control to the next middleware or route handler
};

module.exports = logger;