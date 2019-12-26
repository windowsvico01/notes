const http = require('http');
const url = require('url');

const start = () => {
  const onRequest = (request, response) => {
    const pathname = url.parse(request.url).pathname;
    console.log(`Request for ${pathname} received`);
    response.writeHead(200, {"Content-type": "text/plain"});
    response.write("Hello World");
    response.end();
  }
  http.createServer(onRequest).listen(8888);
  console.log('Server has started');
}

exports.start = start;
