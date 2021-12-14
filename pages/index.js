import fs from 'fs';
import ReactMarkdown from 'react-markdown';

export default function Home({ file }) {
  return (
    <>
      <ReactMarkdown className='m-5 p-5'>{file}</ReactMarkdown>
    </>
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
