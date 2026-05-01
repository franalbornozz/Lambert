import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PedidoService } from '../../../services/pedido.service';
import { PedidoDetalle } from '../../../types/pedido.types';

@Component({
  selector: 'app-pedido-detalle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-pedidos.html',
  styleUrls: ['./detalle-pedidos.scss']
})
export class PedidoDetalleComponent implements OnInit {
  pedido: PedidoDetalle | null = null;

  constructor(
    private route: ActivatedRoute,
    private pedidoService: PedidoService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const esModificado = this.route.snapshot.queryParamMap.get('es_modificado') === 'true';
    
    if (id) {
      this.pedidoService.getPedidoById(+id, esModificado).subscribe({
        next: (data) => {
          console.log('Detalle recibido:', data);
          this.pedido = data;   
        },
        error: (err) => console.error('Error al cargar detalle:', err)
      });
    }
  }
}
