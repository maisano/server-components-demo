import {Suspense} from 'react';

import {useNoteList} from './Cache.client';

import NoteListSkeleton from './NoteListSkeleton';

function Content(props) {
  const noteListResource = useNoteList(props);
  return noteListResource.readRoot();
}

export default function NoteList({searchText}) {
  return (
    <Suspense fallback={<NoteListSkeleton />}>
      <Content searchText={searchText} />
    </Suspense>
  );
}
