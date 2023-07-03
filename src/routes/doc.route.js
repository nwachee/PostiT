import { Router } from 'express';
const router = Router();

//Adding the documentation
router.get('/',  function (req, res) {
    res.statusCode = 302;
    res.setHeader("Location", "https://documenter.getpostman.com/view/23369669/2s93JrvjHv");
    res.end(); })

export default router;
