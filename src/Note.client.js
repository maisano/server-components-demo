import {Suspense} from 'react';

import {useNote} from './Cache.client';

import {useRouteParams} from './Router.client';

import NoteSkeleton from './NoteSkeleton';

function Content(props) {
  const noteResource = useNote(props);
  return noteResource.readRoot();
}

export default function Note({isEditing = false}) {
  const params = useRouteParams();

  return (
    <Suspense fallback={<NoteSkeleton />}>
      <Content id={params.id} isEditing={isEditing} />
    </Suspense>
  );
}
