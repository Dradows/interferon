import Head from 'next/head';
import tree from '../data/tree.json';
import ReactECharts from 'echarts-for-react';
import Nav from '../components/nav.js';
import { useState, useEffect, useRef } from 'react';
import { Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

// const Nav = dynamic(import('../components/nav.js'), { ssr: false });

export default function Tree() {
  const echartRef = useRef();
  useEffect(() => {
    let option = {
      tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove',
      },
      series: [
        {
          type: 'tree',
          id: 0,
          name: 'tree1',
          data: [tree],
          top: '3%',
          left: '10%',
          bottom: '3%',
          right: '4%',
          symbolSize: 7,
          edgeShape: 'polyline',
          edgeForkPosition: '63%',
          initialTreeDepth: 5,
          lineStyle: {
            width: 2,
          },
          label: {
            padding: 3,
            backgroundColor: '#fff0',
            position: 'bottom',
            verticalAlign: 'middle',
            align: 'right',
          },
          leaves: {
            label: {
              position: 'bottom',
              verticalAlign: 'middle',
              align: 'right',
            },
            itemStyle: {
              color: '#f00',
            },
          },
          emphasis: {
            focus: 'descendant',
          },
          expandAndCollapse: true,
          annimation: true,
          animationDuration: 550,
          animationDurationUpdate: 750,
        },
      ],
    };
    echartRef.current.getEchartsInstance().setOption(option);
  }, []);
  return (
    <Layout>
      <Head>
        <title>Tree</title>
      </Head>
      <Header>
        <Nav selected='Tree' />
      </Header>
      <Content>
        <ReactECharts
          ref={echartRef}
          option={{}}
          style={{ height: '1500px', width: '100%' }}
        />
      </Content>
    </Layout>
  );
}
