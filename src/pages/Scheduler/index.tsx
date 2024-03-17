//import { addRule, removeRule, rule, updateRule } from '@/services/ant-design-pro/api';
import {
  addScheduler,
  getScheduler,
  removeScheduler,
  stopScheduler,
  updateScheduler,
} from '@/services/scheduler/api';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import {
  FooterToolbar,
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
import type { FormValueType } from './components/updateForm';
import UpdateForm from './components/updateForm';

/**
 * @en-US Add Scheduler
 *
 * @param fields
 */
const handleAdd = async (fields: API.Scheduler) => {
  const hide = message.loading('Adding');
  try {
    await addScheduler({ ...fields });
    hide();
    message.success('Added successfully');
    return true;
  } catch (error) {
    hide();
    message.error('Adding failed, please try again!');
    return false;
  }
};

/**
 * @en-US Update Scheduler
 *
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('Configuring');
  try {
    await updateScheduler({
      name: fields.name,
      desc: fields.desc,
      key: fields.key,
    });
    hide();

    message.success('Configuration is successful');
    return true;
  } catch (error) {
    hide();
    message.error('Configuration failed, please try again!');
    return false;
  }
};

/**
 *  stop scheduler
 * @en-US stop scheduler
 *
 * @param selectedRows
 */
const handleStop = async (selectedRows: API.Scheduler[]) => {
  const hide = message.loading('Stopping');
  if (!selectedRows) return true;
  try {
    await stopScheduler({
      key: selectedRows.map((row) => row.id),
    });
    hide();
    message.success('Stopped successfully and will refresh soon');
    return true;
  } catch (error) {
    hide();
    message.error('Stop failed, please try again');
    return false;
  }
};

/**
 *  Delete node
 * @en-US Delete scheduler
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: API.Scheduler[]) => {
  const hide = message.loading('Deleting');
  if (!selectedRows) return true;
  try {
    await removeScheduler({
      key: selectedRows.map((row) => row.id),
    });
    hide();
    message.success('Deleted successfully and will refresh soon');
    return true;
  } catch (error) {
    hide();
    message.error('Delete failed, please try again');
    return false;
  }
};

const Scheduler: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);

  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.Scheduler>();
  const [selectedRowsState, setSelectedRows] = useState<API.Scheduler[]>([]);

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  const columns: ProColumns<API.Scheduler>[] = [
    {
      title: 'Id',
      dataIndex: 'id',
      tip: 'The schdduler name is the unique key',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: true,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      valueType: 'textarea',
    },
    {
      title: 'Package',
      dataIndex: 'package',
      valueType: 'textarea',
    },
    {
      title: 'Versopn',
      dataIndex: 'version',
      valueType: 'textarea',
    },
    {
      title: 'AssemblyName',
      dataIndex: 'assemblyName',
      valueType: 'textarea',
    },
    {
      title: 'Namespace',
      dataIndex: 'namespace',
      valueType: 'textarea',
    },
    {
      title: 'ClassName',
      dataIndex: 'className',
      valueType: 'textarea',
    },

    {
      title: 'ExecutionPlan',
      dataIndex: 'executionPlan',
      valueType: 'textarea',
    },
    {
      title: 'CreateTime',
      dataIndex: 'createTime',
      valueType: 'textarea',
    },
    {
      title: 'UpdateTime',
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
      <ProTable<API.Scheduler, API.PageParams>
        headerTitle="Scheduler List"
        actionRef={actionRef}
        rowKey="key"
        search={false}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalOpen(true);
            }}
          >
            <PlusOutlined />{' '}
            <FormattedMessage id="pages.scheduler.newScheduler" defaultMessage="New" />
          </Button>,
        ]}
        request={getScheduler}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              <FormattedMessage id="pages.scheduler.chosen" defaultMessage="Chosen" />{' '}
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{' '}
              <FormattedMessage id="pages.scheduler.item" defaultMessage="item" />
            </div>
          }
        >
          <Button
            type="primary"
            onClick={async () => {
              await handleStop(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            <FormattedMessage id="pages.scheduler.stop" defaultMessage="Stop" />
          </Button>

          <Button
            type="primary"
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            <FormattedMessage id="pages.scheduler.delete" defaultMessage="Delete" />
          </Button>
        </FooterToolbar>
      )}

      <ModalForm
        title={intl.formatMessage({
          id: 'pages.scheduler.createForm.newScheduler',
          defaultMessage: 'New rule',
        })}
        width="400px"
        open={createModalOpen}
        onOpenChange={handleModalOpen}
        onFinish={async (value) => {
          const success = await handleAdd(value as API.Scheduler);
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
                  id="pages.searchTable.ruleName"
                  defaultMessage="Rule name is required"
                />
              ),
            },
          ]}
          width="md"
          name="name"
        />
        <ProFormTextArea width="md" name="desc" />
      </ModalForm>

      <UpdateForm
        onSubmit={async (value) => {
          const success = await handleUpdate(value);
          if (success) {
            handleUpdateModalOpen(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalOpen(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        updateModalOpen={updateModalOpen}
        values={currentRow || {}}
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
          <ProDescriptions<API.Scheduler>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns as ProDescriptionsItemProps<API.Scheduler>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default Scheduler;
