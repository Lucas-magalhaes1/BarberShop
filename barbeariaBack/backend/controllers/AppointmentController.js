const Appointment = require('../models/Appointment');
const Barber = require('../models/Barber');
const moment = require('moment');

// Criar Agendamento
exports.createAppointment = async (req, res) => {
  const { barberId, userId, date, services } = req.body;
  try {
    const barber = await Barber.findById(barberId);

    if (!barber) return res.status(400).json({ msg: 'Barbeiro não encontrado' });

    // Verificar se o barbeiro oferece o serviço
    const serviceExists = barber.services.some(s => s.name === services);
    if (!serviceExists) return res.status(400).json({ msg: 'O barbeiro não oferece esse serviço' });

    // Verificar se o horário está disponível
    const existingAppointment = await Appointment.findOne({ barberId, date });
    if (existingAppointment) return res.status(400).json({ msg: 'Horário já está marcado' });

    const formattedDate = moment(date, 'YYYY-MM-DDTHH:mm:ss').format('DD/MM/YYYY HH:mm:ss');

    const newAppointment = new Appointment({ barberId, barberName: barber.name, userId, date: formattedDate, services });
    await newAppointment.save();

    res.status(201).json({ msg: 'Agendamento criado com sucesso', appointment: newAppointment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obter Agendamentos
exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



exports.getUserAppointments = async (req, res) => {
  try {

    const appointments = await Appointment.find({ userId: req.params.id });
    res.status(200).json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBarberAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ barberId: req.params.id });
    return res.status(200).json(appointments);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Atualizar Agendamento
exports.updateAppointment = async (req, res) => {
  const { id } = req.params;
  const { date, services } = req.body;
  try {
    const appointment = await Appointment.findById(id);
    if (!appointment) return res.status(404).json({ msg: 'Agendamento não encontrado' });

    // if (appointment.barberId.toString() !== req.session.barber._id) {
    //   return res.status(403).json({ msg: 'Acesso negado' });
    // }

    const barber = await Barber.findById(appointment.barberId);

    // Verificar se o barbeiro oferece o serviço
    const serviceExists = barber.services.some(s => s.name === services);
    if (!serviceExists) return res.status(400).json({ msg: 'O barbeiro não oferece esse serviço' });

    const formattedDate = moment(date, 'YYYY-MM-DDTHH:mm:ss').format('DD/MM/YYYY HH:mm:ss');

    const updatedAppointment = await Appointment.findByIdAndUpdate(id, { date: formattedDate, services }, { new: true });

    res.status(200).json({ msg: 'Agendamento atualizado com sucesso', appointment: updatedAppointment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Excluir Agendamento
exports.deleteAppointment = async (req, res) => {
  const { id } = req.params;
  try {
    const appointment = await Appointment.findById(id);
    if (!appointment) return res.status(404).json({ msg: 'Agendamento não encontrado' });

    // if (appointment.barberId.toString() !== req.session.barber._id) {
    //   return res.status(403).json({ msg: 'Acesso negado' });
    // }

    await Appointment.findByIdAndDelete(id);
    res.status(200).json({ msg: 'Agendamento excluído com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
