"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
const server = app.listen(3000, () => {
    console.log('Serveur démarré sur http://localhost:3000');
});
const io = new socket_io_1.Server(server);
io.on('connection', (socket) => {
    console.log('Un utilisateur est connecté');
    socket.on('chat message', (msg) => {
        console.log('Message reçu: ' + msg);
        // Logique de réponse
        let response = '';
        if (msg.toLowerCase().includes("bonjour")) {
            response = 'Bonjour ! Comment puis-je vous aider ?';
        }
        else if (msg.toLowerCase().includes("aide")) {
            response = 'Voici les commandes que vous pouvez utiliser...';
            // Ajouter plus d'options ici
        }
        else {
            response = 'Je ne suis pas sûr de comprendre. Pouvez-vous reformuler ?';
        }
        // Envoyer la réponse
        io.emit('chat message', 'Réponse du bot: ' + response);
    });
    socket.on('disconnect', () => {
        console.log('Un utilisateur est déconnecté');
    });
});
