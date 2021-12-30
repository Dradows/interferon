// disjoint_sets.js

function find(x) {
  if (x == parent[x]) return x;
  return (parent[x] = find(parent[x]));
}

// rank is the height of the tree
function union(x, y) {
  var xRoot = find(x);
  var yRoot = find(y);
  if (xRoot == yRoot) return;
  if (rank[xRoot] < rank[yRoot]) {
    parent[xRoot] = yRoot;
  } else if (rank[xRoot] > rank[yRoot]) {
    parent[yRoot] = xRoot;
  } else {
    parent[yRoot] = xRoot;
    rank[xRoot]++;
  }
}

function similarity(a, b) {
  // no pre
  let f = new Array(a.length + 1);
  for (let i = 0; i <= a.length; i++) {
    f[i] = new Array(b.length + 1);
  }
  for (let i = 0; i <= a.length; i++) f[i][0] = 0;
  for (let j = 0; j <= b.length; j++) f[0][j] = 0;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      let x = i - 1;
      let y = j - 1;
      if (a[x].toLowerCase() == b[y].toLowerCase()) {
        f[i][j] = f[i - 1][j - 1] + 1;
      } else {
        f[i][j] = Math.max(f[i - 1][j], f[i][j - 1]);
      }
    }
  }
  return f[a.length][b.length] / Math.min(a.length, b.length);
}

function less(m1, m2) {
  return m1[0] < m2[0] || (m1[0] == m2[0] && m1[1] < m2[1]);
}

let parent = [];
let rank = [];

let s = [
  'MPGPSAPP',
  'MPGPSAPP',
];

for (let i = 0; i < s.length; i++) {
  parent[i] = i;
  rank[i] = 0;
}
let matrix = new Array(s.length);
for (let i = 0; i < s.length; i++) {
  matrix[i] = new Array(s.length);
  matrix[i][i] = 1;
}

let queue = [];

for (let i = 0; i < s.length; i++)
  for (let j = i + 1; j < s.length; j++) {
    queue.push([i, j, similarity(s[i], s[j])]);
    matrix[i][j] = similarity(s[i], s[j]);
    matrix[j][i] = matrix[i][j];
  }

// sort queue
queue.sort((a, b) => b[2] - a[2]);

for (let q of queue) {
  let [x, y, sim] = q;
  if (find(x) == find(y)) continue;
  let tempMax = 0;
  for (let i = 0; i < s.length; i++)
    if (find(i) == find(x))
      for (let j = 0; j < s.length; j++)
        if (find(j) == find(y))
          if (matrix[i][j] > tempMax) {
            tempMax = matrix[i][j];
            x = i;
            y = j;
          }
  let a = s[x];
  let b = s[y];
  let f = new Array(a.length + 1);
  let pre = new Array(a.length + 1);
  for (let i = 0; i <= a.length; i++) {
    f[i] = new Array(b.length + 1);
    pre[i] = new Array(b.length + 1);
    for (let j = 0; j <= b.length; j++) {
      f[i][j] = new Array(2);
      pre[i][j] = new Array(2);
    }
  }
  for (let i = 0; i <= a.length; i++)
    for (let j = 0; j <= b.length; j++)
      for (let k = 0; k < 2; k++) {
        f[i][j][k] = [0, 0];
        pre[i][j][k] = [i - 1, j - 1, 0];
      }
  for (let i = 1; i <= a.length; i++) {
    for (let k = 0; k < 2; k++) {
      pre[i][0][k] = [i - 1, 0, 0];
    }
  }
  for (let j = 0; j <= b.length; j++) {
    for (let k = 0; k < 2; k++) {
      pre[0][j][k] = [0, j - 1, 0];
    }
  }

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      f[i][j][0] = [...f[i - 1][j - 1][0]];
      pre[i][j][0] = [i - 1, j - 1, 0];
      if (less(f[i][j][0], f[i - 1][j - 1][1])) {
        f[i][j][0] = [...f[i - 1][j - 1][1]];
        pre[i][j][0] = [i - 1, j - 1, 1];
      }
      f[i][j][0][1] += 1;
      if (a[i - 1] == b[j - 1]) {
        f[i][j][1] = [...f[i][j][0]];
        pre[i][j][1] = [...pre[i][j][0]];
        if (f[i][j][1][1] == f[i - 1][j - 1][1][1]) {
          f[i][j][1] = [...f[i - 1][j - 1][1]];
          f[i][j][1][1] -= 2;
          if (less(f[i][j][1][1], f[i - 1][j - 1][0][1])) {
            pre[i][j][1] = [i - 1, j - 1, 1];
            f[i][j][1] = [...f[i - 1][j - 1][0]];
            f[i][j][1][1] = f[i - 1][j - 1][0][1];
          }
        }
        f[i][j][1][0] += 1;
        f[i][j][1][1] += 2;
      }
      let ds = [
        { x: -1, y: 0 },
        { x: 0, y: -1 },
      ];
      for (let d of ds) {
        let x = i + d.x;
        let y = j + d.y;
        for (let k = 1; k >= 0; k--) {
          if (less(f[i][j][0], f[x][y][k])) {
            f[i][j][0] = [...f[x][y][k]];
            pre[i][j][0] = [x, y, k];
          }
        }
      }
    }
  }
  let [i, j, k] = [a.length, b.length, 0];
  let ns = new Array(s.length);
  for (let i = 0; i < s.length; i++) ns[i] = [];
  function insert(index, pos, chk) {
    for (let i = 0; i < s.length; i++)
      if (find(i) == find(index))
        if (chk) ns[i].push(s[i][pos]);
        else ns[i].push('-');
  }

  while (i > 0 || j > 0) {
    let [ni, nj, nk] = pre[i][j][k];
    if (ni == i - 1 && nj == j - 1) {
      insert(x, ni, true);
      insert(y, nj, true);
    } else if (ni == i - 1) {
      insert(x, ni, true);
      insert(y, nj, false);
    } else {
      insert(x, ni, false);
      insert(y, nj, true);
    }
    i = ni;
    j = nj;
    k = nk;
  }
  for (let i = 0; i < s.length; i++)
    if (ns[i].length > 0) {
      ns[i].reverse();
      s[i] = ns[i].join('');
    }
  union(x, y);
}
for (let line of s) console.log(line);
