import React from 'react';
import { SlideCaptcha } from '@wetrial/component';
import { useRequest } from 'ahooks';
import { post } from '@wetrial/core';

export default () => {
  const { data, run, loading } = useRequest(
    (reqData) => post('wetrial.github.io/api/VerificationCode/generation', { data: reqData }),
    {
      manual: true,
    },
  );

  const validateRequest = useRequest(
    (reqData) => post('wetrial.github.io/api/VerificationCode/check', { data: reqData }),
    {
      manual: true,
    },
  );

  const requestCaptcha = () => {
    return run({ spec: 1 });
  };

  const onValidate = (reqData) => {
    return validateRequest.run(reqData);
  };

  const onValidationSuccess = () => {
    // eslint-disable-next-line no-alert
    alert('验证成功!');
  };

  return (
    <SlideCaptcha
      loading={loading}
      token={data?.token}
      bgSrc={data?.normal}
      captchSrc={data?.small}
      width={data?.imgx}
      height={data?.imgy}
      top={data?.y}
      onRefresh={requestCaptcha}
      validate={onValidate}
      // onFinishFailed={this.onValidationError}
      onFinish={onValidationSuccess}
    />
  );
};
