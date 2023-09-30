import { faComment } from "@fortawesome/free-solid-svg-icons/faComment";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons/faEllipsisV";
import { faHeart } from "@fortawesome/free-solid-svg-icons/faHeart";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons/faUserCircle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Post = {
  id: number;
  title: string;
  content: string;
  author: string;
  // communityId: string;
  datePosted: Date;
};

const getPosts = async () => {
  const posts: Post[] = [
    {
      id: 1,
      title: "Post 1",
      content: "Hello world",
      author: "glenn",
      datePosted: new Date(),
    },
    {
      id: 2,
      title: "Post 2",
      content: "Goodbye world",
      author: "glenn",
      datePosted: new Date(),
    },
  ];
  return posts;
};

export default async function Home() {
  const posts = await getPosts();

  return (
    <main>
      <h1>For You</h1>
      <ul className="py-4 flex flex-col gap-4">
        {posts.map((post) => (
          <PostPreview key={post.id} post={post} />
        ))}
      </ul>
    </main>
  );
}

type PostPreviewProps = {
  post: Post;
};

function PostPreview({ post }: PostPreviewProps) {
  return (
    <li className="bg-white p-4 rounded-md relative shadow">
      <h2 className="">{post.title}</h2>
      <div className="flex gap-4">
        <span className="flex gap-2 items-center">
          <FontAwesomeIcon icon={faUserCircle}/>
          {post.author}
        </span>
        <span>
          {post.datePosted.toLocaleDateString()}
        </span>
      </div>
      <div className="py-2">{post.content}</div>
      <div className="flex gap-4">
        <FontAwesomeIcon icon={faHeart}/>
        <FontAwesomeIcon icon={faComment}/>
      </div>
      <button className="absolute top-4 right-4"><FontAwesomeIcon icon={faEllipsisV}/></button>
    </li>
  );
}
