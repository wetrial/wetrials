import React, { useState, useRef, useEffect } from 'react';
import { Select, Avatar, Button, Popover } from 'antd';
import { PlusOutlined, DownOutlined } from '@ant-design/icons';
import './index.less';

interface UserSelectFields {
  id: string;
  name: string;
  avatar: string;
}

interface UserSelectProps {
  defaultValue?: string[];
  dataSource: { [key: string]: any }[];
  onChange?: (value) => void;
  value?: string[] | string | undefined;
  fields?: UserSelectFields | undefined;
  cardRender?: (key) => void;
  multiple?: boolean;
}
const { Option } = Select;

const UserSelect: React.ForwardRefRenderFunction<unknown, UserSelectProps> = (props, ref) => {
  const { defaultValue, dataSource, onChange, value, fields, cardRender, multiple } = props;
  const [avaList, setAva] = useState<any[]>([]);
  const [selectVisible, changeShow] = useState(false);
  const [values, setValues] = useState<any>(defaultValue || value);
  const refSelect = useRef<any>();
  let firstLoad = false;

  const triggerChange = () => {
    if (onChange && !firstLoad) onChange(values);
  };

  useEffect(() => {
    firstLoad = true;
  }, []);

  useEffect(() => {
    const initAva = [] as any[];
    if (!multiple) {
      dataSource.map((item) => {
        if (fields && item[fields.id] === values) {
          initAva.push({
            key: fields ? item[fields.id] : item.UserId,
            value: fields ? item[fields.id] : item.UserId,
            label: fields ? item[fields.name] : item.FullName,
            avatar: fields ? item[fields.avatar] : item.Avatar,
          });
        }
        return ref;
      });
      setAva(initAva);
    } else {
      values?.forEach((i) => {
        dataSource?.forEach((item) => {
          if (fields && item[fields.id] === i) {
            initAva.push({
              key: fields ? item[fields.id] : item.UserId,
              value: fields ? item[fields.id] : item.UserId,
              label: fields ? item[fields.name] : item.FullName,
              avatar: fields ? item[fields.avatar] : item.Avatar,
            });
          }
        });
        setAva(initAva);
      });
    }
    triggerChange();
  }, [values]);

  const showPanel = () => {
    changeShow(true);
    setTimeout(() => {
      refSelect.current.focus();
    }, 100);
  };
  const hidePanel = () => {
    changeShow(false);
  };
  const removeUser = (val) => {
    if (!multiple) {
      setValues(undefined);
    } else {
      setValues(values.filter((item) => item !== val));
    }
  };
  const handleChange = (val, users) => {
    if (!multiple) {
      const ava = [] as any[];
      ava.push({ key: users.key, value: users.value, label: users.children[1] });
    } else {
      const ava = [] as any[];
      users?.forEach((item) => {
        ava.push({ key: item.key, value: item.value, label: item.children[1] });
      });
    }

    setValues(val);
  };

  return (
    <div style={{ display: 'flex' }}>
      <Avatar.Group>
        {avaList.map((item) => {
          return (
            <Popover
              key={item.key}
              title={item.label}
              content={() => {
                return (
                  <div className="user-card">
                    {cardRender && cardRender(item.key)}
                    <div>
                      <Button
                        danger
                        size="small"
                        onClick={() => {
                          removeUser(item.key);
                        }}
                      >
                        移除
                      </Button>
                    </div>
                  </div>
                );
              }}
            >
              {item.avatar ? (
                <Avatar src={item.avatar}>{item.label}</Avatar>
              ) : (
                <Avatar>{item.label}</Avatar>
              )}
            </Popover>
          );
        })}
        <span onClick={showPanel}>
          <Avatar
            className="user-selet-trigger"
            icon={multiple ? <PlusOutlined /> : <DownOutlined />}
          />
        </span>
      </Avatar.Group>

      <Select
        ref={refSelect}
        className="wt-select-default"
        mode={multiple ? 'multiple' : undefined}
        showSearch
        open={!!selectVisible}
        value={values}
        style={{
          width: 'fit-content',
          minWidth: '150px',
          flexDirection: 'column',
          display: selectVisible ? 'inline-flex' : 'none',
        }}
        dropdownRender={(menu) => {
          return <div>{menu}</div>;
        }}
        tagRender={() => {
          return <></>;
        }}
        onBlur={hidePanel}
        onChange={handleChange}
        filterOption={(input, option) =>
          option ? option.children[1].toLowerCase().indexOf(input.toLowerCase()) >= 0 : false
        }
      >
        {dataSource &&
          dataSource.length > 0 &&
          dataSource.map((item) => {
            return (
              <Option
                key={fields ? item[fields.id] : item.UserId}
                value={fields ? item[fields.id] : item.UserId}
              >
                {fields && item[fields.avatar] ? (
                  <Avatar src={item[fields.avatar]}>{item[fields.name]}</Avatar>
                ) : (
                  <Avatar>{fields ? item[fields.name] : item.FullName}</Avatar>
                )}

                {fields && item[fields.name]}
              </Option>
            );
          })}
      </Select>
    </div>
  );
};

const UserSelectComponent = React.forwardRef<unknown, UserSelectProps>(UserSelect);

UserSelectComponent.defaultProps = {
  fields: { id: 'UserId', name: 'FullName', avatar: 'Avatar' },
  multiple: true,
};

export default UserSelectComponent;
