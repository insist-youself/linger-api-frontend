import {DrawerForm, ProColumns, ProFormInstance, ProFormSelect, ProFormText} from '@ant-design/pro-components';
import '@umijs/max';
import { Form, Input } from 'antd';
import React, { useRef } from 'react';

export type FormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
} & Partial<API.RuleListItem>;

export type Props = {
  columns: ProColumns<API.UserVO>[];
  setVisible: (visible: boolean) => void;
  onSubmit: (values: API.UserVO) => Promise<void>;
  visible: boolean;
  requestColumns: ProColumns<API.RequestParamsRemarkVO>[];
  responseColumns: ProColumns<API.RequestParamsRemarkVO>[];
};

const CreateModal: React.FC<Props> = (props) => {
  const { visible, setVisible, onSubmit} = props;
  const formRef = useRef<ProFormInstance>();
  return (
    <DrawerForm<API.UserVO>
      onFinish={async (value) => {
        console.log('---------->', value);
        onSubmit?.(value);
      }}
      formRef={formRef}
      formKey="update-modal-form"
      autoFocusFirstInput
      onOpenChange={setVisible}
      title="新增用户"
      open={visible}
    >
      <ProFormText
        name="userName"
        label="用户昵称"
        rules={[{ required: true, message: '用户昵称不可为空！' }]}
      />

      <ProFormText
        name="userAccount"
        label="用户账号"
        rules={[{ required: true, message: '用户账号不可为空！' }]}
      />

      {/*<ProFormText
        name="userAvatar"
        label="用户头像"
        rules={[{ required: true, message: '用户头像不可为空！' }]}
      />*/}

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

      <Form.Item name="userProfile" label="用户简介">
        <Input.TextArea />
      </Form.Item>

      <ProFormText
        name="userPassword"
        label="管理员添加用户，默认密码为12345678!"
        readonly
      />

    </DrawerForm>
  );
};
export default CreateModal;
