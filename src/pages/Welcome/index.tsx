import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Card, theme } from 'antd';
import React from 'react';
import InfoCard from './InfoCard';
import MultiLinesForm from './MultiLinesForm';

const Welcome: React.FC = () => {
  const { token } = theme.useToken();
  const { initialState } = useModel('@@initialState');
  const totalTask = 1000;
  const totalPackage = 100;
  const totalSchedulers = 100;
  const schedulerInstance = 1;
  const executorInstance = 1;
  return (
    <PageContainer>
      <Card
        style={{
          borderRadius: 8,
        }}
        bodyStyle={{
          backgroundImage:
            initialState?.settings?.navTheme === 'realDark'
              ? 'background-image: linear-gradient(75deg, #1A1B1F 0%, #191C1F 100%)'
              : 'background-image: linear-gradient(75deg, #FBFDFF 0%, #F5F7FF 100%)',
        }}
      >
        <div
          style={{
            backgroundPosition: '100% -30%',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '274px auto',
          }}
        >
          <div
            style={{
              fontSize: '20px',
              color: token.colorTextHeading,
              marginTop: 16,
              marginBottom: 32,
            }}
          >
            Welcom to use Distributed Task Management Platform.
          </div>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 16,
            }}
          >
            <InfoCard description="Total task number" number={totalTask} />
            <InfoCard description="Total package number" number={totalPackage} />
            <InfoCard description="Total schedulers number" number={totalSchedulers} />
            <InfoCard description="Sechulder instance number" number={schedulerInstance} />
            <InfoCard description="Executor instance number" number={executorInstance} />
          </div>
          <div
            style={{
              marginTop: 60,
              marginBottom: 32,
              gap: 16,
            }}
          >
            <MultiLinesForm />
          </div>
        </div>
      </Card>
    </PageContainer>
  );
};

export default Welcome;
