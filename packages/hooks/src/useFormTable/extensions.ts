import { useSessionStorageState, useUnmount } from 'ahooks';

export interface Store {
  [name: string]: any;
}

export interface IRecord {
  active?: boolean;
  defaultType: 'simple' | 'advance';
  defaultParams: [
    {
      current?: number;
      pageSize?: number;
      sorter?: {
        order: 'ascend' | 'descend';
        field: string;
      };
      filters?: any;
    },
    Store,
  ];
}

const useSessionStorageDestroyState = (key: string, storeRecord: () => IRecord) => {
  const [record, setRecord] = useSessionStorageState<IRecord>(key);
  // console.log(
  //   window.performance &&
  //     window.performance.navigation &&
  //     (PerformanceNavigation.TYPE_RELOAD === window.performance.navigation.type ||
  //       PerformanceNavigation.TYPE_BACK_FORWARD === window.performance.navigation.type),
  // );

  useUnmount(() => {
    const tmpResult = storeRecord();
    setRecord(tmpResult);
  });

  // useEffect(() => {
  //   const handleBeforeunload = () => {
  //     const tmpResult = storeRecord();
  //     setRecord({
  //       ...tmpResult,
  //       active: true,
  //     });
  //     return tmpResult;
  //   };
  //   window.addEventListener('beforeunload', handleBeforeunload, true);
  //   return () => {
  //     window.removeEventListener('beforeunload', handleBeforeunload, true);
  //   };
  // }, []);

  return [record, setRecord];
};

export default useSessionStorageDestroyState;
