import { buildRoutePath } from "./utils/build-route-path.js";
import { randomUUID } from "node:crypto";
import { Database } from "./database.js";

const database = new Database();

export const routes = [
    {
        method: "POST",
        path: buildRoutePath("/tasks"),
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
                    created_at: new Date().toUTCString(),
                    updated_at: new Date().toUTCString(),
                }
            })

            return response.writeHead(200).end()
        }
    },
    {
        method: "GET",
        path: buildRoutePath("/tasks"),
        handler: (request, response) => {
            const { title, description } = request.query;

            const tasks = database.select({
                table: "tasks", search: {
                    title,
                    description
                }
            });

            return response.writeHead(200).end(JSON.stringify(tasks));
        }
    },
    {
        method: "PUT",
        path: buildRoutePath("/tasks/:taskId"),
        handler: (request, response) => {
            const { taskId } = request.params;
            const { title, description } = request.body;

            if (!title || !description) {
                return response.writeHead(404).end(JSON.stringify({ message: "insert a title or description to update the task" }));
            }

            const updateStatus = database.update({
                table: "tasks", data: {
                    taskId,
                    title,
                    description
                }
            })

            if (updateStatus != 0) {
                return response.writeHead(404).end(JSON.stringify({ message: "The taskId not register in database" }));
            }

            return response.writeHead(200).end();
        }
    },
    {
        method: "PATCH",
        path: buildRoutePath("/tasks/:taskId/complete"),
        handler: (request, response) => {
            const { taskId } = request.params;

            const partialUpdateStatus = database.partialUpdate({
                table: "tasks", data: {
                    taskId
                }
            })

            if (partialUpdateStatus != 0) {
                return response.writeHead(404).end(JSON.stringify({ message: "The taskId not register in database" }));
            }

            return response.writeHead(200).end();
        }
    },
    {
        method: "DELETE",
        path: buildRoutePath("/tasks/:taskId"),
        handler: (request, response) => {
            const { taskId } = request.params;

            const deleteStatus = database.delete({ table: "tasks", data: { taskId } })

            if (deleteStatus != 0) {
                return response.writeHead(404).end(JSON.stringify({ message: "The taskId not register in database" }));
            }

            return response.writeHead(200).end();
        }
    }
]