const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
export default class FileUtils {
  static async deleteFileSync(path: string) {
    let result = await this.deleteFileAsync(path);
    if (typeof result === "boolean") {
      return true;
    } else {
      return false;
    }
  }
  static deleteFileAsync(path: string) {
    return new Promise(function(resolve, reject) {
      if (fs && fs.unlink) {
        fs.unlink(path, function(error: any) {
          if (error) {
            reject(error);
          } else {
            resolve(true);
          }
        });
      }
    });
  }
  static exists(path: string): boolean {
    try {
      if (fs && fs.accessSync)
        fs.accessSync(path, fs.constants.R_OK | fs.constants.W_OK);
      console.log("可以读写");
      return true;
    } catch (err) {
      return false;
    }
  }
  static async isFile(path: string) {
    let stat: any = await FileUtils.getFileStat(path);
    return stat.isFile();
  }

  static async isFolder(path: string) {
    let stat: any = await FileUtils.getFileStat(path);
    // console.log("isFolder");
    // console.dir(stat);
    return stat.isDirectory();
  }

  static async readDir(path: string) {
    let files: any = await FileUtils.readDir2(path);
    let list: string[] = files;
    if (list === undefined || list === null) {
      list = [];
    }
    for (let index in list) {
      list[index] = path + "\\" + list[index];
    }
    // console.log("readDir");
    // console.dir(list);
    return list;
  }

  static async getMd52(path: string) {
    return new Promise(resolve => {
      let md5: any = crypto.createHash("md5");
      let stream: any = fs.createReadStream(path);
      stream.on("data", function(chunk: any) {
        md5.update(chunk);
      });
      stream.on("end", function() {
        let fileMd5 = md5.digest("hex");
        resolve(fileMd5);
      });
    });
  }

  static getMd5(path: string) {
    if (!fs) return "";
    let buffer: any = fs.readFileSync(path);
    let fshash: any = crypto.createHash("md5");
    fshash.update(buffer);
    let md5: string = fshash.digest("hex");
    return md5;
  }

  static async readDir2(path: string) {
    return new Promise(function(resolve, reject) {
      if (fs && fs.readdir) {
        fs.readdir(path, function(err: any, files: string[]) {
          if (err) {
            reject(err);
          } else {
            resolve(files);
          }
        });
      }
    });
  }

  static async getFileStat(startFolder: string) {
    return new Promise(function(resolve, reject) {
      if (fs && fs.stat) {
        fs.stat(startFolder, function(err: any, stat: any) {
          if (err) {
            reject(err);
          } else {
            resolve(stat);
          }
        });
      }
    });
  }

  static readFile(path: string) {
    if (fs && fs.readFileSync) {
      let buffer: any = fs.readFileSync(path);
      return buffer;
    } else {
      return "";
    }
  }

  static writeFile(path: string, content: string) {
    if (fs && fs.writeFileSync) {
      fs.writeFileSync(path, content);
    }
  }

  static mkdirsSync(dirname: string) {
    if (fs && fs.existsSync) {
      if (fs.existsSync(dirname)) {
        return true;
      } else {
        if (this.mkdirsSync(path.dirname(dirname))) {
          fs.mkdirSync(dirname);
          return true;
        }
      }
    }
  }
}
