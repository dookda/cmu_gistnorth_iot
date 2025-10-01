# Getting Started with CMU GIST North IoT Dashboard

Complete guide to get your IoT Air Quality Dashboard up and running.

---

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Installation Methods](#installation-methods)
- [Running the Application](#running-the-application)
- [Docker Setup](#docker-setup)
- [Configuration](#configuration)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before you begin, ensure you have:

### Required
- **Node.js** v14 or higher - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)

### Optional (for Docker)
- **Docker Desktop** - [Download](https://docs.docker.com/get-docker/)

### Verify Installation
```bash
node --version    # Should show v14.x or higher
npm --version     # Should show version number
docker --version  # Optional - for Docker setup
```

---

## Quick Start

### Fastest Way (Automated Setup)

```bash
# Clone the repository
git clone https://github.com/dookda/cmu_gistnorth_iot.git
cd cmu_gistnorth_iot

# Run setup script
./setup.sh
```

The script will:
- ✅ Check Node.js and npm
- ✅ Install dependencies
- ✅ Show you how to start

---

## Installation Methods

### Method 1: Local Development (Recommended for Development)

```bash
# Install dependencies
npm install

# Start the server
npm start

# Or with hot reload
npm run dev
```

**Access**: http://localhost:3000

**Best for:**
- Active development
- Making code changes
- Testing locally

---

### Method 2: Docker Compose (Recommended for Production)

```bash
# Start production mode
docker compose up -d

# Or development mode with hot reload
docker compose -f docker-compose.dev.yml up -d
```

**Access**: http://localhost:3000

**Best for:**
- Production deployment
- Consistent environment
- Team collaboration
- CI/CD pipelines

**Features:**
- No build step required
- Uses official Node.js image
- Auto-installs dependencies
- Hot reload in dev mode

---

## Running the Application

### Local Development

```bash
# Start with hot reload (recommended)
npm run dev

# Or standard start
npm start
```

**What happens:**
- Server starts on port 3000
- Nodemon watches for file changes
- Auto-restarts on code changes

### Docker Production

```bash
# Start
docker compose up -d

# View logs
docker compose logs -f

# Stop
docker compose down
```

### Docker Development

```bash
# Start with database and hot reload
docker compose -f docker-compose.dev.yml up -d

# Services available:
# - App: http://localhost:3000
# - Adminer (DB Admin): http://localhost:8080
# - PostgreSQL: localhost:5433
# - Redis: localhost:6380

# Stop
docker compose -f docker-compose.dev.yml down
```

---

## Docker Setup

### Quick Reference

```bash
# Production
docker compose up -d              # Start
docker compose logs -f            # View logs
docker compose ps                 # Status
docker compose down               # Stop

# Development
docker compose -f docker-compose.dev.yml up -d      # Start
docker compose -f docker-compose.dev.yml logs -f    # Logs
docker compose -f docker-compose.dev.yml down       # Stop

# Maintenance
docker compose pull               # Update images
docker compose down -v            # Clean everything
```

### Available Compose Files

1. **docker-compose.yml** - Production mode
   - Nodemon with auto-reload
   - Health checks
   - Basic setup

2. **docker-compose.dev.yml** - Development mode
   - Hot reload
   - PostgreSQL database
   - Redis cache
   - Adminer (DB UI)

3. **docker-compose.prod.yml** - Production enhanced
   - Resource limits
   - Read-only volumes
   - Logging configuration
   - Security hardened

### First Run Notes

**First startup takes 10-30 seconds** as dependencies install automatically.

Subsequent startups take only 2-5 seconds (dependencies cached).

---

## Configuration

### Environment Variables

1. Copy the example file:
```bash
cp .env.example .env
```

2. Edit `.env` with your settings:
```env
NODE_ENV=production
PORT=3000
TZ=Asia/Bangkok

# Optional: Database (when enabled)
POSTGRES_USER=iot_user
POSTGRES_PASSWORD=your_password
POSTGRES_DB=iot_airquality

# Optional: Firebase (for authentication)
FIREBASE_API_KEY=your_key
# ... other Firebase config
```

### Port Configuration

Default port is 3000. To change:

**Local:**
```bash
PORT=8080 npm start
```

**Docker:**
Edit `docker-compose.yml`:
```yaml
ports:
  - "8080:3000"  # Host:Container
```

---

## Troubleshooting

### Port Already in Use

```bash
# Check what's using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>

# Or use different port
PORT=8080 npm start
```

### npm: command not found

**Solution**: Install Node.js from https://nodejs.org/

**macOS:**
```bash
brew install node
```

### Docker: command not found

**Solution**: Install Docker Desktop from https://docs.docker.com/get-docker/

### Dependencies Not Installing

**Local:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Docker:**
```bash
docker compose down -v
docker compose up -d
```

### Container Keeps Restarting

```bash
# Check logs
docker compose logs app

# Common causes:
# - Port conflict
# - Missing package.json
# - npm install failed
```

### Can't Connect to http://localhost:3000

**Checklist:**
1. Is the server running?
   ```bash
   # Local
   ps aux | grep node
   
   # Docker
   docker compose ps
   ```

2. Check the logs:
   ```bash
   # Local
   npm start
   
   # Docker
   docker compose logs -f
   ```

3. Try the health endpoint:
   ```bash
   curl http://localhost:3000/health
   ```

### Module Not Found Error

```bash
# Reinstall dependencies
npm install

# Or in Docker
docker compose restart app
```

---

## Testing Your Setup

### 1. Check Health
```bash
curl http://localhost:3000/health
```

**Expected response:**
```json
{
  "status": "healthy",
  "uptime": 5.123,
  "timestamp": "2025-10-01T...",
  "environment": "development"
}
```

### 2. Check API
```bash
curl http://localhost:3000/api/devices
```

**Expected**: JSON array of device data

### 3. Check Web Interface

Open browser: http://localhost:3000

**Expected**: IoT Dashboard with map and charts

---

## Next Steps

### 1. Explore the Dashboard
- View the interactive map
- Check device data
- Try different time ranges
- Toggle dark/light theme

### 2. Configure Firebase (Optional)
- Edit `public/index.html`
- Add your Firebase credentials
- Enable authentication

### 3. Enable Database (Optional)
- Uncomment postgres in `docker-compose.yml`
- Configure connection in `.env`
- Restart containers

### 4. Customize
- Modify `server.js` for API changes
- Update `public/` files for UI changes
- Add new features

### 5. Deploy
- Use `docker-compose.prod.yml` for production
- Set up environment variables
- Configure reverse proxy (nginx)
- Add SSL certificates

---

## Useful Commands

### Local Development
```bash
npm start           # Start server
npm run dev         # Start with hot reload
npm install         # Install dependencies
npm update          # Update dependencies
```

### Docker
```bash
docker compose up -d                    # Start
docker compose down                     # Stop
docker compose logs -f                  # Logs
docker compose ps                       # Status
docker compose restart                  # Restart
docker compose pull                     # Update images
docker compose down -v                  # Clean all
```

### Development Tools
```bash
# View all files
ls -la

# Check disk usage
du -sh node_modules/

# Watch logs
tail -f logs/*.log

# Find process using port
lsof -i :3000
```

---

## Additional Resources

- **README.md** - Project overview
- **DOCKER.md** - Complete Docker guide
- **INSTALL.md** - Detailed installation
- **DOCKER_SIMPLIFICATION.md** - Docker architecture
- **.env.example** - Environment variables template

---

## Getting Help

### Check Logs

**Local:**
```bash
# Server runs in terminal - check output
npm start
```

**Docker:**
```bash
# View all logs
docker compose logs -f

# View specific service
docker compose logs -f app
```

### Common Issues

1. **Port conflicts** - Change port or kill conflicting process
2. **Missing dependencies** - Run `npm install`
3. **Docker issues** - Restart Docker Desktop
4. **Permission errors** - Check file permissions

### Support

- **Issues**: https://github.com/dookda/cmu_gistnorth_iot/issues
- **Documentation**: Check other .md files in project
- **Logs**: Always check logs first

---

## Summary

### Local Setup
```bash
./setup.sh          # Auto setup
npm install         # Install deps
npm run dev         # Start
```

### Docker Setup
```bash
docker compose up -d                              # Production
docker compose -f docker-compose.dev.yml up -d    # Development
```

### Access
- **Application**: http://localhost:3000
- **Health Check**: http://localhost:3000/health
- **API**: http://localhost:3000/api/devices

---

**That's it!** You're ready to start developing with the CMU GIST North IoT Dashboard! 🎉

For more detailed information, check the other documentation files in the project.
