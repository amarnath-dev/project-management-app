const handleError = (err, req, res, next) => {
    return res.status(500).json({ status: false, message: err?.message });
}

module.exports = handleError;