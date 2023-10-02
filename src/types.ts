type Post = {
  id: number;
  title: string;
  content: string;
  author: string;
  // communityId: string;
  datePosted: Date;
  likes: number;
  comments: number;
};

type Pod = {
  id: number;
  name: string;
  members: number;
  description: string;
};

export type {Post, Pod}