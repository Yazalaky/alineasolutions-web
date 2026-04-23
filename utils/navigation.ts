import { APP_VIEWS } from '../constants';
import { ViewState } from '../types';

const HASH_VIEWS: Exclude<ViewState, 'home'>[] = APP_VIEWS.filter(
  (view): view is Exclude<ViewState, 'home'> => view !== 'home',
);

export const getViewFromHash = (hashValue?: string): ViewState => {
  const rawHash =
    hashValue ??
    (typeof window === 'undefined' ? '' : window.location.hash);

  const normalizedHash = rawHash.replace(/^#\/?/, '');

  if (HASH_VIEWS.includes(normalizedHash as Exclude<ViewState, 'home'>)) {
    return normalizedHash as Exclude<ViewState, 'home'>;
  }

  return 'home';
};

export const buildHashForView = (view: ViewState): string => {
  return view === 'home' ? '' : `#${view}`;
};
