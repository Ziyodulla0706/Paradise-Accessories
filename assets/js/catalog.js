/**
 * Catalog/Products динамическая загрузка из CMS
 * Подгружает продукты из Django API
 */

const API_BASE_URL = 'http://localhost:8000';

/**
 * Загрузить продукты из API
 */
async function loadProductsFromCMS() {
    try {
        const lang = document.documentElement.lang || 'ru';
        const response = await fetch(`${API_BASE_URL}/api/content/products/?lang=${lang}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        renderProducts(data.results);
    } catch (error) {
        console.error('Ошибка загрузки продуктов:', error);
        // Оставляем статическое содержимое если API недоступно
    }
}

/**
 * Отрисовать карточки продуктов
 */
function renderProducts(products) {
    const container = document.querySelector('.catalog-grid');
    if (!container || products.length === 0) return;

    // Очищаем текущее содержимое
    container.innerHTML = '';

    // Создаем карточки продуктов
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card fade-in';

        const shortDesc = product.short_description ||
            (product.description ? product.description.substring(0, 150) + '...' : '');

        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.main_image_url || product.main_image}" 
                     alt="${product.name}"
                     loading="lazy">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${shortDesc}</p>
                <a href="#contact" class="btn btn-primary product-cta">Заказать расчет</a>
            </div>
        `;

        container.appendChild(productCard);
    });
}

// Загрузить при загрузке страницы
document.addEventListener('DOMContentLoaded', loadProductsFromCMS);
