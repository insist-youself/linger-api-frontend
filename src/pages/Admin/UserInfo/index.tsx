import CreateModal from '@/pages/Admin/UserInfo/components/CreateModal';
import ShowModal from '@/pages/Admin/UserInfo/components/ShowModal';
import UpdateModal from '@/pages/Admin/UserInfo/components/UpdateModal';
import {
  addUserUsingPost,
  userLogoutUsingPost,
  deleteUserUsingPost,
  updateUserUsingPost,
  listUserVoByPageUsingPost,
} from '@/services/linger-api-backend/userController';
import { PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import { PageContainer, ProDescriptions, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import { Button, Drawer, message, Popconfirm } from 'antd';
import React, { useRef, useState } from 'react';

const TableList: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
  const [showModalOpen, handleShowModalOpen] = useState<boolean>(false);

  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.UserVO>();

  /**
   * @en-US Add node
   * @zh-CN 创建新用户
   * @param fields
   */
  const handleAdd = async (fields: API.UserVO) => {
    const hide = message.loading('正在添加');
    try {
      await addUserUsingPost({
        ...fields,
      });
      hide();
      message.success('创建成功');
      handleModalOpen(false);
      actionRef.current?.reload();
      return true;
    } catch (error: any) {
      hide();
      message.error('创建失败，' + error.message);
      return false;
    }
  };

  /**
   * @en-US Update node
   * @zh-CN 更新用户信息
   *
   * @param fields
   */
  const handleUpdate = async (fields: API.UserVO) => {
    if (!currentRow) {
      return;
    }
    const hide = message.loading('修改中');
    try {
      await updateUserUsingPost({
        id: currentRow.id,
        ...fields,
      });
      hide();
      message.success('操作成功');
      return true;
    } catch (error: any) {
      hide();
      message.error('操作失败，' + error.message);
      return false;
    }
  };

  /**
   *  Delete node
   * @zh-CN 删除用户
   *
   * @param record
   */
  const handleRemove = async (record: API.UserVO) => {
    const hide = message.loading('正在删除');
    if (!record) return true;
    try {
      await deleteUserUsingPost({
        id: record.id,
      });
      hide();
      message.success('删除成功');
      actionRef.current?.reload();
      return true;
    } catch (error) {
      hide();
      message.error('删除失败');
      return false;
    }
  };

  /**
   *  Delete node
   * @zh-CN 注销用户
   *
   * @param record
   */
  const handleOffline = async (record: API.IdRequest) => {
    const hide = message.loading('注销用户中');
    if (!record) return true;
    try {
      await userLogoutUsingPost({
        id: record.id,
      });
      hide();
      message.success('注销成功');
      actionRef.current?.reload();
      return true;
    } catch (error) {
      hide();
      message.error('注销失败');
      return false;
    }
  };


  /**
   * table 展示的列
   * */
  const columns: ProColumns<API.UserVO>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      valueType: 'index',
    },
    {
      title: '用户昵称',
      dataIndex: 'userName',
      valueType: 'text',
      formItemProps: {
        rules: [
          {
            required: true,
          },
        ],
      },
    },
    {
      title: '用户账号',
      dataIndex: 'userAccount',
      valueType: 'text',
      formItemProps: {
        rules: [
          {
            required: true,
          },
        ],
      },
    },
    {
      title: '用户头像',
      dataIndex: 'userAvatar',
      valueType: 'image',
      formItemProps: {
        rules: [
          {
            required: true,
          },
        ],
      },
    },
    {
      title: '用户简介',
      dataIndex: 'userProfile',
      valueType: 'textarea',
      formItemProps: {
        rules: [
          {
            required: true,
          },
        ],
      },
    },
    {
      title: '用户角色',
      dataIndex: 'userRole',
      hideInForm: true,
      valueEnum: {
        'user': {
          text: '用户',
          status: 'Default',
        },
        'admin': {
          text: '管理员',
          status: 'Processing',
        },
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInForm: true,
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      valueType: 'dateTime',
      hideInForm: true,
      hideInTable: true,
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => {
        // @ts-ignore
        return record.userRole === 0
          ? [
            <Button
              key="detail"
              onClick={() => {
                handleShowModalOpen(true);
                setCurrentRow(record);
              }}
            >
              详情
            </Button>,
            <Button
              key="update"
              onClick={() => {
                handleUpdateModalOpen(true);
                setCurrentRow(record);
              }}
            >
              修改
            </Button>,
            <Button
              danger
              key="remove"
              onClick={() => {
                handleRemove(record);
              }}
            >
              删除
            </Button>,
          ]
          : [
            <Button
              key="detail"
              onClick={() => {
                handleShowModalOpen(true);
                setCurrentRow(record);
              }}
            >
              详情
            </Button>,
            <Button
              key="update"
              onClick={() => {
                handleUpdateModalOpen(true);
                setCurrentRow(record);
              }}
            >
              更新
            </Button>,
            <Button
              key="online"
              onClick={() => {
                handleOffline(record);
              }}
            >
              注销
            </Button>,
            <Popconfirm
              title="删除用户"
              key="remove"
              description="确认删除该用户吗？"
              icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
              onConfirm={() => {
                handleRemove(record);
              }}
            >
              <Button danger>删除</Button>
            </Popconfirm>,
          ];
      },
    },
  ];

  const requestColumns: ProColumns<API.RequestParamsRemarkVO>[] = [
    {
      title: '名称',
      dataIndex: 'name',
      width: '15%',
    },
    {
      title: '必填',
      key: 'isRequired',
      dataIndex: 'isRequired',
      valueType: 'select',
      valueEnum: {
        yes: {
          text: '是',
        },
        no: {
          text: '否',
        },
      },
      width: '15%',
    },
    {
      title: '类型',
      dataIndex: 'type',
      width: '15%',
    },
    {
      title: '说明',
      dataIndex: 'remark',
    },
    {
      title: '操作',
      valueType: 'option',
      width: '10%',
      render: () => {
        return null;
      },
    },
  ];
  const responseColumns: ProColumns<API.RequestParamsRemarkVO>[] = [
    {
      title: '名称',
      dataIndex: 'name',
      width: '15%',
    },
    {
      title: '类型',
      dataIndex: 'type',
      width: '15%',
    },
    {
      title: '说明',
      dataIndex: 'remark',
    },
    {
      title: '操作',
      valueType: 'option',
      width: '10%',
      render: () => {
        return null;
      },
    },
  ];
  return (
    <PageContainer>
      <ProTable<API.UserVO, API.PageParams>
        headerTitle={'查询表格'}
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
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={async (params) => {
          console.log('---------->', params);
          const res = await listUserVoByPageUsingPost({
            ...params,
          });
          if (res?.data) {
            return {
              data: res?.data.records ?? [],
              success: true,
              total: res.data.total ?? 0,
            };
          } else {
            return {
              data: [],
              success: false,
              total: 0,
            };
          }
        }}
        columns={columns}
      />

      <UpdateModal
        columns={columns}
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
        setVisible={handleUpdateModalOpen}
        visible={updateModalOpen}
        values={currentRow ?? {}}
        requestColumns={requestColumns}
        responseColumns={responseColumns}
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
        {currentRow?.userAccount && (
          <ProDescriptions<API.RuleListItem>
            column={2}
            title={currentRow?.userAccount}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.userAccount,
            }}
            columns={columns as ProDescriptionsItemProps<API.RuleListItem>[]}
          />
        )}
      </Drawer>

      <ShowModal
        setVisible={handleShowModalOpen}
        values={currentRow ?? {}}
        visible={showModalOpen}
        requestColumns={requestColumns}
        responseColumns={responseColumns}
      />

      <CreateModal
        columns={columns}
        setVisible={handleModalOpen}
        onSubmit={(values) => {
          return handleAdd(values).then((r) => {});
        }}
        visible={createModalOpen}
        requestColumns={requestColumns}
        responseColumns={responseColumns}
      />
    </PageContainer>
  );
};
export default TableList;
