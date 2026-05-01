import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  DatosFormularioProyecto,
  ProyectoCompletoParaGuardar,
  ProyectoResponse,
  SimulacionResponse
} from '../types/proyecto.types';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  private apiUrl = 'http://localhost:3000/api/proyectos'; // Ajustá si usás proxy

  constructor(private http: HttpClient) {}

  // Simular proyecto (no guarda en BD, solo devuelve cálculos)
  simularProyecto(datos: DatosFormularioProyecto): Observable<SimulacionResponse> {
    return this.http.post<SimulacionResponse>(`${this.apiUrl}/simular`, datos, { withCredentials: true });
  }

  // Guardar proyecto (inserta en BD y devuelve el objeto guardado)
  guardarProyecto(proyecto: ProyectoCompletoParaGuardar): Observable<ProyectoResponse> {
    return this.http.post<ProyectoResponse>(`${this.apiUrl}/guardar`, proyecto, { withCredentials: true });
  }

}
