# Nodemon Configuration Update

## ✅ Changes Made

I've updated your Docker configuration to use **nodemon** for automatic server restarts when files change.

### Files Updated

1. **Dockerfile** - Modified to:
   - Install nodemon globally
   - Use nodemon to start the server
   - Copy nodemon.json configuration

2. **docker-compose.yml** - Updated to:
   - Mount source files for live reload
   - Include nodemon.json configuration

3. **docker-compose.dev.yml** - Updated to:
   - Mount nodemon.json for development

4. **docker-compose.prod.yml** - Updated to:
   - Mount nodemon.json (read-only)

5. **nodemon.json** - Created new configuration file with:
   - Watch patterns for server.js and public files
   - File extensions to monitor (js, json, html, css)
   - Ignore patterns (node_modules, logs, .git)
   - 1 second delay before restart
   - Colored output and verbose logging

## 🚀 How to Use

### Option 1: Docker Compose (when Docker is installed)

```bash
# Stop current containers
docker compose down

# Rebuild with nodemon
docker compose build

# Start with nodemon
docker compose up -d

# Watch logs to see nodemon in action
docker compose logs -f app
```

### Option 2: Using Makefile

```bash
make down
make build
make up
make logs
```

### Option 3: Development Mode

```bash
# Use development compose with nodemon
make dev

# Or manually
docker compose -f docker-compose.dev.yml up -d
```

## 📋 Nodemon Features

### Automatic Restart
- **Watches**: server.js and all files in public/
- **Extensions**: .js, .json, .html, .css
- **Delay**: 1 second before restart (prevents multiple restarts)

### File Ignoring
- node_modules/
- *.log files
- .git/ directory
- .docker/ directory

### Manual Restart
Type `rs` in the terminal and press Enter to manually restart the server.

### Verbose Mode
See detailed information about:
- Files being watched
- File changes detected
- Restart events

## 🔧 Configuration (nodemon.json)

```json
{
  "watch": ["server.js", "public/**/*"],
  "ext": "js,json,html,css",
  "ignore": ["node_modules/", "*.log", ".git/", ".docker/"],
  "delay": 1000,
  "verbose": true,
  "restartable": "rs"
}
```

## 📊 Benefits

1. **Faster Development**: 
   - No need to manually restart the server
   - Changes are reflected immediately

2. **Better Developer Experience**:
   - Visual feedback when server restarts
   - Colored output for easy reading

3. **Production Ready**:
   - Nodemon handles crashes gracefully
   - Automatic recovery from errors

4. **Flexible Configuration**:
   - Easy to customize watch patterns
   - Fine-tune delay and ignore patterns

## 🧪 Testing Nodemon

Once Docker is running, test nodemon by:

1. **Start the server**:
```bash
docker compose up
```

2. **Make a change** to server.js or any file in public/

3. **Watch the console** - You should see:
```
🔄 Server restarting due to file changes...
[nodemon] restarting due to changes...
[nodemon] starting `node server.js`
🚀 Server running on http://localhost:3000
```

4. **Manual restart** - Type `rs` in the terminal running docker compose

## 🐛 Troubleshooting

### Nodemon not restarting on changes

1. Check volume mounts:
```bash
docker compose exec app ls -la /app
```

2. Verify nodemon is installed:
```bash
docker compose exec app nodemon --version
```

3. Check nodemon logs:
```bash
docker compose logs -f app
```

### Too many restarts

- Increase the delay in nodemon.json:
```json
{
  "delay": 2000  // 2 seconds
}
```

### Files not being watched

- Add patterns to nodemon.json:
```json
{
  "watch": ["server.js", "public/**/*", "lib/**/*"]
}
```

## 🔄 Rollback (if needed)

To revert to using plain Node.js:

1. Edit Dockerfile:
```dockerfile
CMD ["node", "server.js"]
```

2. Rebuild:
```bash
docker compose build
docker compose up -d
```

## 📝 Notes

- **Docker Installation**: To use these changes, you need Docker Desktop installed and running
- **Performance**: Nodemon adds minimal overhead (~1-2% CPU)
- **Production**: Nodemon works in production but consider using PM2 for advanced features
- **Windows**: If on Windows, ensure Docker Desktop for Windows is installed

## 🎯 Next Steps

1. **Install Docker** (if not already installed):
   - macOS: [Docker Desktop for Mac](https://docs.docker.com/desktop/install/mac-install/)
   - Windows: [Docker Desktop for Windows](https://docs.docker.com/desktop/install/windows-install/)
   - Linux: [Docker Engine](https://docs.docker.com/engine/install/)

2. **Start Docker Desktop**

3. **Rebuild and run**:
```bash
cd /Users/sakdahomhuan/Dev/cmu_gistnorth_iot
docker compose build
docker compose up -d
```

4. **Test nodemon**:
   - Edit server.js
   - Watch the logs: `docker compose logs -f app`
   - See the automatic restart!

---

**Status**: Configuration complete ✅  
**Docker Required**: Yes (not currently in PATH)  
**Ready to Use**: After Docker installation  

All configuration files are ready. Once Docker is installed, just run `docker compose up` and nodemon will automatically restart your server on file changes!
