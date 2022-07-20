import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  UntypedFormBuilder,
  UntypedFormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Observable, of, Subscriber } from 'rxjs';
import DownloadUtils from '../shared/download-utils';
import { HistoricoEscolar, Usuario } from './models/usuario';
import { UsuarioService } from './service/usuario.service';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.scss'],
})
export class UsuarioFormComponent implements OnInit {
  @ViewChild('inputTypePdf') inputTypePdf: ElementRef<HTMLInputElement>;

  isUpdate: boolean = false;
  usuario$: Observable<Usuario>;
  form: UntypedFormGroup;
  historicoEscolar: HistoricoEscolar;
  escolaridadeId = 1;

  constructor(
    private activatedRoute: ActivatedRoute,
    private usuarioService: UsuarioService,
    private formBuilder: UntypedFormBuilder,
    private toastService: ToastrService,
    private spinerService: NgxSpinnerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregaComunicado();
    this.criaForm();
  }

  private carregaComunicado() {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      if (params.id) {
        this.usuario$ = this.usuarioService.getUsuario(params.id);
        this.isUpdate = true;
      } else {
        this.usuario$ = of(new Usuario());
      }
    });
  }

  abrirSeletorDeArquivo() {
    this.inputTypePdf.nativeElement.click();

    this.inputTypePdf.nativeElement.addEventListener(
      'change',
      this.onChage.bind(this)
    );
  }

  onChage(event: any) {
    this.spinerService.show();
    this.form.controls['HistoricoEscolar'].setValue(
      this.inputTypePdf.nativeElement.files[0].name
    );
    this.historicoEscolar = new HistoricoEscolar();
    this.historicoEscolar.nome = this.inputTypePdf.nativeElement.files[0].name;
    this.historicoEscolar.Formato =
      this.inputTypePdf.nativeElement.files[0].type;

    let file = this.inputTypePdf.nativeElement.files[0];
    const fileReader = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    });
    fileReader.subscribe((pdfBlob) => {
      this.historicoEscolar.Arquivo = pdfBlob.substring(
        pdfBlob.indexOf(',') + 1
      );
      this.spinerService.hide();
    });
  }

  baixarHistorico(historicoEscolar: HistoricoEscolar) {
    DownloadUtils.baixarDocumentoBase64(
      historicoEscolar.Arquivo,
      historicoEscolar.nome,
      historicoEscolar.Formato
    );
  }

  readFile(file: File, subscriber: Subscriber<any>) {
    const filereader = new FileReader();
    filereader.readAsDataURL(file);

    filereader.onload = () => {
      subscriber.next(filereader.result);
      subscriber.complete();
    };
    filereader.onerror = (error) => {
      subscriber.error(error);
      subscriber.complete();
    };
  }

  criaForm() {
    this.form = this.formBuilder.group({
      Id: [null],
      Nome: [null, [Validators.required]],
      Sobrenome: [null, [Validators.required]],
      Email: [null, [Validators.required, Validators.email]],
      DataNascimento: [null, [Validators.required]],
      Escolaridade: [1, [Validators.required]],
      HistoricoEscolar: [null, [Validators.required]],
    });
  }

  atualiza(usuario: Usuario) {
    if (this.historicoEscolar) {
      usuario.historicoEscolar = this.historicoEscolar;
    }
    this.usuarioService.alteraUsuario(usuario).subscribe((retorno) => {
      this.router.navigate(['']);
      this.spinerService.hide();
      this.toastService.success('Usuario alterado com sucesso', 'Sucesso');
    });
  }
  registra(usuario: Usuario) {
    this.spinerService.show();
    if (this.historicoEscolar) {
      usuario.historicoEscolar = this.historicoEscolar;
    }
    console.log(usuario);
    this.usuarioService.registraUsuario(usuario).subscribe(
      (retorno) => {
        this.router.navigate(['']);
        this.spinerService.hide();
        this.toastService.success('Usuario registrado com sucesso', 'Sucesso');
      },
      (erro) => {
        this.spinerService.hide();
        this.toastService.error(erro, 'Erro');
      }
    );
  }
}
