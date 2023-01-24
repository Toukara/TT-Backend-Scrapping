const baseController = require("./baseController");

const { createFile } = require("../utils/fileUtils");

class FilesController extends baseController {
  static Model = "File";

  constructor(req, res) {
    super(req, res);
  }

  async index() {
    this.res.status(200).json({ message: "Hello World" });
  }

  async show(id) {
    if (!id) return this.res.status(400).json({ error: "File id is required" });

    const file = createFile.excelFiles(id);

    if (!file) {
      return this.res.status(404).json({ error: "File not found" });
    } else {
      return this.res.status(200).json(file);
    }
  }
}

module.exports = FilesController;
