import {
    IsActiveMatchOptions,
    Params,
    QueryParamsHandling,
} from '@angular/router';

export interface DavesaNavigationItem {
    id?: string;
    title?: string;
    subtitle?: string;
    type: 'aside' | 'basic' | 'collapsable' | 'divider' | 'group' | 'spacer';
    hidden?: (item: DavesaNavigationItem) => boolean;
    active?: boolean;
    disabled?: boolean;
    tooltip?: string;
    link?: string;
    fragment?: string;
    preserveFragment?: boolean;
    queryParams?: Params | null;
    queryParamsHandling?: QueryParamsHandling | null;
    externalLink?: boolean;
    target?: '_blank' | '_self' | '_parent' | '_top' | string;
    exactMatch?: boolean;
    isActiveMatchOptions?: IsActiveMatchOptions;
    function?: (item: DavesaNavigationItem) => void;
    classes?: {
        title?: string;
        subtitle?: string;
        icon?: string;
        wrapper?: string;
    };
    icon?: string;
    badge?: {
        title?: string;
        classes?: string;
    };
    accessCondition?: any;
    moduleAccessPermission?: any[];
    children?: DavesaNavigationItem[];
    meta?: any;

}

export type DavesaVerticalNavigationAppearance =
    | 'default'
    | 'acess'
    | 'compact'
    | 'dense'
    | 'thin';

export type DavesaVerticalNavigationMode = 'over' | 'side';

export type DavesaVerticalNavigationPosition = 'left' | 'right';
