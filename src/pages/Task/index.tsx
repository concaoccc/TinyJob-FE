import { getTask } from '@/services/Task/api';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import { PageContainer, ProDescriptions, ProTable } from '@ant-design/pro-components';
import { Drawer } from 'antd';
import React, { useRef, useState } from 'react';

const generateColumns = () => {
  const columns: ProColumns<API.Task>[] = [
    {
      title: 'Id',
      dataIndex: 'id',
      valueType: 'textarea',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: true,
      valueType: 'textarea',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      sorter: true,
      valueType: 'textarea',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      valueType: 'textarea',
    },
    {
      title: 'ScheduledExecutionTime',
      dataIndex: 'scheduledExecutionTime',
      valueType: 'textarea',
    },
    {
      title: 'ActualExecutionTime',
      dataIndex: 'actualExecutionTime',
      valueType: 'textarea',
    },
  ];

  return columns;
};

const Job: React.FC = () => {
  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.Package>();

  const columns = generateColumns();
  return (
    <PageContainer>
      <ProTable<API.Task, API.PageParams>
        headerTitle="Task List"
        actionRef={actionRef}
        rowKey="key"
        search={false}
        request={getTask}
        columns={columns}
      />

      <Drawer
        width={600}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.name && (
          <ProDescriptions<API.Task>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns as ProDescriptionsItemProps<API.Task>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default Job;
