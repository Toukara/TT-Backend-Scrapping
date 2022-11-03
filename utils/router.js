const express = require("express");

class Router {
  static ROUTES_MAP = { index: "GET", create: "POST", show: "GET", update: "PUT", destroy: "DELETE" };
  static NEEDS_ID = ["show", "update", "destroy", "create"];

  constructor() {
    this.router = express.Router();
    // this.routes = {};
  }

  resources(path, controller) {
    for (const [method, verb] of Object.entries(Router.ROUTES_MAP)) {
      this.route(path, method, verb, controller);
    }
    return this;
  }

  route(path, method, verb, controller) {
    if (Router.NEEDS_ID.includes(method)) {
      path = `${path}/:id`;
    }

    this.router[verb.toLowerCase()](path, async (req, res) => {
      try {
        const instance = new controller(req, res);
        await instance.call(method, req.params.id);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });
  }
}

module.exports = Router;
