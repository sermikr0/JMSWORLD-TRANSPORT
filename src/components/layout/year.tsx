"use client";

import { useSyncExternalStore } from "react";

/** The year the site was last built; also what the static shell shows. */
const BUILD_YEAR = 2026;

const subscribe = () => () => {};
const getYear = () => new Date().getFullYear();
const getServerYear = () => BUILD_YEAR;

/**
 * Copyright year. The prerendered shell shows the build year; once hydrated
 * in the browser it reads the visitor's clock, so a long-running server never
 * shows a stale year. Reading the clock during prerendering is not allowed
 * under Cache Components, hence useSyncExternalStore with a server snapshot.
 */
export function Year() {
  return <>{useSyncExternalStore(subscribe, getYear, getServerYear)}</>;
}
