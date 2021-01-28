const USER_NAMES = ['百里玄策', '孙悟空', '娜可露露', '安其拉', '后裔', '蔡文姬', '猪八戒', '赵云'];

const ISSUE_STATUS = ['open', 'closed', 'processing'];

const LABELS = [
  { label: 'bug', color: 'red' },
  { label: 'question', color: 'blue' },
  { label: 'dependencies', color: 'gray' },
  { label: 'Progress', color: 'cyan' },
  { label: 'Feature Request', color: 'purple' },
];

export interface IUserInfo {
  name: string;
  age: number;
  geneder: number;
}

export interface IGitHubIssue {
  id: number;
  url: string;
  title: string;
  labels: {
    label: string;
    color: string;
  }[];
  status: string;
  comments: number;
  content: string;
  assigner: string;
  createdTime: number;
  closeTime?: number;
  progress: number;
  money: number;
  author: IUserInfo;
}

export interface IPagedResult {
  total: number;
  list: IGitHubIssue[];
}

export const getList = (data) => {
  // eslint-disable-next-line no-console
  console.log(`查询条件:${JSON.stringify(data)}`);
  const { skipCount = 0, maxResultCount = 10 } = data;
  const totalCount = 500;
  const toCount = Math.min(totalCount, skipCount + maxResultCount);
  return new Promise<IPagedResult>((resolve) => {
    const tableListDataSource: IGitHubIssue[] = [];
    for (let i = skipCount + 1; i <= toCount; i++) {
      const labelStart = Math.floor(Math.random() * LABELS.length);
      tableListDataSource.push({
        id: i,
        url: `https://github.com/wetrial/wetrials/issues/${i}`,
        title: `这是bug的标题-${i}`,
        labels: LABELS.slice(labelStart, labelStart + Math.floor(Math.random() * 3)),
        status: ISSUE_STATUS[Math.floor(Math.random() * ISSUE_STATUS.length)],
        comments: Math.floor(Math.random() * 20),
        content:
          i % 2 === 0
            ? `简短备注文案-${i}`
            : '很长很长很长很长很长很长很长的很长很长很长很长的Bug-${i}',
        assigner: USER_NAMES[Math.floor(Math.random() * USER_NAMES.length)],
        createdTime: Date.now() - 86400000 - Math.floor(Math.random() * 2000),
        closeTime: Date.now() - Math.floor(Math.random() * 2000),
        progress: Math.ceil(Math.random() * 100),
        money: Math.random() * 10000,
        author: {
          name: `xxg-${i}`,
          age: i,
          geneder: i % 2,
        },
      });
    }
    const result = {
      total: totalCount,
      list: tableListDataSource,
    };
    setTimeout(() => {
      resolve(result);
    }, 1000);
  });
};
