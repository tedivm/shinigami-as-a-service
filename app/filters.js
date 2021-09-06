const fs = require("fs")
const BloomFilter = require("../lib/bloomfilter.js").BloomFilter;

function loadBloomFilter(name) {
  const arrayBuffer = toArrayBuffer(fs.readFileSync('data/' + name + '.dat', null))
  const array = new Uint32Array(arrayBuffer);
  const b = new BloomFilter(array, 20);
  b.name = name;
  return b
}

function toArrayBuffer(buf) {
  var ab = new ArrayBuffer(buf.length);
  var view = new Uint8Array(ab);
  for (var i = 0; i < buf.length; ++i) {
      view[i] = buf[i];
  }
  return ab;
}

module.exports = {
  "transphobic": loadBloomFilter('transphobic'),
  "tfriendly": loadBloomFilter('t-friendly'),
};
