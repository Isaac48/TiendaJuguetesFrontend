import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';

import { JuguetesService } from '../../services/juguetes.service';
import { JuguetesModel } from '../../models/juguetes-model';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-juguetes',
  templateUrl: './juguetes.component.html',
  styleUrls: ['./juguetes.component.scss']
})
export class JuguetesComponent implements OnInit, OnDestroy {
  precio = "^([1-9][0-9]{0,2}|1000)$";
  edad = "^([1-9][0-9]{0,1}|99)$"
  form: FormGroup;
  suscription!: Subscription;
  producto!: JuguetesModel;
  idProducto? = 0;
  btnGuardar : string = 'Guardar';
  titulo: string = 'Agregar Juguete'
  //btnActualizar: string = 'Actualizar';

  nameField = new FormControl('Soy un control');

  constructor(private formBuilder: FormBuilder, 
              private juguetesService : JuguetesService,
              private toastr: ToastrService) { 
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      restriccionEdad: ['', [Validators.required, Validators.pattern(this.edad)]],
      compania: ['', [Validators.required]],
      precio: ['', [Validators.required, Validators.pattern(this.precio)]],
    })
  }

  ngOnInit(): void {
    this.suscription = this.juguetesService.obtenerProducto$().subscribe(data =>{
      this.producto = data;
      this.form.patchValue({
        nombre: this.producto.nombre,
        descripcion: this.producto.descripcion,
        restriccionEdad: this.producto.restriccionEdad,
        compania: this.producto.compania,
        precio: this.producto.precio,
      });
      console.log('soy el producto'+this.producto.id);
      if(this.producto.id?.toString() !== undefined){
        this.btnGuardar = 'Actualizar';
        this.titulo = 'Actualizar Juguete'
        this.idProducto = this.producto.id;
      }
     
    });
  }

  validNombre(){
    
  }
  guardarJuguete(){
    console.log(this.idProducto)
    if(this.idProducto === 0){
      console.log('crear')
      this.crear();
    }else{
      console.log('actualizar')
      this.editar();
    }
    
  }


  crear() {
    const producto : JuguetesModel = {
      nombre :this.form.get('nombre')?.value,
      descripcion :this.form.get('descripcion')?.value,
      restriccionEdad :this.form.get('restriccionEdad')?.value,
      compania :this.form.get('compania')?.value,
      precio :this.form.get('precio')?.value,
    }
    this.juguetesService.guardarProducto(producto).subscribe(data =>{
      this.toastr.success('Registro Agregado', 'Producto creado');
      this.juguetesService.obtenerProductos();
      this.form.reset();
    });
  }

  editar() {
    const producto : JuguetesModel = {
      id: this.producto.id,
      nombre :this.form.get('nombre')?.value,
      descripcion :this.form.get('descripcion')?.value,
      restriccionEdad :this.form.get('restriccionEdad')?.value,
      compania :this.form.get('compania')?.value,
      precio :this.form.get('precio')?.value,
    };
    this.juguetesService.actualizarProducto(producto).subscribe(data => {
      this.toastr.info('Registro Actualizado', 'Producto actualizado');
      this.juguetesService.obtenerProductos();
      this.form.reset();
      this.idProducto = 0;
      this.btnGuardar = 'Guardar';
      this.titulo = 'Agregar Juguete'
    })
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }

}
