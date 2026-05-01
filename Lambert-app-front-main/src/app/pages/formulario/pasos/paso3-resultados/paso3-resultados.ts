import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProyectoService } from '../../../../services/proyecto.service';
import { DatosFormularioProyecto, ResultadosCalculo } from '../../../../types/proyecto.types';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-paso3-resultados',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paso3-resultados.html',
  styleUrls: ['./paso3-resultados.scss']
})
export class Paso3ResultadosComponent implements OnInit {

  @Input() datosProyecto!: DatosFormularioProyecto;
  @Output() modificar = new EventEmitter<void>();
  @Output() guardar = new EventEmitter<ResultadosCalculo>();
  @Output() siguiente = new EventEmitter<void>();

  resultados: ResultadosCalculo | null = null;
  cargando = true;
  error = '';
  mostrarDetalles = false;

  constructor(private proyectoService: ProyectoService) {}

  async ngOnInit() {
    console.log('Datos recibidos en Paso 3:', this.datosProyecto);

    try {
      const resp = await firstValueFrom(this.proyectoService.simularProyecto(this.datosProyecto));
      this.resultados = resp;
      this.cargando = false;

    } catch (err) {
      console.error('Error en la simulación:', err);
      this.error = 'No se pudieron calcular los resultados.';
      this.cargando = false;
    }
  }

  alternarDetalles() {
    this.mostrarDetalles = !this.mostrarDetalles;
  }

  volverAModificar() {
    this.modificar.emit();
  }

  guardarProyecto() {
  if (this.resultados) {
    this.guardar.emit(this.resultados);
    this.siguiente.emit();
  }
  }

}
