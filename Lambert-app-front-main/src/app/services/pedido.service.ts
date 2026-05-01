import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente, PedidoDto, PedidoListado, PedidoResponse, PedidoDetalle } from '../types/pedido.types';


@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  // Obtener lista de clientes
  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.apiUrl}/clientes`, {withCredentials: true});
  }

  // Guardar un pedido con resultados
  guardarPedido(pedidoDto: PedidoDto): Observable<PedidoResponse> {
    return this.http.post<PedidoResponse>(`${this.apiUrl}/proyectos/guardar`, pedidoDto, {withCredentials: true});
  }

  // Obtener pedidos (admin ve todos, vendedor ve los suyos)
  getPedidos(): Observable<PedidoListado[]> {
    return this.http.get<PedidoListado[]>(`${this.apiUrl}/admin/pedidos`, { withCredentials: true });
  }

  // Obtener detalle de un pedido por ID
  getPedidoById(id: number, esModificado: boolean = false): Observable<PedidoDetalle> {
    return this.http.get<PedidoDetalle>(
      `${this.apiUrl}/admin/pedidos/${id}?es_modificado=${esModificado}`, { withCredentials: true });
  }

  crearCliente(cliente: Cliente): Observable<any> {
    return this.http.post(`${this.apiUrl}/clientes`, cliente, { withCredentials: true });
  }


}
