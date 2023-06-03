const User = require("../users/users-model");

// 3- On FAILED registration due to `username` or `password` missing from the request body,
// the response body should include a string exactly as follows: "username and password required".

// 4- On FAILED registration due to the `username` being taken,
// the response body should include a string exactly as follows: "username taken".

const validateRequestBody = (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "username and password required" });
    }
    next();
};

const checkUsernameAvailability = async (req, res, next) => {
    try {
        const [user] = await User.findBy({ username: req.body.username });
        if (user) {
            return res.status(400).json({ message: "username taken" });
        } else {
            req.user = user;
            next();
        }
    } catch (err) {
        next(err);
    }
};

const checkUsernameExists = async (req, res, next) => {

    try {
        const [user] = await User.findBy({ username: req.body.username });
        if (!user) {
            return res.status(401).json({ message: "invalid credentials" });
        } else {
            req.user = user;
            next();
        }
    } catch (err) {
        next(err);
    }
}

module.exports = {
    validateRequestBody,
    checkUsernameAvailability,
    checkUsernameExists
}