import Head from 'next/head';
import ReactECharts from 'echarts-for-react';
import Nav from '../components/nav.js';
import { useState, useEffect, useRef } from 'react';
import { Layout, Select, Input } from 'antd';
import heatmap from '../data/heatmap.json';
import axis from '../data/axis.json';

const { Header, Footer, Sider, Content } = Layout;

// const Nav = dynamic(import('../components/nav.js'), { ssr: false });

export default function Heatmap() {
  const echartRef = useRef();
  const [selected, setSelected] = useState('All');
  const [text, setText] = useState('');
  useEffect(() => {
    let data = [];
    let newSelected = selected;
    // set newAxis, newHeatmap from axis, heatmap
    let newAxis = axis;
    for (let i = 0; i < axis.length; i++) {
      newAxis[i].push(i);
    }
    if (newSelected != 'All') {
      let target = newSelected.split('/');
      newAxis = newAxis.filter(item => item[2].some(x => target.includes(x)));
    }
    let len = newAxis.length;
    let newHeatmap = new Array(len);
    for (let i = 0; i < len; i++) {
      newHeatmap[i] = new Array(len);
    }
    console.log(newAxis);
    console.log(heatmap.length);
    console.log(newHeatmap.length);
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len; j++) {
        newHeatmap[i][j] = heatmap[newAxis[i][3]][newAxis[j][3]];
      }
    }
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len; j++) {
        data.push([
          i,
          j,
          newHeatmap[i][j],
          newAxis[i][0] + '_' + newAxis[i][1] + '_' + newAxis[i][2].join(','),
          newAxis[j][0] + '_' + newAxis[j][1] + '_' + newAxis[j][2].join(','),
        ]);
      }
    }
    let showAxis = newAxis.map(d => d[0] + '_' + d[1]);
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
        top: 20,
        left: 300,
        right: 50,
        //- height: height-300
      },
      xAxis: {
        data: showAxis,
      },
      yAxis: {
        data: showAxis,
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
  }, [selected,text]);
  return (
    <Layout>
      <Head>
        <title>Heatmap</title>
      </Head>
      <Header>
        <Nav selected='Heatmap' />
      </Header>
      <Content>
        <div
          style={{
            marginTop: 10,
            justifyContent: 'center',
            display: 'flex',
          }}
        >
          <Input.Group
            compact
            style={{ justifyContent: 'center', display: 'flex' }}
          >
            <Select
              defaultValue='All'
              style={{ width: 200 }}
              size='large'
              onChange={e => {
                setSelected(e);
                setText('');
              }}
            >
              <Select.Option value='All'>All</Select.Option>
              <Select.Option value='HACD4/FOCAD'>HACD4/FOCAD</Select.Option>
              <Select.Option value='UBAP2/UBE2R2'>UBAP2/UBE2R2</Select.Option>
              <Select.Option value='MTAP'>MTAP</Select.Option>
            </Select>
            <Input.Search size='large' onSearch={e => setText(e)} />
          </Input.Group>
        </div>
        <ReactECharts
          ref={echartRef}
          option={{}}
          style={{ height: '90vh', width: '100%' }}
        />
      </Content>
    </Layout>
  );
}
