# listrequires
Tool for inspecting local require() trees in NodeJS projects.  

Intended just to indicate what you are `require`ing where.  Generates output similar to `npm list` but excludes nested dependencies, focusing instead on your project files.

## installation

```
npm install -g listrequires
```

## usage

```
listrequires <entrypoint.js>
```

This executes `node /usr/bin/listrequires entrypoint.js` which causes node to actually *run* `entrypoint.js` - still gotta work out how to prevent this.
