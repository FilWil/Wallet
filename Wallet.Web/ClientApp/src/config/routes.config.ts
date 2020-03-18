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
        showInNav: true,
        displayName: 'Register',
        icon: 'sign-out-alt',
    }
});
