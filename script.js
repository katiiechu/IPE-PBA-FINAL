window.addEventListener('DOMContentLoaded', () => {


    function navigateTo(pageId) {
        const pages = document.querySelectorAll('.page');
        pages.forEach(p => p.classList.remove('active'));

        const target = document.getElementById(pageId);
        if (target) target.classList.add('active');

        const navButtons = document.querySelectorAll('.nav-item');
        navButtons.forEach(btn => btn.classList.remove('active'));
        const activeBtn = document.getElementById(`btn-${pageId}`);
        if (activeBtn) activeBtn.classList.add('active');
    }

    window.navigateTo = navigateTo; 

    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return; 
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let particlesArray = [];

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;

            this.color = 'rgba(120, 180, 255, 0.6)';

        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
            ctx.fill();
        }
    }

    function initParticles() {
        particlesArray = [];
        for (let i = 0; i < 120; i++) {
            particlesArray.push(new Particle());
        }
    }

    function animateParticles() {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        particlesArray.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();

});
it’s not working my html. here’s my css: 
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Playfair+Display:wght@400;700&display=swap');

:root {
    --bg: #050806;
    --primary: #52ff9b;
    --glass: rgba(255, 255, 255, 0.03);
    --border: rgba(255, 255, 255, 0.1);
}


* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    background: var(--bg);
    color: white;
    font-family: 'Inter', sans-serif;
    overflow: hidden; /* Prevent body scroll for modern app feel */
}


#canvas-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -2;
}

.vignette {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, transparent, black 150%);
    z-index: -1;
}

.glow-orb {
    position: fixed;
    border-radius: 50%;
    filter: blur(100px);
    opacity: 0.3;
    z-index: -1;
    animation: pulse 10s infinite alternate;
}

.orb-1 { width: 500px; height: 500px; background: #1b4d3e; top: -10%; left: -10%; }
.orb-2 { width: 400px; height: 400px; background: #0c2b22; bottom: -5%; right: -5%; }

@keyframes pulse {
    from { transform: scale(1); }
    to { transform: scale(1.2); }
}

nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 40px 80px;
    position: fixed;
    width: 100%;
    z-index: 100;
}

.logo {
    font-weight: 600;
    letter-spacing: 5px;
    font-size: 1.1rem;
}

.logo span {
    color: var(--primary);
}

.nav-links {
    display: flex;
    gap: 30px;
}

.nav-item {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    font-size: 11px;
    letter-spacing: 2px;
    opacity: 0.5;
    transition: 0.3s;
}

.nav-item.active {
    opacity: 1;
    border-bottom: 2px solid var(--primary);
    padding-bottom: 4px;
}


.page {
    position: absolute;
    width: 100%;
    min-height: 100vh;
    padding: 150px 10% 50px;
    display: none;
    opacity: 0;
    transform: translateY(20px) scale(0.98);
    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.page.active {
    display: block;
    opacity: 1;
    transform: translateY(0) scale(1);
}


.badge {
    font-size: 10px;
    color: var(--primary);
    border: 1px solid var(--primary);
    padding: 5px 15px;
    border-radius: 20px;
    width: fit-content;
    margin-bottom: 20px;
}

h1 {
    font-family: 'Playfair Display', serif;
    font-size: 5rem;
    line-height: 1;
    margin-bottom: 20px;
}

.accent-text {
    color: var(--primary);
    font-style: italic;
    font-weight: 400;
}

.hero-sub {
    opacity: 0.5;
    font-size: 1.2rem;
    max-width: 500px;
}


.glass-container {
    background: var(--glass);
    border: 1px solid var(--border);
    backdrop-filter: blur(30px);
    -webkit-backdrop-filter: blur(30px); /* Safari support */
    padding: 60px;
    border-radius: 4px;
}

.trilogy-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-top: 50px;
}

.episode-card {
    background: rgba(255, 255, 255, 0.02);
    padding: 40px;
    border: 1px solid var(--border);
    transition: 0.4s;
}

.episode-card:hover {
    border-color: var(--primary);
    background: rgba(82, 255, 155, 0.05);
}

audio {
    width: 100%;
    margin: 20px 0;
    filter: invert(1);
    opacity: 0.6;
}

.primary-btn {
    background: var(--primary);
    border: none;
    padding: 18px 35px;
    border-radius: 5px;
    font-weight: 600;
    margin-top: 40px;
    cursor: pointer;
    transition: 0.3s;
}

.primary-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(82, 255, 155, 0.2);
} replace w new version including optional
and my js window.addEventListener('DOMContentLoaded', () => {


    function navigateTo(pageId) {
        const pages = document.querySelectorAll('.page');
        pages.forEach(p => p.classList.remove('active'));

        const target = document.getElementById(pageId);
        if (target) target.classList.add('active');

        const navButtons = document.querySelectorAll('.nav-item');
        navButtons.forEach(btn => btn.classList.remove('active'));
        const activeBtn = document.getElementById(`btn-${pageId}`);
        if (activeBtn) activeBtn.classList.add('active');
    }

    window.navigateTo = navigateTo; 

    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return; 
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let particlesArray = [];

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;

            this.color = 'rgba(120, 180, 255, 0.6)';

        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
            ctx.fill();
        }
    }

    function initParticles() {
        particlesArray = [];
        for (let i = 0; i < 120; i++) {
            particlesArray.push(new Particle());
        }
    }

    function animateParticles() {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        particlesArray.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();

});
