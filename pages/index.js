import React from "react";
import Link from "next/link";
import useSWR from "swr";

const BlogPreview = ({
  date_posted,
  author,
  blog_title,
  blog_post,
  path,
  time_to_read,
  image
}) => (
  <li key={path}>
    <h2>{ blog_title }</h2>
    { image ? 
      <img src={image.img_path} alt={image.alt_tag}/> :
      null
    }
    <p>{`Published by ${author} on ${date_posted}`} <br/>
      { 
        time_to_read === 1 ? 
          time_to_read + ' minute ' 
          : time_to_read + ' minutes '
      }
      {'to read.'}
    </p>
    <p>{ blog_post + '...' }</p>    
    <Link href={`/blog/${path}`}>
      <a>Read More...</a>
    </Link>
  </li>
)

const Index = () => {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data } = useSWR("/api/directory", fetcher);

  return (
    <>
      <ul>      
        {!data
          ? "Loading"
          : data.map((article) => (
              <BlogPreview 
                key={article.path}
                date_posted={article.date_posted}
                author={article.author}
                blog_title={article.blog_title}
                blog_post={article.blog_post}
                path={article.path_to_article}
                time_to_read={article.time_to_read}
                image={article.image}
              />
            ))
        }
      </ul>
    </>
  );
};

export default Index;
