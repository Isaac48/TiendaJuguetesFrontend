import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { JuguetesModel } from '../models/juguetes-model'

@Injectable({
  providedIn: 'root'
})
export class JuguetesService {
 
  urlBase ='https://localhost:44305/api/productos/';
  listProductos!: JuguetesModel[];
  private actualizarFormulario = new BehaviorSubject<JuguetesModel>({} as any);

  constructor(private http: HttpClient) { }

  guardarProducto(producto: JuguetesModel): Observable<JuguetesModel>{
    return this.http.post<JuguetesModel>(this.urlBase + 'Crear', producto)
  }

  eliminarProducto(producto: JuguetesModel): Observable<JuguetesModel>{
    console.log(producto);
    console.log(this.urlBase + 'Eliminar');
    return this.http.post<JuguetesModel>(this.urlBase + 'Eliminar', producto);
  }

  actualizarProducto(producto: JuguetesModel): Observable<JuguetesModel>{
    console.log(producto);
    console.log(this.urlBase + 'Actualizar');
    return this.http.post<JuguetesModel>(this.urlBase + 'Actualizar', producto);
  }

  obtenerProductos(){
    this.http.get(this.urlBase).toPromise()
                  .then(data =>{
                    this.listProductos = data as JuguetesModel[];
                    console.log(data);
                    console.log(this.listProductos);
                  })
  }

  actualizar(producto: any){
    this.actualizarFormulario.next(producto);
  }

  obtenerProducto$(): Observable<JuguetesModel>{
    return this.actualizarFormulario.asObservable();
  }

}

