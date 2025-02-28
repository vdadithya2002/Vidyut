const mongoose = require('mongoose');
const express = require('express');
const app = express();

// ...existing code...

const dbURI = 'mongodb+srv://<username>:<password>@vidyutcluster.ea428.mongodb.net/<dbname>?retryWrites=true&w=majority';

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  ssl: true,
  sslValidate: true,
  sslCA: require('fs').readFileSync('<path_to_CA_certificate>') // Optional: Path to CA certificate if needed
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// ...existing code...

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
