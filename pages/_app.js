import '../styles/globals.css';
// import 'bootstrap/dist/css/bootstrap.css'
import 'antd/dist/reset.css';
import 'github-markdown-css/github-markdown-light.css';
import { ConfigProvider } from 'antd';

function MyApp({ Component, pageProps }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1677FF',
        },
      }}
    >
      <Component {...pageProps} />
    </ConfigProvider>
  );
}

export default MyApp;
