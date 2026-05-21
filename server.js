import http from 'node:http';
import fs from 'node:fs';
//import path from 'node:path';
import { testPath } from './utils/testPath.js';
import { serveStatic } from './utils/serveStatic.js';

const PORT = 3001;

const __dirname = import.meta.dirname;

const server = http.createServer((req,res) => {
    //const pathToResource = path.join(__dirname, 'public', 'index.html');
    //const output = `<html><h1>Server Up!</h1></html>`;
    //testPath();
    //console.log(`testPath: ${testPath()}`);
    //console.log(serveStatic(__dirname));
    const pathToResource = serveStatic(__dirname);
    const content = fs.readFileSync(pathToResource,'utf-8');
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');
    res.end(content);
});

server.listen(PORT, () => console.log(`Listening at ${PORT}`));