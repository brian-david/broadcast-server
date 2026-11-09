import { WebSocket } from "ws";
import * as readline from "node:readline";

const socket = new WebSocket("ws://localhost:8080");

socket.on("open", () => {
	console.log("Connected to the server. Type a message and press Enter.");

	const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

	rl.on("line", (line) => {
		socket.send(line);
	});
});

socket.on("message", (data) => {
	console.log(data.toString());
});

socket.on("close", () => {
	console.log("Disconnected from the server.");
	process.exit(0);
});

socket.on("error", (err) => {
	console.log("Connection error:", err.message);
});