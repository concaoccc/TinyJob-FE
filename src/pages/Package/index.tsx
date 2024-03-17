import { getPackage } from '@/services/package/api';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import { PageContainer, ProDescriptions, ProTable } from '@ant-design/pro-components';
import { FormattedMessage } from '@umijs/max';
import { Button, Drawer } from 'antd';
import React, { useRef, useState } from 'react';
import CreatePackageForm from './components/createForm';
import UpdatePackageForm from './components/updateForm';

const Package: React.FC = () => {
  const [createModalOpen, handleCreateModalOpen] = useState<boolean>(false);

  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);

  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.Package>();

  const columns: ProColumns<API.Package>[] = [
    {
      title: 'Id',
      dataIndex: 'id',
      tip: 'The package id is the unique key',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      valueType: 'textarea',
    },
    {
      title: <FormattedMessage id="pages.searchTable.package.version" defaultMessage="Version" />,
      dataIndex: 'version',
      valueType: 'textarea',
    },
    {
      title: 'Storage Account',
      dataIndex: 'storageAccount',
      valueType: 'textarea',
    },
    {
      title: 'Relative Path',
      dataIndex: 'relativePath',
      valueType: 'textarea',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      valueType: 'textarea',
    },
    {
      title: 'Create Time',
      sorter: true,
      dataIndex: 'createTime',
      valueType: 'textarea',
    },
    {
      title: 'Update Time',
      sorter: true,
      dataIndex: 'updateTime',
      valueType: 'textarea',
    },
    {
      title: 'Operating',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="update"
          onClick={() => {
            handleUpdateModalOpen(true);
            setCurrentRow(record);
          }}
        >
          Update
        </a>,
        <a
          key="delete"
          onClick={() => {
            setCurrentRow(record);
          }}
        >
          Delete
        </a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.Package, API.PageParams>
        headerTitle="Package List"
        actionRef={actionRef}
        rowKey="key"
        search={false}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleCreateModalOpen(true);
            }}
          >
            <PlusOutlined /> Upload
          </Button>,
        ]}
        request={getPackage}
        columns={columns}
      />
      <CreatePackageForm
        createModalOpen={createModalOpen}
        handleCreateModalOpen={handleCreateModalOpen}
        actionRef={actionRef}
      />

      <UpdatePackageForm
        updateModalOpen={updateModalOpen}
        handleupdateModalOpen={handleUpdateModalOpen}
        values={currentRow ?? {}}
        actionRef={actionRef}
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
          <ProDescriptions<API.Package>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns as ProDescriptionsItemProps<API.Package>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default Package;
