import { addPackage, getPackage } from '@/services/ant-design-pro/api';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import {
  ModalForm,
  PageContainer,
  ProDescriptions,
  ProFormText,
  ProFormTextArea,
  ProTable,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button, Drawer, message } from 'antd';
import React, { useRef, useState } from 'react';

/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */
const handleAdd = async (fields: API.PackageListItem) => {
  const hide = message.loading('正在添加');
  try {
    await addPackage({ ...fields });
    hide();
    message.success('Added successfully');
    return true;
  } catch (error) {
    hide();
    message.error('Adding failed, please try again!');
    return false;
  }
};

const Package: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);

  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.PackageListItem>();

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  const columns: ProColumns<API.PackageListItem>[] = [
    {
      title: <FormattedMessage id="pages.searchTable.package.id" defaultMessage="Id" />,
      dataIndex: 'id',
      tip: 'The package id is the unique key',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: <FormattedMessage id="pages.searchTable.package.name" defaultMessage="Name" />,
      dataIndex: 'name',
      valueType: 'textarea',
    },
    {
      title: <FormattedMessage id="pages.searchTable.package.version" defaultMessage="Version" />,
      dataIndex: 'version',
      valueType: 'textarea',
    },
    {
      title: (
        <FormattedMessage
          id="pages.searchTable.package.storageAccount"
          defaultMessage="Storage Account"
        />
      ),
      dataIndex: 'storageAccount',
      valueType: 'textarea',
    },
    {
      title: (
        <FormattedMessage
          id="pages.searchTable.package.relativePath"
          defaultMessage="Relative Path"
        />
      ),
      dataIndex: 'relativePath',
      valueType: 'textarea',
    },
    {
      title: (
        <FormattedMessage id="pages.searchTable.package.ownerName" defaultMessage="Owner Name" />
      ),
      dataIndex: 'ownerName',
      valueType: 'textarea',
    },
    {
      title: (
        <FormattedMessage id="pages.searchTable.package.description" defaultMessage="Description" />
      ),
      dataIndex: 'description',
      valueType: 'textarea',
    },
    {
      title: (
        <FormattedMessage id="pages.searchTable.package.createTime" defaultMessage="Create Time" />
      ),
      sorter: true,
      dataIndex: 'createTime',
      valueType: 'dateTime',
    },
    {
      title: (
        <FormattedMessage id="pages.searchTable.package.updateTime" defaultMessage="Update Time" />
      ),
      sorter: true,
      dataIndex: 'updateTime',
      valueType: 'dateTime',
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.PackageListItem, API.PageParams>
        headerTitle={intl.formatMessage({
          id: 'pages.searchTable.package.title',
          defaultMessage: 'Package List',
        })}
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalOpen(true);
            }}
          >
            <PlusOutlined />{' '}
            <FormattedMessage id="pages.searchTable.upload" defaultMessage="Upload" />
          </Button>,
        ]}
        request={getPackage}
        columns={columns}
      />

      <ModalForm
        title={intl.formatMessage({
          id: 'pages.searchTable.createForm.newPackage',
          defaultMessage: 'New package',
        })}
        width="400px"
        open={createModalOpen}
        onOpenChange={handleModalOpen}
        onFinish={async (value) => {
          const success = await handleAdd(value as API.PackageListItem);
          if (success) {
            handleModalOpen(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.searchTable.packageName"
                  defaultMessage="Package name is required"
                />
              ),
            },
          ]}
          width="md"
          name="name"
          label="Name"
        />

        <ProFormText
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.searchTable.packageVersion"
                  defaultMessage="Package version is required"
                />
              ),
            },
          ]}
          width="md"
          name="version"
          label="Version"
        />

        <ProFormText
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.searchTable.storageAccount"
                  defaultMessage="Storage account is required"
                />
              ),
            },
          ]}
          width="md"
          name="storageAccount"
          label="Storage account"
        />

        <ProFormText
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.searchTable.relativePath"
                  defaultMessage="relative path is required"
                />
              ),
            },
          ]}
          width="md"
          name="relativePath"
          label="Relative path"
        />

        <ProFormTextArea width="md" name="description" label="Description" />
      </ModalForm>

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
          <ProDescriptions<API.PackageListItem>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns as ProDescriptionsItemProps<API.PackageListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default Package;
