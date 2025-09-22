// Global state management
const state = {
    currentView: 'home',
    user: null,
    products: [
        {
            id: "1",
            name: "Café Americano",
            category: "bebidas",
            price: 4500,
            description: "Café negro tradicional, fuerte y aromático",
            available: true,
            image: "https://images.unsplash.com/photo-1669872484166-e11b9638b50e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBhbWVyaWNhbm8lMjBibGFja3xlbnwxfHx8fDE3NTgzNzg3MTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
            createdAt: new Date("2024-01-15")
        },
        {
            id: "2",
            name: "Cappuccino",
            category: "bebidas",
            price: 6500,
            description: "Café espresso con leche vaporizada y espuma cremosa",
            available: true,
            image: "https://images.unsplash.com/photo-1643909618082-d916d591c2a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXBwdWNjaW5vJTIwZm9hbSUyMGFydHxlbnwxfHx8fDE3NTgzNjA4NTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
            createdAt: new Date("2024-01-15")
        },
        {
            id: "3",
            name: "Croissant de Jamón",
            category: "snacks",
            price: 8500,
            description: "Croissant francés relleno de jamón y queso",
            available: true,
            image: "https://images.unsplash.com/photo-1627915863490-74d51279f87b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9pc3NhbnQlMjBoYW0lMjBjaGVlc2V8ZW58MXx8fHwxNzU4Mzc4NzIwfDA&ixlib=rb-4.1.0&q=80&w=1080",
            createdAt: new Date("2024-01-16")
        },
        {
            id: "4",
            name: "Tiramisú",
            category: "postres",
            price: 12500,
            description: "Postre italiano con mascarpone y café",
            available: true,
            image: "https://images.unsplash.com/photo-1710106519622-8c49d0bcff2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aXJhbWlzdSUyMGRlc3NlcnR8ZW58MXx8fHwxNzU4Mjc4MzE0fDA&ixlib=rb-4.1.0&q=80&w=1080",
            createdAt: new Date("2024-01-17")
        },
        {
            id: "5",
            name: "Sandwich Clásico",
            category: "comidas",
            price: 15500,
            description: "Sandwich de pollo con vegetales frescos",
            available: true,
            image: "https://images.unsplash.com/photo-1703219342329-fce8488cf443?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwc2FuZHdpY2h8ZW58MXx8fHwxNzU4MjczOTYwfDA&ixlib=rb-4.1.0&q=80&w=1080",
            createdAt: new Date("2024-01-18")
        },
        {
            id: "6",
            name: "Latte Vainilla",
            category: "bebidas",
            price: 7500,
            description: "Café latte con sirope de vainilla",
            available: true,
            image: "https://images.unsplash.com/photo-1683122925249-8b15d807db4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2YW5pbGxhJTIwbGF0dGUlMjBjb2ZmZWV8ZW58MXx8fHwxNzU4Mzc4NzIxfDA&ixlib=rb-4.1.0&q=80&w=1080",
            createdAt: new Date("2024-01-19")
        }
    ],
    selectedProduct: null,
    cart: [],
    currentCategory: 'todos',
    searchTerm: '',
    editingProduct: null
};

// Navigation functions
function navigateToView(viewName) {
    // Hide all views
    document.querySelectorAll('.view').forEach(view => {
        view.classList.remove('active');
    });
    
    // Show selected view
    const targetView = document.getElementById(`${viewName}-view`);
    if (targetView) {
        targetView.classList.add('active');
        state.currentView = viewName;
        
        // Update content based on view
        switch(viewName) {
            case 'products':
                renderProducts();
                renderCart();
                updateUserDisplay();
                break;
            case 'product-detail':
                renderProductDetail();
                updateUserDisplay();
                break;
            case 'admin':
                renderAdminProducts();
                updateUserDisplay();
                break;
        }
    }
}

// Authentication functions
function handleLogin(email, password) {
    if (email === "admin@cafeteria.com" && password === "admin123") {
        state.user = {
            id: "1",
            email: "admin@cafeteria.com",
            name: "Administrador",
            role: "admin"
        };
        navigateToView('admin');
        showToast('¡Bienvenido Administrador!', 'success');
    } else {
        state.user = {
            id: "2",
            email: email,
            name: "Cliente",
            role: "customer"
        };
        navigateToView('products');
        showToast('¡Bienvenido!', 'success');
    }
}

