# CMU GIST North IoT Air Quality Dashboard

A DIY IoT Air Quality Monitoring Dashboard for real-time PM2.5 and PM10 data visualization.

## 🚀 Quick Start

### Option 1: Docker (Recommended)

```bash
# Clone the repository
git clone https://github.com/dookda/cmu_gistnorth_iot.git
cd cmu_gistnorth_iot

# Start with Docker Compose
docker-compose up -d

# Access the application
open http://localhost:3000
```

**Using Makefile (easier):**
```bash
make up        # Start production
make dev       # Start development with hot reload
make logs      # View logs
make down      # Stop containers
make help      # Show all available commands
```

📖 **[Full Docker Documentation](DOCKER.md)**

### Option 2: Manual Setup

```bash
# Install dependencies
npm install

# Start the server
npm start

# For development with hot reload
npm run dev
```

## 📋 Features

- 🗺️ **Interactive Map** - Real-time device locations with MapLibre GL JS
- 📊 **Dynamic Charts** - PM2.5 and PM10 data visualization with ECharts
- 📱 **Responsive Design** - Optimized for mobile, tablet, and desktop
- 🌓 **Dark/Light Theme** - Toggle between themes
- 🔐 **Firebase Authentication** - Secure user login (optional)
- 🔔 **Real-time Updates** - Live data monitoring
- 🇹🇭 **Thai Language** - Full Thai localization with Noto Sans Thai font

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3 (Bootstrap 5), JavaScript
- **Mapping**: MapLibre GL JS
- **Charts**: ECharts 5
- **Backend**: Node.js, Express
- **Authentication**: Firebase Auth (optional)
- **Deployment**: Docker, Docker Compose

## 📦 Docker Services

- **app**: Node.js application server
- **postgres** (optional): PostgreSQL database
- **redis** (optional): Redis cache
- **nginx** (optional): Reverse proxy

## 🔧 Configuration

1. Copy environment template:
```bash
cp .env.example .env
```

2. Edit `.env` with your configuration:
```env
NODE_ENV=production
PORT=3000
# Add your Firebase credentials, etc.
```

3. For Firebase authentication, update the config in `public/index.html`

## 🐳 Docker Commands

```bash
# Production
make up              # Start production
make down            # Stop production
make logs            # View logs
make restart         # Restart services

# Development
make dev             # Start dev with hot reload
make dev-down        # Stop dev environment
make dev-logs        # View dev logs

# Database
make db-shell        # Open PostgreSQL shell
make db-backup       # Backup database

# Maintenance
make clean           # Remove containers and volumes
make status          # Show container status
make health          # Check health status
```

## 📁 Project Structure

```
cmu_gistnorth_iot/
├── public/              # Static files
│   ├── index.html       # Main dashboard
│   ├── register.html    # Device registration
│   └── about.html       # About page
├── server.js            # Express server
├── package.json         # Dependencies
├── Dockerfile           # Production Docker image
├── Dockerfile.dev       # Development Docker image
├── docker-compose.yml   # Production compose
├── docker-compose.dev.yml # Development compose
├── Makefile            # Docker shortcuts
└── DOCKER.md           # Docker documentation
```

## 🌐 API Endpoints

- `GET /api/devices` - Get all devices
- `GET /api/timeseries?device_id=XXX&range=24h` - Get time-series data

## 🚀 Deployment

### Docker Deployment

```bash
# Build and deploy
make deploy

# Or manually
docker-compose build
docker-compose up -d
```

### Traditional Deployment

```bash
npm install --production
npm start
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - see LICENSE file for details

## 👥 Authors

**CMU GIST North Team**

## 🔗 Links

- [GitHub Repository](https://github.com/dookda/cmu_gistnorth_iot)
- [Docker Documentation](DOCKER.md)
- [MapLibre GL JS](https://maplibre.org/)
- [ECharts](https://echarts.apache.org/)
- [Bootstrap](https://getbootstrap.com/)