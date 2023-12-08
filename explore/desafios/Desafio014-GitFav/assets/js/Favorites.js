import { GithubUser } from "./GithubUser.js";

class Favorites {
    constructor(root) {
        this.root = document.querySelector(root);
        this.tbody = this.root.querySelector('table tbody');

        this.load();
    }

    load() {
        this.entries = JSON.parse(localStorage.getItem("@github-Favorites:")) || [];

        if (this.entries.length == 0) {
            this.tbody.classList.add('empty');
        }
    }

    save() {
        localStorage.setItem('@github-Favorites:', JSON.stringify(this.entries));
    }

    delete(user) {
        const filteredEntries = this.entries.filter(entry => entry.login !== user.login);

        this.entries = filteredEntries;
        this.update();
        this.save();

        if (this.entries.length == 0) {
            location.reload()
        }
    }

    async add(username) {
        try {
            const userExists = this.entries.find(entry => entry.login === username);

            if (userExists) {
                throw new Error("Usuário ja está marcado como favorito");
            }

            const user = await GithubUser.search(username);

            if (user.login === undefined) {
                throw new Error("Usuário não encontrado");
            }

            this.tbody.classList.remove('empty');

            this.entries = [user, ...this.entries];
            this.update();
            this.save();

        } catch (error) {
            alert(error.message);
        }
    }
}

export class FavoritesView extends Favorites {
    constructor(root) {
        super(root);

        this.update();
        this.onAdd();
    }

    onAdd() {
        const addButton = this.root.querySelector(".githubSearch button");

        addButton.onclick = () => {
            const { value } = this.root.querySelector(".githubSearch input");

            this.add(value);
        }
    }

    update() {
        if (this.entries.length > 0) {
            this.removeAllTr();
    
            this.entries.forEach(user => {
                const row = this.createRow(user.login, user.name, user.public_repos, user.followers);
    
                row.querySelector('.remove').onclick = () => {
                    const isOk = confirm("Tem certeza que deseja apagar esse perfil?");
    
                    if (isOk) {
                        this.delete(user);
                    }
                }
    
                this.tbody.append(row);
            })
        }
    }

    removeAllTr() {
        this.tbody.querySelectorAll('tr').forEach(tr => {
            tr.remove();
        });
    }

    createRow(login, name, public_repos, followers) {
        const tr = document.createElement('tr');

        tr.innerHTML = `
        <td>
            <div class="user">
                <img src="https://github.com/${login}.png" alt="Foto de perfil do ${name}">
                <a href="https://github.com/${login}" class="detail" target="_blank">
                    <p>
                        ${name}
                    </p>
                    <span>
                        ${login}
                    </span>
                </a>
            </div>
        </td>
        <td>
            ${public_repos}
        </td>
        <td>
            ${followers}
        </td>
        <td>
            <button class="remove">
                Remover
            </button>
        </td>
        `

        return tr;
    }
}