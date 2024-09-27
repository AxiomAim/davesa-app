export interface Communication {
    id?: string;
    type?: string;
    from?: {
        avatar?: string;
        contact?: string;
    };
    to?: string;
    cc?: string[];
    ccCount?: number;
    bcc?: string[];
    bccCount?: number;
    date?: string;
    subject?: string;
    content?: string;
    attachments?: {
        type?: string;
        name?: string;
        size?: number;
        preview?: string;
        downloadUrl?: string;
    }[];
    starred?: boolean;
    important?: boolean;
    unread?: boolean;
    folder?: string;
    labels?: string[];
}

export interface CommunicationCategory {
    type: 'folder' | 'filter' | 'label';
    name: string;
}

export interface CommunicationFolder {
    id: string;
    title: string;
    slug: string;
    icon: string;
    count?: number;
}

export interface CommunicationFilter {
    id: string;
    title: string;
    slug: string;
    icon: string;
}

export interface CommunicationLabel {
    id: string;
    title: string;
    slug: string;
    color: string;
}
