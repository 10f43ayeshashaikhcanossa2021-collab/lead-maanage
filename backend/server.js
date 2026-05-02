const express = require('express');
const cors = require('cors');
require('dotenv').config();

const leadsRoutes = require('./routes/leads');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/leads', leadsRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Lead CRM API is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});