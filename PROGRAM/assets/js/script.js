'use strict';
// navbar toggle

const overlay = document.querySelector("[data-overlay]");
const navOpenBtn = document.querySelector("[data-nav-open-btn]");
const navbar = document.querySelector("[data-navbar]");
const navCloseBtn = document.querySelector("[data-nav-close-btn]");

const navLinks = document.querySelectorAll("[data-nav-link]");

// Method Array
const navElemArr = [navOpenBtn, navCloseBtn, overlay];

const navToggleEvent = function (elem) {
  for (let i = 0; i < elem.length; i++) {
    elem[i].addEventListener("click", function () {
      navbar.classList.toggle("active");
      overlay.classList.toggle("active");
    });
  }
}

navToggleEvent(navElemArr);
navToggleEvent(navLinks);

// header sticky & go to top

const header = document.querySelector("[data-header]");
const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {

  if (window.scrollY >= 200) {
    header.classList.add("active");
    goTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    goTopBtn.classList.remove("active");
  }

});

// submitForm
function submitForm() {
  var name = document.getElementById('name').value;
  var visitDate = document.getElementById('visitDate').value;
  var purpose = document.getElementById('purpose').value;
  var message = document.getElementById('message').value;

  if (!name || !visitDate || !purpose || !message) {
      alert('Silakan isi semua input.');
      return;
  }

  var submitButton = document.querySelector('.submit-button');
  submitButton.innerHTML = 'Loading';
  submitButton.disabled = true;

  var url = 'https://script.google.com/macros/s/AKfycbynbEGDD-FbFOKbHnysqRSFpqGJCG5UeleutbFNyjxFzmlmCtfRTtOretdiiC5TtKB3/exec';
  
  // Method Object
  var formData = new FormData();
  formData.append('Nama', name);
  formData.append('Tanggal Kunjungan', visitDate);
  formData.append('Tujuan Kunjungan', purpose);
  formData.append('Pesan', message);

  fetch(url, {
      method: 'POST',
      body: formData
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Terjadi kesalahan saat mengirim formulir.');
      }
      return response.text();
  })
  .then(data => {
      alert('Formulir anda berhasil dikirim!');
      showCheckmark();
      resetForm();   
      console.log(data);
  })
  .catch(error => {
      console.error('Error:', error.message);
      alert('Terjadi kesalahan saat mengirim formulir.');
  });
}

function showCheckmark() {
  var submitButton = document.querySelector('.submit-button');
  submitButton.innerHTML = 'Success \u2713';
  submitButton.classList.add('success');
}

function resetForm() {
  setTimeout(function () {
      var submitButton = document.querySelector('.submit-button');
      submitButton.innerHTML = 'kirim';
      submitButton.classList.remove('success');
      submitButton.disabled = false;
      document.getElementById('name').value = '';
      document.getElementById('visitDate').value = '';
      document.getElementById('purpose').value = '';
      document.getElementById('message').value = '';
  }, 2000);
}