# CMU GIST North IoT Air Quality Dashboard

A DIY IoT Air Quality Monitoring Dashboard for real-time PM2.5 and PM10 data visualization.

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v14+) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Docker** (optional) - [Download](https://docs.docker.com/get-docker/)

### Automated Setup (Recommended)

```bash
# Clone the repository
git clone https://github.com/dookda/cmu_gistnorth_iot.git
cd cmu_gistnorth_iot

# Run the setup script
./setup.sh
```

📖 **[Full Installation Guide](INSTALL.md)**

### Option 1: Local Development

```bash
# Install dependencies
npm install

# Start the server
npm start

# For development with hot reload
npm run dev
```

Then open: **http://localhost:3000**

### Option 2: Docker (Recommended for Production)

```bash
# Start production
docker compose up -d

# Start development with hot reload
docker compose -f docker-compose.dev.yml up -d

# View logs
docker compose logs -f

# Stop containers
docker compose down
```

📖 **[Full Docker Documentation](DOCKER.md)**

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
docker compose up -d              # Start production
docker compose down               # Stop production
docker compose logs -f            # View logs
docker compose restart            # Restart services

# Development
docker compose -f docker-compose.dev.yml up -d      # Start dev with hot reload
docker compose -f docker-compose.dev.yml down       # Stop dev environment
docker compose -f docker-compose.dev.yml logs -f    # View dev logs

# Database
docker compose -f docker-compose.dev.yml exec postgres-dev psql -U iot_user -d iot_airquality_dev

# Maintenance
docker compose down -v            # Remove containers and volumes
docker compose ps                 # Show container status
docker inspect <container>        # Check health status
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
# Start with Docker Compose (no build needed)
docker compose up -d

# Or use production compose
docker compose -f docker-compose.prod.yml up -d
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

## � Documentation

- **[GETTING_STARTED.md](GETTING_STARTED.md)** - Complete setup and troubleshooting guide
- **[DOCKER.md](DOCKER.md)** - Docker commands and configuration reference
- **[DOCKER_SIMPLIFICATION.md](DOCKER_SIMPLIFICATION.md)** - Architecture and design decisions
- **[INSTALL.md](INSTALL.md)** - Detailed installation options

## �🔗 Links

- [GitHub Repository](https://github.com/dookda/cmu_gistnorth_iot)
- [MapLibre GL JS](https://maplibre.org/)
- [ECharts](https://echarts.apache.org/)
- [Bootstrap](https://getbootstrap.com/)