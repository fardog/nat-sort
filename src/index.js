const NUM_REX = /^\d+(\.\d+)?/

module.exports = nsort

function nsort(arr = []) {
  return _arrayify(arr).sort(compare)
}

nsort.compare = compare
nsort._arrayify = _arrayify
nsort._process = _process

function compare(_a, _b) {
  const a = _process(_a)
      , b = _process(_b)

  for(let i = 0; i < Math.max(a.length, b.length); ++i) {
    // shortest string wins if we run out of characters
    if(typeof a[i] === 'undefined') {
      return -1
    } else if(typeof b[i] === 'undefined') {
      return 1
    }

    let f = a[i].toLowerCase()
      , l = b[i].toLowerCase()
      , fn = a.slice(i).match(NUM_REX)
      , ln = b.slice(i).match(NUM_REX)

    // if we found numbers, compare those
    if(fn && ln) {
      let numf = Number(fn[0])
        , numl = Number(ln[0])

      if(numf < numl) {
        return -1
      } else if(numf > numl) {
        return 1
      }

      continue
    }

    // else, compare alphabetically
    if(f < l) {
      return -1
    } else if(f > l) {
      return 1
    }
  }

  return 0
}

function _arrayify(obj) {
  return Array.isArray(obj) ? obj : [obj]
}

function _process(str) {
  return String(str)
    .trim()
    .replace(/^(the|a|an)\ /i, '')
    .replace(/[^A-Za-z0-9\ \.]/g, '')
    .replace(/\ +/g, ' ')
}
