import { DecimalPipe } from "@angular/common";

export class JuguetesModel{
    id?: number;
    nombre!: string;
    descripcion!: string;
    restriccionEdad!: number;
    compania!: string;
    precio!: number;
}