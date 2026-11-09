#!/usr/bin/env -S npx tsx
const command = process.argv[2];

if (command === "start") {
	import("./server");
} else if (command === "connect") {
	import("./client");
} else {
	console.log("Usage: broadcast-server <start|connect>");
}
