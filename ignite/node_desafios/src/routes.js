import { buildRoutePath } from "./utils/build-route-path.js";
import { randomUUID } from "node:crypto";
import { Database } from "./database.js";

const database = new Database();

export const routes = [
    {
        method: "POST",
        path: buildRoutePath("/task"),
        handler: (request, response) => {
            const { title, description } = request.body;

            if (!title || !description) {
                return response.writeHead(404).end(JSON.stringify({ message: "insert a title and description for the task" }));
            }

            database.insert({
                table: "tasks", data: {
                    id: randomUUID(),
                    title,
                    description,
                    completed_at: null,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                }
            })

            return response.writeHead(200).end()
        }
    }
]