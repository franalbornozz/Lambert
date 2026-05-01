import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CamionService, CamionListado, CamionCompleto } from '../../services/camion.service';
import { LoginService, User } from '../../services/auth/login.service';

@Component({
  selector: 'app-camiones',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './camiones.html',
  styleUrls: ['./camiones.scss'],
})
export class CamionesComponent implements OnInit {
  camiones: CamionListado[] = [];
  cargando = true;
  error = '';
  tipoSeleccionado: '' | '4x2' | '6x2' = '';
  currentUser: User | null = null;

  constructor(private camionService: CamionService, private loginService: LoginService) {}

  ngOnInit(): void {
    this.currentUser = this.loginService.getCurrentUser();
    this.camionService.getCamiones().subscribe({
      next: (data) => {
        this.camiones = data;
        this.cargando = false;
      },
      error: (err) => {
        this.error = 'Error al obtener camiones';
        console.error(err);
        this.cargando = false;
      },
    });
  }

  nuevoCamionOriginal(): void {
    const nuevoCamion: CamionCompleto = {
      marca_camion: '',
      modelo_camion: '',
      ano_camion: '', 
      tipo_camion: '4x2',
      configuracion: {
        distancia_entre_ejes: null,
        distancia_primer_eje_espalda_cabina: null,
        voladizo_delantero: null,
        voladizo_trasero: null,
        peso_eje_delantero: null, 
        peso_eje_trasero: null,
        pbt: null,
        ancho_chasis_1: null,
        ancho_chasis_2: null
      }
    };
  
    this.camionService.crearCamion(nuevoCamion).subscribe({
      next: (res) => {
        console.log('Camión original creado', res);
        this.camiones.push({ ...nuevoCamion, id: res.id, estado_verificacion: 'verificado' });
      },
      error: (err) => {
        console.error('Error creando camión', err);
      }
    });
  }

}
