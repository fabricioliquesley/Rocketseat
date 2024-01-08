import { GithubUser } from "./GithubUser.js";

// classe que vai conter a lógica dos dados
// como os dados serão estrurados
class Favorites {
    constructor(root) {
        this.root = document.querySelector(root);
        this.load();
    }

    load() {
        this.entries = JSON.parse(localStorage.getItem('@github-favorites:')) || [];
    }

    save() {
        localStorage.setItem('@github-favorites:', JSON.stringify(this.entries))
    }

    async add(username) {
        try {
            const userExists = this.entries.find(entry => 
                entry.login === username
            )

            if (userExists) {
                throw new Error("Usuário ja está marcado como favorito");
            }

            const user = await GithubUser.search(username);

            if (user.login === undefined) {
                throw new Error("Usuário não encontrado");
            }

            this.entries = [user, ...this.entries];
            this.update();
            this.save();

        } catch (error) {
            alert(error.message);
        }
    }

    delete(user) {
        const filteredEntries = this.entries
            .filter(entry => entry.login !== user.login);

        this.entries = filteredEntries;
        this.update();
        this.save();
    }
}

// classe que vai criar a vizualização e eventos do HTML
export class FavoritesView extends Favorites {
    constructor(root) {
        super(root);

        this.tbody = this.root.querySelector("table tbody");

        this.update();
        this.onAdd();
    }

    onAdd() {
        const addButton = this.root.querySelector('.githubUserSearch button');

        addButton.onclick = () => {
            const { value } = this.root.querySelector('.githubUserSearch input')

            this.add(value);
        }
    }

    update() {
        this.removeAllTr();

        this.entries.forEach(user => {
            const row = this.createRow(user.login, user.name, user.public_repos, user.followers);

            row.querySelector('.remove').onclick = () => {
                const isOk = confirm('Tem certeza que deseja deletar essa linha')

                if (isOk) {
                    this.delete(user);
                }
            }

            this.tbody.append(row);
        });

    }

    createRow(username, name, respository, followers) {
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td class="user">
                <img src="https://github.com/${username}.png" alt="foto de perfil de ${name}">
                <a href="https://github.com/${username}" target="_blank">
                    <p>${name}</p>
                    <span>${username}</span>
                </a>
            </td>
            <td class="repositoriesNumber">
                ${respository}
            </td>
            <td class="followers">
                ${followers}
            </td>
            <td>
                <button class="remove">&times;</button>
            </td>
        `

        return tr;
    }

    removeAllTr() {
        this.tbody.querySelectorAll('tr').forEach(tr => {
            tr.remove();
        });
    }
}