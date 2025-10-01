# Installation Guide

## 🚀 Quick Installation

### Prerequisites

Before installing, make sure you have:

1. **Node.js** (v14 or higher)
   - Check: `node --version`
   - Install: https://nodejs.org/

2. **npm** (comes with Node.js)
   - Check: `npm --version`

3. **Docker** (Optional - for containerized deployment)
   - Check: `docker --version`
   - Install: https://docs.docker.com/get-docker/

---

## Method 1: Automated Setup (Recommended)

```bash
# Clone the repository
git clone https://github.com/dookda/cmu_gistnorth_iot.git
cd cmu_gistnorth_iot

# Run the setup script
./setup.sh
```

The script will:
- ✅ Check for Node.js and npm
- ✅ Check for Docker (optional)
- ✅ Install all dependencies
- ✅ Show quick start instructions

---

## Method 2: Manual Installation

### Step 1: Install Dependencies

```bash
npm install
```



### Step 2: Start the Application

**Local Development:**
```bash
npm start
# or
npm run dev  # With nodemon hot reload
```

**Docker:**
```bash
docker compose up -d                              # Production mode
# or
docker compose -f docker-compose.dev.yml up -d    # Development mode with database
```

### Step 3: Open in Browser

Navigate to: **http://localhost:3000**

---

## Method 3: Using Docker Compose

If you prefer Docker for a consistent environment:

```bash
# Production (no build needed!)
docker compose up -d                    # Start production
docker compose logs -f                  # View logs
docker compose down                     # Stop containers

# Development (with database and hot reload)
docker compose -f docker-compose.dev.yml up -d      # Start dev environment
docker compose -f docker-compose.dev.yml logs -f    # View dev logs
docker compose -f docker-compose.dev.yml down       # Stop dev environment

# Update
docker compose pull                     # Pull latest Node.js image
```

Note: Uses official Node.js image - dependencies install automatically on first run!

---

## Installation on Different Systems

### macOS

```bash
# Install Homebrew (if not installed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js
brew install node

# Install Docker Desktop
brew install --cask docker

# Clone and setup
git clone https://github.com/dookda/cmu_gistnorth_iot.git
cd cmu_gistnorth_iot
./setup.sh
```

### Linux (Ubuntu/Debian)

```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Docker
sudo apt-get update
sudo apt-get install docker.io docker-compose

# Clone and setup
git clone https://github.com/dookda/cmu_gistnorth_iot.git
cd cmu_gistnorth_iot
./setup.sh
```

### Windows

```powershell
# Install Node.js
# Download from: https://nodejs.org/

# Install Docker Desktop
# Download from: https://www.docker.com/products/docker-desktop

# Clone and setup
git clone https://github.com/dookda/cmu_gistnorth_iot.git
cd cmu_gistnorth_iot
npm install
npm start
```

---

## Verify Installation

### Check Dependencies

```bash
# Node.js version
node --version

# npm version
npm --version

# Docker version (optional)
docker --version

# Installed packages
npm list --depth=0
```

### Test the Application

```bash
# Start the server
npm start

# In another terminal, test the API
curl http://localhost:3000/health
curl http://localhost:3000/api/devices
```

Expected response from `/health`:
```json
{
  "status": "healthy",
  "uptime": 5.123,
  "timestamp": "2025-10-01T...",
  "environment": "development"
}
```

---

## Troubleshooting

### npm: command not found

**Solution**: Install Node.js from https://nodejs.org/

### Permission errors during npm install

**Solution**: Don't use sudo with npm. Fix permissions:
```bash
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH
```

### Port 3000 already in use

**Solution**: Change the port
```bash
PORT=8080 npm start
```

Or kill the process using port 3000:
```bash
lsof -ti:3000 | xargs kill -9
```

### Docker not found

**Solution**: 
1. Install Docker Desktop
2. Start Docker Desktop application
3. Verify: `docker --version`

### Module not found errors

**Solution**: Reinstall dependencies
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## Development Setup

For active development:

```bash
# Install dependencies
npm install

# Start with hot reload
npm run dev

# In another terminal, watch logs
tail -f logs/*.log
```

---

## Production Deployment

For production deployment:

```bash
# Using Docker (recommended)
docker compose -f docker-compose.prod.yml up -d

# Or standard production
docker compose up -d

# Or manual
NODE_ENV=production npm start
```

---

## Environment Configuration

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Edit `.env` with your settings:
```env
NODE_ENV=production
PORT=3000
# Add your Firebase credentials, database settings, etc.
```

3. Restart the application

---

## Next Steps

After installation:

1. ✅ **Configure Firebase** (optional) - Edit credentials in `public/index.html`
2. ✅ **Enable Database** (optional) - Uncomment postgres in `docker-compose.yml`
3. ✅ **Customize** - Modify the dashboard to your needs
4. ✅ **Deploy** - Use Docker for production deployment

---

## Getting Help

- **Documentation**: Check `README.md`, `DOCKER.md`, `NODEMON_UPDATE.md`
- **Makefile**: Run `make help` to see all commands
- **Issues**: https://github.com/dookda/cmu_gistnorth_iot/issues

---

## Package List

After installation, you'll have:

### Production Dependencies
- `express` (^4.18.2) - Web framework

### Development Dependencies
- `nodemon` (^3.0.1) - Auto-restart on file changes

### CDN Libraries (loaded in browser)
- Bootstrap 5.3.2 - UI framework
- MapLibre GL JS 3.6.2 - Interactive maps
- ECharts 5 - Charts and graphs
- Firebase Auth 9.23.0 - Authentication

---

**Installation Complete!** 🎉

Start your server with:
```bash
npm start
```

Then open: http://localhost:3000
