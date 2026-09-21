const blogs = [
  {
    id: 1,
    title: "next.js utilizes React Server Components",
    author: "devi",
    url: "http://localhost:3000/",
    likes: 4,
  },
  {
    id: 2,
    title: "next.js is built on top of React",
    author: "yelli",
    url: "http://localhost:3000/",
    likes: 10,
  },
  {
    id: 3,
    title: "next.js supports both static and dynamic rendering",
    author: "ueii",
    url: "http://localhost:3000/",
    likes: 9,
  },
];

let nextId = 4;

export const getBlogs = () => {
  return blogs;
};

export const addBlog = (title: string, author: string, url: string) => {
  blogs.push({
    id: nextId++,
    title: title,
    author: author,
    url: url,
    likes: 0,
  });
};

export const getBlogById = (id: number) => {
  return blogs.find((blog) => blog.id === id);
};

export const increaseLike = (id: number) => {
  const blog = getBlogById(id);
  if (blog) {
    blog.likes = blog.likes + 1;
  }
};
