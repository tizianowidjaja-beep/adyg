// ==========================================
// SECTION 1: DATABASE & VARIABLE UTAMA
// ==========================================
const lowonganDatabase = [
    { pt: "PT. Agensi Berdikari", title: "Social Media Intern", salary: 1500000, desc: "Jobdesk: Ngonten, edit video, megang 5 akun. Harus standby 24 jam.", stress: 22, tipeGame: "click", tugas: "Balas chat revisi klien secepatnya!" },
    { pt: "CV. Berkah Judol", title: "Admin Slot Gacor", salary: 12000000, desc: "Gaji gede, bonus harian melimpah. Risiko: Tiap malam deg-degan digerebek polisi.", stress: 45, tipeGame: "type", tugas: "KETIK KATA KUNCI AMANKAN SERVER:", kataTarget: "BERSIHKAN_LOGS_SEKARANG" },
    { pt: "Startup Unicorn Corp", title: "Junior Developer", salary: 6000000, desc: "Kerja WFO 6 hari seminggu. Diwajibkan lembur tanpa dibayar demi loyalitas.", stress: 32, tipeGame: "type", tugas: "KETIK SYNTAX PERBAIKAN BUG:", kataTarget: "sudo_systemctl_restart" },
    { pt: "Warung Seblak Mewah", title: "Kasir & Akuntan", salary: 2500000, desc: "Menghitung ribuan transaksi manual. Menghadapi pembeli emosional.", stress: 18, tipeGame: "click", tugas: "Hitung kembalian emak-emak ngamuk!" },
    { pt: "PT. AI Masa Depan", title: "Prompt Engineer", salary: 8000000, desc: "Ngobrol sama robot seharian. Sering kena mental karena AI-nya suka ngambek.", stress: 28, tipeGame: "type", tugas: "KETIK PROMPT PENENANG AI:", kataTarget: "JanganNgambekRobotSayang" }
];

const daftarMakanan = ["🍔", "🍕", "🍜", "🍟", "🥤", "🍗", "🍩"];

let day = 1;
let money = 1000000;
let stress = 0;
let lowonganAktif = {};

// Variabel Kontrol Minigame Utama
let tumpukanClick = 0;
const targetClick = 12; 
let sisaWaktu = 5;
let timerInterval = null;

// Variabel Kontrol Kurir Sampingan
let jumlahPesanan = 0;
let sisaWaktuKurir = 8;
let kurirInterval = null;

// ==========================================
// SECTION 2: LOGIKA LOGISTIK & ANIMASI STATUS
// ==========================================
function picuAnimasiUang(jumlah, apakahMinus = false) {
    const moneyBox = document.getElementById('money-box');
    if (!moneyBox) return;
    const teksAnimasi = document.createElement('span');
    teksAnimasi.className = 'money-animation';
    if (apakahMinus) {
        teksAnimasi.classList.add('money-loss');
        teksAnimasi.innerText = `-Rp ${jumlah.toLocaleString('id-ID')}`;
    } else {
        teksAnimasi.innerText = `+Rp ${jumlah.toLocaleString('id-ID')}`;
    }
    moneyBox.appendChild(teksAnimasi);
    setTimeout(() => { teksAnimasi.remove(); }, 1500);
}

function updateStats() {
    document.getElementById('day').innerText = day;
    document.getElementById('money').innerText = money.toLocaleString('id-ID');
    document.getElementById('stress').innerText = stress;
    
    if (money <= 0) {
        showGameOver("Kamu bangkrut! Uangmu habis total, tidak bisa bayar kosan dan makan seblak.");
    } else if (stress >= 100) {
        showGameOver("Kamu kena mental breakdown! Tingkat stres mencapai 100% karena eksploitasi dunia kerja.");
    }
}

