import React, {
  ReactElement,
  ReactNode,
  useCallback,
  useRef,
  useState,
} from "react";
import {
  AppBarTitle as RMDAppBarTitle,
  AppBarTitleProps,
} from "@react-md/app-bar";
import { Tooltipped } from "@react-md/tooltip";
import { useResizeObserver } from "@react-md/utils";

import { useId } from "./IdProvider";

/**
 * This component is a wrapper for the AppBarTitle component from @react-md/app-bar
 * that will automatically update the title to show a tooltip if the title becomes
 * truncated.
 *
 * This is pretty hacky right so it isn't part of the main lib yet, but a better
 * sultion to "auto tooltip" things might be added one day.
 */
export default function AppBarTitle({
  id,
  children,
  ...props
}: AppBarTitleProps): ReactElement {
  const [tooltip, setTooltip] = useState<ReactNode>(null);
  const ref = useRef<HTMLHeadingElement | null>(null);
  const updateTooltip = useCallback(() => {
    if (!ref.current) {
      return;
    }

    const isTruncated = ref.current.offsetWidth < ref.current.scrollWidth;
    if (isTruncated && !tooltip) {
      setTooltip(children);
    } else if (!isTruncated && tooltip) {
      setTooltip(null);
    }
  }, [tooltip, ref, children]);
  const [, refHandler] = useResizeObserver(updateTooltip, {
    ref,
    disableHeight: true,
  });

  return (
    <Tooltipped id={useId(id)} tooltip={tooltip}>
      <RMDAppBarTitle
        {...props}
        ref={refHandler}
        tabIndex={tooltip ? 0 : undefined}
      >
        {children}
      </RMDAppBarTitle>
    </Tooltipped>
  );
}
