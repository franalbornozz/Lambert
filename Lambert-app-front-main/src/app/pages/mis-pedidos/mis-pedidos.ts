import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PedidoService } from '../../services/pedido.service';
import { PedidoListado } from '../../types/pedido.types';

@Component({
  selector: 'app-mis-pedidos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './mis-pedidos.html',
  styleUrls: ['./mis-pedidos.scss']
})
export class MisPedidosComponent implements OnInit {
  pedidos: PedidoListado[] = [];

  constructor(private pedidoService: PedidoService) {}

ngOnInit(): void {
  this.pedidoService.getPedidos().subscribe({
    next: (data) => this.pedidos = data,
    error: (err) => console.error('Error al cargar pedidos:', err)
  });
}

}
