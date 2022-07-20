import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import DownloadUtils from '../shared/download-utils';
import { HistoricoEscolar, Usuario } from '../usuario-form/models/usuario';
import { UsuarioService } from '../usuario-form/service/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  paginaAtual = 1;
  usuarios$ = this.usuarioService.getUsuarios();

  constructor(
    private usuarioService: UsuarioService,
    private spinner: NgxSpinnerService,
    private toastService: ToastrService
  ) {}

  ngOnInit(): void {}

  excluiUsuario(usuarios: Usuario[], index: number) {
    this.spinner.show();
    this.usuarioService.excluiUsuario(usuarios[index]).subscribe((retorno) => {
      if (retorno) {
        this._excluiUsuario(usuarios, index);
        this.spinner.hide();
        this.toastService.success('Usuario Excluido com sucesso', 'Sucesso');
      }
    });
  }
  private _excluiUsuario(usuarios: Usuario[], index: number) {
    usuarios.splice(index, 1);
  }

  baixarHistorico(historicoEscolar: HistoricoEscolar) {
    this.spinner.show();
    DownloadUtils.baixarDocumentoBase64(
      historicoEscolar.Arquivo,
      historicoEscolar.nome,
      historicoEscolar.Formato
    );
    this.spinner.hide();
  }
}
