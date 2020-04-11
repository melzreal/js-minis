const toggle = document.getElementById('toggle');
const close = document.getElementById('close');
const open = document.getElementById('open');
const modal = document.getElementById('modal');

toggle.addEventListener('click', () => document.body.classList.toggle('show-nav'));

//we add this class so the display transforms itself into display block from none on click.
open.addEventListener('click', () => modal.classList.add('show-modal'));
close.addEventListener('click', () => modal.classList.remove('show-modal'));

//hide modal by clicking outside of the div

window.addEventListener('click', (e) => e.target === modal ? modal.classList.remove('show-modal') : false);