const authorize = (req, res, next) => {
    console.log('authorize');
    //the url e.g. http://localhost:3000/?user=john: 
    console.log(req.query);//prints: { user: 'john' }
    const { user } = req.query;
    //setting to the request - req.user if user query string = 'john' in the url
    if (user === 'john') { req.user = { name: 'john', id: 3 }; next(); } else { return res.status(401).send('Unauthorized'); }
};

module.exports = authorize;
