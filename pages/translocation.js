import Head from 'next/head';
import tree from '../data/tree.json';
import Nav from '../components/nav.js';
import { useState, useEffect, useRef } from 'react';
import { Layout, Input, Select, AutoComplete, Switch } from 'antd';
import chResults from '../data/chResults.json';
import * as echarts from 'echarts';

const { Header, Footer, Sider, Content } = Layout;
const { Option } = Select;

// const Nav = dynamic(import('../components/nav.js'), { ssr: false });

export default function Chromosome({ autocompleteOptions }) {
  useEffect(() => {
    let option = {
      title: {
        text: 'Basic Graph',
      },
      tooltip: {
        formatter: params => {
          return '123' + params.data.value[0];
        },
      },
      animationDurationUpdate: 1500,
      animationEasingUpdate: 'quinticInOut',
      series: [
        {
          type: 'graph',
          layout: 'none',
          symbolSize: 50,
          roam: true,
          label: {
            show: true,
          },
          edgeSymbol: ['circle', 'arrow'],
          edgeSymbolSize: [4, 10],
          edgeLabel: {
            show: true,
            formatter: '{c}',
            fontSize: 20,
          },
          data: [
            {
              name: 'Node 1',
              x: 300,
              y: 300,
              value: [1, 2, 3],

              itemStyle: {
                color: 'red',
              },
            },
            {
              name: 'Node 2',
              x: 800,
              y: 300,
            },
            {
              name: 'Node 3',
              x: 550,
              y: 100,
            },
            {
              name: 'Node 4',
              x: 550,
              y: 500,
            },
          ],
          // links: [],
          links: [
            {
              source: 0,
              target: 1,
              value: 1.2,
              label: {
                show: true,
                formatter: '{c}',
              },
              lineStyle: {
                width: 5,
                curveness: 0.2,
              },
            },
            {
              source: 'Node 2',
              target: 'Node 1',
              label: {
                show: true,
              },
              lineStyle: {
                curveness: 0.2,
              },
            },
            {
              source: 'Node 1',
              target: 'Node 3',
            },
            {
              source: 'Node 2',
              target: 'Node 3',
            },
            {
              source: 'Node 2',
              target: 'Node 4',
            },
            {
              source: 'Node 1',
              target: 'Node 4',
            },
          ],
          lineStyle: {
            opacity: 0.9,
            width: 2,
            curveness: 0,
          },
        },
      ],
    };
    let chartDom = document.getElementById('echarts');
    let myChart = echarts.init(chartDom, null, { renderer: 'canvas' });
    myChart.setOption(option);
    // write to clipboard);
  }, []);
  return (
    <Layout>
      <Head>
        <title>Chromosome</title>
      </Head>
      <Header>
        <Nav selected='Translocation' />
      </Header>
      <Content style={{ padding: 10 }}>
        <Input.Group
          compact
          style={{ justifyContent: 'center', display: 'flex' }}
        >
          <Select
            style={{ width: '15%' }}
            defaultValue='NC'
            size='large'
            onChange={value => setSelected(value)}
          >
            <Option value='NC'>only NC</Option>
            <Option value='both'>both NC and NW</Option>
          </Select>
          <AutoComplete
            options={autocompleteOptions}
            style={{ width: '30%' }}
            onSelect={e => setSpeciesText(e)}
            filterOption={(inputValue, option) =>
              option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
              -1
            }
          >
            <Input.Search
              size='large'
              placeholder='input here'
              enterButton
              onSearch={e => setSpeciesText(e)}
              allowClear={true}
            />
          </AutoComplete>
        </Input.Group>
        <Switch
          style={{ margin: '10px auto 0 auto', display: 'flex' }}
          checkedChildren='Label Visible'
          unCheckedChildren='Label Hidden'
          defaultChecked
          onChange={e => setLabelShow(e)}
        />

        <div id='echarts' style={{width:'80%',height:'800px'}}></div>
      </Content>
    </Layout>
  );
}

export async function getStaticProps() {
  function getAllOptions(root) {
    let result = [];
    if (root.hasOwnProperty('children')) {
      for (let x of root.children) {
        result.push(...getAllOptions(x));
      }
    }
    result.push({ value: root.name });
    return result;
  }
  let autocompleteOptions = getAllOptions(tree);
  return {
    props: {
      autocompleteOptions: autocompleteOptions,
    },
  };
}
