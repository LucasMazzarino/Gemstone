# Gemstone Uruguay E-commerce Platform

**Este proyecto fue desarrollado para Gemstone Uruguay, una joyería en Uruguay, con el objetivo de crear una plataforma de e-commerce robusta y eficiente. La aplicación se construyó utilizando tecnologías modernas y enfocándose en un rendimiento óptimo y una excelente experiencia de usuario. Uno de los objetivos a cumplir para el desarrollo de este producto era crear la plataforma utilizando 100% de TypeScript por lo que opte usar las siguientes herramientas para cumplir con esta meta.**

## Tecnologías Utilizadas

- **Next.js 14:** Un framework de React que ofrece renderizado del lado del servidor y generación de sitios estáticos para una mejor performance y SEO.
- **Payload CMS:** Un CMS de headless construido con Node.js y Express que proporciona una administración de contenido fácil y potente.
- **tRPC:** Un framework para crear APIs typesafe con TypeScript sin necesidad de escribir código adicional.
- **[TypeScript](https://www.typescriptlang.org/)**

## Características del Proyecto

### 1. **E-commerce Completo**
- **Gestión de Productos:** Administrar productos, categorías, y stock desde el CMS de Payload.**
- **Carrito de Compras:** Implementación de un carrito de compras funcional con capacidad para ajustar cantidades y eliminar productos.
- **Pasarela de Pago:** Integración con Mercado Pago para procesar pagos de manera segura y eficiente.
- **Historial de Pedidos:** Los usuarios pueden ver su historial de pedidos y detalles de cada compra.

### 2. **Frontend Moderno**
- **SSR y SSG:** Renderizado del lado del servidor y generación de sitios estáticos para un rendimiento óptimo y mejor SEO.
- **Interfaz de Usuario Atractiva:** Uso de componentes de React y diseño responsivo para una experiencia de usuario fluida en todos los dispositivos.
- **Manejo de Imágenes:** Las imágenes se almacenan y sirven desde un bucket de Cloudflare R2, garantizando rapidez y fiabilidad.

### 3. **Backend Sólido**
- **API Typesafe:** Uso de tRPC para crear APIs typesafe, lo que reduce errores y mejora la productividad del desarrollo.
- **Gestión de Usuarios:** Sistema de autenticación y autorización robusto para gestionar diferentes tipos de usuarios (cliente y cliente mayorista).

### 4. **Experiencia de Usuario Mejorada**
- **Notificaciones por Email: Envío de emails de confirmación y actualización de estado de pedidos.**
- **Optimización para SEO: Uso de técnicas de SEO avanzadas para mejorar la visibilidad en motores de búsqueda.

## Implementación de la Pasarela de Pago

- **Se utilizó Mercado Pago para la integración de la pasarela de pagos. Algunas características clave incluyen:**
- **Pagos Seguros:** Procesamiento de pagos con altos estándares de seguridad.
- **Diversos Métodos de Pago:** Aceptación de múltiples métodos de pago incluyendo tarjetas de crédito, débito y transferencias bancarias.
- **Notificaciones de Pago:** Implementación de Webhooks para recibir notificaciones en tiempo real sobre el estado de los pagos.

## Requisitos del Sistema

- **Node.js:** Versión 14 o superior.
- **npm:** Versión 6 o superior.


