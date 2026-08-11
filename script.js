// Tambahkan baris kode berikut ini di bagian paling bawah file script.js Anda:

// ==========================================
// FEATURE: FITUR MODAL EVENT ACAK (RELATIF)
// ==========================================
const daftarEventAcak = [
    { teks: "Kondangan temen SD mendadak! Mau tak mau kudu ngamplop.", biaya: 150000, stres: 10 },
    { teks: "Ban motor bocor kena paku payung pas narik kurir. Sialan!", biaya: 75000, stres: 15 },
    { teks: "Diajak iuran patungan beli kado lahiran bos besar perusahaan.", biaya: 200000, stres: 12 },
    { teks: "Hp jatuh layarnya retak seribu. Biaya servis paksa meluncur.", biaya: 350000, stres: 20 }
];

// Modifikasi fungsi bawaan selesaiSiklusHari untuk memicu event acak harian
const fungsiSiklusAsli = selesaiSiklusHari;
selesaiSiklusHari = function() {
    // Jalankan pengecekan utama terlebih dahulu
    fungsiSiklusAsli();
    
    // Picu musibah pengeluaran mendadak setiap kelipatan hari ke-5
    if (day > 1 && day % 5 === 0 && money > 0 && stress < 100) {
        const event = daftarEventAcak[Math.floor(Math.random() * daftarEventAcak.length)];
        money -= event.biaya;
        stress += event.stres;
        
        // Munculkan notifikasi pop-up kejutan di layar
        setTimeout(() => {
            picuAnimasiUang(event.biaya, true);
            alert(`⚠️ EVENT MENDADAK (Hari ke-${day}):\n\n${event.teks}\n\nSaldo berkurang: -Rp ${event.biaya.toLocaleString('id-ID')}\nStres bertambah: +${event.stres}`);
            updateStats();
        }, 600);
    }
};

// Cetak status modifikasi berhasil di log sistem browser
console.log("Sistem Event Kejatan Acak Berhasil Disuntikkan!");
// Tambahkan baris kode berikut ini di bagian paling bawah file script.js Anda:

// ==========================================
// FEATURE: FITUR MODAL EVENT ACAK (RELATIF)
// ==========================================
const daftarEventAcak = [
    { teks: "Kondangan temen SD mendadak! Mau tak mau kudu ngamplop.", biaya: 150000, stres: 10 },
    { teks: "Ban motor bocor kena paku payung pas narik kurir. Sialan!", biaya: 75000, stres: 15 },
    { teks: "Diajak iuran patungan beli kado lahiran bos besar perusahaan.", biaya: 200000, stres: 12 },
    { teks: "Hp jatuh layarnya retak seribu. Biaya servis paksa meluncur.", biaya: 350000, stres: 20 }
];

// Modifikasi fungsi bawaan selesaiSiklusHari untuk memicu event acak harian
const fungsiSiklusAsli = selesaiSiklusHari;
selesaiSiklusHari = function() {
    // Jalankan pengecekan utama terlebih dahulu
    fungsiSiklusAsli();
    
    // Picu musibah pengeluaran mendadak setiap kelipatan hari ke-5
    if (day > 1 && day % 5 === 0 && money > 0 && stress < 100) {
        const event = daftarEventAcak[Math.floor(Math.random() * daftarEventAcak.length)];
        money -= event.biaya;
        stress += event.stres;
        
        // Munculkan notifikasi pop-up kejutan di layar
        setTimeout(() => {
            picuAnimasiUang(event.biaya, true);
            alert(`⚠️ EVENT MENDADAK (Hari ke-${day}):\n\n${event.teks}\n\nSaldo berkurang: -Rp ${event.biaya.toLocaleString('id-ID')}\nStres bertambah: +${event.stres}`);
            updateStats();
        }, 600);
    }
};

// Cetak status modifikasi berhasil di log sistem browser
console.log("Sistem Event Kejatan Acak Berhasil Disuntikkan!");

