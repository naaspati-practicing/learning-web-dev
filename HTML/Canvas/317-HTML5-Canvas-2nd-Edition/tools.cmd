@echo off
setlocal

if [%1]==[] (
    echo no command specified
    goto:eof
)

if %1==s goto:server
if %1==server goto:server

goto:eof

:server
if [%2]==[] (
    echo no root dir specified
    echo usage: tools s ROOT_DIR
    goto:eof
)

if not exist %2 (
    echo dir not found: %2
    goto:eof
)

cd %2
start cmd /c live-server

goto:eof