function handleRegister(name, email, password) {
    state.user = {
        id: Date.now().toString(),
        email,
        name,
        role: "customer"
    };
    navigateToView('products');
    showToast('¡Cuenta creada exitosamente!', 'success');
}

function logout() {
    state.user = null;
    state.cart = [];
    navigateToView('home');
    showToast('Sesión cerrada', 'success');
}

function updateUserDisplay() {
    const userNameElements = ['user-name', 'detail-user-name', 'admin-user-name'];
    userNameElements.forEach(id => {
        const element = document.getElementById(id);
        if (element && state.user) {
            element.textContent = state.user.name;
        }
    });
}

// Product functions
function renderProducts() {
    const container = document.getElementById('products-grid');
    if (!container) return;
    
    let filteredProducts = state.products.filter(product => {
        const matchesCategory = state.currentCategory === 'todos' || product.category === state.currentCategory;
        const matchesSearch = product.name.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
                            product.description.toLowerCase().includes(state.searchTerm.toLowerCase());
        return matchesCategory && matchesSearch && product.available;
    });
    
    container.innerHTML = '';
    
    if (filteredProducts.length === 0) {
        container.innerHTML = '<p style="text-align: center; grid-column: 1 / -1; color: var(--muted-foreground);">No se encontraron productos</p>';
        return;
    }
    
    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card fade-in';
        productCard.onclick = () => selectProduct(product);
        
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
            <div class="product-info">
                <div class="product-header">
                    <h4 class="product-name">${product.name}</h4>
                    <span class="category-badge">${product.category}</span>
                </div>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <span class="product-price">$${product.price.toLocaleString()}</span>
                    <button class="add-to-cart-btn" onclick="event.stopPropagation(); addToCart('${product.id}')">
                        + Agregar
                    </button>
                </div>
            </div>
        `;
        
        container.appendChild(productCard);
    });
}

function selectProduct(product) {
    state.selectedProduct = product;
    navigateToView('product-detail');
}

function renderProductDetail() {
    const container = document.getElementById('product-detail-content');
    if (!container || !state.selectedProduct) return;
    
    const product = state.selectedProduct;
    
    container.innerHTML = `
        <div class="fade-in">
            <img src="${product.image}" alt="${product.name}" class="product-detail-image">
        </div>
        <div class="product-detail-info fade-in">
            <h1>${product.name}</h1>
            <span class="category-badge">${product.category}</span>
            <div class="product-detail-price">$${product.price.toLocaleString()}</div>
            <p class="product-detail-description">${product.description}</p>
            <div class="product-detail-actions">
                <button class="btn btn-primary btn-large" onclick="addToCart('${product.id}')">
                    Agregar al Carrito
                </button>
                <button class="btn btn-secondary" onclick="navigateToView('products')">
                    ← Volver al Catálogo
                </button>
            </div>
        </div>
    `;
}

// Cart functions
function addToCart(productId) {
    const product = state.products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = state.cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        state.cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }
    
    renderCart();
    showToast(`${product.name} agregado al carrito`, 'success');
}

function removeFromCart(productId) {
    const itemIndex = state.cart.findIndex(item => item.id === productId);
    if (itemIndex > -1) {
        const item = state.cart[itemIndex];
        if (item.quantity > 1) {
            item.quantity -= 1;
        } else {
            state.cart.splice(itemIndex, 1);
        }
        renderCart();
        showToast('Producto removido del carrito', 'success');
    }
}

function renderCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    if (!cartItems || !cartTotal) return;
    
    if (state.cart.length === 0) {
        cartItems.innerHTML = '<p style="color: var(--muted-foreground); text-align: center;">Carrito vacío</p>';
        cartTotal.textContent = 'Total: $0';
        return;
    }
    
    cartItems.innerHTML = '';
    let total = 0;
    
    state.cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">$${item.price.toLocaleString()} x ${item.quantity}</div>
            </div>
            <div class="cart-item-controls">
                <button class="quantity-btn" onclick="removeFromCart('${item.id}')">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn" onclick="addToCart('${item.id}')">+</button>
            </div>
        `;
        
        cartItems.appendChild(cartItem);
    });
    
    cartTotal.textContent = `Total: $${total.toLocaleString()}`;
}

// Filter and search functions
function setupFiltersAndSearch() {
    const searchInput = document.getElementById('search-input');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            state.searchTerm = e.target.value;
            renderProducts();
        });
    }
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            state.currentCategory = button.dataset.category;
            renderProducts();
        });
    });
}

