import http from 'node:http';

const PORT = 3001;

const server = http.createServer((req,res) => {
    const output = `<html><h1>Server Up!</h1></html>`;
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');
    res.end(output);
});

server.listen(PORT, () => console.log(`Listening at ${PORT}`));