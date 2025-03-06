import { Tag } from './Tag';
export type Entity = {
    id: string;
    name: string;
    tags?: Tag[];
    open?: boolean;
    details?: string;
}