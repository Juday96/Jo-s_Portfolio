const $ = (s) => document.querySelector(s);
const $$ = (s) => Array.from(document.querySelectorAll(s));
const reveals = $$('.reveal');
const showOnScroll = () =>{
const trigger = window.innerHeight * 0.85;
reveals.forEach(el => {
const rect = el.getBoundingClientRect();
if(rect.top < trigger) el.classList.add('show');
});
}
window.addEventListener('scroll', showOnScroll);
window.addEventListener('load', ()=>{ showOnScroll(); document.getElementById('year').textContent = new Date().getFullYear(); });


const profile = $('#profile');
profile.addEventListener('mousemove', e => {
const r = profile.getBoundingClientRect();
const x = (e.clientX - r.left) - r.width/2;
const y = (e.clientY - r.top) - r.height/2;
profile.style.transform = `translateY(-6px) rotateX(${ -y/18 }deg) rotateY(${ x/22 }deg)`;
});
profile.addEventListener('mouseleave', ()=>{ profile.style.transform = '' });


document.getElementById('downloadBtn').addEventListener('click', ()=>{
const txt = `Your Name\nWeb Developer\nEmail: you@example.com\nPortfolio: yoursite.example`;
const blob = new Blob([txt], {type:'text/plain'});
const url = URL.createObjectURL(blob);
const a = document.createElement('a'); a.href = url; a.download = 'resume.txt'; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
});
$('#profileImg').addEventListener('keydown', (e)=>{
if(e.key === 'Enter' || e.key === ' ') window.open($('#profileImg').src, '_blank');
});
