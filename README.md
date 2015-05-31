# listrequires
Tool for inspecting local require() trees in NodeJS projects

# installation

npm install -g listrequires

# usage

listrequires <entrypoint.js>

This executes `node /usr/bin/listrequires entrypoint.js` which causes node to actually *run* `entrypoint.js` - still gotta work out how to prevent this.
