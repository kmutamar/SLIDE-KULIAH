const user = "kmutamar";
const repo = "SLIDE-KULIAH";
const branch = "main";

const folders = [
    "FVK",
    "PON",
    "PKL",
    "TKO"
];

folders.forEach(loadFolder);

async function loadFolder(folder){

    const url =
    `https://api.github.com/repos/${user}/${repo}/contents/${folder}?ref=${branch}`;

    const response = await fetch(url);

    const files = await response.json();

    const ul = document.getElementById(folder);

    ul.innerHTML="";

    files
        .filter(f=>f.name.endsWith(".pdf"))
        .sort((a,b)=>a.name.localeCompare(b.name))
        .forEach(file=>{

            const li=document.createElement("li");

            const a=document.createElement("a");

            a.href=file.download_url;

            a.target="_blank";

            a.textContent=file.name
                .replace(".pdf","")
                .replaceAll("--",". ")
                .replaceAll("-"," ");

            li.appendChild(a);

            ul.appendChild(li);

        });

}