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

// Personal air quality data endpoint (40 data points mockup)
app.get('/api/personal', (req, res) => {
    // Generate 40 data points with realistic air quality values
    const now = Date.now();
    const interval = 5 * 60 * 1000; // 5 minutes between readings
    const data = [];

    for (let i = 0; i < 40; i++) {
        const timestamp = now - (39 - i) * interval;

        // Generate realistic PM values with some variation
        // PM1.0 is typically lower than PM2.5
        // PM2.5 is typically lower than PM10
        const baseValue = 15 + 20 * Math.sin(i / 5) + Math.random() * 10;
        const pm1 = Math.max(5, baseValue - 5 + Math.random() * 5);
        const pm25 = Math.max(8, baseValue + Math.random() * 8);
        const pm10 = Math.max(15, pm25 + 8 + Math.random() * 12);

        data.push({
            ts: new Date(timestamp).toISOString(),
            pm1: parseFloat(pm1.toFixed(1)),
            pm25: parseFloat(pm25.toFixed(1)),
            pm10: parseFloat(pm10.toFixed(1))
        });
    }

    res.json(data);
});

// Community air quality data endpoint (40 data points mockup)
app.get('/api/community', (req, res) => {
    // Generate 40 data points with comprehensive air quality and environmental data
    const now = Date.now();
    const interval = 5 * 60 * 1000; // 5 minutes between readings
    const data = [];

    for (let i = 0; i < 40; i++) {
        const timestamp = now - (39 - i) * interval;

        // Time-based variations for realistic patterns
        const hourOfDay = new Date(timestamp).getHours();
        const timeEffect = Math.sin((hourOfDay - 6) / 3.8); // Peak afternoon, low morning

        // Generate realistic PM values with hierarchical relationship
        const baseValue = 18 + 15 * timeEffect + Math.random() * 12;
        const pm1 = Math.max(3, baseValue - 8 + Math.random() * 6);
        const pm25 = Math.max(5, baseValue + Math.random() * 10);
        const pm4 = Math.max(8, pm25 + 3 + Math.random() * 8);
        const pm10 = Math.max(12, pm4 + 5 + Math.random() * 15);

        // VOC (Volatile Organic Compounds) - typically 0-500 ppb
        // Higher during day, lower at night
        const voc = Math.max(50, 150 + 100 * timeEffect + Math.random() * 80);

        // NOx (Nitrogen Oxides) - typically 0-200 ppb
        // Higher during traffic hours (morning/evening)
        const trafficEffect = Math.abs(Math.sin((hourOfDay - 8) / 6));
        const nox = Math.max(10, 40 + 60 * trafficEffect + Math.random() * 30);

        // Temperature - realistic daily variation (20-35°C)
        // Peak around 2-3 PM, lowest around 5-6 AM
        const temp = 25 + 6 * Math.sin((hourOfDay - 6) / 3.8) + Math.random() * 2;

        // Humidity - inverse relationship with temperature (40-85%)
        // Higher at night, lower during day
        const hum = 75 - 20 * Math.sin((hourOfDay - 6) / 3.8) + Math.random() * 5;

        data.push({
            ts: new Date(timestamp).toISOString(),
            pm1: parseFloat(pm1.toFixed(1)),
            pm25: parseFloat(pm25.toFixed(1)),
            pm4: parseFloat(pm4.toFixed(1)),
            pm10: parseFloat(pm10.toFixed(1)),
            voc: parseFloat(voc.toFixed(1)),
            nox: parseFloat(nox.toFixed(1)),
            temp: parseFloat(temp.toFixed(1)),
            hum: parseFloat(hum.toFixed(1))
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

// Health check endpoint for Docker
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'healthy',
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
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
