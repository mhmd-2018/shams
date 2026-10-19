/* =====================================================
   PES PIPE - pespipe.com clone
   JavaScript: scripts.js
   Features: nav, hero slider, scroll reveal, FAQ accordion,
             form validation, particle bg, count-up stats,
             smooth scroll, sticky header, mobile menu
   ===================================================== */

(function () {
    'use strict';

    // Mark JS as enabled immediately so CSS knows to hide [data-reveal] items
    document.documentElement.classList.add('js-enabled');

    function ready(fn) {
        if (document.readyState !== 'loading') fn();
        else document.addEventListener('DOMContentLoaded', fn);
    }

    /* ===== 1) Mobile nav toggle ===== */
    function initMobileNav() {
        const toggle = document.getElementById('menuToggle');
        const nav = document.getElementById('mainNav');
        if (!toggle || !nav) return;
        toggle.addEventListener('click', function (e) {
            e.stopPropagation();
            nav.classList.toggle('open');
            const isOpen = nav.classList.contains('open');
            toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });
        document.addEventListener('click', function (e) {
            if (!nav.contains(e.target) && !toggle.contains(e.target)) {
                nav.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && nav.classList.contains('open')) {
                nav.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
        window.addEventListener('resize', function () {
            if (window.innerWidth > 768 && nav.classList.contains('open')) {
                nav.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    }

    /* ===== 2) Dropdown (mobile click) ===== */
    function initDropdowns() {
        document.querySelectorAll('.has-dropdown').forEach(function (parent) {
            const link = parent.querySelector('a');
            if (!link) return;
            link.addEventListener('click', function (e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    parent.classList.toggle('open');
                }
            });
        });
    }

    /* ===== 3) Search bar toggle ===== */
    function initSearch() {
        const toggle = document.getElementById('searchToggle');
        const bar = document.getElementById('searchBar');
        if (!toggle || !bar) return;
        toggle.addEventListener('click', function (e) {
            e.stopPropagation();
            bar.classList.toggle('open');
            if (bar.classList.contains('open')) {
                const input = bar.querySelector('input[type="search"]');
                if (input) setTimeout(() => input.focus(), 100);
            }
        });
        document.addEventListener('click', function (e) {
            if (!bar.contains(e.target) && !toggle.contains(e.target)) bar.classList.remove('open');
        });
        const form = bar.querySelector('form');
        if (form) {
            form.addEventListener('submit', function (e) {
                e.preventDefault();
                const q = form.querySelector('input[type="search"]').value.trim();
                if (q) alert('جستجو برای: ' + q);
            });
        }
    }

    /* ===== 4) Hero carousel ===== */
    function initHeroCarousel() {
        const hero = document.getElementById('hero');
        if (!hero) return;
        const slides = [
            {
                title: '<span class="accent">پی.ای.اس (P.E.S)</span> بزرگ‌ترین تولیدکننده لوله و اتصالات پلی اتیلن در کشور',
                subtitle: 'لوله و اتصالات پلی اتیلن پی.ای.اس (P.E.S) مناسب پروژه‌های بزرگ آبرسانی، صنعتی، معدنی، نیروگاهی و آتش‌نشانی با سایز تا ۲۴۰۰ میلی‌متر.',
                cta: 'مشاهده محصولات',
                href: 'products.html'
            },
            {
                title: 'لوله و اتصالات پلی اتیلن <span class="accent">سایز ۲۴۰۰ میلی‌متر</span> - انحصاری در خاورمیانه',
                subtitle: 'شرکت P.E.S صاحب تکنولوژی اختصاصی تولید لوله پلی اتیلن سایز بزرگ در بازه ۱۶۰۰ تا ۲۴۰۰ میلی‌متر در کشور است. ۱۴ خط تولید پیشرفته.',
                cta: 'درباره ما',
                href: 'about.html'
            },
            {
                title: 'راهکارهای <span class="accent">صنایع دریایی</span> و آب شیرین کن',
                subtitle: 'لوله و اتصالات پلی اتیلن P.E.S مناسب خطوط انتقال زیر دریا و آب شیرین کن با مقاومت بالا در برابر خوردگی و فشار.',
                cta: 'کاربردها',
                href: 'applications.html'
            }
        ];
        const titleEl = hero.querySelector('.hero-title');
        const subtitleEl = hero.querySelector('.hero-subtitle');
        const ctaEl = hero.querySelector('.hero-actions a.btn-primary');
        const dotsContainer = document.getElementById('heroDots');
        if (!titleEl || !subtitleEl || !ctaEl) return;

        let current = 0, autoplay = null;

        function render(idx) {
            const s = slides[idx];
            titleEl.style.opacity = '0';
            subtitleEl.style.opacity = '0';
            ctaEl.style.opacity = '0';
            setTimeout(() => {
                titleEl.innerHTML = s.title;
                subtitleEl.textContent = s.subtitle;
                ctaEl.textContent = s.cta;
                ctaEl.setAttribute('href', s.href);
                titleEl.style.transition = 'opacity .5s ease';
                subtitleEl.style.transition = 'opacity .5s ease .1s';
                ctaEl.style.transition = 'opacity .5s ease .2s';
                titleEl.style.opacity = '1';
                subtitleEl.style.opacity = '1';
                ctaEl.style.opacity = '1';
            }, 300);
            if (dotsContainer) {
                dotsContainer.querySelectorAll('button').forEach((d, i) => d.classList.toggle('active', i === idx));
            }
        }
        function next() { current = (current + 1) % slides.length; render(current); }
        function prev() { current = (current - 1 + slides.length) % slides.length; render(current); }
        function startAutoplay() { stopAutoplay(); autoplay = setInterval(next, 7000); }
        function stopAutoplay() { if (autoplay) { clearInterval(autoplay); autoplay = null; } }

        if (dotsContainer) {
            dotsContainer.addEventListener('click', function (e) {
                const btn = e.target.closest('button[data-slide]');
                if (!btn) return;
                current = parseInt(btn.dataset.slide, 10);
                render(current);
                startAutoplay();
            });
        }
        hero.addEventListener('mouseenter', stopAutoplay);
        hero.addEventListener('mouseleave', startAutoplay);

        let touchX = 0;
        hero.addEventListener('touchstart', function (e) { touchX = e.changedTouches[0].clientX; }, { passive: true });
        hero.addEventListener('touchend', function (e) {
            const dx = e.changedTouches[0].clientX - touchX;
            if (Math.abs(dx) > 50) { if (dx > 0) prev(); else next(); startAutoplay(); }
        }, { passive: true });

        startAutoplay();
    }

    /* ===== 5) Scroll reveal animations ===== */
    function initScrollReveal() {
        const items = document.querySelectorAll('[data-reveal]');
        if (!items.length) return;
        if (!('IntersectionObserver' in window)) {
            items.forEach(i => i.classList.add('in-view'));
            return;
        }
        const obs = new IntersectionObserver(function (entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
        items.forEach(i => obs.observe(i));
    }

    /* ===== 6) Count-up stats ===== */
    function initCountUp() {
        const stats = document.querySelectorAll('[data-count]');
        if (!stats.length) return;
        const animate = (el) => {
            const target = parseInt(el.dataset.count, 10);
            const suffix = el.dataset.suffix || '';
            const duration = 1800;
            const start = performance.now();
            const step = (now) => {
                const t = Math.min((now - start) / duration, 1);
                const eased = 1 - Math.pow(1 - t, 3);
                const val = Math.round(target * eased);
                el.textContent = val.toLocaleString('fa-IR') + suffix;
                if (t < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
        };
        if (!('IntersectionObserver' in window)) {
            stats.forEach(animate); return;
        }
        const obs = new IntersectionObserver(function (entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animate(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        stats.forEach(s => obs.observe(s));
    }

    /* ===== 7) Forms (validation) ===== */
    function initForms() {
        const forms = document.querySelectorAll('form[data-form]');
        forms.forEach(form => {
            const feedback = form.querySelector('.form-feedback');
            form.addEventListener('submit', function (e) {
                e.preventDefault();
                if (feedback) { feedback.className = 'form-feedback'; feedback.textContent = ''; }
                const name = form.querySelector('[name="fullName"]')?.value.trim();
                const mobile = form.querySelector('[name="mobile"]')?.value.trim();
                const email = form.querySelector('[name="email"]')?.value.trim();
                if (!name || name.length < 3) { show('error', 'لطفاً نام و نام خانوادگی خود را به طور کامل وارد کنید.'); return; }
                if (mobile && !/^09[0-9]{9}$/.test(mobile)) { show('error', 'شماره موبایل معتبر نیست. فرمت صحیح: 09XXXXXXXXX'); return; }
                if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { show('error', 'آدرس ایمیل معتبر نیست.'); return; }
                const reqs = form.querySelectorAll('[required]');
                for (const r of reqs) {
                    if (!r.value.trim()) { show('error', 'لطفاً تمام فیلدهای ضروری را پر کنید.'); return; }
                }
                show('success', 'پیام شما با موفقیت ثبت شد. کارشناسان P.E.S در اسرع وقت با شما تماس خواهند گرفت.');
                form.reset();
                setTimeout(() => { if (feedback) { feedback.className = 'form-feedback'; feedback.textContent = ''; } }, 6000);
            });
            function show(type, msg) {
                if (!feedback) { alert(msg); return; }
                feedback.className = 'form-feedback ' + type;
                feedback.textContent = msg;
                feedback.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
        document.querySelectorAll('input[type="tel"]').forEach(input => {
            input.addEventListener('input', function (e) {
                let val = e.target.value.replace(/[^0-9]/g, '');
                if (val.length > 11) val = val.slice(0, 11);
                e.target.value = val;
            });
        });
    }

    /* ===== 8) FAQ accordion ===== */
    function initFAQ() {
        const items = document.querySelectorAll('.faq-item');
        items.forEach(item => {
            const q = item.querySelector('.faq-question');
            if (!q) return;
            q.addEventListener('click', function () {
                const isOpen = item.classList.contains('open');
                items.forEach(i => i.classList.remove('open'));
                if (!isOpen) item.classList.add('open');
            });
        });
    }

    /* ===== 9) Sticky header shadow ===== */
    function initStickyHeader() {
        const header = document.querySelector('.site-header');
        if (!header) return;
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.pageYOffset > 20);
        }, { passive: true });
    }

    /* ===== 10) Back to top ===== */
    function initBackToTop() {
        const btn = document.getElementById('backToTop');
        if (!btn) return;
        window.addEventListener('scroll', () => btn.classList.toggle('show', window.pageYOffset > 400), { passive: true });
        btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    /* ===== 11) Smooth scroll for anchors ===== */
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href === '#' || href.length < 2) return;
                const target = document.querySelector(href);
                if (!target) return;
                e.preventDefault();
                const headerHeight = document.querySelector('.site-header')?.offsetHeight || 80;
                window.scrollTo({ top: target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 10, behavior: 'smooth' });
                const nav = document.getElementById('mainNav');
                const toggle = document.getElementById('menuToggle');
                if (nav && nav.classList.contains('open')) {
                    nav.classList.remove('open');
                    if (toggle) toggle.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = '';
                }
            });
        });
    }

    /* ===== 12) Active nav on scroll ===== */
    function initActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');
        if (!sections.length || !navLinks.length) return;
        const update = () => {
            const pos = window.scrollY + 150;
            let current = '';
            sections.forEach(s => { if (s.offsetTop <= pos) current = s.id; });
            navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href').slice(1) === current));
        };
        window.addEventListener('scroll', update, { passive: true });
        update();
    }

    /* ===== 13) Animated background particles (canvas) ===== */
    function initParticles() {
        const canvas = document.getElementById('particles-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let particles = [];
        let w, h;
        const PARTICLE_COUNT = 40;

        function resize() {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
        }
        function createParticles() {
            particles = [];
            for (let i = 0; i < PARTICLE_COUNT; i++) {
                particles.push({
                    x: Math.random() * w,
                    y: Math.random() * h,
                    vx: (Math.random() - 0.5) * 0.4,
                    vy: (Math.random() - 0.5) * 0.4,
                    r: Math.random() * 1.5 + 0.5,
                    alpha: Math.random() * 0.5 + 0.2
                });
            }
        }
        function draw() {
            ctx.clearRect(0, 0, w, h);
            particles.forEach(p => {
                p.x += p.vx; p.y += p.vy;
                if (p.x < 0 || p.x > w) p.vx *= -1;
                if (p.y < 0 || p.y > h) p.vy *= -1;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(0, 212, 255, ' + p.alpha + ')';
                ctx.shadowColor = 'rgba(0, 212, 255, 0.8)';
                ctx.shadowBlur = 8;
                ctx.fill();
            });
            // Connect nearby particles
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = 'rgba(0, 212, 255, ' + (0.2 * (1 - dist / 120)) + ')';
                        ctx.lineWidth = 0.5;
                        ctx.shadowBlur = 0;
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(draw);
        }
        resize();
        createParticles();
        draw();
        window.addEventListener('resize', () => { resize(); createParticles(); });
    }

    /* ===== 14) Tilt effect on cards (optional) ===== */
    function initTilt() {
        if (window.innerWidth < 1024) return;
        document.querySelectorAll('[data-tilt]').forEach(card => {
            card.addEventListener('mousemove', function (e) {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const cx = rect.width / 2;
                const cy = rect.height / 2;
                const rx = ((y - cy) / cy) * -4;
                const ry = ((x - cx) / cx) * 4;
                card.style.transform = 'translateY(-8px) perspective(1000px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg)';
            });
            card.addEventListener('mouseleave', function () {
                card.style.transform = '';
            });
        });
    }

    /* ===== 15) Newsletter form ===== */
    function initNewsletter() {
        const form = document.querySelector('.newsletter-form');
        if (!form) return;
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const input = form.querySelector('input');
            if (!input || !input.value.trim()) return;
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
                alert('آدرس ایمیل معتبر نیست.');
                return;
            }
            alert('با تشکر! ایمیل شما در خبرنامه ثبت شد.');
            input.value = '';
        });
    }

    /* ===== INIT ALL ===== */
    ready(function () {
        initMobileNav();
        initDropdowns();
        initSearch();
        initHeroCarousel();
        initScrollReveal();
        initCountUp();
        initForms();
        initFAQ();
        initStickyHeader();
        initBackToTop();
        initSmoothScroll();
        initActiveNav();
        initParticles();
        initTilt();
        initNewsletter();
        console.log('%c⚡ P.E.S - Modern Clone Loaded', 'color: #00d4ff; font-size: 14px; font-weight: bold; text-shadow: 0 0 8px #00d4ff;');
    });

})();
