if [%1]==[] (
  echo no folder specified
  goto:eof
)

if exist %1 (
  echo already exist %1
  goto:eof
)

mkdir "%1"
cd  "%1"

create-nx-workspace project -g --skip-install

cd project

yarn install 
yarn add @nrwl/angular -D 

nx g angular-toast
