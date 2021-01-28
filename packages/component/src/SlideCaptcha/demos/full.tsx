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

  const onValidationSuccess = () => {
    // eslint-disable-next-line no-alert
    alert('验证成功!');
  };

  const onValidationError = () => {
    // eslint-disable-next-line no-alert
    alert('验证失败，请重试!');
    run();
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
      onFinishFailed={onValidationError}
      onFinish={onValidationSuccess}
      tip="向右滑动完成滑块"
      refreshTitle="点击更换一张"
    />
  );
};
