@echo off
taskkill /f /im node.exe >nul 2>&1
rmdir /s /q node_modules 2>nul
del package-lock.json 2>nul
del -r .parcel-cache 2>nul
echo Cleanup complete! Now run: npm install
