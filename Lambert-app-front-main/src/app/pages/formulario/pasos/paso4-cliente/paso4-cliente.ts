import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PedidoService } from '../../../../services/pedido.service';
import { Cliente, PedidoDto } from '../../../../types/pedido.types';
import { DatosFormularioProyecto } from '../../../../types/proyecto.types';

@Component({
  selector: 'app-paso4-cliente',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './paso4-cliente.html'
})
export class Paso4ClienteComponent {
  @Input() datosProyecto!: DatosFormularioProyecto; // Objeto armado en FormularioComponent
  @Input() esModificado: boolean = false
  @Input() resultados!: any; // Resultados del Paso 3

  clientes: Cliente[] = [];
  clienteSeleccionado: Cliente | null = null;
  cargando = false;
  error: string | null = null;

  constructor(private pedidoService: PedidoService) {}

  ngOnInit(): void {
    this.obtenerClientes();
  }

  obtenerClientes(): void {
    this.cargando = true;
    this.pedidoService.getClientes()
      .subscribe({
        next: (data) => {
          this.clientes = data;
          this.cargando = false;
        },
        error: (err) => {
          this.error = 'Error al cargar clientes';
          this.cargando = false;
        }
      });
  }

  guardarPedido(): void {
    if (!this.clienteSeleccionado || !this.resultados || !this.datosProyecto) return;

    this.datosProyecto.cliente = { ...this.clienteSeleccionado };

    const pedidoDto: PedidoDto = {
      es_modificado: this.esModificado,
      datosEntrada: this.datosProyecto!,
      resultados: this.resultados
    };

    console.log('DEBUG pedidoDto', pedidoDto);

    this.pedidoService.guardarPedido(pedidoDto)
      .subscribe({
        next: () => alert('Pedido guardado correctamente'),
        error: (err) => {
          console.error('Error detalle:', err);
          alert('Error al guardar el pedido');}
        });
  }
}
