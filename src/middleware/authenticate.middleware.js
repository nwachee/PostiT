
const authenticate = (req, res, next) => {
    
    if(!(req.user = 'User')){
        res.status(403).json({
            success: false,
            message: 'Invalid User'
        })
    }
    next()
}

module.exports = authenticate