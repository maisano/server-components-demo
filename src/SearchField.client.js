/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {useState, unstable_useTransition} from 'react';

import Spinner from './Spinner';

export default function SearchField({ searchText, setSearchText }) {
  const [startSearching, isSearching] = unstable_useTransition(false);

  return (
    <form className="search" role="search" onSubmit={(e) => e.preventDefault()}>
      <label className="offscreen" htmlFor="sidebar-search-input">
        Search for a note by title
      </label>
      <input
        id="sidebar-search-input"
        placeholder="Search"
        onChange={(e) => {
          const newValue = e.target.value;
          startSearching(() => {
            setSearchText(newValue);
          });
        }}
      />
      <Spinner active={isSearching} />
    </form>
  );
}
