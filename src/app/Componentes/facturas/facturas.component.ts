import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiciosService } from 'src/app/Servicios/servicios.service';
import { DataService } from '../list/data.service';
import { RolesUser, usuarioRol } from '../login/login.component';

let datosUser: RolesUser = {
  rol: '',
  nombre: '',
  id: 0,
};
let sumitValor = "";
export interface DatosSoftware {
  idSoft: string;
}
export let idSoftware: DatosSoftware = {
  idSoft: '',
};

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.scss']
})
export class FacturasComponent implements OnInit {

  tipoFactura: any[] = [
    { nombre: 'Equipos' },
    { nombre: 'Software' }
  ]

  ifProgreso = false;
  ifResultados = true;
  parametrosBusquedaForm: FormGroup;
  listaEquipos: any[];
  listaSoftware: any[];
  resultados: any[];
  ifFactura = true;
  @ViewChild(FormGroupDirective, { static: false }) formGroupDirective: FormGroupDirective;

  constructor(
    protected servicioConUser: ServiciosService,
    protected servicioConsulta: DataService,
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.usuarioLogeado();
    this.parametrosBusquedaForm = this.formBuilder.group({
      id_equipo: [''],
      no_serie: [''],
    });
  }

  usuarioLogeado() {
    datosUser = usuarioRol;
    // console.log(datosUser);
    const token = this.servicioConUser.getToken();
    // console.log(token);
    if (token.length === 0) {
      // console.log('error en el acceso');
      this.router.navigate(['Login']);
    } else {
      const cookieN64 = window.atob(unescape(encodeURIComponent(token)));
      datosUser = JSON.parse(cookieN64);
      if (datosUser.rol === 'Admin') {
        // console.log('acceso correcto');
        this.getAllMEquipos();
        this.getAllSoftware();
      } else if (datosUser.rol !== 'Admin') {
        this.router.navigate(['Principal']);
      }
    }
  }
  getAllSoftware() {
    this.listaSoftware = [];
    this.servicioConsulta.getAllSoftware().subscribe(
      response => {
        if (response.status === 200) {
          this.listaSoftware = response.body;
        } else {
          console.log('error consulta', response.status);
          this.mensajeErrorConsulta();
        }
      },
      error => {
        if (error.status === 500) {
          this.mensaje500();
        } else {
          console.log('error', error);
          this.mensajeErrorConsulta
        }
      }
    );
  }

  getAllMEquipos() {
    this.listaEquipos = [];
    this.servicioConsulta.getAllEquipo().subscribe(
      response => {
        if (response.status === 200) {
          this.listaEquipos = response.body;
        } else {
          console.log('error consulta', response.status);
          this.mensajeErrorConsulta();
        }
      },
      error => {
        if (error.status === 500) {
          this.mensaje500();
        } else {
          console.log('error', error);
          this.mensajeErrorConsulta();
        }
      }
    );
  }

  selectFactura(value: any) {
    console.log(value);
    let a = document.getElementById("buscar");
    let b = document.getElementById("equipoTabla");
    let c = document.getElementById("label");
    let d = document.getElementById("iframe");
    let e = document.getElementById("acceTabla")

    if (value === "Equipos") {
      sumitValor = value;
      a.className = "row visible"
      b.className = "table-wrapper-scroll-y my-custom-scrollbar visible"
      c.className = "labelPdf visible"
      d.className = "vistaPDF visible"
      e.className = "table-wrapper-scroll-y my-custom-scrollbar invisible"
    } else if (value === "Software") {
      sumitValor = value;
      a.className = "row visible"
      b.className = "table-wrapper-scroll-y my-custom-scrollbar invisible"
      c.className = "labelPdf visible"
      d.className = "vistaPDF visible"
      e.className = "table-wrapper-scroll-y my-custom-scrollbar visible"
    }
  }

