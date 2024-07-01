# Documentação da API - Sistema de Gerenciamento de Barbearia

# Server Setup for User Authentication and API

This server setup utilizes Express.js with MongoDB for user authentication and API handling.

## Middleware

The server uses several middleware components:

- **cors**: Enables Cross-Origin Resource Sharing.
- **body-parser**: Parses incoming JSON requests.
- **express-session**: Manages user sessions with session storage in MongoDB using `connect-mongo`.

```javascript
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
require('dotenv').config();

const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json());
app.use(session({
  secret: 'sua_chave_secreta',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI })
}));

// Import Routes
const userRoutes = require('./routes/UserRoutes');
const appointmentRoutes = require('./routes/AppointmentRoutes');
const barberRoutes = require('./routes/BarberRoutes');

// Routes
app.use('/api/users', userRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/barbers', barberRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

## POST /appointments/

**Method**: POST

**Description**: Cria um novo agendamento para um serviço de barbearia.

**Request Body**:
- barberId (string): ID do barbeiro associado ao agendamento.
- userId (string): ID do usuário que está agendando o serviço.
- date (string): Data e hora do agendamento no formato 'YYYY-MM-DDTHH:mm:ss'.
- services (string): Descrição do serviço a ser agendado.

**Success Response**:
- Status: 201 Created
- Content: JSON contendo mensagem de sucesso e o objeto do agendamento criado.

**Error Responses**:
- Status: 400 Bad Request
  - Content: JSON com mensagem de erro caso o barbeiro não exista ou não ofereça o serviço solicitado.

- Status: 500 Internal Server Error
  - Content: JSON com mensagem de erro caso ocorra algum problema interno no servidor.

---

## GET /appointments/

**Method**: GET

**Description**: Retorna todos os agendamentos de serviços de barbearia.

**Success Response**:
- Status: 200 OK
- Content: JSON array contendo todos os agendamentos existentes.

**Error Response**:
- Status: 500 Internal Server Error
  - Content: JSON com mensagem de erro caso ocorra algum problema interno no servidor.

---

## GET /appointments/:id

**Method**: GET

**Description**: Retorna todos os agendamentos feitos por um usuário específico.

**URL Parameters**:
- id (string): ID do usuário.

**Success Response**:
- Status: 200 OK
- Content: JSON array contendo os agendamentos associados ao usuário especificado.

**Error Response**:
- Status: 500 Internal Server Error
  - Content: JSON com mensagem de erro caso ocorra algum problema interno no servidor.

---

## GET /appointments/barber/:id

**Method**: GET

**Description**: Retorna todos os agendamentos feitos com um barbeiro específico.

**URL Parameters**:
- id (string): ID do barbeiro.

**Success Response**:
- Status: 200 OK
- Content: JSON array contendo os agendamentos associados ao barbeiro especificado.

**Error Response**:
- Status: 500 Internal Server Error
  - Content: JSON com mensagem de erro caso ocorra algum problema interno no servidor.

---

## PUT /appointments/:id

**Method**: PUT

**Description**: Atualiza um agendamento existente.

**URL Parameters**:
- id (string): ID do agendamento a ser atualizado.

**Request Body**:
- date (string): Nova data e hora do agendamento no formato 'YYYY-MM-DDTHH:mm:ss'.
- services (string): Nova descrição do serviço a ser agendado.

**Success Response**:
- Status: 200 OK
- Content: JSON contendo mensagem de sucesso e o objeto do agendamento atualizado.

**Error Responses**:
- Status: 400 Bad Request
  - Content: JSON com mensagem de erro caso o barbeiro não ofereça o serviço solicitado.

- Status: 404 Not Found
  - Content: JSON com mensagem de erro caso o agendamento não seja encontrado.

- Status: 500 Internal Server Error
  - Content: JSON com mensagem de erro caso ocorra algum problema interno no servidor.

---

## DELETE /appointments/:id

**Method**: DELETE

**Description**: Exclui um agendamento existente.

**URL Parameters**:
- id (string): ID do agendamento a ser excluído.

**Success Response**:
- Status: 200 OK
- Content: JSON contendo mensagem de sucesso.

**Error Responses**:
- Status: 404 Not Found
  - Content: JSON com mensagem de erro caso o agendamento não seja encontrado.

- Status: 500 Internal Server Error
  - Content: JSON com mensagem de erro caso ocorra algum problema interno no servidor.

---

Esta documentação descreve as principais operações CRUD (Create, Read, Update, Delete) para gerenciamento de agendamentos de serviços de barbearia através da API.

# Documentação da API - Gerenciamento de Barbeiros

## POST /barbers/register

**Method**: POST

**Description**: Registra um novo barbeiro.

**Request Body**:
- number (number): Número do barbeiro.
- email (string): Email do barbeiro (único).
- password (string): Senha do barbeiro.
- name (string): Nome do barbeiro.
- bio (string): Biografia do barbeiro.
- services (array): Lista de serviços oferecidos pelo barbeiro.
- workingHours (object): Horários de trabalho do barbeiro.

**Success Response**:
- Status: 201 Created
- Content: JSON contendo mensagem de sucesso e o objeto do barbeiro registrado.

**Error Responses**:
- Status: 400 Bad Request
  - Content: JSON com mensagem de erro caso o email já esteja registrado por outro barbeiro.

- Status: 500 Internal Server Error
  - Content: JSON com mensagem de erro caso ocorra algum problema interno no servidor.

---

## POST /barbers/login

**Method**: POST

**Description**: Realiza o login de um barbeiro.

**Request Body**:
- email (string): Email do barbeiro.
- password (string): Senha do barbeiro.

**Success Response**:
- Status: 200 OK
- Content: JSON contendo mensagem de sucesso e o objeto do barbeiro logado.

**Error Responses**:
- Status: 400 Bad Request
  - Content: JSON com mensagem de erro caso o barbeiro não seja encontrado ou as credenciais sejam inválidas.

- Status: 500 Internal Server Error
  - Content: JSON com mensagem de erro caso ocorra algum problema interno no servidor.

---

## POST /barbers/logout

**Method**: POST

**Description**: Realiza o logout do barbeiro atualmente logado.

**Success Response**:
- Status: 200 OK
- Content: JSON contendo mensagem de sucesso de logout.

**Error Response**:
- Status: 500 Internal Server Error
  - Content: JSON com mensagem de erro caso ocorra algum problema interno no servidor.

---

## GET /barbers/getBarbers

**Method**: GET

**Description**: Retorna todos os barbeiros cadastrados.

**Success Response**:
- Status: 200 OK
- Content: JSON array contendo todos os barbeiros cadastrados.

**Error Response**:
- Status: 500 Internal Server Error
  - Content: JSON com mensagem de erro caso ocorra algum problema interno no servidor.

---

## GET /barbers/getBarberId

**Method**: GET

**Description**: Retorna o ID do barbeiro atualmente logado.

**Success Response**:
- Status: 200 OK
- Content: JSON contendo o ID do barbeiro.

**Error Response**:
- Status: 500 Internal Server Error
  - Content: JSON com mensagem de erro caso ocorra algum problema interno no servidor.

---

## GET /barbers/getBarberById/:id

**Method**: GET

**Description**: Retorna informações detalhadas de um barbeiro específico.

**URL Parameters**:
- id (string): ID do barbeiro.

**Success Response**:
- Status: 200 OK
- Content: JSON contendo as informações do barbeiro especificado.

**Error Response**:
- Status: 404 Not Found
  - Content: JSON com mensagem de erro caso o barbeiro não seja encontrado.

- Status: 500 Internal Server Error
  - Content: JSON com mensagem de erro caso ocorra algum problema interno no servidor.

---

## PUT /barbers/:id

**Method**: PUT

**Description**: Atualiza informações do barbeiro logado.

**URL Parameters**:
- id (string): ID do barbeiro a ser atualizado.

**Request Body**:
- bio (string): Nova biografia do barbeiro.
- services (array): Novos serviços oferecidos pelo barbeiro.

**Success Response**:
- Status: 200 OK
- Content: JSON contendo mensagem de sucesso e o objeto do barbeiro atualizado.

**Error Responses**:
- Status: 403 Forbidden
  - Content: JSON com mensagem de erro caso o barbeiro logado não tenha permissão para atualizar o perfil.

- Status: 500 Internal Server Error
  - Content: JSON com mensagem de erro caso ocorra algum problema interno no servidor.

---

## PUT /barbers/uptotal/:id

**Method**: PUT

**Description**: Atualiza informações completas de um barbeiro específico.

**URL Parameters**:
- id (string): ID do barbeiro a ser atualizado.

**Request Body**:
- number (number): Número do barbeiro.
- email (string): Email do barbeiro.
- password (string): Senha do barbeiro.
- name (string): Nome do barbeiro.
- bio (string): Biografia do barbeiro.
- services (array): Lista de serviços oferecidos pelo barbeiro.
- workingHours (object): Horários de trabalho do barbeiro.
- type (string): Tipo do barbeiro.
- queueLength (number): Tamanho da fila do barbeiro.

**Success Response**:
- Status: 200 OK
- Content: JSON contendo mensagem de sucesso e o objeto do barbeiro atualizado.

**Error Responses**:
- Status: 500 Internal Server Error
  - Content: JSON com mensagem de erro caso ocorra algum problema interno no servidor.

---

## PUT /barbers/queue-remove/:id

**Method**: PUT

**Description**: Remove um cliente da fila de um barbeiro.

**URL Parameters**:
- id (string): ID do barbeiro.

**Success Response**:
- Status: 200 OK
- Content: JSON contendo mensagem de sucesso e o objeto do barbeiro atualizado com o tamanho da fila decrementado.

**Error Responses**:
- Status: 500 Internal Server Error
  - Content: JSON com mensagem de erro caso ocorra algum problema interno no servidor.

---

## PUT /barbers/queue-add/:id

**Method**: PUT

**Description**: Adiciona um cliente à fila de um barbeiro.

**URL Parameters**:
- id (string): ID do barbeiro.

**Success Response**:
- Status: 200 OK
- Content: JSON contendo mensagem de sucesso e o objeto do barbeiro atualizado com o tamanho da fila incrementado.

**Error Responses**:
- Status: 500 Internal Server Error
  - Content: JSON com mensagem de erro caso ocorra algum problema interno no servidor.

---

## GET /barbers/queue-length/:id

**Method**: GET

**Description**: Retorna o tamanho da fila de um barbeiro específico.

**URL Parameters**:
- id (string): ID do barbeiro.

**Success Response**:
- Status: 200 OK
- Content: JSON contendo o tamanho da fila do barbeiro especificado.

**Error Responses**:
- Status: 500 Internal Server Error
  - Content: JSON com mensagem de erro caso ocorra algum problema interno no servidor.

---

## PUT /barbers/barber/:id

**Method**: PUT

**Description**: Atualiza o barbeiro.

**URL Parameters**:
- id (string): ID do barbeiro.

**Success Response**:
- Status: 200 OK
- Content: JSON contendo o barbeiro especificado.

**Error Responses**:
- Status: 500 Internal Server Error
  - Content: JSON com mensagem de erro caso ocorra algum problema interno no servidor.

---

## POST /barbers/block-time

**Method**: POST

**Description**: Bloqueia um horário específico para um barbeiro.

**Request Body**:
- start (date): Data e hora de início do bloqueio.
- end (date): Data e hora de término do bloqueio.
- reason (string): Motivo do bloqueio.

**Success Response**:
- Status: 201 Created
- Content: JSON contendo mensagem de sucesso e a lista atualizada de horários bloqueados do barbeiro.

**Error Responses**:
- Status: 400 Bad Request
  - Content: JSON com mensagem de erro caso o horário já esteja bloqueado.

- Status: 500 Internal Server Error
  - Content: JSON com mensagem de erro caso ocorra algum problema interno no servidor.

---

## DELETE /barbers/block-time/:timeId

**Method**: DELETE

**Description**: Desbloqueia um horário bloqueado de um barbeiro.

**URL Parameters**:
- timeId (string): ID do horário bloqueado a ser removido.

**Success Response**:
- Status: 200 OK
- Content: JSON contendo mensagem de sucesso e a lista atualizada de horários bloqueados do barbeiro.

**Error Responses**:
- Status: 404 Not Found
  - Content: JSON com mensagem de erro caso o horário bloqueado não seja encontrado.

- Status: 500 Internal Server Error
  - Content: JSON com mensagem de erro caso ocorra algum problema interno no servidor.

---

## GET /barbers/blocked-times

**Method**: GET

**Description**: Retorna todos os horários bloqueados de um barbeiro.

**Success Response**:
- Status: 200 OK
- Content: JSON contendo a lista de todos os horários bloqueados do barbeiro.

**Error Responses**:
- Status: 500 Internal Server Error
  - Content: JSON com mensagem de erro caso ocorra algum problema interno no servidor.

---

## PUT /barbers/:id/working-hours

**Method**: PUT

**Description**: Define os horários de trabalho de um barbeiro.

**URL Parameters**:
- id (string): ID do barbeiro.

**Request Body**:
- workingHours (object): Novos horários de trabalho do barbeiro.

**Success Response**:
- Status: 200 OK
- Content: JSON contendo mensagem de sucesso e o objeto do barbeiro atualizado com os novos horários de trabalho.

**Error Responses**:
- Status: 403 Forbidden
  - Content: JSON com mensagem de erro caso o barbeiro logado não tenha permissão para definir os horários de trabalho.

- Status: 500 Internal Server Error
  - Content: JSON com mensagem de erro caso ocorra algum problema interno no servidor.

# User Authentication and Management API

This API manages user registration, login, logout, user information retrieval, and updating user information.

## Endpoints

### Register User

Registers a new user with the provided details.

- **URL:** `/api/user/register`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "number": "Number",
    "email": "Email",
    "password": "Password",
    "name": "Name"
  }
