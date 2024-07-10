export class Article {
    title: string;
    content: string;
    image: string;
    status: string;
    userId: string;
    postId: string;

    constructor(obj: Partial<Article>) {
        this.title = obj.title!;
        this.content = obj.content!;
        this.image = obj.image!;
        this.status = obj.status!;
        this.userId = obj.userId!;
        this.postId = obj.postId!;
    }
}