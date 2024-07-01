const Barber = require('../models/Barber');
const moment = require('moment');

// Registro de Barbeiro
exports.registerBarber = async (req, res) => {
  const {number, email, password, name, bio, services, workingHours } = req.body;
  try {
    const existingBarber = await Barber.findOne({ email });
    if (existingBarber) return res.status(400).json({ msg: 'Barbeiro já registrado' });

    const newBarber = new Barber({number, email, password, name, bio, services, workingHours });
    await newBarber.save();

    res.status(201).json({ msg: 'Barbeiro registrado com sucesso', newBarber });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login de Barbeiro
exports.loginBarber = async (req, res) => {
  const { email, password } = req.body;
  try {
    const barber = await Barber.findOne({ email });
    if (!barber) return res.status(400).json({ msg: 'Barbeiro não encontrado' });

    if (barber.password !== password) return res.status(400).json({ msg: 'Credenciais inválidas' });

    req.session.barber = barber;
    res.status(200).json({ msg: 'Login realizado com sucesso', barber });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Logout de Barbeiro
exports.logoutBarber = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ msg: 'Erro ao deslogar' });
    }
    res.status(200).json({ msg: 'Logout realizado com sucesso' });
  });
};

// Atualizar Bio e Serviços do Barbeiro
exports.updateBarber = async (req, res) => {
  const { id } = req.params;
  const { bio, services } = req.body;
  try {
    if (req.session.barber._id !== id) {
      return res.status(403).json({ msg: 'Acesso negado' });
    }

    const updatedBarber = await Barber.findByIdAndUpdate(id, { bio, services }, { new: true });
    res.status(200).json({ msg: 'Barbeiro atualizado com sucesso', barber: updatedBarber });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateTotalBarber = async (req, res) => {
  const { id } = req.params;
  const { number, email, password, name, bio, services, workingHours, type, queueLength } = req.body;

  try {
    // if (req.session.barber._id !== id) {
    //   return res.status(403).json({ msg: 'Acesso negado' });
    // }

    const updatedData = {};
    if (number) updatedData.number = number;
    if (email) updatedData.email = email;
    if (password) updatedData.password = password;
    if (name) updatedData.name = name;
    if (services) updatedData.services = services;
    if (type) updatedData.type = type;
    if (bio) updatedData.bio = bio;
    if (queueLength) updatedData.queueLength = queueLength;
    if (workingHours) updatedData.workingHours = workingHours;

    const updatedBarber = await Barber.findByIdAndUpdate(id, updatedData, { new: true });
    res.status(200).json({ msg: 'Barbeiro atualizado com sucesso', barber: updatedBarber });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.incrementQueueLength = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedBarber = await Barber.findByIdAndUpdate(
      id,
      { $inc: { queueLength: 1 } }, // Incrementa o campo queueLength em 1
      { new: true }
    );

    res.status(200).json({ msg: 'Tamanho da fila incrementado com sucesso', barber: updatedBarber });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.decrementQueueLength = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedBarber = await Barber.findByIdAndUpdate(
      id,
      { $inc: { queueLength: -1 } }, // Decrementa o campo queueLength em 1
      { new: true }
    );

    res.status(200).json({ msg: 'Tamanho da fila decrementado com sucesso', barber: updatedBarber });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getQueueLengthById = async (req, res) => {
  const { id } = req.params;

  try {
    const barber = await Barber.findById(id);
    if (!barber) {
      return res.status(404).json({ msg: 'Barbeiro não encontrado' });
    }

    const queueLength = barber.queueLength || 0; // Garante que se barber.queueLength for undefined, o valor será 0

    res.status(200).json({ queueLength });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBarberId = async(req,res) => {
  try {
  
    const barberId = req.session.barber._id;
    res.status(200).json({ barberId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

exports.getBarberById = async (req, res) => {
  const { id } = req.params;

  try {
    const barber = await Barber.findById(id);
    if (!barber) {
      return res.status(404).json({ msg: 'Barbeiro não encontrado' });
    }

    res.status(200).json({ barber });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Listar Barbeiros
exports.getBarbers = async (req, res) => {
  try {
    const barbers = await Barber.find();
    res.status(200).json(barbers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Definir horários de trabalho
exports.setWorkingHours = async (req, res) => {
  const { id } = req.params;
  const { workingHours } = req.body;
  try {
    if (req.session.barber._id !== id) {
      return res.status(403).json({ msg: 'Acesso negado' });
    }

    const updatedBarber = await Barber.findByIdAndUpdate(id, { workingHours }, { new: true });
    res.status(200).json({ msg: 'Horários de trabalho definidos com sucesso', barber: updatedBarber });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Bloquear Horário
exports.blockTime = async (req, res) => {
  const { start, end, reason } = req.body;
  try {
    const barber = await Barber.findById(req.session.barber._id);
    if (!barber) return res.status(400).json({ msg: 'Barbeiro não encontrado' });

    // Verificar se o horário já está bloqueado
    const overlappingBlockedTime = barber.blockedTimes.some(time => {
      return (
        (start >= time.start && start < time.end) ||
        (end > time.start && end <= time.end) ||
        (start <= time.start && end >= time.end)
      );
    });

    if (overlappingBlockedTime) {
      return res.status(400).json({ msg: 'Horário já está bloqueado' });
    }

    barber.blockedTimes.push({ start, end, reason });
    await barber.save();

    res.status(201).json({ msg: 'Horário bloqueado com sucesso', blockedTimes: barber.blockedTimes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Desbloquear Horário
exports.unblockTime = async (req, res) => {
  const { timeId } = req.params;
  try {
    const barber = await Barber.findById(req.session.barber._id);
    if (!barber) return res.status(400).json({ msg: 'Barbeiro não encontrado' });

    const timeToRemove = barber.blockedTimes.id(timeId);
    if (!timeToRemove) {
      return res.status(404).json({ msg: 'Horário não encontrado' });
    }

    timeToRemove.remove();
    await barber.save();

    res.status(200).json({ msg: 'Horário desbloqueado com sucesso', blockedTimes: barber.blockedTimes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Listar Horários Bloqueados do Barbeiro
exports.getBlockedTimes = async (req, res) => {
  try {
    const barber = await Barber.findById(req.session.barber._id);
    if (!barber) return res.status(400).json({ msg: 'Barbeiro não encontrado' });

    res.status(200).json(barber.blockedTimes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
