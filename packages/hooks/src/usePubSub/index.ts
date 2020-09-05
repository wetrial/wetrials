import { useEffect } from 'react';
import PubSub from 'pubsub-js';

// /**
//  * 全局发布一个事件(不会重复发布)
//  * @param event 事件类型
//  * @param data 数据
//  */
// function usePublish(event: string, data?: any) {
//   useEffect(() => {
//     PubSub.publish(event, data);
//   }, []);
// }

/**
 * 全局订阅一个事件(不会重复订阅，组件销毁时会自动取消订阅)
 * @param event 订阅的事件类型
 * @param handle 订阅事件的处理
 */
function useSubscribe(event: string, handle: (event: string, data: any) => void) {
  useEffect(() => {
    const token = PubSub.subscribe(event, handle);
    return () => {
      PubSub.unsubscribe(token);
    };
  }, []);
}

export { useSubscribe, PubSub };
