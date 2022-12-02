import { Menu } from 'antd';
import Link from 'next/link';
import { DownOutlined } from '@ant-design/icons';
const { SubMenu } = Menu;
import Head from 'next/head';

export default function Nav({ selected }) {
  return (
    <>
      <Head>
        {/* import icon */}
        <link rel='icon' href='/interferon/favicon.png' />
      </Head>

      <Menu
        className=''
        mode='horizontal'
        defaultSelectedKeys={[selected]}
        items={[
          { key: 'Index', label: <Link href='/'>Index</Link> },
          { key: 'Tree', label: <Link href='/tree'>Tree</Link> },
          {
            key: 'Difference',
            label: <Link href='/difference'>Difference</Link>,
          },
          {
            key: 'Chromosome',
            label: <Link href='/chromosome'>Chromosome</Link>,
          },
          {
            key: 'Heatmap',
            label: 'Heatmap',
            icon: <DownOutlined />,
            children: [
              {
                key: 'Gene',
                label: <Link href='/geneHeatmap'>Gene</Link>,
              },
              {
                key: 'Protein',
                label: <Link href='/proteinHeatmap'>Protein</Link>,
              },
            ],
          },
          { key: 'Align', label: <Link href='/proteinAlign/main'>Align</Link> },
          { key: 'Query', label: <Link href='/query'>Query</Link> },
          {
            key: 'Translocation',
            label: <Link href='/translocation'>Translocation</Link>,
          },
        ]}
      />

      {/* <Menu className='' mode='horizontal' defaultSelectedKeys={[selected]}>
        <Menu.Item key='Index'>
          <Link href='/'>
            <a>Index</a>
          </Link>
        </Menu.Item>
        <Menu.Item key='Tree'>
          <Link href='/tree'>
            <a>Tree</a>
          </Link>
        </Menu.Item>
        <Menu.Item className='hover:rounded-full' key='Difference'>
          <Link href='/difference'>
            <a>Difference</a>
          </Link>
        </Menu.Item>
        <Menu.Item key='Chromosome'>
          <Link href='/chromosome'>
            <a>Chromosome</a>
          </Link>
        </Menu.Item>
        <SubMenu key='Heatmap' title='Heatmap' icon={<DownOutlined />}>
          <Menu.Item key='GeneHeatmap'>
            <Link href='/geneHeatmap'>Gene sequence</Link>
          </Menu.Item>
          <Menu.Item key='ProteinHeatmap'>
            <Link href='/proteinHeatmap'>Protein sequence</Link>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key='Align'>
          <Link href='/proteinAlign/main'>
            <a>Align</a>
          </Link>
        </Menu.Item>
        <Menu.Item key='Basic Query'>
          <Link href='/query'>
            <a>Basic Query</a>
          </Link>
        </Menu.Item>
        <Menu.Item key='Translocation'>
          <Link href='/translocation'>
            <a>Translocation</a>
          </Link>
        </Menu.Item>
      </Menu> */}
    </>
  );
}
