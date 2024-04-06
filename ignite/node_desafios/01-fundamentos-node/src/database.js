import fs from "node:fs/promises";

const databasePath = new URL("../database.json", import.meta.url);

export class Database {
    #database = {};

    constructor() {
        fs.readFile(databasePath, "utf-8")
            .then(data => {
                this.#database = JSON.parse(data);
            })
            .catch(() => {
                this.#persist();
            })
    }

    #persist() {
        fs.writeFile(databasePath, JSON.stringify(this.#database));
    }

    insert({ table, data }) {
        if (Array.isArray(this.#database[table])) {
            this.#database[table].push(data);
        } else {
            this.#database[table] = [data];
        }

        this.#persist();
        return;
    }

    select({ table, search }) {
        let data = this.#database[table] ?? [];

        const { title, description } = search

        if (title || description) {
            data = data.filter(row => {
                return Object.entries(search).some(([key, value]) => {
                    value = String(value).toLowerCase();
                    return row[key].toLowerCase().includes(value);
                })
            })
        }

        return data;
    }

    update({ table, data }) {
        const { taskId, title, description } = data;

        const taskIndex = this.#database[table].findIndex(row => row.id == taskId);

        if (taskIndex === -1) {
            return 1;
        }

        let task = this.#database[table][taskIndex];

        this.#database[table][taskIndex] = {
            id: taskId,
            title: title ?? task.name,
            description: description ?? task.description,
            completed_at: task.completed_at,
            created_at: task.created_at,
            updated_at: new Date().toUTCString()
        }

        this.#persist();

        return 0;
    }

    partialUpdate({ table, data }) {
        const taskIndex = this.#database[table].findIndex(row => row.id == data.taskId);

        if (taskIndex === -1) {
            return 1;
        }

        const task = this.#database[table][taskIndex];

        if (task.completed_at != null) {
            this.#database[table][taskIndex].completed_at = null;
        }
        else {
            this.#database[table][taskIndex].completed_at = new Date().toUTCString();
        }

        this.#persist();

        return 0;
    }

    delete({ table, data }) {
        const taskIndex = this.#database[table].findIndex(row => row.id == data.taskId);

        if (taskIndex === -1) {
            return 1;
        }
        
        this.#database[table].splice(taskIndex, 1);

        this.#persist();

        return 0;
    }
}