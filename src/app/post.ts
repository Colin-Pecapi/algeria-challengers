export class Post{
    id: number;
    date: string;
    date_gtm: string;
    guid: {id:number, link:string};
    link: string;
    modified: string;
    modified_gmt: string;
    slug: string;
    status: string;
    type: string;
    password: string;
    title: {rendered:string, type:string};
    content: {protected:boolean, rendered:string};
    author: number;
    excerpt: object;
    featured_media: number;
    comment_status: string;
    ping_status: string;
    format: string;
    meta: string;
    sticky: boolean;
    template: string;
    categories: string[];
    tags: string[];
}