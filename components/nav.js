import { Menu } from 'antd';
import Link from 'next/link';
import { DownOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;

export default function Nav({ selected }) {
  return (
    <>
      <Menu theme='dark' mode='horizontal' defaultSelectedKeys={[selected]}>
        <Menu.Item key='Tree'>
          <Link href='/tree'>
            <a>Tree</a>
          </Link>
        </Menu.Item>
        <Menu.Item key='Difference'>
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
            <Link href='/heatmap'>Gene sequence</Link>
          </Menu.Item>
          <Menu.Item key='ProteinHeatmap'>
            <Link href='/proteinHeatmap'>Protein sequence</Link>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key='Align'>
          <Link href='/align'>
            <a>Align</a>
          </Link>
        </Menu.Item>
      </Menu>
    </>
  );
}
