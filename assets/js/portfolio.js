/**
 * Portfolio динамическая загрузка из CMS
 * Подгружает портфолио из Django API
 */

const API_BASE_URL = 'http://localhost:8000';

/**
 * Загрузить элементы портфолио из API
 */
async function loadPortfolioFromCMS() {
    try {
        const lang = document.documentElement.lang || 'ru';
        const response = await fetch(`${API_BASE_URL}/api/content/portfolio/?lang=${lang}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        renderPortfolio(data.results);
    } catch (error) {
        console.error('Ошибка загрузки портфолио:', error);
        // Показываем статические изображения если API недоступно
        renderStaticPortfolio();
    }
}

/**
 * Отрисовать статические элементы портфолио (fallback)
 */
function renderStaticPortfolio() {
    const container = document.querySelector('.portfolio-gallery');
    if (!container) return;

    // Статические изображения из папки assets/images
    const staticPortfolio = [
        {
            image: '../assets/images/woven_label_detail_1768222872246.png',
            title: 'Тканая этикетка',
            category: 'Вшивные этикетки'
        },
        {
            image: '../assets/images/hang_tag_product_1768222887414.png',
            title: 'Бирка Hang Tag',
            category: 'Бирки'
        },
        {
            image: '../assets/images/leather_patch_detail_1768222905280.png',
            title: 'Кожаный патч',
            category: 'Патчи'
        }
    ];

    container.innerHTML = '';
    window.portfolioImages = staticPortfolio.map(item => item.image);

    staticPortfolio.forEach((item, index) => {
        const portfolioItem = document.createElement('div');
        portfolioItem.className = 'portfolio-item fade-in';
        portfolioItem.onclick = () => openLightbox(index);

        portfolioItem.innerHTML = `
            <img src="${item.image}" 
                 alt="${item.title}"
                 loading="lazy">
            <div class="portfolio-overlay">
                <h3>${item.title}</h3>
                <p>${item.category}</p>
            </div>
        `;

        container.appendChild(portfolioItem);
    });
}

/**
 * Отрисовать элементы портфолио
 */
function renderPortfolio(items) {
    const container = document.querySelector('.portfolio-gallery');
    if (!container || items.length === 0) return;

    // Очищаем текущее содержимое
    container.innerHTML = '';

    // Массив изображений для lightbox
    window.portfolioImages = items.map(item => item.image_url || item.image);

    // Создаем элементы портфолио
    items.forEach((item, index) => {
        const portfolioItem = document.createElement('div');
        portfolioItem.className = 'portfolio-item fade-in';
        portfolioItem.onclick = () => openLightbox(index);

        portfolioItem.innerHTML = `
            <img src="${item.image_url || item.image}" 
                 alt="${item.title}"
                 loading="lazy">
            <div class="portfolio-overlay">
                <h3>${item.title}</h3>
                <p>${item.category_display}</p>
            </div>
        `;

        container.appendChild(portfolioItem);
    });
}

/**
 * Lightbox функции (обновленные для работы с API)
 */
let currentImageIndex = 0;

function openLightbox(index) {
    currentImageIndex = index;
    const images = window.portfolioImages || [];
    if (images.length === 0) return;

    document.getElementById('lightboxImage').src = images[index];
    document.getElementById('lightbox').classList.add('active');
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
}

function changeLightboxImage(direction) {
    const images = window.portfolioImages || [];
    if (images.length === 0) return;

    currentImageIndex += direction;
    if (currentImageIndex < 0) currentImageIndex = images.length - 1;
    if (currentImageIndex >= images.length) currentImageIndex = 0;
    document.getElementById('lightboxImage').src = images[currentImageIndex];
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (document.getElementById('lightbox')?.classList.contains('active')) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') changeLightboxImage(-1);
        if (e.key === 'ArrowRight') changeLightboxImage(1);
    }
});

// Загрузить при загрузке страницы
document.addEventListener('DOMContentLoaded', loadPortfolioFromCMS);
