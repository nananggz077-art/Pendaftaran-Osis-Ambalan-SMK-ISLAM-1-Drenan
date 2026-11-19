// Data Divisi OSIS (Divos) & Ambalan (Askadewa)
const registrationData = [
    {
        id: 1,
        name: "OSIS (Divos) - Pengurus Inti",
        category: "osis",
        tag: "Divos",
        desc: "Koordinasi program kerja siswa, kepemimpinan, dan manajemen kegiatan sekolah.",
        img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 2,
        name: "OSIS (Divos) - Humas & Media",
        category: "osis",
        tag: "Divos",
        desc: "Dokumentasi kegiatan, publikasi informasi, serta pengelolaan media kreatif siswa.",
        img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 3,
        name: "OSIS (Divos) - Kesiswaan & Event",
        category: "osis",
        tag: "Divos",
        desc: "Perencanaan lomba, peringatan hari besar, serta pengembangan minat dan bakat.",
        img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 4,
        name: "Ambalan (Askadewa) - Satuan Putra",
        category: "ambalan",
        tag: "Askadewa",
        desc: "Pembinaan kedisiplinan, keterampilan kepramukaan, baris-berbaris, dan kepemimpinan putra.",
        img: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 5,
        name: "Ambalan (Askadewa) - Satuan Putri",
        category: "ambalan",
        tag: "Askadewa",
        desc: "Pengembangan karakter, kemandirian, manajemen kegiatan, dan kepramukaan putri.",
        img: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 6,
        name: "Ambalan (Askadewa) - giat & Tekpram",
        category: "ambalan",
        tag: "Askadewa",
        desc: "Fokus pada pionering, sandi, peta-kompas, dan pelatihan teknik kepramukaan.",
        img: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 7,
        name: "Bidang Khusus - Administrasi & Logistik",
        category: "khusus",
        tag: "Divos & Askadewa",
        desc: "Pengarsipan surat-menyurat, pendataan anggota, serta perlengkapan kegiatan.",
        img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 8,
        name: "Bidang Khusus - Bakti & Sosial",
        category: "khusus",
        tag: "Divos & Askadewa",
        desc: "Kegiatan pengabdian masyarakat, kepedulian lingkungan, dan aksi sosial sekolah.",
        img: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=500&q=80"
    }
];

let selectedUnits = [];
let currentCategory = 'semua';

// Menampilkan Daftar Divisi / Unit
function renderMenu(items) {
    const container = document.getElementById("menu-container");
    container.innerHTML = "";

    if (items.length === 0) {
        container.innerHTML = "<p>Divisi atau unit tidak ditemukan.</p>";
        return;
    }

    items.forEach(item => {
        container.innerHTML += `
            <div class="card">
                <img src="${item.img}" alt="${item.name}">
                <div class="card-body">
                    <div>
                        <h3 class="card-title">${item.name}</h3>
                        <p class="card-desc">${item.desc}</p>
                    </div>
                    <div class="card-footer">
                        <span class="badge">${item.tag}</span>
                        <button class="add-btn" onclick="addToSelection(${item.id})">+ Pilih</button>
                    </div>
                </div>
            </div>
        `;
    });
}

// Filter Kategori
function filterMenu(category, btn) {
    currentCategory = category;
    document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    applyFilters();
}

// Pencarian
function searchMenu() {
    applyFilters();
}

function applyFilters() {
    const keyword = document.getElementById("searchInput").value.toLowerCase();
    const filtered = registrationData.filter(item => {
        const matchCat = currentCategory === 'semua' || item.category === currentCategory;
        const matchSearch = item.name.toLowerCase().includes(keyword) || item.desc.toLowerCase().includes(keyword);
        return matchCat && matchSearch;
    });
    renderMenu(filtered);
}

// Tambah ke Pilihan Pendaftaran
function addToSelection(id) {
    const item = registrationData.find(m => m.id === id);
    const alreadySelected = selectedUnits.some(c => c.id === id);

    if (alreadySelected) {
        alert(`${item.name} sudah ada dalam daftar pilihan kamu.`);
        return;
    }

    selectedUnits.push(item);
    updateSelectionUI();
}

// Hapus Pilihan
function removeSelection(id) {
    selectedUnits = selectedUnits.filter(c => c.id !== id);
    updateSelectionUI();
}

// Update Tampilan Pilihan
function updateSelectionUI() {
    const cartCount = document.getElementById("cart-count");
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    cartItems.innerHTML = "";

    if (selectedUnits.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #777;">Belum ada divisi/unit yang dipilih.</p>';
    } else {
        selectedUnits.forEach(item => {
            cartItems.innerHTML += `
                <div class="cart-item">
                    <div>
                        <strong>${item.name}</strong><br>
                        <small>${item.tag}</small>
                    </div>
                    <button class="remove-btn" onclick="removeSelection(${item.id})">Hapus</button>
                </div>
            `;
        });
    }

    cartCount.innerText = selectedUnits.length;
    cartTotal.innerText = `${selectedUnits.length} Unit/Divisi`;
}

// Buka/Tutup Modal Pendaftaran
function toggleCart() {
    const modal = document.getElementById("cartModal");
    modal.style.display = modal.style.display === "flex" ? "none" : "flex";
}

// Proses Kirim Pendaftaran
function checkout() {
    if (selectedUnits.length === 0) {
        alert("Silakan pilih minimal satu divisi OSIS (Divos) atau Ambalan (Askadewa)!");
        return;
    }

    const name = document.getElementById("studentName").value.trim();
    const studentClass = document.getElementById("studentClass").value.trim();
    const reason = document.getElementById("studentReason").value.trim();

    if (!name || !studentClass) {
        alert("Harap isi Nama Lengkap Siswa dan Kelas & Jurusan!");
        return;
    }

    const daftarPilihan = selectedUnits.map(item => `- ${item.name}`).join("\n");

    alert(
        `Pendaftaran berhasil dikirim!\n\n` +
        `Nama: ${name}\n` +
        `Kelas: ${studentClass}\n` +
        `Pilihan:\n${daftarPilihan}\n` +
        `Motivasi: ${reason || "-"}`
    );

    selectedUnits = [];
    document.getElementById("studentName").value = "";
    document.getElementById("studentClass").value = "";
    document.getElementById("studentReason").value = "";
    updateSelectionUI();
    toggleCart();
}

// Inisialisasi awal
renderMenu(registrationData);
