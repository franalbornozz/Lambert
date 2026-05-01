import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CamionListado {
  id: number;
  marca_camion: string;
  modelo_camion: string;
  ano_camion: string;
  estado_verificacion: string;
  tipo_camion: '4x2' | '6x2'; 
}

export interface ConfiguracionCamion {
  distancia_entre_ejes: number | null;
  distancia_primer_eje_espalda_cabina: number | null;
  voladizo_delantero: number | null;
  voladizo_trasero: number | null;
  peso_eje_delantero: number | null;
  peso_eje_trasero: number | null;
  pbt: number | null;
  ancho_chasis_1: number | null;
  ancho_chasis_2?: number | null;
} 
  
export interface CamionCompleto extends Omit<CamionListado, 'id' | 'estado_verificacion'> {
  id?: number;
  estado_verificacion?: string;
  configuracion: ConfiguracionCamion;
}

@Injectable({
  providedIn: 'root'
})

export class CamionService {
  private apiUrl = 'http://localhost:3000/api/camiones'; // backend local
  constructor(private http: HttpClient) {}

  getCamiones(): Observable<CamionListado[]> {
    return this.http.get<CamionListado[]>(this.apiUrl, { withCredentials: true });
  }

  getCamion(id: number): Observable<CamionListado> {
    return this.http.get<CamionListado>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }
    
  crearCamion(camion: Partial<CamionListado>): Observable<any> {
    return this.http.post<any>(this.apiUrl, camion, { withCredentials: true });
  }
  
  getConfiguracion(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/configuracion/${id}`, { withCredentials: true });
  }

}
