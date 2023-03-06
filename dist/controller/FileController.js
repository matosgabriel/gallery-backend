"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/controller/FileController.ts
var FileController_exports = {};
__export(FileController_exports, {
  FileController: () => FileController
});
module.exports = __toCommonJS(FileController_exports);

// src/error/AppError.ts
var AppError = class {
  constructor(message, code = 400) {
    this.message = message;
    this.code = code;
  }
};

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();

// src/utils/S3Storage.ts
var import_client_s3 = require("@aws-sdk/client-s3");
var import_path2 = __toESM(require("path"));
var import_mime = __toESM(require("mime"));
var import_fs = __toESM(require("fs"));

// src/config/multer.ts
var import_multer = __toESM(require("multer"));
var import_crypto = __toESM(require("crypto"));
var import_path = __toESM(require("path"));
var storage = import_multer.default.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "tmp");
  },
  filename: (req, file, cb) => {
    const extension = file.originalname.split(".")[1];
    const newName = file.originalname.split(".")[0] + `-` + import_crypto.default.randomBytes(10).toString("hex") + `.${extension}`;
    cb(null, newName);
  }
});
var multerConfig = {
  directory: import_path.default.resolve(__dirname, "..", "..", "tmp"),
  storage
};

// src/utils/S3Storage.ts
var S3Storage = class {
  constructor() {
    this.client = new import_client_s3.S3Client({
      region: process.env.AWS_REGION
    });
  }
  saveFile(filename) {
    return __async(this, null, function* () {
      const originalPath = import_path2.default.resolve(multerConfig.directory, filename);
      const ContentType = import_mime.default.getType(originalPath);
      if (!ContentType) {
        throw new AppError("File not found.", 404);
      }
      const fileContent = yield import_fs.default.promises.readFile(originalPath);
      try {
        yield this.client.send(new import_client_s3.PutObjectCommand({
          Bucket: process.env.AWS_BUCKET || "matosgabriel-gallery",
          Key: filename,
          ACL: "public-read",
          Body: fileContent,
          ContentType
        }));
      } catch (err) {
        throw new AppError("Failed to upload the file.", 500);
      }
      yield import_fs.default.promises.unlink(originalPath);
    });
  }
  deleteFile(filename) {
    return __async(this, null, function* () {
      try {
        yield this.client.send(new import_client_s3.DeleteObjectCommand({
          Bucket: process.env.AWS_BUCKET || "matosgabriel-gallery",
          Key: filename
        }));
      } catch (err) {
        throw new AppError("Failed to delete the file.", 500);
      }
    });
  }
};

// src/services/CreateFileService.ts
var CreateFileService = class {
  execute(filename) {
    return __async(this, null, function* () {
      const s3Storage = new S3Storage();
      yield s3Storage.saveFile(filename);
      const url = `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${filename}`;
      const newFile = yield prismaClient.file.create({
        data: { name: filename, url }
      });
      return newFile;
    });
  }
};

// src/services/DeleteFileService.ts
var DeleteFileService = class {
  execute(file_id) {
    return __async(this, null, function* () {
      const s3Storage = new S3Storage();
      const file = yield prismaClient.file.findUnique({ where: { id: file_id } });
      if (!file)
        throw new AppError("Does not exists a file with this identificator.");
      yield s3Storage.deleteFile(file.name);
      yield prismaClient.albumFile.deleteMany({ where: { file_id } });
      yield prismaClient.file.delete({ where: { id: file_id } });
    });
  }
};

// src/controller/FileController.ts
var FileController = class {
  create(request, response) {
    return __async(this, null, function* () {
      const data = request.file;
      if (!data)
        throw new AppError("Missing file.", 409);
      const createFileService = new CreateFileService();
      yield createFileService.execute(data.filename);
      return response.status(201).send();
    });
  }
  delete(request, response) {
    return __async(this, null, function* () {
      const query = request.query;
      const file_id = query.id;
      if (!file_id)
        throw new AppError("Identificator not provided.", 409);
      const deleteFileService = new DeleteFileService();
      yield deleteFileService.execute(file_id.toString());
      return response.send();
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FileController
});
