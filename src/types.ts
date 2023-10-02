type Post = {
  id: number;
  title: string;
  content: string;
  author: string;
  datePosted: Date;
  likes: number;
  comments: number;
};

type Comment = {
  id: number;
  content: string;

}

type Pod = {
  id: number;
  name: string;
  members: number;
  description: string;
};

export type {Post, Pod, Comment}