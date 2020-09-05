import { useEffect, useState } from 'react';

type Subscriber = () => void;

const subscribers = new Set<Subscriber>();

interface ResponsiveConfig {
  [key: string]: {
    /**
     * >=
     */
    min: number;
    /**
     * <
     */
    max: number;
  };
}
interface ResponsiveInfo {
  screen: string;
  size: {
    height: number;
    width: number;
  };
  // [key: string]: boolean;
}

let info: ResponsiveInfo;

let responsiveConfig: ResponsiveConfig = {
  xs: {
    min: -Infinity,
    max: 576,
  },
  sm: {
    min: 576,
    max: 768,
  },
  md: {
    min: 768,
    max: 992,
  },
  lg: {
    min: 992,
    max: 1200,
  },
  xl: {
    min: 1200,
    max: 1600,
  },
  xxl: {
    min: 1600,
    max: +Infinity,
  },
};

function init() {
  if (info) return;
  info = {
    size: {
      height: 0,
      width: 0,
    },
    screen: 'xs',
  };
  calculate();
  window.addEventListener('resize', () => {
    const oldInfo = info;
    calculate();
    if (oldInfo === info) return;
    // eslint-disable-next-line no-restricted-syntax
    for (const subscriber of subscribers) {
      subscriber();
    }
  });
}

function calculate() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const newInfo = {
    size: {
      width,
      height,
    },
  } as ResponsiveInfo;
  let shouldUpdate = false;
  let curResponsive;
  // eslint-disable-next-line no-restricted-syntax
  for (const key of Object.keys(responsiveConfig)) {
    curResponsive = responsiveConfig[key];
    if (width >= curResponsive.min && width < curResponsive.max) {
      newInfo.screen = key;
      shouldUpdate = true;
      break;
    }
  }

  if (
    shouldUpdate ||
    newInfo.size.width !== info.size.width ||
    newInfo.size.height !== info.size.height
  ) {
    info = newInfo;
  }
}

export function configResponsive(config: ResponsiveConfig) {
  responsiveConfig = config;
  if (info) calculate();
}

export function useResponsive() {
  init();
  const [state, setState] = useState<ResponsiveInfo>(info);

  useEffect(() => {
    const subscriber = () => {
      setState(info);
    };
    subscribers.add(subscriber);
    return () => {
      subscribers.delete(subscriber);
    };
  }, []);

  return state;
}
