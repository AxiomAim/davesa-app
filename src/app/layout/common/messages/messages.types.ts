// export interface Message {
//     id: string;
//     icon?: string;
//     image?: string;
//     title?: string;
//     description?: string;
//     time: string;
//     link?: string;
//     useRouter?: boolean;
//     read: boolean;
// }

export interface Message {
    id: string;
    icon?: string;
    image?: string;
    title?: string;
    subtitle?: string;
    description?: string;
    model_id?: string;
    has_read: boolean;
    created_at?: string;
}
