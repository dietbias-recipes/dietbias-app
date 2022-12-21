import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

type AuthController = {
  addJwt: RequestHandler;
  verifyJwt: RequestHandler;
};

// need jwt secret from .env file
const authController: AuthController = {
  // add jwt for when user logs in or signs up 
  addJwt: (req, res, next) => {
    const secret = process.env.JWT_SECRET as string;
    const {id} = res.locals;
    // take username, declare token, that is jwt.sign(id, secret, expiration time)
    res.locals.jwt = jwt.sign({userId: id}, secret, {expiresIn: '2 days'});
    res.cookie('jwt', res.locals.jwt, {httpOnly: true});
   // directly return with res - auth - frontend sends it back
    return res.status(200).json({auth: true});
  },
  // verifyJWT -> use everywhere except login process
  // to check if they have their pass, only return back if bad do we send back
  
  verifyJwt: (req, res, next) => {
    const token: any = req.headers['x-access-token'];
    if (!token) return res.status(404).send('No token!'); 
    else {
      jwt.verify(token, process.env.JWT_SECRET as string, (err: any, decoded: any) => {
        if (err) return res.status(401).json({auth: false});
        res.locals.id = decoded.userId;
        return next();
      })
      // set cookie on response
    }
  }

};
export default authController;