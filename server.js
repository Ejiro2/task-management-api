const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize } = require('sequelize'); // Import Sequelize
const Task = require('./models/task');
const config = require('./config/config.json')['development'];


// Set up Sequelize to connect to MySQL
const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect
});

const app = express();
app.use(bodyParser.json());

// Sync database
sequelize.sync({ force: true }).then(() => {
    console.log('MySQL Database connected and tables created');
}).catch((err) => {
    console.error('Error connecting to the database:', err);
});

// Routes

// Create a new task
app.post('/tasks', async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).send(task);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Get all tasks
app.get('/tasks', async (req, res) => {
    const tasks = await Task.findAll();
    res.status(200).send(tasks);
});

// Update a task
app.put('/tasks/:id', async (req, res) => {
    const task = await Task.findByPk(req.params.id);
    if (task) {
        await task.update(req.body);
        res.status(200).send(task);
    } else {
        res.status(404).send({ error: 'Task not found' });
    }
});

// Delete a task
app.delete('/tasks/:id', async (req, res) => {
    const task = await Task.findByPk(req.params.id);
    if (task) {
        await task.destroy();
        res.status(204).send();
    } else {
        res.status(404).send({ error: 'Task not found' });
    }
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
