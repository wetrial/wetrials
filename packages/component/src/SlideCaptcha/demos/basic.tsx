import React from 'react';
import { SlideCaptcha } from '@wetrial/component';
import { useRequest } from 'ahooks';
import { generate, check } from './_service';

export default () => {
  const { data, run, loading } = useRequest<any>(generate);

  const validateRequest = useRequest(check, {
    manual: true,
  });

  const onValidate = (reqData) => {
    return validateRequest.run(reqData);
  };

  const onValidationSuccess = (validateKey) => {
    // eslint-disable-next-line no-alert
    alert(`验证成功!,token:${validateKey}`);
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
      onRefresh={run}
      validate={onValidate}
      onFinish={onValidationSuccess}
    />
  );
};
