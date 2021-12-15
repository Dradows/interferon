import fs from 'fs';
import ReactMarkdown from 'react-markdown';
import { Layout } from 'antd';
import Nav from '../components/nav.js';

const { Header, Footer, Sider, Content } = Layout;

export default function Home({ file }) {
  return (
    <Layout>
      <Header>
        <Nav selected='Index'/>
      </Header>
      <ReactMarkdown className='m-5 p-5'>{file}</ReactMarkdown>
    </Layout>
  );
}

export async function getStaticProps() {
  const file = fs.readFileSync('README.md', 'utf8');
  return {
    props: {
      file: file,
    },
  };
}
