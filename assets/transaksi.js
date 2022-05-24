console.log("PING");

const transaksi = {
    namaItem: null,
    harga: null,
    kuantitas: null
};

function resetData() {
    transaksi.namaItem = null;
    transaksi.harga = null;
    transaksi.kuantitas = null;
}

function setKuantitas(data) {
    if (data == null) {
        let inputKuantitas = null;
        inputKuantitas = prompt("Masukkan kuantitas item " + transaksi.namaItem + " yang ingin dibeli", "");
        if (inputKuantitas != null && inputKuantitas > 0) {
            kuantitas = jumlah = parseInt(inputKuantitas);
            alert(transaksi.namaItem + " berhasil ditambahkan ke KantongKu");
            return kuantitas;
        } else {
            alert("Terjadi error pada input. Silakan coba lagi");
            return null;
        }
    }
}

function setTransaksi(choosenItem) {
    switch (choosenItem) {
        case "model-S":
            resetData();
            transaksi.namaItem = "Tesla Model S";
            transaksi.harga = 93740;
            transaksi.kuantitas = setKuantitas(transaksi.kuantitas);
            break;

        case "model-3":
            resetData();
            transaksi.namaItem = "Tesla Model 3";
            transaksi.harga = 41940;
            transaksi.kuantitas = setKuantitas(transaksi.kuantitas);
            break;

        case "model-X":
            resetData();
            transaksi.namaItem = "Tesla Model X";
            transaksi.harga = 108940;
            transaksi.kuantitas = setKuantitas(transaksi.kuantitas);
            break;

        case "model-Y":
            resetData();
            transaksi.namaItem = "Tesla Model Y";
            transaksi.harga = 57940;
            transaksi.kuantitas = setKuantitas(transaksi.kuantitas);
            break;

        case "wall-connector":
            resetData();
            transaksi.namaItem = "Tesla Wall Connector";
            transaksi.harga = 400;
            transaksi.kuantitas = setKuantitas(transaksi.kuantitas);
            break;
    }

    return;
}

const clickAction = document.querySelectorAll(".click-action");
for (let reaction of clickAction) {
    reaction.addEventListener('click', function (event) {
        const target = event.target;    /* mendapatkan objek elemen yang diklik */
        if (target.classList.contains('click-action')) {
            if (target.classList.contains('model-S')) {
                keyword = "model-S";
                setTransaksi(keyword);
                updateKeranjang();
                updateButton(keyword);
                return;
            }

            if (target.classList.contains('model-3')) {
                keyword = "model-3";
                setTransaksi(keyword);
                updateKeranjang();
                updateButton(keyword);
                return;
            }

            if (target.classList.contains('model-X')) {
                keyword = "model-X";
                setTransaksi(keyword);
                updateKeranjang();
                updateButton(keyword);
                return;
            }

            if (target.classList.contains('model-Y')) {
                keyword = "model-Y";
                setTransaksi(keyword);
                updateKeranjang();
                updateButton(keyword);
                return;
            }

            if (target.classList.contains('wall-connector')) {
                keyword = "wall-connector";
                setTransaksi(keyword);
                updateKeranjang();
                updateButton(keyword);
                return;
            }

            if (target.classList.contains('bayar')) {
                const confirmAnswer = confirm("Pembayaran tagihan KantongKu sebesar " + document.querySelector("#totalTagihan").innerText + ". Lanjutkan?");
                if (confirmAnswer == true) {
                    localStorage.clear();
                    renderHistory();
                    alert("Terima kasih telah berbelanja");
                    location.reload();
                } else {
                    alert("Selamat berbelanja");
                }
            }

            if (target.classList.contains('hapus')) {
                const confirmAnswer = confirm("KantongKu akan dikosongkan. Yakin?");
                if (confirmAnswer == true) {
                    localStorage.clear();
                    renderHistory();
                } else {
                    alert("Selamat berbelanja");
                }
            }

            return;
        }
    });
}

function updateButton(keyword) {
    let ganti = document.querySelector("." + keyword);
    ganti.innerText = "Beli Lagi";
}

function updateKeranjang() {
    const history = {
        namaItem: transaksi.namaItem,
        harga: transaksi.harga,
        kuantitas: transaksi.kuantitas
    };
    if (history.kuantitas != null) {
        saveHistory(history);
    }

    renderHistory();
}