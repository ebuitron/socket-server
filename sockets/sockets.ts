import { Socket } from 'socket.io';
import { Usuario } from '../classes/usuario';
import { UsuariosLista } from '../classes/usuarios-lista';

export const usuariosConectados = new UsuariosLista();

export const conectarCliente = ( cliente: Socket, io: SocketIO.Server ) => {
    const usuario = new Usuario( cliente.id );
    usuariosConectados.agregar( usuario );

    io.emit('usuarios-activos', usuariosConectados.getLista());
};


export const desconectar = ( cliente: Socket, io: SocketIO.Server ) => {
    cliente.on('disconnect', () => {
        console.log('Cliente desconectado.');
        const temp: any = usuariosConectados.borrarUsuario(cliente.id);
        console.log('Usuario ' + temp.nombre + ' desconectado');
    });
}

// Escuchar mensajes.
export const mensaje = ( cliente: Socket, io: SocketIO.Server ) => {
    cliente.on('mensaje', (payload: { de: string, cuerpo: string }, callback) => {
        console.log('Mensaje recibido', payload);
        io.emit('mensaje-nuevo', payload);
    });
}


// Escuchar mensajes.
export const configurarUsuario = ( cliente: Socket, io: SocketIO.Server, callback?: Function ) => {
    cliente.on('configurar-usuario', (payload: { nombre: string }, callback) => {
        usuariosConectados.actualizarNombre(cliente.id, payload.nombre);
        io.emit('usuarios-activos', usuariosConectados.getLista());
        // io.emit('configurar-usuario', payload);
        callback({
            ok: true,
            mensaje: 'Usuario ' + payload.nombre + ' configurado.'
        });
    });
}


// Obtener usuarios
export const getUsuariosActivos = (cliente: Socket, io: SocketIO.Server, callback?: Function ) => {
    cliente.on('get-usuarios-activos', () => {
        io.to( cliente.id ).emit('usuarios-activos', usuariosConectados.getLista());
    });
}
