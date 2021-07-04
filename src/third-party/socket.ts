import io from 'socket.io-client';

console.log('URA');
let socket = io ('//localhost:4000');

export default socket;