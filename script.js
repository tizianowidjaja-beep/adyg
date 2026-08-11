// ==========================================
// PENGGANTI: GAME MATEMATIKA ACAK & JUMLAH TAP RANDOM
// ==========================================
let jawabanMatematikaBenar = 0; // Variabel baru untuk menyimpan jawaban kuis

function mulaiMinigameUtama() {
    if (money <= 0 || stress >= 100) return;
    sisaWaktu = 5;
    document.getElementById('game-timer').innerText = sisaWaktu;
    document.getElementById('game-modal').style.display = 'flex';

    if (lowonganAktif.tipeGame === "click") {
        document.getElementById('tap-game-elements').style.display = 'block';
        document.getElementById('type-game-elements').style.display = 'none';
        
        tumpukanClick = 0;
        
        // 🎲 MEKANIK BARU: Mengacak target klik antara 8 sampai 15 kali
        const targetClickRandom = Math.floor(Math.random() * (15 - 8 + 1)) + 8;
        
        // Simpan target acak ini ke dalam variabel global targetClick agar dibaca fungsi hitungTap
        window.targetClickAktif = targetClickRandom; 

        document.getElementById('game-instruction').innerText = `Tugasmu: ${lowonganAktif.tugas}`;
        document.getElementById('game-progress').style.width = "0%";
        document.getElementById('tap-btn').innerText = `KLIK UNTUK KERJA! (0/${targetClickRandom})`;
        
    } else if (lowonganAktif.tipeGame === "type") {
        document.getElementById('tap-game-elements').style.display = 'none';
        document.getElementById('type-game-elements').style.display = 'block';
        
        // 🧠 MEKANIK BARU: Membuat kuis matematika acak
        const angka1 = Math.floor(Math.random() * 9) + 2; // Angka 2-10
        const angka2 = Math.floor(Math.random() * 8) + 2; // Angka 2-9
        const tipeOperasi = Math.random() > 0.5 ? "+" : "x";
        
        if (tipeOperasi === "+") {
            jawabanMatematikaBenar = angka1 + angka2;
        } else {
            jawabanMatematikaBenar = angka1 * angka2;
        }

        document.getElementById('game-instruction').innerText = "Masukkan data baru untuk AI! Hitung cepat sebelum sistem crash:";
        document.getElementById('target-word-display').innerText = `${angka1} ${tipeOperasi} ${angka2} = ?`;
        
        // Manfaatkan kolom input teks lama untuk mengetik jawaban angka
        const inputField = document.getElementById('type-game-input');
        inputField.value = "";
        inputField.placeholder = "Ketik jawaban angka di sini...";
        inputField.setAttribute("type", "number"); // Ubah input jadi tipe angka agar pas di HP
        
        setTimeout(() => { inputField.focus(); }, 100);
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
    // Menggunakan target acak yang sudah disimpan di window.targetClickAktif
    const target = window.targetClickAktif || 12; 
    let persentase = (tumpukanClick / target) * 100;
    
    document.getElementById('game-progress').style.width = `${persentase}%`;
    document.getElementById('tap-btn').innerText = `KLIK UNTUK KERJA! (${tumpukanClick}/${target})`;
    
    if (tumpukanClick >= target) {
        clearInterval(timerInterval);
        suksesMinigameUtama();
    }
}

function cekInputKetik() {
    const inputVal = parseInt(document.getElementById('type-game-input').value);
    // Cek apakah ketikan angka pemain sama dengan jawaban matematika yang benar
    if (inputVal === jawabanMatematikaBenar) {
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
    alert(`🎉 Sukses! Gaji Rp ${lowonganAktif.salary.toLocaleString('id-ID')} berhasil masuk rekening.`);
    selesaiSiklusHari();
}

function gagalMinigameUtama() {
    document.getElementById('game-modal').style.display = 'none';
    stress += 35;
    day++;
    alert("❌ KONTRAK PUTUS! Data salah atau pengerjaan lemburmu terlalu lambat. Gaji hangus (Stres +35).");
    selesaiSiklusHari();
}

