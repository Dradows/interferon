import Head from 'next/head';
import tree from '../data/tree.json';
import Nav from '../components/nav.js';
import { useState, useEffect, useRef } from 'react';
import { Layout, Cascader } from 'antd';
import geneSequencesCascaderOptions from '../data/geneSequencesCascaderOptions.json';
import geneSequences from '../data/geneSequences.json';
const { Header, Footer, Sider, Content } = Layout;

// const Nav = dynamic(import('../components/nav.js'), { ssr: false });

function GeneAlign({ gene1, gene2 }) {
  // if gene is not number, return
  if (gene1 === '' || gene2 === '') {
    return <div>?</div>;
  }
  let a = geneSequences[gene1].sequence;
  let b = geneSequences[gene2].sequence;
  let f = new Array(a.length + 1);
  for (let i = 0; i <= a.length; i++) {
    f[i] = new Array(b.length + 1);
  }
  let pre = new Array(a.length + 1);
  for (let i = 0; i <= a.length; i++) {
    pre[i] = new Array(b.length + 1);
  }
  for (let i = 0; i <= a.length; i++) {
    f[i][0] = 0;
    pre[i][0] = [i - 1, 0];
  }
  for (let j = 0; j <= b.length; j++) {
    f[0][j] = 0;
    pre[0][j] = [0, j - 1];
  }
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      f[i][j] = f[i - 1][j - 1];
      pre[i][j] = [i - 1, j - 1];
      if (a[i - 1].toLowerCase() == b[j - 1].toLowerCase()) {
        f[i][j] += 1;
      }
      if (f[i][j] < f[i - 1][j]) {
        f[i][j] = f[i - 1][j];
        pre[i][j] = [i - 1, j];
      }
      if (f[i][j] < f[i][j - 1]) {
        f[i][j] = f[i][j - 1];
        pre[i][j] = [i, j - 1];
      }
    }
  }

  let x = a.length;
  let y = b.length;
  let aa = [];
  let bb = [];
  while (x != 0 || y != 0) {
    let [nx, ny] = pre[x][y];
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
  }
  aa.reverse();
  bb.reverse();
  // let same letter bold
  let aa2 = [];
  let bb2 = [];
  let show = [];
  let same = 0;
  for (let i = 0; i < aa.length; i++) {
    if (aa[i] != '-' && aa[i].toLowerCase() == bb[i].toLowerCase()) {
      same++;
      aa2.push(<b>{aa[i]}</b>);
      bb2.push(<b>{bb[i]}</b>);
    } else {
      aa2.push(aa[i]);
      bb2.push(bb[i]);
    }
    // change line every 20
    if (i % 100 == 99 || i == aa.length - 1) {
      show.push(aa2, <br />, bb2, <br />, '↑ '+same, <br />);
      aa2 = [];
      bb2 = [];
      same = 0;
    }
  }
  let samePercent = (same / aa.length) * 100;
  return (
    <div style={{ justifyContent: 'center', display: 'flex' }}>
      <div style={{ 'font-family': 'monospace' }}>{show}</div>
    </div>
  );
}

export default function Align() {
  const [gene1, setGene1] = useState(0);
  const [gene2, setGene2] = useState(4);
  return (
    <Layout>
      <Head>
        <title>Align</title>
      </Head>
      <Header>
        <Nav selected='Align' />
      </Header>
      <Content>
        <div style={{ padding: 10, justifyContent: 'center', display: 'flex' }}>
          <Cascader
            size='large'
            allowClear={false}
            showSearch={true}
            defaultValue={['Anas platyrhynchos_绿头鸭',0]}
            options={geneSequencesCascaderOptions}
            onChange={e => setGene1(e[1])}
            style={{ width: '30%' }}
          />
          <Cascader
            size='large'
            allowClear={false}
            showSearch={true}
            defaultValue={['Aythya fuligula_凤头潜鸭',4]}
            options={geneSequencesCascaderOptions}
            onChange={e => setGene2(e[1])}
            style={{ width: '30%' }}
          />
        </div>
        <GeneAlign gene1={gene1} gene2={gene2} />
      </Content>
    </Layout>
  );
}

export async function getStaticProps() {
  return {
    props: {},
  };
}
