import { io } from 'socket.io-client';
import readline from 'readline';

const socket = io('http://localhost:3000');
const rl = readline.createInterface({
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
        } else {
            socket.emit('chat message', message);
        }
    });
}
