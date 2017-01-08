import createLogger from 'redux-logger';

export const logger = createLogger({
  level: {
    prevState: () => 'info',
    action: () => 'log',
    error: () => 'error',
    nextState: () => 'info',
  },
  duration: true,
  actionTransformer: (action) => ({
    ...action,
    type: String(action.type),
  }),
  colors: {
    prevState: () => '#FFEB3B',
    action: () => null,
    nextState: () => '#4CAF50',
  },
  diff: true,
});
