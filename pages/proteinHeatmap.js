import Head from 'next/head';
import ReactECharts from 'echarts-for-react';
import Nav from '../components/nav.js';
import { useEffect, useRef } from 'react';
import { Layout } from 'antd';
import heatmap from '../data/proteinHeatmap.json';
import axis from '../data/proteinAxis.json';

const { Header, Footer, Sider, Content } = Layout;

// const Nav = dynamic(import('../components/nav.js'), { ssr: false });

export default function Heatmap() {
  const echartRef = useRef();
  useEffect(() => {
    let data = [];
    let len = heatmap.length;
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len; j++) {
        data.push([
          i,
          j,
          heatmap[i][j],
          axis[i][0] + '_' + axis[i][1],
          axis[j][0] + '_' + axis[j][1],
        ]);
      }
    }
    console.log(data);
    var option;

    option = {
      tooltip: {
        position: 'bottom',
        formatter: function (params) {
          return (
            params.data[3] + '<br>' + params.data[4] + '<br>' + params.data[2]
          );
        },
      },
      dataZoom: [
        {
          id: 'dataZoomX',
          type: 'slider',
          xAxisIndex: [0],
          filterMode: 'filter',
        },
        {
          id: 'dataZoomY',
          type: 'slider',
          yAxisIndex: [0],
          filterMode: 'filter',
        },
      ],
      grid: {
        left: 300,
        right: 50,
        //- height: height-300
      },
      xAxis: {
        data: axis,
      },
      yAxis: {
        data: axis,
      },
      visualMap: {
        min: 0,
        max: 1,
        calculable: true,
        orient: 'horizontal',
        left: 'left',
        dimension: 2,
        precision: 2,
      },
      series: {
        type: 'heatmap',
        data: data,
        progressive: 30000,
      },
    };
    echartRef.current.getEchartsInstance().setOption(option);
  }, []);
  return (
    <Layout>
      <Head>
        <title>Heatmap</title>
      </Head>
      <Header>
        <Nav selected='Heatmap' />
      </Header>
      <Content>
        <ReactECharts
          ref={echartRef}
          option={{}}
          style={{ height: '90vh', width: '100%' }}
        />
      </Content>
    </Layout>
  );
}
