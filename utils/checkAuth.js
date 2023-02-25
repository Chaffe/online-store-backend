import jwt from "jsonwebtoken";

export default (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

    if (token) {
        try {
            const decoded = jwt.verify(token, 'secret123');

            req.userId = decoded._id;
            return next();
        } catch (err) {
            console.log(err);
            return res.status(403).json({
                message: 'No access'
            })
        }
    } else {
        console.log('No access');
        return res.status(403).json({
            message: 'No access'
        });
    }
}