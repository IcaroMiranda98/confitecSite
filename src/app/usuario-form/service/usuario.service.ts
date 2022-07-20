import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Escolaridade, Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  usuarios = new Array<Usuario>();
  usuarioId = 0;
  constructor(private _http: HttpClient) {
    let usuario = new Usuario();
    usuario.id = 1;
    usuario.dataNascimento = '2000-02-04';
    usuario.nome = 'Ícaro';
    usuario.sobrenome = 'MIRANDA';
    usuario.email = 'MIRANDA.icarox@gmail.com';
    usuario.escolaridade = <Escolaridade>{ id: 1, Descricao: 'Infantil' };
    this.usuarios.push(usuario);
  }

  registraUsuario(usuario: Usuario): Observable<Usuario> {
    this.usuarioId++;
    usuario.id = this.usuarioId;
    this.usuarios.push(usuario);
    return of(usuario);
  }

  alteraUsuario(usuario: Usuario): Observable<Usuario> {
    let index = this.usuarios.findIndex(
      (usuarioFind) => usuario.id === usuario.id
    );
    console.log(index);
    this.usuarios[index] = usuario;
    return of(usuario);
  }

  excluiUsuario(usuario: Usuario): Observable<true> {
    this.usuarios.splice(
      this.usuarios.findIndex((usuarioFind) => usuario.id === usuario.id)
    );
    return of(true);
  }

  getUsuario(id: number): Observable<Usuario> {
    return of(this.usuarios.find((usuario) => usuario.id == id));
  }

  getUsuarioTeste(id: number): Observable<Usuario> {
    return this._http.get<Usuario>(
      'https://localhost:5001/v1/usuarios?id=' + id
    );
  }

  getUsuarios(): Observable<Usuario[]> {
    return of(this.usuarios);
  }
}
