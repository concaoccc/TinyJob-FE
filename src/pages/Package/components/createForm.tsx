import { addPackage } from '@/services/package/api';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { message } from 'antd';

const handleAdd = async (fields: API.Package) => {
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

export type CreateFormProps = {
  createModalOpen: boolean;
  handleCreateModalOpen: (open: boolean) => void;
  actionRef: any;
};

const CreatePackageForm: React.FC<CreateFormProps> = (props) => {
  return (
    <ModalForm
      title="New package"
      width="400px"
      open={props.createModalOpen}
      onOpenChange={props.handleCreateModalOpen}
      onFinish={async (value) => {
        const success = await handleAdd(value as API.Package);
        if (success) {
          props.handleCreateModalOpen(false);
          if (props.actionRef.current) {
            props.actionRef.current.reload();
          }
        }
      }}
    >
      <ProFormText
        rules={[
          {
            required: true,
            message: 'Package name is required',
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
            message: 'Package version is required',
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
            message: 'Storage account is required',
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
            message: 'relative path is required',
          },
        ]}
        width="md"
        name="relativePath"
        label="Relative path"
      />

      <ProFormTextArea width="md" name="description" label="Description" />
    </ModalForm>
  );
};

export default CreatePackageForm;
