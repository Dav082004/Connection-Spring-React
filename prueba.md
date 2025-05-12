# Diagrama de Clases - Sistema "Como en Casa"

Este diagrama de clases modela el sistema propuesto para digitalizar y automatizar la gestión del negocio "Como en Casa", permitiendo un mejor control de pedidos, pagos, clientes, productos y reportes.

## Diagrama UML

```plantuml
@startuml
' #############################
' ## Clases Principales ##
' #############################

class Cliente {
  - id: Long
  - nombre: String
  - correo: String
  - telefono: String
  - direccion: String
  - contrasena: String
  - tipoDocumento: Enum{DNI, RUC, CE}
  - numeroDocumento: String

  + registrar()
  + iniciarSesion()
  + realizarPedido()
  + verHistorialPedidos(): List<Pedido>
}

class Administrador {
  - id: Long
  - nombre: String
  - correo: String
  - contrasena: String

  + generarReporteVentas()
  + verEstadisticas()
  + gestionarCatalogo()
}

class Pedido {
  - id: Long
  - fechaCreacion: Date
  - fechaEntrega: Date
  - estado: Enum{Pendiente, EnPreparacion, Entregado, Cancelado}
  - subtotal: Double
  - costoProduccion: Double
  - necesitaComprobante: Boolean
  - tipoComprobante: Enum{Factura, Boleta}

  + calcularTotal()
  + cambiarEstado()
  + generarComprobante()
}

class Producto {
  - id: Long
  - nombre: String
  - descripcion: String
  - precioVenta: Double
  - costoProduccion: Double
  - disponible: Boolean
  - tiempoPreparacion: Integer
  - categoria: Enum{Pastel, Galleta, Postre}

  + calcularMargenGanancia(): Double
}

class Pago {
  - id: Long
  - fecha: Date
  - metodo: Enum{Yape, Plin, Tarjeta, Efectivo}
  - estado: Enum{Pagado, Pendiente, Rechazado}
  - monto: Double

  + confirmarPago()
  + seleccionarTipoComprobante()
}

class Inventario {
  - id: Long
  - cantidadDisponible: Integer

  + actualizarStock()
  + verificarDisponibilidad()
}

class Seguimiento {
  - id: Long
  - fecha: Date
  - estadoAnterior: Enum
  - estadoNuevo: Enum
  - observaciones: String
}

' #############################
' ## Comprobantes ##
' #############################

class Comprobante {
  <<abstract>>
  - id: Long
  - fechaEmision: Date
  - numeroSerie: String
  - numeroComprobante: String
  - subtotal: Double
  - total: Double
}

class Factura {
  - rucCliente: String
  - razonSocial: String
  - direccionFiscal: String
}

class Boleta {
  - dniCliente: String
  - nombreCliente: String
}

' #############################
' ## Sistema de Reportes ##
' #############################

class ReporteVentas {
  - id: Long
  - fechaInicio: Date
  - fechaFin: Date
  - tipoReporte: Enum{Diario, Semanal, Mensual, Anual}
  - totalVentas: Double
  - totalCostos: Double
  - margenGanancia: Double

  + generarGraficoVentas()
  + calcularMetricas()
}

class ReporteCategoria {
  - id: Long
  - categoria: Enum{Pastel, Galleta, Postre}
  - cantidadVendida: Integer
  - porcentajeVentas: Double
  - margenGanancia: Double
}

' #############################
' ## Relaciones ##
' #############################

Cliente "1" --> "0..*" Pedido: Realiza >
Administrador "1" --> "0..*" ReporteVentas: Genera >
Administrador "1" --> "0..*" ReporteCategoria: Genera >

Pedido "1" --> "1..*" Producto: Contiene >
Pedido "1" --> "1" Pago: Tiene >
Pedido "1" --> "0..1" Comprobante: Genera >
Pedido "1" --> "0..*" Seguimiento: Tiene >

Producto "1" --> "1" Inventario: Gestiona >

Pago "1" --> "1" Comprobante: Produce >

Comprobante <|-- Factura
Comprobante <|-- Boleta

ReporteVentas "1" --> "1..*" ReporteCategoria: Incluye >
ReporteVentas "1" --> "1..*" Pedido: Analiza >
@enduml
```
