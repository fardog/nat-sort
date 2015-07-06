# nat-sort

A human sort, either as a module or CLI.

[![Build Status](http://img.shields.io/travis/fardog/nat-sort/master.svg?style=flat)](https://travis-ci.org/fardog/nat-sort)
[![npm install](http://img.shields.io/npm/dm/nat-sort.svg?style=flat)](https://www.npmjs.org/package/nat-sort)

## Example

As a library:

```javascript
var nsort = require('nat-sort')

var unsorted = ['c', 'The A', 'b']

// use nsort directly with an array
nsort(unsorted) // ['The A', 'b', 'c']

// or use it as a comparator
unsorted.sort(nsort.compare) // ['The A', 'b', 'c']
```

With the command line:

```bash
$ npm install -g nat-sort

# These two commands are functionally equivalent:
$ cat newline-delimited-unsorted.txt | nsort > sorted.txt
$ nsort newline-delimited-unsorted.txt > sorted.txt

$ nsort --help  # output a help message

$ cat unsorted-films.txt
Blue Submarine No. 6 (1998)
Sphere (1998)
2010 (1984)
Capricorn One (1977)
The Amittyville Horror (1979)
Dr. Strangelove (1964)
Space Battleship Yamato (1977)
Death Race 2000 (1975)
Moon (2009)
Ju-on: The Grudge (2002)
The Andromeda Strain (1971)
House on Haunted Hill (1999)
Solaris (1972)
The Man Who Fell to Earth (1976)
The Omega Man (1971)
Das Millionenspiel (1970)
House on Haunted Hill (1959)
Logan's Run (1976)

$ nsort unsorted-films.txt
2010 (1984)
The Amittyville Horror (1979)
The Andromeda Strain (1971)
Blue Submarine No. 6 (1998)
Capricorn One (1977)
Das Millionenspiel (1970)
Death Race 2000 (1975)
Dr. Strangelove (1964)
House on Haunted Hill (1959)
House on Haunted Hill (1999)
Ju-on: The Grudge (2002)
Logan's Run (1976)
The Man Who Fell to Earth (1976)
Moon (2009)
The Omega Man (1971)
Solaris (1972)
Space Battleship Yamato (1977)
Sphere (1998)
```

## Caveats

- There are no options at the moment; there may be some in a future version
- The sort function expects ASCII text only
- This is certainly not performant, it was designed for a very specific purpose,
  and will probably choke on very large data sets.

## License

MIT. See [LICENSE](./LICENSE) for details.
