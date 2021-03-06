import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Equipos} from '../../Models/equipos/equipos.interface';
import { DEquipos} from '../../Models/equipos/dequipos.interface';
import { Accesorios } from 'src/app/Models/accesorios/accesorios.interface';
import { Asignacion } from 'src/app/Models/asignacion/asignacion.interface';
import { EquipoSoftware } from 'src/app/Models/equipos/equipoSotware.interface';
import { Software } from 'src/app/Models/Software/software.interface';
import { AccesorioN } from 'src/app/Models/asignacion/accesorioN.interface';
import { Asignacion_accesorios } from 'src/app/Models/asignacion/asignacion_accesorios.interface';
import { ObserversModule } from '@angular/cdk/observers';

@Injectable({
  providedIn: 'root'
})
export class DataService {
// private urlAPI = 'https://jsonplaceholder.typicode.com/todos';
private urlAPI = 'http://localhost:8081/DEquipos';
private urlAPIEq = 'http://localhost:8081/equipos';
private urlAPIAc = 'http://localhost:8081/accesorios';
private urlAPIRes = 'http://localhost:8081/responsiva';
private urlAPIAsig = 'http://localhost:8081/asignacion';
private urlAPISoft = 'http://localhost:8081/software';
private urlAPIEstatus = 'http://localhost:8081/estatus';
private urlApiEquSoft = 'http://localhost:8081/equipoSoftware';
private urlAPIHist = 'http://localhost:8081/historico';
private urlApiAccN = 'http://localhost:8081/accesoriosN';
private urlApiAsigAcc = 'http://localhost:8081/asignacionAccesorios';

  constructor(private http: HttpClient,
    ) { }

