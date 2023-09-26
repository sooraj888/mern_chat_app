To Update the front end in Render dynamically need to add below build command in package.json in the root
"build": "npm install && npm install --prefix frontend && npm run build --prefix frontend"
