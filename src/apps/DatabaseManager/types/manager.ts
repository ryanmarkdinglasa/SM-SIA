import { Config } from '..';
import { Page, User } from '.';

export interface Manager {
    activeKey: string | null;
    activeDatabaseConfig: Config | null;
    activeLicense: string | null;
    activePage: Page;
    activeUser: User | null;
    activeToken: string | null;
}
