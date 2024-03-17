import { Area } from '@ant-design/charts';
import React from 'react';

const MultiLinesForm: React.FC = () => {
  const data = [
    { date: '2024-03-07', count: 17, category: 'total job' },
    { date: '2024-03-08', count: 16, category: 'total job' },
    { date: '2024-03-09', count: 20, category: 'total job' },
    { date: '2024-03-10', count: 15, category: 'total job' },
    { date: '2024-03-11', count: 13, category: 'total job' },
    { date: '2024-03-12', count: 14, category: 'total job' },
    { date: '2024-03-13', count: 13, category: 'total job' },
  ];
  const config = {
    data,
    height: 400,
    xField: 'date',
    yField: 'count',
    seriesField: 'category',
  };
  return <Area {...config} />;
};
export default MultiLinesForm;
