import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // let Next.js treat .md and .mdx files as pages
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/, // optional: also compile .md files
});

export default withMDX(nextConfig);
