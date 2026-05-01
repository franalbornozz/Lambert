import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PedidoService } from '../../services/pedido.service';
import { Cliente } from '../../types/pedido.types';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.html',
  styleUrls: ['./clientes.scss'],
  standalone: true,
  imports: [RouterModule]  
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[] = [];
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
        error: () => {
          this.error = 'Error al cargar clientes';
          this.cargando = false;
        }
      });
  }
}
