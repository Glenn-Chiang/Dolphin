import PostPreview from "@/components/PostPreview";
import { Comment, Post } from "@/types";
import CommentSection from "./CommentSection";

const posts: Post[] = [
  {
    id: 1,
    title: "Post 1",
    content: "Hello world",
    author: "glenn",
    datePosted: new Date(),
    likes: 10,
    comments: 5,
  },
  {
    id: 2,
    title: "Post 2",
    content: "Goodbye world",
    author: "glenn",
    datePosted: new Date(),
    likes: 10,
    comments: 5,
  },
];

const getPost = (postId: number) => {
  return posts.find((post) => (post.id = postId));
};

const comments: Comment[] = [
  {
    id: 1,
    content: 'Why is app router so unnecessarily complicated?'
  },
  {
    id: 2,
    content: 'This framework seems to be more of a hindrance than anything'
  }, 
  {
    id: 3,
    content: 'Useless piece of absolute trash'
  }
]

export default function Post({ params }: { params: { id: string } }) {
  const postId = Number(params.id);
  const post = getPost(postId);

  if (!post) {
    return <div>Post not found</div>;
  }
  return (
    <main className="flex flex-col gap-4">
      <PostPreview post={post} />
      <CommentSection comments={comments}/>
    </main>
  );
}
