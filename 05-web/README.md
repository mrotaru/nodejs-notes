- https://nodejs.org/dist/latest-v9.x/docs/api/http.html
- the node HTTP interfaces are very low-level



- if using `httpie` to test streaming servers, add `--stream` (https://httpie.org/doc#streamed-responses)
- also, it will not assume protocol based on port number; to test https, secify it: `http --verify=no https://localhost:443
