echo "switch to branch master"
git checkout main
echo "building app..."
npm run build
echo "deploy doles to server...#"
scp -r build/* sccot@159.203.93.166:/var/www/159.203.93.166/
echo "DONE MARLONG"