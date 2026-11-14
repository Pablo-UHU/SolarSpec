@echo off
title Simulador Solar Huelva
cd /d "%~dp0"
echo ====================================================
echo   Simulador Solar y Almacenamiento (BESS)
echo   Iniciando servidor local...
echo ====================================================
echo.
echo Abriendo navegador en http://localhost:5173 ...
start http://localhost:5173
call npx.cmd vite --port 5173 --host
if errorlevel 1 (
  echo Hubo un problema al iniciar Vite.
  pause
)
