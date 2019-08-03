@echo off
setlocal

if [%DIST_DIR%]==[] (
    set DIST_DIR=ch13
)

echo serving: %DIST_DIR%

if [%1]==[new]  (
    start cmd /k "node ./server/live-server %DIST_DIR%"
) else (
  node ./server/live-server %DIST_DIR%
)
