'use client'
import React, { useRef, useEffect, PropsWithChildren } from 'react';

import { Fancybox as NativeFancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import { nativeSelectClasses } from '@mui/material';

function Fancybox(props)  {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    const delegate = props.delegate || '[data-fancybox]';
    const options = props.options || {};

    NativeFancybox.bind(container, delegate, options);

    return () => {
      NativeFancybox.unbind(container);
    //   NativeFancybox.close()
    };
  });

  return <div className='' ref={containerRef}>{props.children}</div>;
}

export default Fancybox;
