const { Router } = require("express");

const usersRoutes = Router();

usersRoutes.get("/:id", (request, response) => {
    const { id } = request.params;

    response.send(`O id solicitante é: ${id}`);
});

module.exports = usersRoutes;