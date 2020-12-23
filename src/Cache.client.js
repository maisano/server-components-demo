/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {unstable_getCacheForType, unstable_useCacheRefresh} from 'react';
import {createFromFetch} from 'react-server-dom-webpack';

function createNoteCache() {
  return new Map();
}

function createNoteListCache() {
  return new Map();
}

export function useNote({id, isEditing}) {
  const key = JSON.stringify({id, isEditing});
  const cache = unstable_getCacheForType(createNoteCache);

  if (cache.has(key)) {
    return cache.get(key);
  }

  const response = createFromFetch(
    fetch('/react?c=Note&p=' + encodeURIComponent(key))
  );

  cache.set(key, response);
  return response;
}

export function useNoteList({searchText}) {
  const key = JSON.stringify({searchText});
  const cache = unstable_getCacheForType(createNoteListCache);

  if (cache.has(key)) {
    return cache.get(key);
  }

  const response = createFromFetch(
    fetch('/react?c=NoteList&p=' + encodeURIComponent(key))
  );

  cache.set(key, response);
  return response;
}

export function useRefresh() {
  const refreshCache = unstable_useCacheRefresh();
  return function refresh(key) {
    refreshCache(createNoteCache);
    refreshCache(createNoteListCache);
  }
}

export function useRefreshNote() {
  const refreshCache = unstable_useCacheRefresh();
  return function refresh(key, seededResponse) {
    refreshCache(createNoteCache, new Map([[key, seededResponse]]));
  };
}

export function useRefreshNoteList() {
  const refreshCache = unstable_useCacheRefresh();
  return function refresh(key, seededResponse) {
    refreshCache(createNoteListCache, new Map([[key, seededResponse]]));
  };
}
