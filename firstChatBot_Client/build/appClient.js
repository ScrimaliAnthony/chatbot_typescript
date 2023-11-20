"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_client_1 = require("socket.io-client");
const readline_1 = __importDefault(require("readline"));
const socket = (0, socket_io_client_1.io)('http://localhost:3000');
const rl = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout
});
socket.on('connect', () => {
    console.log('Connecté au serveur');
    promptInput();
});
socket.on('chat message', (msg) => {
    console.log('Message reçu :', msg);
    promptInput();
});
socket.on('disconnect', () => {
    console.log('Déconnecté du serveur');
    rl.close();
});
function promptInput() {
    rl.question('Entrez votre message : ', (message) => {
        if (message === 'exit') {
            socket.disconnect();
        }
        else {
            socket.emit('chat message', message);
        }
    });
}
