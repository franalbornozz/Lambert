import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CamionService, CamionListado, ConfiguracionCamion } from '../../../services/camion.service';

@Component({
  selector: 'app-camion-detalle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-camiones.html',
  styleUrls: ['./detalle-camiones.scss'],
})
export class CamionDetalleComponent implements OnInit {
  camion: CamionListado | null = null;
  configuracion: ConfiguracionCamion | null = null;
  camionId: number | null = null;

  constructor(private route: ActivatedRoute, private router: Router,  private camionService: CamionService) {}

  ngOnInit(): void {
  const idParam = this.route.snapshot.paramMap.get('id');
  if (idParam) {
    const id = Number(idParam);

    this.camionService.getCamion(id).subscribe({
      next: (data) => (this.camion = data),
      error: (err) => console.error('Error cargando camión', err),
    });

    this.camionService.getConfiguracion(id).subscribe({
      next: (data) => (this.configuracion = data),
      error: (err) => console.error('Error cargando configuración', err),
    });
  }
}

}
