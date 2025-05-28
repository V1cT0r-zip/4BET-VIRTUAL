// ===== PARTÍCULAS =====
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = window.innerWidth < 768 ? 50 : 150;

function initParticles() {
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 3 + 1,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5
        });
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
        ctx.fillStyle = 'rgba(46, 128, 39, 0.5)';
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
    });
    
    requestAnimationFrame(animateParticles);
}

// ===== CARROSSEL DE RESULTADOS =====
const resultadosData = [
    { img: 'images/resultados/exemplo1.png', profit: '+92%' },
    { img: 'images/resultados/exemplo2.png', profit: '+85%' },
    { img: 'images/resultados/exemplo3.png', profit: '+95%' },
    { img: 'images/resultados/exemplo4.png', profit: '+88%' },
    { img: 'images/resultados/exemplo5.png', profit: '+91%' },
    { img: 'images/resultados/exemplo6.png', profit: '+89%' }
];

let currentSize = 1;
const carrosselTrack = document.querySelector('.carrossel-track');
const sizeValue = document.querySelector('.size-value');

function initCarrossel() {
    // Duplica os itens para efeito de loop infinito
    const duplicatedResults = [...resultadosData, ...resultadosData, ...resultadosData];
    
    duplicatedResults.forEach((result, index) => {
        const card = document.createElement('div');
        card.className = 'result-card';
        card.style.width = `${200 * currentSize}px`;
        card.innerHTML = `
            <img src="${result.img}" alt="Resultado ${index + 1}">
            <div class="profit-badge">${result.profit}</div>
        `;
        carrosselTrack.appendChild(card);
    });
    
    startAutoScroll();
}

function changeSize(amount) {
    currentSize = Math.max(0.5, Math.min(1.5, currentSize + amount));
    sizeValue.textContent = `${Math.round(currentSize * 100)}%`;
    
    const cards = document.querySelectorAll('.result-card');
    cards.forEach(card => {
        card.style.width = `${200 * currentSize}px`;
    });
}

function startAutoScroll() {
    let scrollSpeed = 1;
    let direction = -1; // -1 = esquerda, 1 = direita
    
    function autoScroll() {
        carrosselTrack.scrollLeft += scrollSpeed * direction;
        
        // Reinicia quando chegar ao final
        if (carrosselTrack.scrollLeft >= (carrosselTrack.scrollWidth / 3)) {
            carrosselTrack.scrollLeft = 0;
        }
    }
    
    const scrollInterval = setInterval(autoScroll, 20);
    
    // Pausa no hover
    carrosselTrack.addEventListener('mouseenter', () => scrollSpeed = 0);
    carrosselTrack.addEventListener('mouseleave', () => scrollSpeed = 1);
}

// ===== SCROLL SUAVE =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// ===== INICIALIZAÇÃO =====
window.addEventListener('load', () => {
    initParticles();
    animateParticles();
    initCarrossel();
});

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
