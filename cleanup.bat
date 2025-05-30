@echo off
echo Closing all Node.js processes...
taskkill /F /IM node.exe >nul 2>&1

echo Removing node_modules and package-lock.json...
rmdir /s /q node_modules 2>nul
del /f /q package-lock.json 2>nul

echo Cleanup complete!
pause
