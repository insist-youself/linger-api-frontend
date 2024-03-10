import {
  DrawerForm,
  ProColumns, ProForm, ProFormDatePicker,
  ProFormInstance,
  ProFormSelect,
  ProFormText
} from '@ant-design/pro-components';
import '@umijs/max';
import React, { useRef, } from 'react';

export type FormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
} & Partial<API.RuleListItem>;

export type Props = {
  values: API.UserVO;
  columns: ProColumns<API.UserVO>[];
  setVisible: (visible: boolean) => void;
  onSubmit: (values: API.UserVO) => Promise<void>;
  visible: boolean;
  requestColumns: ProColumns<API.RequestParamsRemarkVO>[];
  responseColumns: ProColumns<API.RequestParamsRemarkVO>[];
};

const UpdateModal: React.FC<Props> = (props) => {
  const { values, visible, setVisible, onSubmit, } = props;
  const formRef = useRef<ProFormInstance>();

  const MyImage = ({ value }) => {
    return (
      <img
        src={value}
        alt="preview"
        style={{ maxWidth: '20%', maxHeight: '20%' }}
      />
    );
  };

  // @ts-ignore


  return (
    <DrawerForm<API.UserVO>
      onFinish={async (value) => {
        onSubmit?.(value);
      }}
      formRef={formRef}
      formKey="update-modal-form"
      autoFocusFirstInput
      onOpenChange={setVisible}
      title="修改用户信息"
      open={visible}
    >
      <ProFormText
        name="userName"
        label="用户昵称"
        initialValue={values.userName}
        rules={[{ required: true, message: '用户昵称不可为空！' }]}
      />

      <ProFormText
        name="userAccount"
        label="用户账号"
        initialValue={values.userAccount}
        rules={[{ required: true, message: '用户账号不可为空！' }]}
      />

      {/*<ProFormText*/}
      {/*  name="userAvatar"*/}
      {/*  label="用户头像"*/}
      {/*  initialValue={values.userAvatar}*/}
      {/*  rules={[{ required: true, message: '用户头像不可为空！' }]}*/}
      {/*/>*/}


      <ProForm.Item name="userAvatar" label="用户头像">
        <MyImage value = {values.userAvatar}/>
      </ProForm.Item>


      <ProFormText
        name="userProfile"
        label="用户简介"
        initialValue={values.userProfile}
      />

      <ProFormSelect
        width="xs"
        options={[
          {
            value: 'user',
            label: '用户',
          },
          {
            value: 'admin',
            label: '管理员',
          },
        ]}
        name="userRole"
        label="用户角色"
      />

      <ProFormText
        name="accessKey"
        label="accessKey"
        initialValue={values.accessKey}
        rules={[{ required: true, message: 'accessKey不可为空！' }]}
      />
      <ProFormText
        name="secretKey"
        label="secretKey"
        initialValue={values.secretKey}
        rules={[{ required: true, message: 'secretKey不可为空！' }]}
      />

      <ProFormDatePicker
        width="md"
        name="createTime"
        label="创建时间"
      />
    </DrawerForm>
  );
};

export default UpdateModal;