function generateJob() {
    lowonganAktif = lowonganDatabase[Math.floor(Math.random() * lowonganDatabase.length)];
    document.getElementById('job-company').innerText = lowonganAktif.pt;
    document.getElementById('job-title').innerText = lowonganAktif.title;
    document.getElementById('job-salary').innerText = lowonganAktif.salary.toLocaleString('id-ID');
    document.getElementById('job-desc').innerText = lowonganAktif.desc;
}

function selesaiSiklusHari() {
    updateStats();
    if (money > 0 && stress < 100) {
        checkTax();
        generateJob();
    }
}

function skipDay() {
    if (money <= 0 || stress >= 100) return;
    money -= 50000;
    stress -= 8;
    if (stress < 0) stress = 0;
    day++;
    picuAnimasiUang(50000, true);
    selesaiSiklusHari();
}
function checkTax() {
    if (day % 3 === 0) {
        let potongan = Math.round(money * 0.47);
        money -= potongan;
        
        document.getElementById('tax-day').innerText = day;
        document.getElementById('tax-amount').innerText = potongan.toLocaleString('id-ID');
        document.getElementById('tax-modal').style.display = 'flex';
        picuAnimasiUang(potongan, true);
    }
}

function closeTaxModal() {
    document.getElementById('tax-modal').style.display = 'none';
    updateStats();
}

// ==========================================
// SECTION 3: KENDALI MINIGAME UTAMA & SAMPINGAN
// ==========================================
function mulaiMinigameUtama() {
    if (money <= 0 || stress >= 100) return;
    sisaWaktu = 5;
    document.getElementById('game-timer').innerText = sisaWaktu;
    document.getElementById('game-modal').style.display = 'flex';

    if (lowonganAktif.tipeGame === "click") {
        document.getElementById('tap-game-elements').style.display = 'block';
        document.getElementById('type-game-elements').style.display = 'none';
        
        tumpukanClick = 0;
        document.getElementById('game-instruction').innerText = `Tugasmu: ${lowonganAktif.tugas}`;
        document.getElementById('game-progress').style.width = "0%";
        document.getElementById('tap-btn').innerText = `KLIK UNTUK KERJA! (0/${targetClick})`;
    } else if (lowonganAktif.tipeGame === "type") {
        document.getElementById('tap-game-elements').style.display = 'none';
        document.getElementById('type-game-elements').style.display = 'block';
        
        document.getElementById('game-instruction').innerText = lowonganAktif.tugas;
        document.getElementById('target-word-display').innerText = lowonganAktif.kataTarget;
        document.getElementById('type-game-input').value = "";
        setTimeout(() => { document.getElementById('type-game-input').focus(); }, 100);
    }

    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        sisaWaktu--;
        document.getElementById('game-timer').innerText = sisaWaktu;
        if (sisaWaktu <= 0) {
            clearInterval(timerInterval);
            gagalMinigameUtama();
        }
    }, 1000);
}

function hitungTap() {
    tumpukanClick++;
    let persentase = (tumpukanClick / targetClick) * 100;
    document.getElementById('game-progress').style.width = `${persentase}%`;
    document.getElementById('tap-btn').innerText = `KLIK UNTUK KERJA! (${tumpukanClick}/${targetClick})`;
    
    if (tumpukanClick >= targetClick) {
        clearInterval(timerInterval);
        suksesMinigameUtama();
    }
}

function cekInputKetik() {
    const inputVal = document.getElementById('type-game-input').value;
    if (inputVal === lowonganAktif.kataTarget) {
        clearInterval(timerInterval);
        suksesMinigameUtama();
    }
}

function suksesMinigameUtama() {
    document.getElementById('game-modal').style.display = 'none';
    money += lowonganAktif.salary;
    stress += lowonganAktif.stress;
    day++;
    
    picuAnimasiUang(lowonganAktif.salary, false);
    alert(`🎉 Kerja Bagus! Gaji Rp ${lowonganAktif.salary.toLocaleString('id-ID')} masuk rekening.`);
    selesaiSiklusHari();
}

