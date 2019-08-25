@echo off
setlocal

if [%1]==[] (
  echo no root specified
  goto:eof
)
if not exist "%1" (
  echo root not exist: %1
  goto:eof
)

start cmd /c "node live-server %1" 
