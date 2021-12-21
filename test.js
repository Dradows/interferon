let a = '4123412341111111111111111111111111111111111111111111111111112412312431331414341234144131423131342143214321234131234';
let b = '4134123412341241412341343241111111111111111111111111111111111111111111111111111111111111111111111111111131412342431343123414321434123413211234';
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
    f[i][j][0] = [...f[i - 1][j - 1]];
    pre[i][j][0] = [i - 1, j - 1, 0];
    f[i][j][0][1] += 1;
    if (a[i - 1].toLowerCase() == b[j - 1].toLowerCase()) {
      f[i][j][1] = [...f[i - 1][j - 1][0]];
      pre[i][j][1] = [i - 1, j - 1, 0];
      f[i][j][1][1] += 1;
      if (i > 1 && j > 1 && a[i - 2] == b[j - 2]) {
        f[i][j][1] = [...f[i - 1][j - 1][1]];
        pre[i][j][1] = [i - 1, j - 1, 1];
        f[i][j][1][1] += 2;
      }
    }
    let ds = [
      { x: -1, y: 0 },
      { x: 0, y: -1 },
    ];
    for (let d of ds) {
      let x = i + d.x;
      let y = j + d.y;
      for (let k = 0; k < 2; k++) {
        if (
          f[i][j][0][0] < f[x][y][k][0] ||
          (f[i][j][0][0] == f[x][y][k][0] && f[i][j][0][1] < f[x][y][k][1])
        ) {
          f[i][j][0] = [...f[x][y][0]];
          pre[i][j][0] = [x, y, k];
        }
      }
    }
  }
}
let x = a.length;
let y = b.length;
let k = 0;
if (f[x][y][1] > f[x][y][0]) k = 1;
let aa = [];
let bb = [];
while (x > 0 || y > 0) {
  let [nx, ny, nk] = pre[x][y][k];
  if (nx == x - 1 && ny == y - 1) {
    aa.push(a[nx]);
    bb.push(b[ny]);
  } else if (nx == x - 1) {
    aa.push(a[nx]);
    bb.push('-');
  } else {
    aa.push('-');
    bb.push(b[ny]);
  }
  x = nx;
  y = ny;
  k = nk;
}
aa.reverse();
bb.reverse();

console.log(aa);
console.log(bb);
