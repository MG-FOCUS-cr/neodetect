const mongoose = require("mongoose");
require("dotenv").config();
const dns = require("dns").promises;

const connectDB = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI is not defined in environment variables");
        }

        console.log("🔄 Attempting MongoDB connection...");

        let connectionString = process.env.MONGODB_URI;

        // If using mongodb+srv://, try to resolve it manually first
        if (connectionString.startsWith("mongodb+srv://")) {
            try {
                console.log("🔍 Resolving SRV records...");

                // Extract cluster hostname from connection string
                const match = connectionString.match(/mongodb\+srv:\/\/[^@]+@([^/]+)/);
                if (match) {
                    const hostname = match[1];
                    console.log(`📍 Cluster: ${hostname}`);

                    // Try to resolve SRV record with timeout
                    const srvLookup = dns.resolveSrv(`_mongodb._tcp.${hostname}`);
                    const timeout = new Promise((_, reject) =>
                        setTimeout(() => reject(new Error("DNS SRV lookup timeout")), 2000)
                    );

                    await Promise.race([srvLookup, timeout]);
                    console.log("✅ SRV records resolved successfully");
                }
            } catch (dnsError) {
                console.warn(`⚠️ DNS SRV lookup failed: ${dnsError.message}`);
                console.log("💡 Tip: Check your MongoDB Atlas cluster URL and network connection");
                throw new Error(`DNS resolution failed for MongoDB cluster. Please verify:\n1. Your cluster exists in MongoDB Atlas\n2. The connection string is correct\n3. Your network allows MongoDB Atlas connections`);
            }
        }

        console.log("🔌 Connecting to MongoDB...");
        const conn = await mongoose.connect(connectionString, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });

        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

        mongoose.connection.on("connected", () => console.log("🔥 Database Connected Successfully!"));
        mongoose.connection.on("error", (err) => console.log("💀 Database Error:", err.message));
        mongoose.connection.on("disconnected", () => console.log("⚠️ Database Disconnected"));

        return true;
    } catch (error) {
        console.error(`❌ MongoDB Connection Error: ${error.message}`);
        console.warn("⚠️ Server will continue in Offline Mode (database features disabled)");
        return false;
    }
};

module.exports = connectDB;
