"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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

// src/services/DeleteAlbumService.ts
var DeleteAlbumService_exports = {};
__export(DeleteAlbumService_exports, {
  DeleteAlbumService: () => DeleteAlbumService
});
module.exports = __toCommonJS(DeleteAlbumService_exports);

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

// src/services/DeleteAlbumService.ts
var DeleteAlbumService = class {
  execute(album_id) {
    return __async(this, null, function* () {
      const album = yield prismaClient.album.findUnique({ where: { id: album_id } });
      if (!album)
        throw new AppError("Does not exists an album with this identificator.", 404);
      yield prismaClient.albumFile.deleteMany({ where: { album_id } });
      yield prismaClient.album.delete({ where: { id: album_id } });
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DeleteAlbumService
});
