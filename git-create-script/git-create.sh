#!/bin/sh

# check arguments. needs username and at least one repo name
if [[ $# -eq 0 ]] ; then
    echo 'Missing github username.'
    exit 1
fi

if [[ $# -eq 1 ]] ; then
    echo 'Missing at least one git repo name.'
    exit 1
fi

user_name=$1
# arg two should start repo names. need at least one
# add check for this
for i in ${@:2}
do
  repo_name=$i
  curl -u $user_name https://api.github.com/user/repos -d "{\"name\":\"$repo_name\"}"
  echo $?
  git clone https://github.com/$user_name/$repo_name.git
  cd $repo_name
  touch index.html
  echo "<html>
    <head>
    </head>
    <body>
      Hi!
    </body>
  </html>" >> index.html
  echo "Repo created with bash script :-)" >> README.md
  git add .
  git commit -m "Initialize repo with index.html"
  git push origin master
  git checkout -b gh-pages
  git pull origin master
  git push origin gh-pages
  cd ..
done
