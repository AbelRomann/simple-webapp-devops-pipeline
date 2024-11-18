const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');


const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/simplewebapp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));


const app = express();
const PORT = 3000;

// Enable CORS for the frontend (React)
app.use(cors());
app.use(bodyParser.json());

// Endpoint para recibir datos del formulario de contacto
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  console.log('Received data:', { name, email, message });

  // Aquí podrías agregar lógica para guardar los datos en la base de datos

  res.status(200).send({ message: 'Form received!' });
});

// En producción, servir los archivos estáticos de React
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'frontend/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
