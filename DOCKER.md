# Docker Setup Guide

This guide explains how to run the CMU GIST North IoT Air Quality Dashboard using Docker and Docker Compose.

## Prerequisites

- Docker Engine 20.10+
- Docker Compose 2.0+

## Quick Start

### Production Mode

1. **Build and start the application:**
```bash
docker-compose up -d
```

2. **Access the application:**
- Application: http://localhost:3000

3. **View logs:**
```bash
docker-compose logs -f app
```

4. **Stop the application:**
```bash
docker-compose down
```

### Development Mode

1. **Build and start with hot reload:**
```bash
docker-compose -f docker-compose.dev.yml up -d
```

2. **Access the services:**
- Application: http://localhost:3000
- Database Admin (Adminer): http://localhost:8080
- PostgreSQL: localhost:5433
- Redis: localhost:6380

3. **View logs:**
```bash
docker-compose -f docker-compose.dev.yml logs -f app-dev
```

4. **Stop services:**
```bash
docker-compose -f docker-compose.dev.yml down
```

## Docker Commands Reference

### Build Commands

```bash
# Build production image
docker-compose build

# Build development image
docker-compose -f docker-compose.dev.yml build

# Build without cache
docker-compose build --no-cache

# Pull latest images
docker-compose pull
```

### Run Commands

```bash
# Start services in background
docker-compose up -d

# Start services and view logs
docker-compose up

# Start specific service
docker-compose up -d app

# Restart services
docker-compose restart

# Stop services
docker-compose stop

# Stop and remove containers
docker-compose down

# Stop and remove containers + volumes
docker-compose down -v
```

### Maintenance Commands

```bash
# View running containers
docker-compose ps

# View logs
docker-compose logs

# View logs for specific service
docker-compose logs app

# Follow logs
docker-compose logs -f

# Execute commands in container
docker-compose exec app sh

# Check health status
docker-compose ps
docker inspect --format='{{.State.Health.Status}}' cmu-iot-app
```

### Database Commands (when enabled)

```bash
# Access PostgreSQL
docker-compose exec postgres psql -U iot_user -d iot_airquality

# Backup database
docker-compose exec postgres pg_dump -U iot_user iot_airquality > backup.sql

# Restore database
docker-compose exec -T postgres psql -U iot_user -d iot_airquality < backup.sql

# View database logs
docker-compose logs postgres
```

## Configuration

### Environment Variables

Create a `.env` file in the project root to customize settings:

```env
# Application
NODE_ENV=production
PORT=3000
TZ=Asia/Bangkok

# Database (when enabled)
POSTGRES_USER=iot_user
POSTGRES_PASSWORD=your_secure_password
POSTGRES_DB=iot_airquality

# Redis (when enabled)
REDIS_HOST=redis
REDIS_PORT=6379
```

### Enable Optional Services

Edit `docker-compose.yml` and uncomment the services you want to use:
- PostgreSQL database
- Redis cache
- Nginx reverse proxy

## Production Deployment

### 1. Security Best Practices

```bash
# Use environment variables for secrets
# Never commit .env file to git
echo ".env" >> .gitignore

# Use Docker secrets (Swarm mode)
docker secret create db_password ./db_password.txt
```

### 2. Enable Health Checks

Health checks are already configured in the compose file. Monitor them:

```bash
# Check health status
docker-compose ps

# View health check logs
docker inspect --format='{{json .State.Health}}' cmu-iot-app | jq
```

### 3. Resource Limits

Add resource limits to `docker-compose.yml`:

```yaml
services:
  app:
    deploy:
      resources:
        limits:
          cpus: '1'
          memory: 512M
        reservations:
          cpus: '0.5'
          memory: 256M
```

### 4. Logging

Configure logging driver:

```yaml
services:
  app:
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
```

## Troubleshooting

### Port Already in Use

```bash
# Check what's using port 3000
lsof -i :3000

# Use different port
# Edit docker-compose.yml: "8080:3000"
```

### Container Won't Start

```bash
# View detailed logs
docker-compose logs app

# Check container status
docker-compose ps

# Rebuild container
docker-compose up -d --build app
```

### Permission Issues

```bash
# Fix file permissions
sudo chown -R $USER:$USER .

# Or run with sudo (not recommended)
sudo docker-compose up -d
```

### Clean Everything

```bash
# Remove all containers and volumes
docker-compose down -v

# Remove images
docker rmi $(docker images -q cmu-gistnorth-iot*)

# Prune everything (careful!)
docker system prune -a --volumes
```

## Performance Optimization

### Multi-stage Build

The Dockerfile uses Node.js Alpine for smaller image size.

### Volume Management

```bash
# List volumes
docker volume ls

# Remove unused volumes
docker volume prune

# Inspect volume
docker volume inspect postgres_data
```

### Network Optimization

```bash
# List networks
docker network ls

# Inspect network
docker network inspect iot-network

# Remove unused networks
docker network prune
```

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Docker Build and Push

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Build Docker image
        run: docker-compose build
      
      - name: Run tests
        run: docker-compose run app npm test
      
      - name: Push to registry
        run: |
          echo "${{ secrets.DOCKER_PASSWORD }}" | docker login -u "${{ secrets.DOCKER_USERNAME }}" --password-stdin
          docker-compose push
```

## Support

For issues or questions:
- Check logs: `docker-compose logs`
- Inspect container: `docker inspect cmu-iot-app`
- Visit: https://github.com/dookda/cmu_gistnorth_iot

## License

MIT License - see LICENSE file for details
