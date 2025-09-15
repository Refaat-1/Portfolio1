/* script.js
   - handles navbar page switching, sidebar contacts toggle,
   - portfolio filtering, testimonials modal (if present), and contact form behavior.
*/

document.addEventListener('DOMContentLoaded', function () {
  // NAVIGATION: switch pages based on button text matching data-page
  const navButtons = document.querySelectorAll('[data-nav-link]');
  const pages = document.querySelectorAll('[data-page]');

  function showPage(name) {
    pages.forEach(p => p.classList.remove('active'));
    const target = document.querySelector(`[data-page="${name}"]`);
    if (target) target.classList.add('active');
  }

  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      navButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const pageName = btn.textContent.trim().toLowerCase();
      showPage(pageName);
      window.scrollTo(0, 0);
    });
  });

  // Sidebar contact toggler
  const sidebarBtn = document.querySelector('[data-sidebar-btn]');
  const sidebarExtra = document.querySelector('.sidebar-info_more');
  if (sidebarBtn && sidebarExtra) {
    sidebarBtn.addEventListener('click', () => {
      sidebarExtra.classList.toggle('open');
      const span = sidebarBtn.querySelector('span');
      if (sidebarExtra.classList.contains('open')) {
        span.textContent = 'Hide Contacts';
      } else {
        span.textContent = 'Show Contacts';
      }
    });
  }

  // Portfolio filtering
  const filterBtns = document.querySelectorAll('[data-filter-btn]');
  const filterItems = document.querySelectorAll('[data-filter-item]');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterName = btn.textContent.trim().toLowerCase();
      filterItems.forEach(item => {
        const cat = (item.dataset.category || '').toLowerCase();
        if (filterName === 'all' || cat.includes(filterName)) {
          item.style.display = ''; // show
          item.classList.add('active');
        } else {
          item.style.display = 'none'; // hide
          item.classList.remove('active');
        }
      });
    });
  });

  // Contact form: enable button only when fields not empty & handle submit
  const form = document.querySelector('[data-form]');
  const formInputs = document.querySelectorAll('[data-form-input]');
  const formBtn = document.querySelector('[data-form-btn]');

  function checkFormInputs() {
    let valid = true;
    formInputs.forEach(input => {
      if (!input.value.trim()) valid = false;
    });
    if (formBtn) formBtn.disabled = !valid;
  }
  formInputs.forEach(i => i.addEventListener('input', checkFormInputs));
  checkFormInputs();

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      // simple client-side feedback
      alert('Thanks — your message was sent (demo). I will contact you soon.');
      form.reset();
      checkFormInputs();
    });
  }

  // OPTIONAL: keyboard navigation (left/right to cycle sections) - handy for quick testing
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      const names = Array.from(navButtons).map(b => b.textContent.trim().toLowerCase());
      const activeIndex = names.findIndex(n => {
        const a = document.querySelector(`[data-page="${n}"]`);
        return a && a.classList.contains('active');
      });
      if (activeIndex === -1) return;
      const dir = e.key === 'ArrowRight' ? 1 : -1;
      const next = (activeIndex + dir + names.length) % names.length;
      navButtons[next].click();
    }
  });

});
