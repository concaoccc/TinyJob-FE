import { ProForm, ProFormText } from '@ant-design/pro-components';

const DeletePackageForm: React.FC<API.Package> = () => {
  return (
    <ProForm>
      <ProFormText name="id" label="Id" width="md" placeholder="Please enter the package id" />
      <ProFormText
        name="name"
        label="Name"
        width="md"
        placeholder="Please enter the package name"
      />
      <ProFormText
        name="version"
        label="Version"
        width="md"
        placeholder="Please enter the package version"
      />
      <ProFormText
        name="storageAccount"
        label="Storage Account"
        width="md"
        placeholder="Please enter the storage account"
      />
    </ProForm>
  );
};

export default DeletePackageForm;
