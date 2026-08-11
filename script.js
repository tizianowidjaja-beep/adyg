// Database lowongan kerja random
const lowonganDatabase = [
    { pt: "PT. Agensi Berdikari", title: "Social Media Intern", salary: 1500000, desc: "Jobdesk: Ngonten, edit video, megang 5 akun, merangkap jadi BA. Harus stanby 24 jam.", stress: 25, tugas: "Balas chat revisi klien" },
    { pt: "CV. Berkah Judol", title: "Admin Slot Gacor", salary: 12000000, desc: "Gaji gede, bonus harian melimpah. Risiko: Tiap malam deg-degan digerebek polisi.", stress: 45, tugas: "Hapus barang bukti server" },
    { pt: "Startup Unicorn Corp", title: "Junior Developer", salary: 6000000, desc: "Kerja WFO 6 hari seminggu. Diwajibkan lembur tanpa dibayar demi loyalitas perusahaan.", stress: 35, tugas: "Benerin eror server pas sahur" },
    { pt: "Warung Seblak Mewah", title: "Kasir & Akuntan", salary: 2500000, desc: "Menghitung ribuan transaksi per hari secara manual. Menghadapi pembeli emosional.", stress: 20, tugas: "Ngitung kembalian emak-emak" },
    { pt: "PT. AI Masa Depan", title: "Prompt Engineer", salary: 8000000, desc: "Ngobrol sama robot seharian. Sering kena mental karena robotnya lebih pinter dari kamu.", stress: 30, tugas: "Ngetik perintah chatbot ngambek" }
];

let day = 1;
let money = 1000000;
let stress = 0;

// Variabel Kontrol Minigame
let tumpukanClick = 0;
const targetClick = 10;
let sisaWaktu = 5;
let timerInterval = null;

function updateStats() {
    document.getElementById('day').innerText = day;
    document.getElementById('money').innerText = money.toLocaleString('id-ID');
    document.getElementById('stress').innerText = stress;
    
    if (money <= 0) {
        showGameOver("Kamu bangkrut! Uangmu Rp 0, tidak bisa beli makan dan berakhir jadi gelandangan.");
    } else if (stress >= 100) {
        showGameOver("Kamu kena mental breakdown! Stres mencapai 100% karena tekanan dunia kerja.");
    }
}

function generateJob() {
    const randomJob = lowonganDatabase[Math.floor(Math.random() * lowonganDatabase.length)];
    document.getElementById('job-company').innerText = randomJob.pt;
    document.getElementById('job-title').innerText = randomJob.title;
    document.getElementById('job-salary').innerText = randomJob.salary.toLocaleString('id-ID');
    document.getElementById('job-desc').innerText = randomJob.desc;
    
    const dataEl = document.getElementById('job-card-data');
    dataEl.dataset.salary = randomJob.salary;
    dataEl.dataset.stress = randomJob.stress;
    dataEl.dataset.tugas = randomJob.tugas;
}

// Logika Memulai Minigame Kerja
function mulaiMinigame() {
    tumpukanClick = 0;
    sisaWaktu = 5;
    
    const tugasKerja = document.getElementById('job-card-data').dataset.tugas || "Kerja Rodi";
    document.getElementById('game-instruction').innerText = `Tugasmu: ${tugasKerja}! Klik secepatnya sebelum bos marah!`;
    document.getElementById('game-timer').innerText = sisaWaktu;
    document.getElementById('game-progress').style.width = "0%";
    document.getElementById('tap-btn').innerText = `KLIK UNTUK KERJA! (0/${targetClick})`;
    
    document.getElementById('game-modal').style.display = 'flex';
    
    // Mulai Hitung Mundur Waktu
    clearInterval(timerInterval);
    timerInterval = setInterval(function() {
        sisaWaktu--;
        document.getElementById('game-timer').innerText = sisaWaktu;
        
        if (sisaWaktu <= 0) {
            clearInterval(timerInterval);
            gagalMinigame();
        }
    }, 1000);
}

// Menghitung setiap klik dari user
function hitungTap() {
    tumpukanClick++;
    let persentase = (tumpukanClick / targetClick) * 100;
    document.getElementById('game-progress').style.width = `${persentase}%`;
    document.getElementById('tap-btn').innerText = `KLIK UNTUK KERJA! (${tumpukanClick}/${targetClick})`;
    
    if (tumpukanClick >= targetClick) {
        clearInterval(timerInterval);
        suksesMinigame();
    }
}

function suksesMinigame() {
    document.getElementById('game-modal').style.display = 'none';
    const dataEl = document.getElementById('job-card-data');
    const salary = parseInt(dataEl.dataset.salary) || 5000000;
    const addStress = parseInt(dataEl.dataset.stress) || 30;
    
    money += salary;
    stress += addStress;
    day++;
    
    alert(`🎉 Sukses! Target kerjaan kelar. Gaji Rp ${salary.toLocaleString('id-ID')} masuk rekening.`);
    
    selesaiSiklusHari();
}

function gagalMinigame() {
    document.getElementById('game-modal').style.display = 'none';
    stress += 40; // Gagal kerjaan bikin stres melonjak drastis
    day++;
    
    alert("❌ KAMU DIPECAT! Kamu terlalu lambat bekerja. Gaji hangus, dan bos memaki-maki kamu (Stres +40).");
    
    selesaiSiklusHari();
}

function selesaiSiklusHari() {
    updateStats();
    if (money > 0 && stress < 100) {
        checkTax();
        generateJob();
    }
}

function skipDay() {
    money -= 50000;
    stress -= 8;
    if (stress < 0) stress = 0;
    day++;
    
    selesaiSiklusHari();
}

function checkTax() {
    if (day % 3 === 0) {
        let potongan = Math.round(money * 0.47);
        money -= potongan;
        
        document.getElementById('tax-day').innerText = day;
        document.getElementById('tax-amount').innerText = potongan.toLocaleString('id-ID');
        document.getElementById('tax-modal').style.display = 'flex';
    }
}

function closeTaxModal() {
    document.getElementById('tax-modal').style.display = 'none';
    updateStats();
}

function showGameOver(text) {
    document.getElementById('gameover-reason').innerHTML = `
        <p style="margin-bottom: 15px;">${text}</p>
        <strong style="display:block; margin-bottom: 15px; color:#1e293b;">Kamu berhasil bertahan hidup selama: ${day} Hari</strong>
        <div style="display:flex; flex-direction:column; gap:10px;">
            <button class="btn" style="background:#1d9bf0; color:white;" onclick="shareGame('twitter')">🐦 Share Hasil ke X (Twitter)</button>
            <button class="btn" style="background:#25d366; color:white;" onclick="shareGame('wa')">💬 Share ke WhatsApp</button>
        </div>
    `;
    document.getElementById('gameover-modal').style.display = 'flex';
}

function shareGame(platform) {
    const text = `Gue bertahan selama ${day} hari di game Simulasi LinkedOut sebelum dipecat & dimiskinkan pajak 47%! Berani coba kalahkan rekor gue? Main di: ${window.location.href}`;
    let url = '';
    if (platform === 'twitter') {
        url = `https://twitter.com{encodeURIComponent(text)}`;
    } else if (platform === 'wa') {
        url = `https://whatsapp.com{encodeURIComponent(text)}`;
    }
    window.open(url, '_blank');
}

function resetGame() {
    day = 1;
    money = 1000000;
    stress = 0;
    document.getElementById('gameover-modal').style.display = 'none';
    updateStats();
    generateJob();
}

// Inisialisasi awal saat halaman dibuka
window.onload = function() {
    generateJob();
    updateStats();
};
