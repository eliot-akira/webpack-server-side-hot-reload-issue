
export default function server(req, res) {
  res.writeHead(200, { "Content-Type": "text/plain" })
  res.end("Hello World.\n")
}
