@echo off
setlocal

set return_to=%~dp0
set /p container_dir_name=project container dir: 

if x%container_dir_name%==x (
  echo container_dir_name not specified
  echo using current_dir as container_dir_name
) else (
  mkdir %container_dir_name%
  echo created %container_dir_name%
  cd %container_dir_name%
)

set /p project_name=project name: 
if x%project_name%==x (
  echo no project name specified
  goto:eof
)

if exist %project_name% (
  echo project already exists
  goto:eof
)

rem ng exiting the program/unable to proceed further, if this cmd context is used
rem thus using call
call ng new -g --skip-install %project_name%

if not exist %project_name%/package.json  (
  echo project creation failed
  goto:eof
)

cd %project_name%

set template_root=%~dp0.template\toast\
echo copying my_dev, .vscode
xcopy /q /s /e /y /i "%template_root%my_dev" my_dev
xcopy /q /s /e /y /i "%template_root%.vscode" .vscode 

echo copying gulpfile.js, .eslintrc.js, .jsbeautifyrc
copy /y "%template_root%gulpfile.js"  gulpfile.js
copy /y "%template_root%.jsbeautifyrc"  .jsbeautifyrc
copy /y "%template_root%.eslintrc.js"  .eslintrc.js

call yarn install
call yarn add -D array-flatten chalk cssnano gulp gulp-autoprefixer gulp-cached gulp-cssnano gulp-filter gulp-html-prettify gulp-if gulp-open gulp-plumber gulp-print gulp-pug gulp-rename gulp-sourcemaps gulp-util lorem-ipsum bootstrap popper.js jquery eslint

rem to avoid install error gulp-sass install error
call yarn config set child-concurrency 1 
call yarn add -D gulp-sass
call yarn config delete child-concurrency
