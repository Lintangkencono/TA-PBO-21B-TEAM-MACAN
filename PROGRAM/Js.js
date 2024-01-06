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
    submitButton.innerHTML = 'Tunggu Ya...';
    submitButton.disabled = true;

    var url = 'https://script.google.com/macros/s/AKfycbynbEGDD-FbFOKbHnysqRSFpqGJCG5UeleutbFNyjxFzmlmCtfRTtOretdiiC5TtKB3/exec';
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
        alert('Formulir berhasil dikirim!');
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
        submitButton.innerHTML = 'Submit';
        submitButton.classList.remove('success');
        submitButton.disabled = false;
        // Reset other form fields if needed
        document.getElementById('name').value = '';
        document.getElementById('visitDate').value = '';
        document.getElementById('purpose').value = '';
        document.getElementById('message').value = '';
    }, 2000);
}
