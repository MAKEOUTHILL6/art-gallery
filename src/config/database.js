const mongoose = require('mongoose');
const connectionString = 'mongodb://localhost:27023/artGallery';


exports.InitializeDatabase = () => mongoose.connect(connectionString);