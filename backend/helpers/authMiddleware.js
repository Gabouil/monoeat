function authMiddleware(req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).send('Access Denied: No Token Provided!');

    const secretKey = '9694dd6e3936a493b94b366914ea55210b15f34a51d91cb95e5ab852060faddef6f0546e11be13e4f8419c137fa2b77e2718bde0cf63478bdbbf479ed89ec9f4'
    try {
        if (token === secretKey) {
            console.log('Token Verified');
            next();
        }
    } catch (error) {
        res.status(400).send('Invalid Token');
    }
}

module.exports = authMiddleware;