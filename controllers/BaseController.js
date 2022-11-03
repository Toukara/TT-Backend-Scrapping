const { models } = require("../database");

class BaseController {
  constructor(req, res) {
    this.req = req;
    this.res = res;
    this.model = models[this.constructor.Model];
  }

  async call(method, ...args) {
    try {
      await this[method](...args);
    } catch (err) {
      this.res.status(500).json({ error: err.message, stack: err.stack });
    }
  }

  index() {
    throw new Error("Method index is not implemented");
  }

  create() {
    throw new Error("Method create is not implemented");
  }

  show() {
    throw new Error("Method show is not implemented");
  }

  update() {
    throw new Error("Method update is not implemented");
  }

  destroy() {
    throw new Error("Method destroy is not implemented");
  }

  /** Send a JSON response.
   *
   * @param {Object} data
   */
  json(data) {
    this.res.json(data);
  }

  /** Send a JSON response with a status code.
   *
   * @param {Number} status
   * @param {Object} data
   */
  status(status, data) {
    this.res.status(status).json(data);
  }
}

module.exports = BaseController;
