#!/usr/bin/env python
import BaseHTTPServer, SimpleHTTPServer, os

# We need to host from the root because we are going to be requesting files inside of dist
os.chdir('dist/')
port=8081
print "Running on port %d" % port

SimpleHTTPServer.SimpleHTTPRequestHandler.extensions_map['.wasm'] = 'application/wasm'

httpd = BaseHTTPServer.HTTPServer(('0.0.0.0', port), SimpleHTTPServer.SimpleHTTPRequestHandler)

print "Mapping \".wasm\" to \"%s\"" % SimpleHTTPServer.SimpleHTTPRequestHandler.extensions_map['.wasm']
httpd.serve_forever()
