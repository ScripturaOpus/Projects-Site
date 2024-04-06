const DEBUG = false;
const cardTarget = document.getElementById("project-organizer");

async function renderRepo(repo) {
    const card = document.createElement("li");
    card.classList = "project-card";

    card.innerHTML = `<a href="https://github.com/ScripturaOpus/${repo.name}">
    <h6>${repo.name}</h6>
    <p >${repo.description || ""}</p>
</a>`;

    cardTarget.appendChild(card);
    requestAnimationFrame(() =>
        requestAnimationFrame(() => card.classList.add("expand"))
    );
}

const apiUrl = `https://api.github.com/orgs/ScripturaOpus/repos`;
async function getRepos() {
    const response = await fetch(apiUrl);
    const data = await response.json();

    for (let i = 0; i < data.length; i++) {
        const repo = data[i];

        if (dontshow.includes(repo.name)) {
            continue;
        }

        await renderRepo(repo);
    }

    const info = document.createElement("div");
    info.innerHTML = `
    
    <main>
        <hr>
        <p class="centered">
            More projects to come!
        </p>
    </main>
`;

    cardTarget.appendChild(info);
}

getRepos();
