import { Router } from 'express';
import {
register,
 login,
 findUser,
 findByUsername,
updateUser,
findAllUser,
deleteUser} from '../controllers/auth.controller.js';
import {isAuth} from '../middleware/auth.middleware.js';
import validate from '../middleware/validate.middleware.js';
import { loginUser, registerUser } from '../schema/index.schema.js';

const router = Router();

router.post('/register', validate(registerUser), register)
router.post('/login', validate(loginUser), login)
router.get('/@:username', findByUsername)
router.get('/:id', findUser)
router.patch('/:id', updateUser)
router.get('/', findAllUser)
router.delete('/:id', deleteUser)

export default router; 