function gagalMinigameUtama() {
    document.getElementById('game-modal').style.display = 'none';
    stress += 35;
    day++;
    alert("❌ KAMU DIPECAT! Kerjamu lambat dan banyak eror. Gaji hangus, Bos memarahimu (Stres +35).");
    selesaiSiklusHari();
}

function mulaiMinigameKurir() {
    if (money <= 0 || stress >= 100) return;
    jumlahPesanan = 0;
    sisaWaktuKurir = 8;
    
    document.getElementById('delivery-count').innerText = jumlahPesanan;
    document.getElementById('kurir-timer').innerText = sisaWaktuKurir;
    document.getElementById('kurir-modal').style.display = 'flex';
    acakPosisiMakanan();

    clearInterval(kurirInterval);
    kurirInterval = setInterval(() => {
        sisaWaktuKurir--;
        document.getElementById('kurir-timer').innerText = sisaWaktuKurir;
        if (sisaWaktuKurir <= 0) {
            clearInterval(kurirInterval);
            selesaiKerjaKurir();
        }
    }, 1000);
}

function acakPosisiMakanan() {
    const targetBtn = document.getElementById('food-target-btn');
    if (!targetBtn) return;
    targetBtn.innerText = daftarMakanan[Math.floor(Math.random() * daftarMakanan.length)];
    
    const xRand = Math.floor(Math.random() * 160) - 80; 
    const yRand = Math.floor(Math.random() * 30) - 15; 
    targetBtn.style.transform = `translate(${xRand}px, ${yRand}px)`;
}

function tangkapMakanan() {
    jumlahPesanan++;
    document.getElementById('delivery-count').innerText = jumlahPesanan;
    acakPosisiMakanan();
}

function selesaiKerjaKurir() {
    document.getElementById('kurir-modal').style.display = 'none';
    
    const totalGajiKurir = jumlahPesanan * 35000;
    const totalStresKurir = jumlahPesanan * 3;
    
    money += totalGajiKurir;
    stress += totalStresKurir;
    day++;
    
    if(totalGajiKurir > 0) {
        picuAnimasiUang(totalGajiKurir, false);
    }
    alert(`🛵 Shift Selesai! Mengantar ${jumlahPesanan} pesanan. Upah Rp ${totalGajiKurir.toLocaleString('id-ID')} cair, Stres +${totalStresKurir} karena macet.`);
    selesaiSiklusHari();
}

// ==========================================
// SECTION 4: KONDISI GAME OVER & INITIALIZATION
// ==========================================
function showGameOver(text) {
    document.getElementById('gameover-reason').innerHTML = `
        <p style="margin-bottom: 15px;">${text}</p>
        <strong style="display:block; margin-bottom: 15px; color:#1e293b;">Kamu berhasil bertahan hidup selama: ${day} Hari</strong>
        <div style="display:flex; flex-direction:column; gap:10px;">
            <button class="btn" style="background:#1d9bf0; color:white; box-shadow:none;" onclick="shareGame('twitter')">🐦 Share Hasil ke X (Twitter)</button>
            <button class="btn" style="background:#25d366; color:white; box-shadow:none;" onclick="shareGame('wa')">💬 Share ke WhatsApp</button>
        </div>
    `;
    document.getElementById('gameover-modal').style.display = 'flex';
}

function shareGame(platform) {
    const text = `Gue cuma bertahan ${day} hari di game Simulasi LinkedOut! Udah narik kurir makanan & kantoran tetap dimiskinkan pajak 47%. Coba rekor lu: ${window.location.href}`;
    let url = platform === 'twitter' 
        ? `https://twitter.com{encodeURIComponent(text)}`
        : `https://whatsapp.com{encodeURIComponent(text)}`;
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

// AMAN: Memastikan browser membaca HTML dulu baru menjalankan data awal game
window.onload = function() {
    generateJob();
    updateStats();
};