// Admin functions
function renderAdminProducts() {
    const container = document.getElementById('admin-products-list');
    if (!container) return;
    
    container.innerHTML = '';
    
    state.products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.className = 'admin-product-item fade-in';
        
        productItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="admin-product-image">
            <div class="admin-product-info">
                <h4>${product.name}</h4>
                <p><strong>Categoría:</strong> ${product.category}</p>
                <p><strong>Precio:</strong> $${product.price.toLocaleString()}</p>
                <p><strong>Descripción:</strong> ${product.description}</p>
            </div>
            <div class="admin-product-actions">
                <button class="btn btn-secondary btn-small" onclick="editProduct('${product.id}')">
                    Editar
                </button>
                <button class="btn btn-destructive btn-small" onclick="deleteProduct('${product.id}')">
                    Eliminar
                </button>
            </div>
        `;
        
        container.appendChild(productItem);
    });
}

function showAddProductForm() {
    state.editingProduct = null;
    document.getElementById('form-title').textContent = 'Agregar Producto';
    document.getElementById('product-form').reset();
    document.getElementById('product-id').value = '';
    document.getElementById('admin-product-form').style.display = 'block';
    document.getElementById('admin-product-form').scrollIntoView({ behavior: 'smooth' });
}

function editProduct(productId) {
    const product = state.products.find(p => p.id === productId);
    if (!product) return;
    
    state.editingProduct = product;
    document.getElementById('form-title').textContent = 'Editar Producto';
    document.getElementById('product-id').value = product.id;
    document.getElementById('product-name').value = product.name;
    document.getElementById('product-category').value = product.category;
    document.getElementById('product-price').value = product.price;
    document.getElementById('product-description').value = product.description;
    document.getElementById('product-image').value = product.image || '';
    
    document.getElementById('admin-product-form').style.display = 'block';
    document.getElementById('admin-product-form').scrollIntoView({ behavior: 'smooth' });
}

function deleteProduct(productId) {
    if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
        state.products = state.products.filter(p => p.id !== productId);
        renderAdminProducts();
        showToast('Producto eliminado exitosamente', 'success');
    }
}

function hideProductForm() {
    document.getElementById('admin-product-form').style.display = 'none';
    state.editingProduct = null;
}

function handleProductForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const productData = {
        name: document.getElementById('product-name').value,
        category: document.getElementById('product-category').value,
        price: parseFloat(document.getElementById('product-price').value),
        description: document.getElementById('product-description').value,
        image: document.getElementById('product-image').value || 'https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?w=400',
        available: true,
        createdAt: new Date()
    };
    
    const productId = document.getElementById('product-id').value;
    
    if (productId) {
        // Edit existing product
        const productIndex = state.products.findIndex(p => p.id === productId);
        if (productIndex > -1) {
            state.products[productIndex] = { ...state.products[productIndex], ...productData };
            showToast('Producto actualizado exitosamente', 'success');
        }
    } else {
        // Add new product
        const newProduct = {
            id: Date.now().toString(),
            ...productData
        };
        state.products.push(newProduct);
        showToast('Producto agregado exitosamente', 'success');
    }
    
    renderAdminProducts();
    hideProductForm();
}

// Toast notifications
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Login form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            handleLogin(email, password);
        });
    }
    
    // Register form
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('register-name').value;
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;
            handleRegister(name, email, password);
        });
    }
    
    // Product form
    const productForm = document.getElementById('product-form');
    if (productForm) {
        productForm.addEventListener('submit', handleProductForm);
    }
    
    // Setup filters and search
    setupFiltersAndSearch();
    
    // Initial render
    if (state.currentView === 'home') {
        navigateToView('home');
    }
});

// Utility functions
function formatPrice(price) {
    return `$${price.toLocaleString()}`;
}

function getCategoryDisplayName(category) {
    const categoryNames = {
        'bebidas': 'Bebidas',
        'comidas': 'Comidas',
        'postres': 'Postres',
        'snacks': 'Snacks'
    };
    return categoryNames[category] || category;
}

// Export functions for global access
window.navigateToView = navigateToView;
window.logout = logout;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.selectProduct = selectProduct;
window.showAddProductForm = showAddProductForm;
window.editProduct = editProduct;
window.deleteProduct = deleteProduct;
window.hideProductForm = hideProductForm;

