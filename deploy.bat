@echo off
REM Deployment script for Biprayan Portfolio (Windows)

echo Building portfolio for deployment...

REM Install dependencies
call npm install

REM Build the project
call npm run build

echo Build complete! Ready for deployment.

echo.
echo To deploy:
echo 1. Upload the 'public' folder to your hosting service
echo 2. Configure your server to serve index.html for all routes
echo 3. Ensure the assets folder is accessible
echo.
pause
