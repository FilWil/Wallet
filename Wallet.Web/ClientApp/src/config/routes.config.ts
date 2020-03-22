import { IconProp } from '@fortawesome/fontawesome-svg-core';

export type Route = {
    readonly path: string;
    readonly exact?: boolean;
    readonly showInNav?: boolean;
    readonly pathAbsolute?: string;
    readonly displayName: string;
    readonly icon?: IconProp;
};

export type RoutesConfig = { [key: string]: Route };

export const RoutesConfig = Object.freeze<RoutesConfig>({
    Login: {
        path: '/',
        showInNav: false,
        displayName: 'Login',
        icon: 'sign-out-alt',
    },
    Register: {
        path: '/register',
        showInNav: false,
        displayName: 'Register',
        icon: 'sign-out-alt',
    },
    Home: {
        path: '/home',
        showInNav: true,
        displayName: 'Home',
        icon: 'sign-out-alt',
    },
    Balance: {
        path: '/balance',
        showInNav: true,
        displayName: 'Balance',
        icon: 'sign-out-alt',
    },
    Expenses: {
        path: '/expenses',
        showInNav: true,
        displayName: 'Expenses',
        icon: 'sign-out-alt',
    },
    Incomes: {
        path: '/incomes',
        showInNav: true,
        displayName: 'Incomes',
        icon: 'sign-out-alt',
    },
});
