const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Parse JSON bodies
app.use(express.json());

// API Routes (placeholder endpoints for the IoT dashboard)
app.get('/api/devices', (req, res) => {
    // Mock device data - replace with actual database queries
    const devices = [
        {
            id: 'DUST-001',
            name: 'CMU North Gate',
            lat: 18.805,
            lon: 98.955,
            pm25: Math.round(20 + Math.random() * 30),
            pm10: Math.round(35 + Math.random() * 40),
            updated_at: new Date().toISOString()
        },
        {
            id: 'DUST-002',
            name: 'Nimman',
            lat: 18.796,
            lon: 98.967,
            pm25: Math.round(25 + Math.random() * 35),
            pm10: Math.round(40 + Math.random() * 45),
            updated_at: new Date().toISOString()
        },
        {
            id: 'DUST-003',
            name: 'Mae Rim',
            lat: 18.936,
            lon: 98.942,
            pm25: Math.round(15 + Math.random() * 25),
            pm10: Math.round(30 + Math.random() * 35),
            updated_at: new Date().toISOString()
        }
    ];

    res.json(devices);
});

app.get('/api/timeseries', (req, res) => {
    const { device_id, range } = req.query;

    // Parse time range
    let hours = 24;
    if (range && range.endsWith('h')) {
        hours = parseInt(range);
    } else if (range === '7d') {
        hours = 24 * 7;
    }

    // Generate mock time series data
    const now = Date.now();
    const step = 5 * 60 * 1000; // 5 minutes
    const data = [];

    for (let t = now - hours * 3600 * 1000; t <= now; t += step) {
        const base25 = 20 + 10 * Math.sin(t / 3.6e6) + Math.random() * 8;
        const base10 = base25 + 12 + Math.random() * 10;
        data.push({
            timestamp: new Date(t).toISOString(),
            pm25: parseFloat(base25.toFixed(1)),
            pm10: parseFloat(base10.toFixed(1))
        });
    }

    res.json(data);
});

// Device registration endpoint
app.post('/api/devices/register', (req, res) => {
    const {
        serialNumber,
        deviceName,
        ownerName,
        contactEmail,
        latitude,
        longitude,
        installationHeight,
        environment,
        notes
    } = req.body;

    // Validate required fields
    if (!serialNumber || !deviceName || !latitude || !longitude) {
        return res.status(400).json({
            error: 'Missing required fields: serialNumber, deviceName, latitude, longitude'
        });
    }

    // Simulate device registration (replace with actual database logic)
    const newDevice = {
        id: serialNumber,
        name: deviceName,
        owner: ownerName,
        email: contactEmail,
        lat: parseFloat(latitude),
        lon: parseFloat(longitude),
        installationHeight: installationHeight ? parseFloat(installationHeight) : null,
        environment,
        notes,
        pm25: 0, // Initial values
        pm10: 0,
        status: 'registered',
        registered_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    };

    console.log('📱 New device registered:', newDevice);

    res.status(201).json({
        message: 'Device registered successfully',
        device: newDevice
    });
});

// Serve the main HTML file for all other routes (SPA support)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📁 Serving static files from: ${path.join(__dirname, 'public')}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('👋 Received SIGTERM, shutting down gracefully...');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('👋 Received SIGINT, shutting down gracefully...');
    process.exit(0);
});
