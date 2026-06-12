// Base de datos de ejemplo (Puedes expandirla con tus platillos reales)
const productos = [
    { id: 1, nombre: "Espresso Italiano", categoria: "cafes", precio: 3.50 },
    { id: 2, nombre: "Capuccino Tradicional", categoria: "cafes", precio: 4.20 },
    { id: 3, nombre: "Frappe de Oreo", categoria: "frappes", precio: 5.50 },
    { id: 4, nombre: "Frappe de Cajeta", categoria: "frappes", precio: 5.20 },
    { id: 5, nombre: "Cheesecake de Fresa", categoria: "postres", precio: 4.80 },
    { id: 6, nombre: "Panini de Tres Quesos", categoria: "comidas", precio: 6.50 },
    { id: 7, nombre: "Croissant de Mantequilla", categoria: "panes", precio: 3.00 }
];

let carrito = [];

// Elementos del DOM
const btnMenu = document.getElementById('btn-menu');
const welcomeScreen = document.getElementById('welcome-screen');
const menuSection = document.getElementById('menu-section');
const productsContainer = document.getElementById('products-container');

const btnCart = document.getElementById('btn-cart');
const cartModal = document.getElementById('cart-modal');
const closeCart = document.getElementById('close-cart');
const cartItemsContainer = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotalVal = document.getElementById('cart-total-val');

// 1. Alternar vistas (Bienvenida -> Menú)
btnMenu.addEventListener('click', (e) => {
    e.preventDefault();
    welcomeScreen.classList.add('hidden');
    menuSection.classList.remove('hidden');
    // Carga la primera categoría por defecto
    filterCategory('cafes');
});

// 2. Filtrar y renderizar productos en la interfaz
function filterCategory(categoria) {
    // Actualizar estados visuales de los botones laterales
    document.querySelectorAll('.category-btn').forEach(btn => {
        if(btn.textContent.toLowerCase() === categoria) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Filtrar productos
    const productosFiltrados = productos.filter(p => p.categoria === categoria);
    
    // Renderizar HTML
    productsContainer.innerHTML = '';
    productosFiltrados.forEach(prod => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-img"></div> <div>
                <div class="product-name">${prod.nombre}</div>
                <div class="product-price">$${prod.precio.toFixed(2)}</div>
            </div>
            <button class="btn-black" onclick="agregarAlCarrito(${prod.id})">Agregar</button>
        `;
        productsContainer.appendChild(card);
    });
}

// 3. Funciones del Carrito de Compras
function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    const existe = carrito.find(item => item.id === id);

    if (existe) {
        existe.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }
    actualizarInterfazCarrito();
}

function eliminarDelCarrito(id) {
    carrito = carrito.filter(item => item.id !== id);
    actualizarInterfazCarrito();
}

function actualizarInterfazCarrito() {
    // Contador del navbar
    const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    cartCount.textContent = totalItems;

    // Renderizar lista del modal
    cartItemsContainer.innerHTML = '';
    if (carrito.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart-msg">El carrito está vacío.</p>';
    } else {
        carrito.forEach(item => {
            const row = document.createElement('div');
            row.className = 'cart-item';
            row.innerHTML = `
                <div>
                    <strong>${item.nombre}</strong> x${item.cantidad}
                    <br><small>$${(item.precio * item.cantidad).toFixed(2)}</small>
                </div>
                <button class="icon-btn" style="color:red;" onclick="eliminarDelCarrito(${item.id})">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            `;
            cartItemsContainer.appendChild(row);
        });
    }

    // Calcular e imprimir Total
    const totalDinero = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
    cartTotalVal.textContent = totalDinero.toFixed(2);
}

// 4. Abrir / Cerrar Ventana del Carrito
btnCart.addEventListener('click', () => cartModal.classList.remove('hidden'));
closeCart.addEventListener('click', () => cartModal.classList.add('hidden'));
window.addEventListener('click', (e) => {
    if (e.target === cartModal) cartModal.classList.add('hidden');
});