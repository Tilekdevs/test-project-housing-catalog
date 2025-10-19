import { useIsFetching, useIsMutating } from "@tanstack/react-query";
import { useEffect } from "react";
import NProgress from 'nprogress';
import "nprogress/nprogress.css";

NProgress.configure({ showSpinner: false, trickleSpeed: 100 });

export const GlobalProgress = () => {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();

  useEffect(() => {
    if (isFetching > 0 || isMutating > 0) {
      NProgress.start();
    } else {
      NProgress.done();
    }
  }, [isFetching, isMutating]);

  return null;
};
