const express = require('express');
const router = express.Router();
const { createAppointment, getAppointments, updateAppointment, deleteAppointment,getUserAppointments,getBarberAppointments } = require('../controllers/AppointmentController');

// const isLoggedIn = (req, res, next) => {
//   if (req.session.user || req.session.barber) {
//     next();
//   } else {
//     res.status(401).json({ msg: 'Não está logado' });
//   }
// };

router.post('/', createAppointment);
router.get('/', getAppointments);
router.get('/:id', getUserAppointments);
router.get('/barber/:id', getBarberAppointments);
router.put('/:id', updateAppointment);
router.delete('/:id', deleteAppointment);

module.exports = router;
