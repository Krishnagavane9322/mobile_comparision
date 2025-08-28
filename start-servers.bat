@echo off
echo Starting Mobile Recommendation Website Servers...
echo.

echo Starting Backend Server...
cd mobile-recommendation-backend
start "Backend Server" cmd /k "npm start"

echo.
echo Starting Frontend Server...
cd ..\mobile-reco-client
start "Frontend Server" cmd /k "npm start"

echo.
echo Both servers are starting...
echo Backend will be available at: http://localhost:8080
echo Frontend will be available at: http://localhost:3000
echo.
echo Press any key to close this window...
pause
