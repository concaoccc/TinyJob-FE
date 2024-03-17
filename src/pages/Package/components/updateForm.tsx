import { updatePackage } from '@/services/package/api';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { message } from 'antd';

export type UpdateFormProps = {
  updateModalOpen: boolean;
  handleupdateModalOpen: (open: boolean) => void;
  actionRef: any;
  values: Partial<API.Package>;
};

const handleUpdate = async (fields: Partial<API.Package>) => {
  const hide = message.loading('updating...');
  try {
    await updatePackage({ ...fields });
    hide();
    message.success('Updating succeeded');
    return true;
  } catch (error) {
    hide();
    message.error('Updating failed, please try again!');
    return false;
  }
};
const UpdatePackageForm: React.FC<UpdateFormProps> = (props) => {
  return (
    <ModalForm
      title="Update package"
      width="400px"
      open={props.updateModalOpen}
      onOpenChange={props.handleupdateModalOpen}
      onFinish={async (value) => {
        const success = await handleUpdate(value as Partial<API.Package>);
        if (success) {
          props.handleupdateModalOpen(false);
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
        initialValue={props.values.name}
      />

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
        initialValue={props.values.name}
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
        initialValue={props.values.version}
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
        initialValue={props.values.storageAccount}
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
        initialValue={props.values.relativePath}
      />

      <ProFormTextArea
        width="md"
        name="description"
        label="Description"
        initialValue={props.values.description}
      />
    </ModalForm>
  );
};

export default UpdatePackageForm;
