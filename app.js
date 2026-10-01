// Mobile Menu Toggle
const mobileBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
mobileBtn?.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Booking Modal Logic
const modal = document.getElementById('bookingModal');
const openBtns = document.querySelectorAll('#openModalBtn, #openModalBtnMobile,.openModalTrigger');
const closeBtn = document.getElementById('closeModalBtn');
const backdrop = document.getElementById('modalBackdrop');

function openBookingModal() { modal.classList.remove('hidden'); document.body.style.overflow = 'hidden'; }
function closeBookingModal() { modal.classList.add('hidden'); document.body.style.overflow = ''; }

openBtns.forEach(btn => btn.addEventListener('click', openBookingModal));
closeBtn?.addEventListener('click', closeBookingModal);
backdrop?.addEventListener('click', closeBookingModal);

// Estimator
const serviceSelect = document.getElementById('serviceSelect');
const estimateOutput = document.getElementById('estimateOutput');
serviceSelect?.addEventListener('change', (e) => {
    estimateOutput.textContent = `₦${Number(e.target.value).toLocaleString()}`;
});

// Filter Showcase
const filterBtns = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.showcase-card');
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        filterBtns.forEach(b => b.classList.remove('active-filter'));
        btn.classList.add('active-filter');
        cards.forEach(card => {
            if (filter === 'all' || card.classList.contains(filter)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Before & After Slider - Drag Logic
document.querySelectorAll('.comparison-container').forEach(container => {
    const handle = container.querySelector('.slider-handle');
    let isDragging = false;

    const updatePosition = (x) => {
        const rect = container.getBoundingClientRect();
        let pos = ((x - rect.left) / rect.width) * 100;
        pos = Math.max(5, Math.min(95, pos)); // clamp
        container.style.setProperty('--clip-pos', `${pos}%`);
    };

    const startDrag = (e) => { isDragging = true; };
    const stopDrag = () => { isDragging = false; };

    const onMove = (e) => {
        if (!isDragging) return;
        const x = e.touches? e.touches[0].clientX : e.clientX;
        updatePosition(x);
    };

    handle.addEventListener('mousedown', startDrag);
    handle.addEventListener('touchstart', startDrag);
    window.addEventListener('mouseup', stopDrag);
    window.addEventListener('touchend', stopDrag);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onMove);

    // Click anywhere on container to move
    container.addEventListener('click', (e) => {
        const x = e.clientX;
        updatePosition(x);
    });

    // Init
    const start = container.dataset.start || 50;
    container.style.setProperty('--clip-pos', `${start}%`);
});

// Form submit demo
document.getElementById('bookingForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Booking received! CEO Mr. David Osioni Imoto will call you on 0803 730 8101 shortly.');
    closeBookingModal();
});