@echo off
setlocal

if [%DIST_DIR%]==[] (
    set DIST_DIR=ch02
)

echo serving: %DIST_DIR%

start cmd /k "node live-server %DIST_DIR%"