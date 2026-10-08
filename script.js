// Прелоадер
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('hidden');
  }, 1000);
});

// Шапка при прокрутке
window.addEventListener('scroll', () => {
  const header = document.querySelector('.header');
  if (!header) return;
  if (window.scrollY > 60) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Плавная прокрутка
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// Модальное окно
function openModal() {
  const modal = document.getElementById('modal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal() {
  const modal = document.getElementById('modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

document.addEventListener('click', (e) => {
  const modal = document.getElementById('modal');
  if (modal && e.target.classList.contains('modal-bg')) {
    closeModal();
  }
});

// =====================================
// ОТПРАВКА ЗАЯВКИ В TELEGRAM
// =====================================
const TELEGRAM_BOT_TOKEN = '8588992267:AAHTlbpjvS93-9i-nwVpvMHgWMb6IVbiUjQ';
const TELEGRAM_CHAT_ID = '1098084258';

async function sendToTelegram(event) {
  if (event) event.preventDefault();

  const nameEl = document.getElementById('tg-name');
  const phoneEl = document.getElementById('tg-phone');
  const commentEl = document.getElementById('tg-comment');

  if (!nameEl || !phoneEl || !commentEl) return;

  const name = nameEl.value.trim();
  const phone = phoneEl.value.trim();
  const comment = commentEl.value.trim();

  const message = `🏡 НОВАЯ ЗАЯВКА С САЙТА «ХУТОРОК»

👤 Имя: ${name}
📞 Телефон: ${phone}
💬 Комментарий: ${comment || '—'}`;

  try {
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message
      })
    });

    if (response.ok) {
      closeModal();
      nameEl.value = '';
      phoneEl.value = '';
      commentEl.value = '';
      setTimeout(() => {
        alert('Спасибо! Ваша заявка отправлена. Мы свяжемся с вами.');
      }, 200);
    } else {
      alert('Ошибка отправки. Пожалуйста, позвоните нам: +375 29 796-82-48');
    }
  } catch (error) {
    alert('Ошибка соединения. Позвоните нам: +375 29 796-82-48');
  }
}

// Анимация появления карточек
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.rule, .price-card, .contact, .house-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
  observer.observe(el);
});