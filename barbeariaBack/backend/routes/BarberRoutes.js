const express = require('express');
const router = express.Router();
const {
  registerBarber,
  loginBarber,
  logoutBarber,
  getBarbers,
  updateBarber,
  blockTime,
  getBarberId,
  updateTotalBarber,
  unblockTime,
  getBlockedTimes,
  setWorkingHours,
  incrementQueueLength,
  decrementQueueLength,
  getQueueLengthById,
  getBarberById
} = require('../controllers/BarberController');

// const isBarberLoggedIn = (req, res, next) => {
//   if (req.session.barber) {
//     next();
//   } else {
//     res.status(401).json({ msg: 'Barbeiro não está logado' });
//   }
// };

router.post('/register', registerBarber);
router.post('/login', loginBarber);
//router.post('/logout', isBarberLoggedIn, logoutBarber);
router.post('/logout', logoutBarber);
router.get('/getBarbers', getBarbers);
router.get('/getBarberId', getBarberId);
router.get('/getBarberById/:id', getBarberById);
router.put('/:id', updateBarber);
router.put('/queue-remove/:id', decrementQueueLength);
router.put('/queue-add/:id', incrementQueueLength);
router.get('/queue-length/:id', getQueueLengthById);
router.put('/barber/:id', getBarberById );
router.put('/uptotal/:id',  updateTotalBarber);
router.post('/block-time',  blockTime);
router.delete('/block-time/:timeId',  unblockTime);
router.get('/blocked-times',  getBlockedTimes);
router.put('/:id/working-hours',  setWorkingHours); // Definir horários de trabalho

module.exports = router;
