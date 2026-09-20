@echo off
setlocal
chcp 65001 >nul
"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoLogo -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\start-local.ps1"
set "gloryExitCode=%errorlevel%"
if not "%gloryExitCode%"=="0" pause
exit /b %gloryExitCode%
