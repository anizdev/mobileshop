// Mahsulotlar ma'lumotlari
const products = [
    {
        id: 1,
        name: "iPhone 15 Pro",
        category: "phones",
        price: "12 999 000 so'm",
        specs: "6.1\" OLED displey, 128GB xotira, A17 Pro chip, 48MP asosiy kamera, 12MP old kamera, Face ID, IP68 suv va changga chidamlilik",
        image: "images.jpg"
    },
    {
        id: 2,
        name: "Samsung S23 Ultra",
        category: "phones",
        price: "14 499 000 so'm",
        specs: "6.8\" Dynamic AMOLED 2X, 256GB xotira, 12GB RAM, Snapdragon 8 Gen 2, 200MP asosiy kamera, 12MP old kamera, S Pen qo'llab-quvvatlash, IP68",
        image: "download.jpg"
    },
    {
        id: 3,
        name: "AirPods Pro 2",
        category: "accessories",
        price: "2 499 000 so'm",
        specs: "Faol shovqinni bekor qilish, Transparen rejim, Spatial Audio, 6 soatlik quvvat (tulqinsiz), MagSafe zaryadlash qutisi, IPX4 terga chidamlilik",
        image: "download.jpg"
    },
    {
        id: 4,
        name: "Xiaomi 13 Pro",
        category: "phones",
        price: "9 999 000 so'm",
        specs: "6.73\" AMOLED, 512GB xotira, 12GB RAM, Snapdragon 8 Gen 2, 50.3MP asosiy kamera, 32MP old kamera, 4820mAh batareya, 120W tez zaryadlash",
        image: "download.jpg"
    },
    {
        id: 5,
        name: "Apple Watch Series 8",
        category: "accessories",
        price: "3 799 000 so'm",
        specs: "45mm korpus, Retina displey, ECG sensori, Qon kislorodini o'lchash, Suvga chidamlilik 50m, 18 soatlik quvvat, iOS bilan mos keladi",
        image: "download.jpg"
    }
];

// DOM elementlari
const productList = document.getElementById('product-list');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modal-body');
const closeBtn = document.querySelector('.close-btn');
const themeToggle = document.getElementById('theme-toggle');
const categoryItems = document.querySelectorAll('.category-item');
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

// Dastlabki holat
let currentSlide = 0;
let slideInterval;

// Dark/Light Mode
themeToggle.addEventListener('click', toggleTheme);

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const icon = themeToggle.querySelector('i');
    if (document.body.classList.contains('dark-mode')) {
        icon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'light');
    }
}

// Saqlangan temani yuklash
function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
    }
}

// Mahsulotlarni chiqarish
function displayProducts(productsToShow) {
    productList.innerHTML = productsToShow.map(product => `
        <div class="product-card" data-id="${product.id}">
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.specs.split(', ').slice(0, 2).join(', ')}...</p>
                <span class="price">${product.price}</span>
                <button class="detail-btn" data-id="${product.id}">
                    <i class="fas fa-info-circle"></i> Batafsil
                </button>
            </div>
        </div>
    `).join('');
}

// Modalni ochish
function openModal(productId) {
    const product = products.find(p => p.id == productId);
    if (!product) return;
    
    modalBody.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <div class="modal-text">
            <h2>${product.name}</h2>
            <p><strong>Narx:</strong> <span class="price">${product.price}</span></p>
            <p><strong>Kategoriya:</strong> ${product.category === 'phones' ? 'Smartfon' : 'Aksessuar'}</p>
            <p><strong>Xususiyatlari:</strong></p>
            <ul>
                ${product.specs.split(', ').map(spec => `<li>${spec}</li>`).join('')}
            </ul>
            <button class="buy-btn"><i class="fas fa-shopping-cart"></i> Sotib olish</button>
        </div>
    `;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Modalni yopish
function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Slider funksiyalari
function startSlider() {
    slideInterval = setInterval(() => {
        nextSlide();
    }, 5000);
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlider();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlider();
}

function updateSlider() {
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === currentSlide);
    });
}

function resetInterval() {
    clearInterval(slideInterval);
    startSlider();
}

// Kategoriya bo'yicha filtrlash
categoryItems.forEach(item => {
    item.addEventListener('click', () => {
        const category = item.dataset.category;
        const filteredProducts = products.filter(
            product => product.category === category
        );
        displayProducts(filteredProducts);
        
        // Faol kategoriyani belgilash
        categoryItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
    });
});

// Qidiruv funksiyasi
function searchProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) || 
        product.specs.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );
    displayProducts(filteredProducts);
}

// Event listenerlar
document.addEventListener('DOMContentLoaded', () => {
    loadTheme();
    displayProducts(products);
    startSlider();
});

prevBtn.addEventListener('click', () => {
    prevSlide();
    resetInterval();
});

nextBtn.addEventListener('click', () => {
    nextSlide();
    resetInterval();
});

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('detail-btn') || e.target.closest('.detail-btn')) {
        const btn = e.target.classList.contains('detail-btn') ? e.target : e.target.closest('.detail-btn');
        openModal(btn.dataset.id);
    }
});

closeBtn.addEventListener('click', closeModal);

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

searchBtn.addEventListener('click', searchProducts);

searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        searchProducts();
    }
});

// Barcha mahsulotlarni ko'rsatish
document.querySelector('.logo').addEventListener('click', () => {
    displayProducts(products);
    categoryItems.forEach(i => i.classList.remove('active'));
    searchInput.value = '';
});

// Rasm yuklanganini tekshirish
function checkImageSizes() {
    document.querySelectorAll('img').forEach(img => {
        img.onload = function() {
            console.log(`Rasm o'lchami: ${this.naturalWidth}x${this.naturalHeight}`);
            // Agar rasm juda katta bo'lsa ogohlantirish
            if (this.naturalWidth > 2000 || this.naturalHeight > 2000) {
                console.warn('Rasm juda katta o\'lchamda, optimallashtirish tavsiya etiladi');
            }
        };
    });
}

// DOM yuklanganida ishga tushirish
document.addEventListener('DOMContentLoaded', checkImageSizes);