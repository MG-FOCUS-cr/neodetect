const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const startServer = async () => {
    console.log("🌟 Starting AlgerLex Backend Server...");
    try {
        await connectDB();
    } catch (error) {
        console.error("DB Connection failed, starting in offline mode...");
    }

    try {
        const app = express();
        const PORT = process.env.PORT || 5000;

        // Middleware
        app.use(cors());
        app.use(express.json());
        app.use(express.urlencoded({ extended: false }));

        // Routes
        app.use('/api/words', require('./routes/wordRoutes'));
        app.use('/api/analyze', require('./routes/analyzeRoutes'));
        app.use('/api/dictionary', require('./routes/dictionaryRoutes'));

        app.get('/', (req, res) => {
            res.send('API AlgerLex (v2) est en ligne...');
        });

        // Start Server
        app.listen(PORT, () => {
            console.log(`🚀 Serveur démarré sur le port ${PORT}`);
        });

    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};

startServer();
