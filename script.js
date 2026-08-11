// ==========================================
// PENGGANTI GAME KETIK: SUWIT LAWAN BOS (GUNTING BATU KERTAS)
// ==========================================
function mulaiMinigameUtama() {
    if (money <= 0 || stress >= 100) return;
    
    // Matikan hitung mundur timer lama karena game suwit tidak pakai buru-buru waktu
    clearInterval(timerInterval); 
    document.getElementById('game-timer').innerText = "-";
    document.getElementById('game-modal').style.display = 'flex';

    if (lowonganAktif.tipeGame === "click") {
        document.getElementById('tap-game-elements').style.display = 'block';
        document.getElementById('type-game-elements').style.display = 'none';
        
        tumpukanClick = 0;
        document.getElementById('game-instruction').innerText = `Tugasmu: ${lowonganAktif.tugas}`;
        document.getElementById('game-progress').style.width = "0%";
        document.getElementById('tap-btn').innerText = `KLIK UNTUK KERJA! (0/${targetClick})`;
        
        // Aktifkan timer khusus untuk game click saja
        sisaWaktu = 5;
        document.getElementById('game-timer').innerText = sisaWaktu;
        timerInterval = setInterval(() => {
            sisaWaktu--;
            document.getElementById('game-timer').innerText = sisaWaktu;
            if (sisaWaktu <= 0) {
                clearInterval(timerInterval);
                gagalMinigameUtama();
            }
        }, 1000);
        
    } else if (lowonganAktif.tipeGame === "type") {
        // Manfaatkan kotak game ketik lama untuk diubah jadi area tombol Suwit
        document.getElementById('tap-game-elements').style.display = 'none';
        document.getElementById('type-game-elements').style.display = 'block';
        
        document.getElementById('game-instruction').innerText = "Adu nasib! Menangkan Suwit melawan Bos Besar untuk diterima kerja!";
        
        // Ubah tampilan input ketik menjadi 3 tombol Suwit (Batu, Gunting, Kertas)
        document.getElementById('type-game-elements').innerHTML = `
            <div class="word-target" id="target-word-display" style="font-size: 15px; background: #e0f2fe; color: #0369a1;">Pilih Senjatamu:</div>
            <div style="display: flex; gap: 8px; justify-content: center; margin-top: 15px;">
                <button class="btn" style="background: #38bdf8; padding: 10px;" onclick="mainSuwit('batu')">✊ BATU</button>
                <button class="btn" style="background: #38bdf8; padding: 10px;" onclick="mainSuwit('gunting')">✌️ GUNTING</button>
                <button class="btn" style="background: #38bdf8; padding: 10px;" onclick="mainSuwit('kertas')">✋ KERTAS</button>
            </div>
            <div id="suwit-result" style="margin-top: 15px; font-weight: bold; font-size: 14px; color: #475569;"></div>
        `;
    }
}

// Logika penentu menang/kalah suwit lawan bot Bos
function mainSuwit(pilihanPemain) {
    const pilihanBos = ["batu", "gunting", "kertas"][Math.floor(Math.random() * 3)];
    const emojiMap = { batu: "✊", gunting: "✌️", kertas: "✋" };
    
    let hasilTeks = `Kamu pilih ${emojiMap[pilihanPemain]} vs Bos pilih ${emojiMap[pilihanBos]}.<br>`;
    
    if (pilihanPemain === pilihanBos) {
        // Jika seri, pemain dipaksa suwit ulang sampai ada yang menang/kalah
        document.getElementById('suwit-result').innerHTML = hasilTeks + "🔄 SERI! Bos minta ulang, pilih lagi!";
    } else if (
        (pilihanPemain === "batu" && pilihanBos === "gunting") ||
        (pilihanPemain === "gunting" && pilihanBos === "kertas") ||
        (pilihanPemain === "kertas" && pilihanBos === "batu")
    ) {
        // Pemain menang
        document.getElementById('suwit-result').innerHTML = hasilTeks + "🎉 MENANG!";
        setTimeout(() => { suksesMinigameUtama(); }, 1200);
    } else {
        // Pemain kalah
        document.getElementById('suwit-result').innerHTML = hasilTeks + "❌ KALAHAHAN!";
        setTimeout(() => { gagalMinigameUtama(); }, 1200);
    }
}

