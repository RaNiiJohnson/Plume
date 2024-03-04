import { useQuery } from '@tanstack/react-query';
import Markdown from 'react-markdown';
import { useParams } from 'react-router';
import { getPost } from '../actions/postAction';


export default function PostView() {
  const { id } = useParams()
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["Post"],
    queryFn: getPost,
  });

  if (isError || error) return <p>Something went wrong</p>;

  if (isLoading) return <>loading</>;

  const post = data && data.find(post => post._id === id)
  const lyrics = post?.lyrics.split('\n\n')

  const markdown = `
   >## ${post?.artist} 
   > ${post?.title}
  `

  return <div className="prose dark:prose-invert" ><Markdown>
    {markdown}
    </Markdown>
    <div>
      {lyrics?.map((lines, index) => (
        <div key={index}>{lines.split('\n').map((l, i) => (
            <span key={i}>{l}<br/></span>
        ))}<br/></div>
      ))}
    </div>
    </div>
}
