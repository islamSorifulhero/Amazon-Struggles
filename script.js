function scrollTo(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

const ob = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('show'); });
}, { threshold: 0.08 });
document.querySelectorAll('.fu').forEach(el => ob.observe(el));

function switchTab(el) {
    document.querySelectorAll('.atab').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
}

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
let CY = 2025, CM = 2;

function renderCal() {
    document.getElementById('cmonth').textContent = MONTHS[CM] + ' ' + CY;
    const g = document.getElementById('cgrid');
    g.innerHTML = '';
    DAYS.forEach(d => {
        const h = document.createElement('div');
        h.className = 'cdh'; h.textContent = d; g.appendChild(h);
    });
    let start = new Date(CY, CM, 1).getDay();
    start = start === 0 ? 6 : start - 1;
    const dim = new Date(CY, CM + 1, 0).getDate();
    const today = new Date();
    for (let i = 0; i < start; i++) {
        const e = document.createElement('div'); e.className = 'cd empty'; g.appendChild(e);
    }
    for (let d = 1; d <= dim; d++) {
        const el = document.createElement('div');
        const dt = new Date(CY, CM, d);
        const past = dt < new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const wknd = dt.getDay() === 0 || dt.getDay() === 6;
        el.className = 'cd';
        if (past || wknd) el.classList.add('dis');
        else el.classList.add('avail');
        el.textContent = d;
        el.addEventListener('click', function () {
            if (el.classList.contains('dis')) return;
            document.querySelectorAll('.cd').forEach(x => x.classList.remove('sel'));
            el.classList.add('sel');
        });
        g.appendChild(el);
    }
}
function prevM() { CM--; if (CM < 0) { CM = 11; CY--; } renderCal(); }
function nextM() { CM++; if (CM > 11) { CM = 0; CY++; } renderCal(); }
renderCal();