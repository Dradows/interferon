import Head from 'next/head';
import Nav from '../../components/nav.js';
import { useState, useEffect, useRef } from 'react';
import { Layout, Cascader, Input } from 'antd';
import proteinSequencesCascaderOptions from '../../data/proteinSequencesCascaderOptions.json';
import proteinSequences from '../../data/proteinSequences.json';
import { MinusSquareOutlined } from '@ant-design/icons';
import { useDynamicList } from 'ahooks';

const { Header, Footer, Sider, Content } = Layout;

function GeneAlign({ ids }) {
  // return <div></div>;
  // if gene is not number, return
  // if (gene1 === '' || gene2 === '') {
  //   return <div>?</div>;
  // }
  // let a = proteinSequences[gene1];
  // let b = proteinSequences[gene2];

  // a = '41234123412412312431331414341234144131423131342143214321234131234';
  // b = '41341234123412414123413432431412342431343123414321434123413211234';
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

  // let s = ['abcdef', 'bdefg', 'aef', 'bfg'];

  let s = [];
  for (let i = 0; i < ids.length; i++) {
    s.push(proteinSequences[ids[i]]);
  }

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
  // let same letter bold
  let ss = new Array(s.length);
  for (let i = 0; i < s.length; i++) {
    ss[i] = new Array(s[i].length);
  }
  let show = [];
  let same = 0;
  let color = [
    '#5B8FF9AA',
    '#61DDAA',
    '#F6BD16',
    '#7262fd',
    '#78D3F8',
    '#9661BC',
    '#F6903D',
    '#008685',
    '#F08BB4',
    '#88888833',
  ];
  for (let j = 0; j < s[0].length; j++) {
    // let mp = { '-': color[9] };
    let mp = {};
    let cnt = 0;
    for (let i = 0; i < s.length; i++) {
      let ch = s[i][j];
      if (mp[ch] == undefined) {
        mp[ch] = color[cnt++];
      }
      // if (i == 0 && ch == '-') cnt++;
      ss[i].push({ value: ch, color: mp[ch] });
      // if (i == 0) mp['-'] = color[9];
    }
    // change line every 20
    if (j % 100 == 99 || j == s[0].length - 1) {
      for (let i = 0; i < ss.length; i++) {
        show.push(ss[i]);
        ss[i] = [];
      }
      show.push([{ value: '\u2009' }]);
    }
  }
  return (
    <div style={{ justifyContent: 'center', display: 'flex' }}>
      <div style={{ fontFamily: 'monospace' }} key='align'>
        <table>
          <tbody>
            {show.map((item, cnt) => (
              <tr key={cnt}>
                {item.map((item2, cnt2) => (
                  <td
                    key={cnt2}
                    className={item2.className}
                    style={{ backgroundColor: item2.color }}
                  >
                    {item2.bold || true ? <b>{item2.value}</b> : item2.value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function Align({ align, mp }) {
  const [gene1, setGene1] = useState(align[1]);
  const [gene2, setGene2] = useState(align[3]);
  const { list, push, remove, getKey, insert, replace } = useDynamicList(align);

  return (
    <Layout>
      <Head>
        <title>Align</title>
      </Head>
      <Header>
        <Nav selected='Align' />
      </Header>
      <Content>
        <div
          style={{
            padding: 10,
            justifyContent: 'center',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Cascader
            size='large'
            allowClear={false}
            showSearch={true}
            options={proteinSequencesCascaderOptions}
            onChange={e => push(e[1])}
            style={{ width: '30%', margin: 'auto' }}
          />
          {list.map((item, index) => (
            <div key={getKey(index)} style={{ margin: '10px auto 0 auto' }}>
              <Input
                size='large'
                style={{ width: 300 }}
                placeholder='Please enter name'
                onChange={e => replace(index, e.target.value)}
                value={mp[item]}
              />

              {list.length > 1 && (
                <MinusSquareOutlined
                  style={{ marginLeft: 8,fontSize: '20px',color:'#888' }}
                  onClick={() => {
                    remove(index);
                  }}
                />
              )}
            </div>
          ))}
        </div>
        <GeneAlign ids={list} />
      </Content>
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  let mp = {};
  for (let x of proteinSequencesCascaderOptions)
    for (let y of x.children) mp[y.value] = x.label + '/' + y.label;
  let temp;
  if (params.align === undefined)
    temp = [
      '61a85ac7bae1e2f3d68ef829',
      '61a85ae0bae1e2f3d68ef82d',
      '61a85ad4bae1e2f3d68ef82b',
    ];
  else temp = params.align;
  return {
    props: { align: temp, mp: mp },
  };
}

export async function getStaticPaths() {
  return { paths: [{ params: { align: [] } }], fallback: 'blocking' };
}
