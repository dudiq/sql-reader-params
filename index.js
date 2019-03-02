const path = require("path");
const fs = require("fs");

const includesReg = new RegExp("{{(.*?)}}", "ig");

function resolveFile(base, file) {
  return path.resolve(base, file);
}

function findIncludes(text) {
  const map = {};
  let result;
  includesReg.lastIndex = 0;
  let index = 1;
  while ((result = includesReg.exec(text)) !== null) {
    const keyFull = result[0];
    const keyOut = result[1];
    if (keyFull && keyOut) {
      map[keyOut] = {
        key: keyFull,
        index
      };
      index++;
    }
  }
  return map;
}

function replaceAll(text, what, to) {
  return text.split(what).join(to);
}

function prepareText(fileContent, map) {
  let ret = fileContent;
  for (let key in map) {
    const item = map[key];
    ret = replaceAll(ret, item.key, "$" + item.index);
  }

  return ret;
}

function prepareList(map) {
  const ret = [];
  for (let key in map) {
    const item = map[key];
    const index = item.index - 1;
    ret[index] = key;
  }
  return ret;
}

function parseText(fileContent) {
  const map = findIncludes(fileContent);
  const text = prepareText(fileContent, map);
  const list = prepareList(map);
  return {
    map,
    list,
    text
  };
}

function getCaller() {
  let stack, traceFn;
  traceFn = Error.prepareStackTrace;
  Error.prepareStackTrace = function(err, stack) {
    return stack;
  };
  stack = (new Error()).stack;
  Error.prepareStackTrace = traceFn;
  return stack[2].getFileName();
}

class SqlReader {
  constructor(filePath) {
    const fileContent = fs.readFileSync(filePath, "utf8");
    const data = parseText(fileContent);
    this.map = data.map;
    this.list = data.list;
    this.text = data.text;
  }

  getText() {
    return this.text;
  }

  paramsToValues(params) {
    const ret = [];
    const list = this.list;
    for (let i = 0, l = list.length; i < l; i++) {
      const key = list[i];
      ret.push(params[key]);
    }
    return ret;
  }
}


module.exports = function(fileName) {
  const base = path.dirname(getCaller());
  const filePath = resolveFile(base, fileName);
  return new SqlReader(filePath);
};
