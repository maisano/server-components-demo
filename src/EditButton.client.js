/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {unstable_useTransition, useState} from 'react';

import {useNavigate} from './Router.client';

export default function EditButton({noteId, children}) {
  const navigate = useNavigate();
  const [startTransition, isPending] = unstable_useTransition();
  const isDraft = noteId == null;
  return (
    <button
      className={[
        'edit-button',
        isDraft ? 'edit-button--solid' : 'edit-button--outline',
      ].join(' ')}
      disabled={isPending}
      onClick={() => {
        startTransition(() => {
          navigate(`/${noteId}/edit`);
        });
      }}
      role="menuitem">
      {children}
    </button>
  );
}