  onSubmit() {
    if (sumitValor === "Equipos") {
      console.log(sumitValor, "Entre a sumit");
      this.ifResultados = false;
      this.resultados = [];
      this.ifFactura = true;
      const idEquipoF = this.parametrosBusquedaForm.controls.id_equipo.value;
      const noSerieF = this.parametrosBusquedaForm.controls.no_serie.value;
      console.log(idEquipoF, noSerieF);
      console.log(this.listaEquipos);
      if (idEquipoF !== '' && noSerieF !== '' && idEquipoF !== null && noSerieF !== null) {
        console.log('dos parametros');
        this.resultados = this.listaEquipos.filter(item => item.id_equipo === Number(idEquipoF)
          && item.numero_serie_cmd.toLowerCase().includes(noSerieF.toLowerCase()));
      } else if (idEquipoF !== '' && (noSerieF === '' || noSerieF === null)) {
        console.log('id equipo');
        this.resultados = this.listaEquipos.filter(item => item.id_equipo === Number(idEquipoF));
      } else if ((idEquipoF === '' || idEquipoF === null) && noSerieF !== '') {
        console.log('no serie');
        this.resultados = this.listaEquipos.filter(item => item.numero_serie_cmd.toLowerCase().includes(noSerieF.toLowerCase()));
      } else if ((idEquipoF === '' || idEquipoF === null) && (noSerieF === '' || noSerieF === null)) {
        console.log('sin parametros');
        this.mensajeDatosIncompletos();
      }
      console.log(this.resultados);
      if (this.resultados.length === 0) {
        console.log('sin resultados');
        this.mensajeSinResultados();
      } else {
        console.log(this.resultados);
        if (this.resultados[0].factura === null) {
          console.log('no tiene factura');
          /*  this.ifFactura = true;
           this.mensajeNoFactura(); */
        }
      }
      this.formGroupDirective.resetForm();
      this.ifResultados = true;
    } else if (sumitValor === "Software") {
      this.ifResultados = false;
      this.resultados = [];
      this.ifFactura = true;
      const idAcceF = this.parametrosBusquedaForm.controls.id_equipo.value;
      const serieAcce = this.parametrosBusquedaForm.controls.no_serie.value;
      console.log(idAcceF, serieAcce);
      console.log(this.listaSoftware);
      if (idAcceF !== '' && serieAcce !== '' && idAcceF !== null && serieAcce !== null) {
        console.log('dos parametros');
        this.resultados = this.listaSoftware.filter(item => item.id_software === Number(idAcceF)
          && item.no_serie.toLowerCase().includes(serieAcce.toLowerCase()));
      } else if (idAcceF !== '' && (serieAcce === '' || serieAcce === null)) {
        console.log('id accesorio');
        this.resultados = this.listaSoftware.filter(item => item.id_software === Number(idAcceF));
      } else if ((idAcceF === '' || idAcceF === null) && serieAcce !== '') {
        console.log('no serie');
        this.resultados = this.listaSoftware.filter(item => item.no_serie.toLowerCase().includes(serieAcce.toLowerCase()));
      } else if ((idAcceF === '' || idAcceF === null) && (serieAcce === '' || serieAcce === null)) {
        console.log('sin parametros');
        this.mensajeDatosIncompletos();
      }
    }
    console.log(this.resultados);
    if (this.resultados.length === 0) {
      console.log('sin resultados');
      this.mensajeSinResultados();
    } else {
      console.log(this.resultados);
      if (this.resultados[0].factura === null) {
        console.log('no tiene factura');
      }
    }
    this.formGroupDirective.resetForm();
    this.ifResultados = true;
  }

  opcionesFactura(id: string, opcion: string) {
    if (sumitValor === "Equipos") {
      console.log(id);
      let equipoF: any;
      equipoF = this.resultados.filter(item => item.id_equipo === Number(id));
      // console.log(equipoF[0].factura);
      const bytes = atob(equipoF[0].factura);
      if (opcion === 'mostrar') {
        const partes = bytes.split(',');
        const byteArray = new Uint8Array(atob(partes[1]).split('').map(char => char.charCodeAt(0)));
        const archivo = new Blob([byteArray], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(archivo);
        // i.e. display the PDF content via iframe
        this.ifFactura = false;
        document.querySelector('iframe').src = url;
      } else {
        const datosFile = bytes;
        const downloadLink = document.createElement('a');
        const fileName = 'factura_' + equipoF[0].numero_serie_cmd + '.pdf';
        downloadLink.href = datosFile;
        downloadLink.download = fileName;
        downloadLink.click();
      }
    } else if (sumitValor === "Software") {
      console.log(id);    
      let softwareF: any;
      softwareF = this.resultados.filter(item => item.id_software === Number(id));
      const bytes = atob(softwareF[0].factura);
      if (opcion === 'mostrar') {
        const partes = bytes.split(',');
        const byteArray = new Uint8Array(atob(partes[1]).split('').map(char => char.charCodeAt(0)));
        const archivo = new Blob([byteArray], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(archivo);
        this.ifFactura = false;
        document.querySelector('iframe').src = url;
      } else {
        const datosFile = bytes;
        const downloadLink = document.createElement('a');
        const fileName = 'factura_' + softwareF[0].no_serie + '.pdf';
        downloadLink.href = datosFile;
        downloadLink.download = fileName;
        downloadLink.click();
      }
    }
  }

  descargar(id: string) {
    console.log(id);
  }
  mensajeErrorConsulta() {
    this.toastr.error('Intentar más tarde', 'Error en el servicio');
  }
  mensaje500() {
    this.toastr.error('Intentar más tarde', 'Error del Servidor');
  }
  mensajeDatosIncompletos() {
    this.toastr.error('Llene uno de los dos campos', 'Datos incompletos');
  }
  mensajeSinResultados() {
    this.toastr.warning('Favor de revisar los datos ingresados', 'Busqueda sin resultados');
  }
  mensajeNoFactura() {
    this.toastr.warning('No se encontro una factura', 'Sin Factura');
  }
}
