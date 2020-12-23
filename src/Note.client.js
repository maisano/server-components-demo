import {Suspense} from 'react';

import {useLocation} from './LocationContext.client';
import {useNote} from './Cache.client';

import NoteSkeleton from './NoteSkeleton';

function Content(props) {
  const noteResource = useNote(props);
  return noteResource.readRoot();
}

export default function Note() {
  const [location] = useLocation();

  return (
    <Suspense fallback={<NoteSkeleton />}>
      <Content id={location.selectedId} isEditing={location.isEditing} />
    </Suspense>
  );
}
