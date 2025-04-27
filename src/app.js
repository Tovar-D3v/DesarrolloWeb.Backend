const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

const userRoutes = require('./routes/user.routes');
const authRoutes = require('./routes/auth.routes');
const projectRoutes = require('./routes/project.routes');

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/project', projectRoutes);

module.exports = app;