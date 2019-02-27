build:
	rm -rf dist && mkdir dist && cp *.html dist && cp -R products dist && cp -R assets dist

uploadToSandbox:
	aws s3 sync ./dist s3://esmee-sandbox --acl public-read --delete