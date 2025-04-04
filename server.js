const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));


mongoose.connect('mongodb://aryakamboj23cse:ghostkube0022022006@cluster0-shard-00-00.vqxzd.mongodb.net:27017,cluster0-shard-00-01.vqxzd.mongodb.net:27017,cluster0-shard-00-02.vqxzd.mongodb.net:27017/Cluster0?ssl=true&replicaSet=atlas-u76nx1-shard-0&authSource=admin', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
}).then(() => {
  console.log('MongoDB connected successfully');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});



// MongoDB connection
//mongoose.connect('mongodb+srv://aryakamboj23cse:ghostkube0022022006@cluster0.vqxzd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'Connection error:'));
// db.once('open', () => {
//   console.log('Connected to MongoDB');
// });

// Appointment schema and model
const appointmentSchema = new mongoose.Schema({
  name: String,
  phone: String,
  date: String,
  service: String,
}); 

const Appointment = mongoose.model('Appointment', appointmentSchema);

// API route to handle form submissions
app.post('/api/appointments', (req, res) => {
  const { name, phone, date, service } = req.body;

  const newAppointment = new Appointment({ name, phone, date, service });

  newAppointment
    .save()
    .then(() => res.status(201).send('Appointment saved successfully'))
    .catch((err) => res.status(400).send(`Error saving appointment: ${err}`));
});

// Serve lucide3.html as the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'lucid3.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});


