const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser, getUserInfo, updateUser  } = require('../controllers/UserController');

// const isLoggedIn = (req, res, next) => {
//   if (req.session.user) {
//     next();
//   } else {
//     res.status(401).json({ msg: 'Usuário não está logado' });
//   }
// };

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout',  logoutUser);
router.get('/user/:id',  getUserInfo);
router.put('/user/:id',  updateUser);

module.exports = router;
