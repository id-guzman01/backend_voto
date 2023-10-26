const errors = (res, error) => {
    res.status(400);
    res.send({
        status: 400,
        error: "Bad request",
        message: error.message
    });
};

module.exports = {
    errors
}