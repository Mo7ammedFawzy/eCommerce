import {computed, type ComputedRef, ref} from 'vue'
import {breakpointsTailwind, useBreakpoints} from '@vueuse/core'
import type {Base, Route} from '@/types/common.ts'

export interface HeaderLink extends Base {
  route: Route
  category?: string
}

export interface HeaderAction {
  label?: string,
  icon?: string
  route?: string
  slot?: string
  onClick?: () => void
  canShow?: ComputedRef<boolean>
}

export function useHomeUtils() {
  const breakpoints = useBreakpoints(breakpointsTailwind);

  const headerLinks: HeaderLink[] = [
    {label: 'home', route: '/'},
    {label: 'products', route: '/products'},
    {label: 'men', route: '/products', category: "men's clothing"},
    {label: 'women', route: '/products', category: "women's clothing"},
    {label: 'electronics', route: '/products', category: 'electronics'},
  ]

  const make = (action: HeaderAction): HeaderAction => ({...action, canShow: action.canShow ?? computed(() => true)})

  const headerActions = ref<HeaderAction[]>(
    [
      make({
        label: 'home',
        icon: 'iconamoon:home-thin',
        route: '/',
        canShow: breakpoints.smallerOrEqual('sm'),
      }),
      make({
        label: 'search',
        icon: 'material-symbols-light:search',
        route: '/search',
      }),
      make({
        label: 'products',
        icon: 'mynaui:store',
        route: '/products',
        canShow: breakpoints.smallerOrEqual('sm'),
      }),
      make({
        label: 'cart',
        icon: 'streamline:shopping-bag-hand-bag-2',
        route: '/cart',
      }),
      make({
        label: 'user',
        icon: 'material-symbols-light:person-outline',
        route: '/profile',
      }),
      make({
        slot: 'colorMode',
        onClick: () => console.log('toggled color mode'),
        canShow: breakpoints.greaterOrEqual('md'),
      }),
    ]
  );
  return {
    headerLinks,
    headerActions,
  }
}
