import { Injectable } from '@angular/core';
import { DatosFormularioProyecto } from '../types/proyecto.types';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {
  private datosProyecto: DatosFormularioProyecto | null = null;

  setDatosProyecto(datos: DatosFormularioProyecto) {
    this.datosProyecto = datos;
  }

  getDatosProyecto(): DatosFormularioProyecto | null {
    return this.datosProyecto;
  }

  clearDatosProyecto() {
    this.datosProyecto = null;
  }
}
