import { Component, OnInit } from '@angular/core';
import { JuguetesService } from '../../services/juguetes.service';
import { JuguetesModel } from '../../models/juguetes-model';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-juguetes',
  templateUrl: './list-juguetes.component.html',
  styleUrls: ['./list-juguetes.component.scss']
})
export class ListJuguetesComponent implements OnInit {

  constructor(public juguetesService : JuguetesService,
              public toastr: ToastrService) { }

  ngOnInit(): void {
    this.juguetesService.obtenerProductos();
  }

  eliminarProducto(producto: JuguetesModel){
    Swal.fire({
      title: 'Quieres eliminar el registro?',
      showDenyButton: true,
      confirmButtonText: 'Si',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Eliminado!', '', 'success')
        this.juguetesService.eliminarProducto(producto).subscribe(data =>{
          this.toastr.warning('Registro eliminado', '')
          this.juguetesService.obtenerProductos();
        });
      } 
    })
  }

  editarProducto(producto: JuguetesModel){
    this.juguetesService.actualizar(producto);
  }


}
