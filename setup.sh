#!/bin/bash

# Setup script for CMU GIST North IoT Dashboard
# This script will install dependencies and set up the project

set -e  # Exit on error

echo "🚀 CMU GIST North IoT Dashboard - Setup Script"
echo "=============================================="
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check Node.js installation
echo "📦 Checking Node.js installation..."
if command_exists node; then
    NODE_VERSION=$(node --version)
    echo -e "${GREEN}✓${NC} Node.js is installed: ${NODE_VERSION}"
else
    echo -e "${RED}✗${NC} Node.js is not installed"
    echo ""
    echo "Please install Node.js:"
    echo "  macOS:   brew install node"
    echo "  Website: https://nodejs.org/"
    echo ""
    exit 1
fi

# Check npm installation
echo "📦 Checking npm installation..."
if command_exists npm; then
    NPM_VERSION=$(npm --version)
    echo -e "${GREEN}✓${NC} npm is installed: v${NPM_VERSION}"
else
    echo -e "${RED}✗${NC} npm is not installed"
    echo "npm should come with Node.js. Please reinstall Node.js."
    exit 1
fi

# Check Docker installation (optional)
echo "🐳 Checking Docker installation..."
if command_exists docker; then
    DOCKER_VERSION=$(docker --version)
    echo -e "${GREEN}✓${NC} Docker is installed: ${DOCKER_VERSION}"
    DOCKER_AVAILABLE=true
else
    echo -e "${YELLOW}⚠${NC} Docker is not installed (optional)"
    echo "   To use Docker: https://docs.docker.com/get-docker/"
    DOCKER_AVAILABLE=false
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Install npm dependencies
echo "📥 Installing npm dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓${NC} Dependencies installed successfully!"
else
    echo -e "${RED}✗${NC} Failed to install dependencies"
    exit 1
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo -e "${GREEN}✅ Setup complete!${NC}"
echo ""
echo "🚀 Quick Start:"
echo ""
echo "  Option 1: Run locally"
echo "    ${BLUE}npm start${NC}"
echo "    Then open: http://localhost:3000"
echo ""
echo "  Option 2: Development mode (with hot reload)"
echo "    ${BLUE}npm run dev${NC}"
echo "    Then open: http://localhost:3000"
echo ""

if [ "$DOCKER_AVAILABLE" = true ]; then
    echo "  Option 3: Docker"
    echo "    ${BLUE}docker compose up -d${NC}                              # Production mode"
    echo "    ${BLUE}docker compose -f docker-compose.dev.yml up -d${NC}    # Development mode"
    echo "    ${BLUE}docker compose logs -f${NC}                            # View logs"
    echo ""
fi

echo "📚 Documentation:"
echo "  ${BLUE}README.md${NC}              - Project overview"
echo "  ${BLUE}DOCKER.md${NC}              - Docker guide"
echo "  ${BLUE}NODEMON_UPDATE.md${NC}      - Nodemon configuration"
echo ""
echo "💡 Helpful commands:"
echo "  ${BLUE}docker compose up -d${NC}   - Start with Docker"
echo "  ${BLUE}npm start${NC}              - Start the server"
echo "  ${BLUE}npm run dev${NC}            - Start with nodemon"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
