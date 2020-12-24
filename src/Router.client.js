import {
  createContext,
  useContext,
  unstable_createMutableSource,
  unstable_useMutableSource,
} from 'react';

const NoParams = {};
const ParamsContext = createContext(NoParams);

function createHistory() {
  let version = window.history.state?.version || 0;

  const listeners = new Set();

  window.addEventListener('popstate', function handlePopState() {
    emit();
  });

  function navigate(to, replace = false) {
    const state = {
      version: ++version,
    };

    if (replace) {
      window.history.replaceState(state, null, to);
    } else {
      window.history.pushState(state, null, to);
    }

    emit();
  }

  function subscribe(listener) {
    listeners.add(listener);
    return function unsubscribe() {
      listeners.delete(listener);
    };
  }

  function read() {
    return location;
  }

  function emit() {
    listeners.forEach((cb) => {
      cb();
    });
  }

  return {
    navigate,
    subscribe,
    get value() {
      return window.location;
    },
    get version() {
      return window.history.state?.version || 0;
    },
  };
}

const history = createHistory();

const source = unstable_createMutableSource(history, (historySource) => {
  return historySource.version;
});

function subscribe(historySource, callback) {
  return historySource.subscribe(callback);
}

function readPath(historySource) {
  return historySource.value.pathname;
}

// The most bootleg path to regex fn
function toRegex(path) {
  let str = '^';

  for (const segment of path.split('/')) {
    if (segment.length === 0) {
      continue;
    }

    if (segment.charAt(0) === ':') {
      str += '\\/((?<' + segment.substr(1) + '>[^\\/]+?))';
      continue;
    }

    str += '\\/' + segment;
  }

  str += '$';

  return new RegExp(str, 'i');
}

export function useNavigate() {
  return function navigate(...args) {
    return history.navigate(...args);
  };
}

export function useActivePath() {
  return unstable_useMutableSource(source, readPath, subscribe);
}

export function useRouteParams() {
  return useContext(ParamsContext);
}

export function Route({path, children}) {
  const pathname = useActivePath();
  const match = pathname.match(toRegex(path));

  if (match === null) {
    return null;
  }

  return (
    <ParamsContext.Provider value={match.groups}>
      {children}
    </ParamsContext.Provider>
  );
}
