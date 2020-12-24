/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {useState, Suspense} from 'react';
import {ErrorBoundary} from 'react-error-boundary';

import {useServerResponse} from './Cache.client';

import Note from './Note.client';
import NoteList from './NoteList.client';
import EditButton from './EditButton.client';
import SearchField from './SearchField.client';

import {Route} from './Router.client';

export default function App({selectedId = undefined}) {
  const [searchText, setSearchText] = useState('');

  return (
    <ErrorBoundary FallbackComponent={Error}>
      <div className="main">
        <section className="col sidebar">
          <section className="sidebar-header">
            <img
              className="logo"
              src="/logo.svg"
              width="22px"
              height="20px"
              alt=""
              role="presentation"
            />
            <strong>React Notes</strong>
          </section>
          <section className="sidebar-menu" role="menubar">
            <SearchField
              searchText={searchText}
              setSearchText={setSearchText}
            />
            <EditButton noteId={null}>New</EditButton>
          </section>
          <nav>
            <NoteList searchText={searchText} />
          </nav>
        </section>
        <section key={selectedId} className="col note-viewer">
          <Route path="/">
            <Note />
          </Route>
          <Route path="/:id">
            <Note />
          </Route>
          <Route path="/:id/edit">
            <Note isEditing />
          </Route>
        </section>
      </div>
    </ErrorBoundary>
  );
}

function Error({error}) {
  return (
    <div>
      <h1>Application Error</h1>
      <pre style={{whiteSpace: 'pre-wrap'}}>{error.stack}</pre>
    </div>
  );
}
