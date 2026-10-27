
const USER = "kmutamar";
const REPO = "SLIDE-KULIAH";

const folders = ["FVK", "PON", "PKL"];

const judul = {
    FVK: "Fungsi Peubah Kompleks",
    PON: "Pengantar Optimisasi Numerik",
    PKL: "Pengantar Kontrol Linier"
};

async function loadFolder(folder) {

    const url =
        `https://api.github.com/repos/${USER}/${REPO}/contents/${folder}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const files = await response.json();

        const pdfs = files
            .filter(f =>
                f.type === "file" &&
                f.name.toLowerCase().endsWith(".pdf")
            )
            .sort((a, b) =>
                a.name.localeCompare(b.name, "id")
            );

        let html = `<section>`;
        html += `<h2>${judul[folder] ?? folder}</h2>`;
        html += `<ul>`;

        pdfs.forEach(file => {

            const nama = file.name
                .replace(/\.pdf$/i, "")
                .replace(/--/g, " ")
                .replace(/-/g, " ");

            const link = `${folder}/${encodeURIComponent(file.name)}`;

            html += `
                <li>
                    <a href="${link}"
                       target="_blank"
                       rel="noopener noreferrer">
                        ${nama}
                    </a>
                </li>
            `;
        });

        if (pdfs.length === 0) {
            html += `<li>Belum ada file PDF.</li>`;
        }

        html += `</ul></section>`;

        return html;

    } catch (error) {
        console.error(`Gagal memuat ${folder}:`, error);

        return `
            <section>
                <h2>${judul[folder] ?? folder}</h2>
                <p>Daftar PDF gagal dimuat.</p>
            </section>
        `;
    }
}

async function tampil(folder) {

    document.querySelectorAll(".tab")
        .forEach(x => x.classList.remove("active"));

    document.getElementById(folder)
        .classList.add("active");

    const content = document.getElementById("content");

    content.innerHTML = "<p>Memuat daftar PDF...</p>";

    content.innerHTML = await loadFolder(folder);
}

function loadWebsite() {

    let html = "";

    folders.forEach(folder => {

        html += `
            <button
                class="tab"
                id="${folder}"
                onclick="tampil('${folder}')">
                ${judul[folder]}
            </button>
        `;
    });

    document.getElementById("tabs").className = "tabs";
    document.getElementById("tabs").innerHTML = html;

    tampil(folders[0]);
}

loadWebsite();
