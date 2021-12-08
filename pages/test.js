import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import tree from '../data/tree.json';
import ReactECharts from 'echarts-for-react';
import Nav from '../components/nav.js';
import { useState, useEffect, useRef } from 'react';
import { Button, Layout } from 'antd';
import dynamic from 'next/dynamic';

const { Header, Footer, Sider, Content } = Layout;

// const Nav = dynamic(import('../components/nav.js'), { ssr: false });

export default function Tree({ option }) {
  const echartRef = useRef();
  const [color, setColor] = useState('#f00');
  useEffect(() => {
    console.log(echartRef);
    option.series[0].leaves.itemStyle.color = color;
    // let option = {
    //   series: [{ leaves: { itemStyle: { color: color } } }],
    // };
    // option.series[0].leaves.itemStyle.color = '#0f0';
    echartRef.current.getEchartsInstance().setOption(option);
  }, [color, option]);
  return (
    <Layout>
      <Head>
        <title>Tree</title>
      </Head>
      <Header>
        <Nav selected='Tree' />
      </Header>
      <Content>
        {/* <Button
        type='primary'
        onClick={() => {
          if (color == '#0f0') setColor('#f00');
          else setColor('#0f0');
        }}
      >
        Primary Button
      </Button> */}
        <ReactECharts
          ref={echartRef}
          option={{}}
          style={{ height: '1300px', width: '100%' }}
        />
      </Content>
    </Layout>
  );
}

export async function getStaticProps() {
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
  return {
    props: { option },
  };
}
