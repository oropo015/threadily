#!/bin/bash

# Script to find and replace all instances of "threadily" with "threadify"
# and "threadily.com" with "threadify.pro" in the codebase

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Starting rebrand process: threadily → threadify${NC}"
echo -e "${YELLOW}=======================================${NC}"

# Create a backup directory
BACKUP_DIR="./backup-$(date +%Y%m%d%H%M%S)"
mkdir -p $BACKUP_DIR

echo -e "${YELLOW}Creating backup in $BACKUP_DIR${NC}"

# Copy all files to backup
cp -r ./app ./components ./contexts ./hooks ./lib ./public ./styles $BACKUP_DIR 2>/dev/null
cp package.json tsconfig.json next.config.js $BACKUP_DIR 2>/dev/null

echo -e "${GREEN}Backup created successfully${NC}"
echo -e "${YELLOW}=======================================${NC}"

# Find all occurrences of "threadily" (case insensitive)
echo -e "${YELLOW}Finding all occurrences of 'threadily':${NC}"
grep -r -i "threadily" --include="*.{ts,tsx,js,jsx,json,md,html,css}" . | grep -v "node_modules" | grep -v "backup-"

echo -e "${YELLOW}=======================================${NC}"
echo -e "${YELLOW}Finding all occurrences of 'threadily.com':${NC}"
grep -r -i "threadily.com" --include="*.{ts,tsx,js,jsx,json,md,html,css}" . | grep -v "node_modules" | grep -v "backup-"

echo -e "${YELLOW}=======================================${NC}"

# Confirm before proceeding
read -p "Do you want to proceed with the replacement? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    echo -e "${RED}Operation cancelled${NC}"
    exit 1
fi

# Replace all occurrences
echo -e "${YELLOW}Replacing all occurrences...${NC}"

# Replace "threadily" with "threadify" (preserving case)
find . -type f -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" -o -name "*.json" -o -name "*.md" -o -name "*.html" -o -name "*.css" | xargs grep -l "threadily" | grep -v "node_modules" | grep -v "backup-" | xargs sed -i '' 's/threadily/threadify/g; s/Threadily/Threadify/g; s/THREADILY/THREADIFY/g'

# Replace "threadily.com" with "threadify.pro"
find . -type f -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" -o -name "*.json" -o -name "*.md" -o -name "*.html" -o -name "*.css" | xargs grep -l "threadily.com" | grep -v "node_modules" | grep -v "backup-" | xargs sed -i '' 's/threadily\.com/threadify.pro/g'

echo -e "${GREEN}Replacement completed successfully${NC}"
echo -e "${YELLOW}=======================================${NC}"

# Verify the changes
echo -e "${YELLOW}Verifying changes...${NC}"
REMAINING_THREADILY=$(grep -r -i "threadily" --include="*.{ts,tsx,js,jsx,json,md,html,css}" . | grep -v "node_modules" | grep -v "backup-" | wc -l)
REMAINING_DOMAIN=$(grep -r -i "threadily.com" --include="*.{ts,tsx,js,jsx,json,md,html,css}" . | grep -v "node_modules" | grep -v "backup-" | wc -l)

if [ $REMAINING_THREADILY -eq 0 ] && [ $REMAINING_DOMAIN -eq 0 ]; then
    echo -e "${GREEN}All occurrences have been replaced successfully!${NC}"
else
    echo -e "${RED}Some occurrences may still remain. Please check manually.${NC}"
    if [ $REMAINING_THREADILY -gt 0 ]; then
        echo -e "${RED}$REMAINING_THREADILY occurrences of 'threadily' found${NC}"
    fi
    if [ $REMAINING_DOMAIN -gt 0 ]; then
        echo -e "${RED}$REMAINING_DOMAIN occurrences of 'threadily.com' found${NC}"
    fi
fi

echo -e "${YELLOW}=======================================${NC}"
echo -e "${YELLOW}Rebrand process completed${NC}"
echo -e "${YELLOW}Don't forget to update any external services, DNS, and redirects!${NC}"
