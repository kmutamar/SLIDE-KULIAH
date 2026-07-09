async function tampil(folder){

    document.querySelectorAll(".tab")
        .forEach(x=>x.classList.remove("active"));

    document.getElementById(folder)
        .classList.add("active");

    document.getElementById("content").innerHTML =
        await loadFolder(folder);
}

async function loadWebsite(){

    let html="";

    folders.forEach(folder=>{

        html+=`
        <button
            class="tab"
            id="${folder}"
            onclick="tampil('${folder}')">

            ${judul[folder]}

        </button>
        `;

    });

    document.getElementById("tabs").className="tabs";
    document.getElementById("tabs").innerHTML=html;

    tampil(folders[0]);

}

loadWebsite();