  getAllEquipos(): Observable <any> {
    const url = this.urlAPI + '/get';
    return this.http.get(url, {observe: 'response'});
    // return this.http.get<Equipos[]>(url);
  }
  getEquipo(idEquipo: string): Observable <any> {
    const url = this.urlAPIEq + '/get/' + idEquipo;
    return this.http.get(url, {observe: 'response'});
  }
  getAllEquipo(): Observable <any> {
    const url = this.urlAPIEq + '/get';
    return this.http.get(url, {observe: 'response'});
  }
  updateEquipo(datosEquipo: Equipos): Observable <any> {
    console.log(datosEquipo);
    const url = this.urlAPIEq;
    return this.http.put(url, datosEquipo, {observe: 'response'});
  }
  crearEquipo(equipo: Equipos): Observable<any> {
    const url = this.urlAPIEq + '/post';
    return this.http.post(url, equipo, {observe: 'response'});
  }
  crearDEquipo(dequipo: DEquipos, idEquipo: string): Observable <any> {
    const url = this.urlAPI + '/post?estatus_id=2' + '&equipo_id=' + idEquipo;
    return this.http.post(url, dequipo, {observe: 'response'});
  }
  getDEquipo(id: string): Observable <any> {
    const url = this.urlAPI + '/get/' + id;
    return this.http.get(url, {observe: 'response'});
  }
  updateDEquipo(estatus: number, dequipo: DEquipos) {
    const url = this.urlAPI + '/put?id_estatus=' + estatus;
    return this.http.put(url, dequipo, {observe: 'response'});
  }
  getAllAccesorios(): Observable <any> {
    const url = this.urlAPIAc + '/get';
    return this.http.get(url, {observe: 'response'});
  }
  getAccesorio(idAccesorio): Observable <any> {
    const url = this.urlAPIAc + '/getAccesorio?id=' + idAccesorio;
    return this.http.get(url, {observe: 'response'});
  }
  getAccesorioEquipo(idAccesorio: number) {
    const url = this.urlAPIAc + '/getAccesorioEquipo?id=' + idAccesorio;
    return this.http.get(url, {observe: 'response'});
  }
  crearAccesorio(accesorio: Accesorios, idEstatus: number): Observable <any> {
    const url = this.urlAPIAc + '/post?estatus_id=' + idEstatus;
    return this.http.post(url, accesorio, {observe: 'response'});
  }
  updateAccesorio(accesorio: Accesorios, idEstatus: number): Observable <any> {
    const url = this.urlAPIAc + '/actualizarDatos?estatus_id=' + idEstatus;
    return this.http.put(url, accesorio, { observe: 'response'});
  }
  getAllResponsivas(): Observable <any> {
    const url = this.urlAPIRes + '/get';
    return this.http.get(url, {observe: 'response'});
  }
  crearAsignacion(idDEquipo: number, idEstatus: string, datosAsignacion: Asignacion): Observable <any> {
    const url = this.urlAPIAsig + '/post?dequipo_id=' + idDEquipo + '&estatus_id=' + idEstatus;
    return this.http.post(url, datosAsignacion, {observe: 'response'} );
  }
  crearResponsiva() {

  }
  getAllAsignaciones(): Observable <any> {
    const url = this.urlAPIAsig + '/get';
    return this.http.get(url, {observe: 'response'});
  }
  putResponsiva(idDEquipo: number, idEstatus: number, idAsignacion: number): Observable <any> {
    const url = this.urlAPIAsig + '/put?id_dequipo=' + idDEquipo + '&id_estatus=' + idEstatus + '&id_asignacion=' + idAsignacion;
    return this.http.put(url, {observe: 'response'});
  }
  putResponsivas2(idEquipo: number, idestatus: number , datos: any): Observable <any> {
    const url = this.urlAPIAsig + '/put/' + idEquipo + ',' + idestatus;
    return this.http.put(url, datos, {observe: 'response'});
  }
  getAsignacion(idAsignacion: number): Observable <any> {
    const url = this.urlAPIAsig + '/get/' + idAsignacion;
    return this.http.get(url, {observe: 'response'});
  }
  getAllSoftware(): Observable <any> {
    const url = this.urlAPISoft + '/get';
    return this.http.get(url, {observe: 'response'});
  }
  getAllEstatus(): Observable <any> {
    const url = this.urlAPIEstatus + '/get';
    return this.http.get(url, {observe: 'response'});
  }
  crearEquipoSoftware(equipo: number, software: number, equipoSoft: EquipoSoftware, historico?: number): Observable <any> {
    const url = this.urlApiEquSoft + '/post/' + equipo + ',' + software + ',' + historico;
    console.log(url);
    return this.http.post(url, equipoSoft, { observe: 'response' });
  }
  getAllHistorico(): Observable <any> {
    const url = this.urlAPIHist + '/get';
    return this.http.get(url, {observe: 'response'});
  }

  getHistorico(id: string): Observable <any> {
    const url = this.urlAPIHist + '/get/' +id;
    return this.http.get(url, {observe: 'response'});
  }
  crearSoftware(software: Software): Observable <any> {
    const url = this.urlAPISoft + '/post';
    return this.http.post(url, software, { observe: 'response'});
  }
  getSoftware(idsoftwre: number): Observable <any> {
    const url = this.urlAPISoft + '/get/' + idsoftwre;
    return this.http.get(url, {observe : 'response'});
  }

  crearAccesorioN(id_asignacion: number, id_accesorio: number): Observable <any> {
    const url = this.urlApiAccN + '/post/' + id_asignacion +','+ id_accesorio;
    return this.http.post(url, {observe: 'response'} );
  }

  getAllAccesorioN(): Observable <any> {
    const url = this.urlApiAccN + '/get';
    return this.http.get(url, {observe: 'response'});
  }

  crearAsignacionAcc(estatusId: number, datosAsigancion: Asignacion_accesorios): Observable <any> {
    const url = this.urlApiAsigAcc + '/post/' + estatusId;
    return this.http.post(url, datosAsigancion, {observe: 'response'} );
  }

  getAllAsignacionAcc(): Observable <any> {
    const url = this.urlApiAsigAcc + '/get';
    return this.http.get(url, {observe: 'response'});
  }

  putAsignacionAcc(idEstatus: number, datos:any): Observable <any> {
    const url = this.urlApiAsigAcc + '/put/' + idEstatus;
    return this.http.put(url, datos, {observe: 'response'});
  }
}