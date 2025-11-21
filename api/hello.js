export default function handler(req, res) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ 
    success: true, 
    message: 'API is working!',
    method: req.method,
    url: req.url
  }));
}

