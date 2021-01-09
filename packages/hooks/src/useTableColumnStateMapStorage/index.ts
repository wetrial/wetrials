import { useLocalStorageState } from 'ahooks';

interface IColumnState {
  show?: boolean;
  fixed?: 'right' | 'left' | undefined;
}

type IColumnStateMap = Record<string, IColumnState>;

export interface Result {
  getColumns: (columns: any[]) => string[];
  tableProps: {
    columnStateMap: IColumnStateMap | undefined;
    onColumnsStateChange: (IColumnStateMap) => void;
  };
}

const TABLE_COLUMN_STATE_CACHE_PREFIX = '__table_columns_';

function useTableColumnStateMapStorage(key: string): Result;
function useTableColumnStateMapStorage(
  key: string,
  defaultValue?: IColumnStateMap | (() => IColumnStateMap),
) {
  const [columnStateMap, onColumnsStateChange] = useLocalStorageState(
    `${TABLE_COLUMN_STATE_CACHE_PREFIX}${key}`,
    defaultValue,
  );

  return {
    tableProps: {
      columnStateMap,
      onColumnsStateChange,
    },
    getColumns: (columns: any[]) => {
      const displayColumns: string[] = [];
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      columns &&
        columns.forEach((item) => {
          const columnName: string = item.dataIndex;
          if (
            !columnStateMap ||
            !columnStateMap[columnName] ||
            columnStateMap[columnName].show !== false
          ) {
            displayColumns.push(columnName);
          }
        });
      return displayColumns;
    },
  } as Result;
}

export default useTableColumnStateMapStorage;
