import { Usuario } from "./usuario";

export class UsuariosLista {

    private lista: Array<Usuario> = [];

    constructor() { }

    // Agregar un usuario
    public agregar( usuario: Usuario) {
        this.lista.push( usuario );
        console.log( this.lista );
        return usuario;
    }

    public actualizarNombre( id: string, nombre: string ) {
        const index = this.lista.findIndex(obj => obj.id === id);
        if (index !== -1) {
            this.lista[index].nombre = nombre;
        }

        console.log('---- Actualizando usuario ----');
        console.log( this.lista );
    }

    public getLista() {
        return this.lista;
    }

    public getUsuario(id: string) {
        return this.lista.find(usuario => usuario.id === id);
    }

    public getUsuariosSala(sala: string) {
        return this.lista.filter( usuario => usuario.sala === sala);
    }

    // Borrar usuario
    public borrarUsuario( id: string ) {
        const tempUsuario = this.getUsuario( id );

        this.lista = this.lista.filter( usuario => usuario.id !== id);

        return tempUsuario;
    }
}