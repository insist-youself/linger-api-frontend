import {
  DrawerForm,
  ProColumns, ProForm,
  ProFormInstance,
  ProFormText,
} from '@ant-design/pro-components';
import '@umijs/max';
import React, { useRef} from 'react';

export type Props = {
  values: API.UserVO;
  setVisible: (visible: boolean) => void;
  visible: boolean;
  requestColumns: ProColumns<API.RequestParamsRemarkVO>[];
  responseColumns: ProColumns<API.RequestParamsRemarkVO>[];
};

const MyImage = ({ value }) => {
  return (
    <img
      src={value}
      alt="preview"
      style={{ maxWidth: '20%', maxHeight: '20%' }}
    />
  );
};
const ShowModal: React.FC<Props> = (props) => {
  const {values, setVisible, visible, } = props;
  const formRef = useRef<ProFormInstance>();

  return (
    <DrawerForm<API.UserVO>
      formRef={formRef}
      formKey="update-modal-form"
      autoFocusFirstInput
      onOpenChange={setVisible}
      title="查看用户信息"
      open={visible}
    >
      <ProFormText name="userName" label="用户昵称" initialValue={values.userName} disabled/>
      <ProFormText name="userAccount" label="用户账号" initialValue={values.userAccount} disabled/>

      <ProForm.Item name="userAvatar" label="用户头像">
        <MyImage value = {values.userAvatar}/>
      </ProForm.Item>

      <ProFormText
        name="userProfile"
        label="用户简介"
        initialValue={values.userProfile}
        disabled
      />
      <ProFormText name="userRole" label="用户角色" initialValue={values.userRole} disabled />
      <ProFormText name="accessKey" label="accessKey" initialValue={values.accessKey} disabled />
      <ProFormText name="secretKey" label="secretKey" initialValue={values.secretKey} disabled />
      <ProFormText name="createTime" label="创建时间" initialValue={values.createTime} disabled/>
    </DrawerForm>
  );
};
export default ShowModal;
