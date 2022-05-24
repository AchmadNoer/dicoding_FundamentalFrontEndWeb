const CACHE_KEY = "history-belanja";

function checkForStorage() {
    return typeof (Storage) !== "undefined"
}

function cekHistory(arrayHistory) {
    let uniqueData = arrayHistory.reduce((firstData, secondData) => {
        let filtered = firstData.filter(temp => temp.namaItem === secondData.namaItem);
        if (filtered.length > 0) {
            firstData[firstData.indexOf(filtered[0])].kuantitas += secondData.kuantitas;
        } else {
            firstData.push(secondData);
        }

        return firstData;
    }, []);

    return uniqueData;
}

function saveHistory(data) {
    if (checkForStorage()) {
        let historyData = null;
        if (localStorage.getItem(CACHE_KEY) === null) {
            historyData = [];
        } else {
            historyData = JSON.parse(localStorage.getItem(CACHE_KEY));
        }

        historyData.push(data);
        historyData = cekHistory(historyData);
        localStorage.setItem(CACHE_KEY, JSON.stringify(historyData));
    }
}

function showHistory() {
    if (checkForStorage()) {
        return JSON.parse(localStorage.getItem(CACHE_KEY)) || [];
    } else {
        return [];
    }
}

function renderHistory() {
    const historyData = showHistory();
    let historyList = document.querySelector("#historyList");
    historyList.innerHTML = ""; /* selalu hapus konten HTML pada elemen historyList agar tidak menampilkan data ganda */

    let kalkulasiTagihan = 0;
    for (let history of historyData) {
        let row = document.createElement('tr');
        row.innerHTML = "<td>" + history.namaItem + "</td>";
        row.innerHTML += "<td>USD " + Intl.NumberFormat('en-US').format(history.harga) + "</td>";
        row.innerHTML += "<td>" + history.kuantitas + " unit</td>";
        row.innerHTML += "<td>USD " + Intl.NumberFormat('en-US').format(history.harga * history.kuantitas) + "</td>";
        kalkulasiTagihan += history.harga * history.kuantitas;

        historyList.appendChild(row);
    }
    document.querySelector('#totalTagihan').innerText = "USD " + Intl.NumberFormat('en-US').format(kalkulasiTagihan);
}

renderHistory();