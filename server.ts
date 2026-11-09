import { WebSocketServer, WebSocket } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

const clientConnections = new Set<WebSocket>();

let nextClientId = 1;

wss.on('connection', (socket) => {
	const clientId = nextClientId;
	nextClientId++;

	console.log(`Client ${clientId} connected`);

	clientConnections.add(socket);

	socket.on('message', (data) => {
		const message = `[client ${clientId}]: ${data.toString()}`;

		clientConnections.forEach((client) => {
			if (client !== socket && client.readyState === WebSocket.OPEN) {
				client.send(message);
			}
		});
	});

	socket.on('close', () => {
		console.log(`Client ${clientId} disconnected`);
		clientConnections.delete(socket);
	});

	socket.on("error", (err) => {
		console.log("Client error:", err.message);
	});
});

wss.on("listening", () => {
	console.log("Server listening on port 8080");
});

wss.on("error", (err) => {
	console.log("Server error:", err.message);
	process.exit(1);
});