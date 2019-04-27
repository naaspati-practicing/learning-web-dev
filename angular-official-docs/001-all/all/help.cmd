@echo off
setlocal

if [%1]==[] (
  echo no command specified
  goto:eof
)

if %1==clean (
  set dir_name=.untouched
  goto:restore
)

if %1==init (
  if [%2]==[] (
    echo dirname not specified
    goto:eof
  )
  if exist ".backups/%2" (
    echo dir already exist ".backups/%2"
    goto:eof
  )
  mkdir ".backups/%2"
  echo ## %2 > ".backups/%2/README.md"
  echo created .backups/%2
  explorer .backups/%2
  goto:eof
)

if %1==backup (
  if [%2]==[] (
    echo dirname not specified
	goto:eof
  )
  if not exist ".backups/%2" (
    echo dir not exist ".backups/%2"
	goto:eof
  )
  
  xcopy /q /s /e /y /i src ".backups/%2/src"
  xcopy /q /s /e /y /i my_dev ".backups/%2/my_dev"
  goto:eof
)

if %1==restore (
  set dir_name=%2
  goto:restore
)

echo unknown command %*

goto:eof

:restore
if not exist ".backups/%dir_name%" (
  echo dir not found ".backups/%dir_name%"
  goto:eof
)

rd /q /s src
rd /q /s my_dev

xcopy /q /s /e /y /i ".backups/%dir_name%" .
goto:eof