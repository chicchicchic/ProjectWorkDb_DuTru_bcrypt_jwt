import jwt from 'jsonwebtoken';


export const authentication = (req, res, next) => {
    const token = req.header('token');
    console.log(token);
    if(!token){
        return res.status(401).json({
            status: false,
            message: 'You can not access'
        })
    }
    jwt.verify(token, 'LOVEDXC', (error, user) => {
        if(error) {
            return res.status(500).json({
                status: false,
                message: "You can not access"
            })
        }
        req.user = user;
        console.log('user verify'+user);
        next();
    })
}