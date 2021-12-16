import Head from 'next/head';
import tree from '../data/tree.json';
import Nav from '../components/nav.js';
import { useState, useEffect, useRef } from 'react';
import { Layout, Cascader } from 'antd';
import geneSequencesCascaderOptions from '../data/geneSequencesCascaderOptions.json';

const { Header, Footer, Sider, Content } = Layout;

// const Nav = dynamic(import('../components/nav.js'), { ssr: false });

export default function Align() {
  return (
    <Layout>
      <Head>
        <title>Align</title>
      </Head>
      <Header>
        <Nav selected='Align' />
      </Header>
      <Content
        style={{ padding: 10, justifyContent: 'center', display: 'flex' }}
      >
        <Cascader
          size='large'
          allowClear={false}
          showSearch={true}
          defaultValue={[]}
          options={geneSequencesCascaderOptions}
          onChange={e=>console.log(e)}
        />
      </Content>
    </Layout>
  );
}

export async function getStaticProps() {
  return {
    props: {},
  };
}
