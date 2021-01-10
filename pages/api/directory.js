import fs from "fs";
import path from "path";
import {
  extractAndParseDate,
  extractAndParseAuthor,
  extractAndParseBlogTitle,
  extractAndParseBlogPost,
  extractAndManipulateImage,
} from "../../utils/helpers";

export default (req, res) => {
  // get file names in the blog directory
  const dir = path.resolve("./pages/blog");
  const fileNames = fs.readdirSync(dir);
  
  let blogs = [];

  for (let i = 0; i < fileNames.length; i++) {
    // if is valid .md or .mdx extension
    if (/\.md|mdx/.test(fileNames[i])) {           
      const convertFileToString = fs.readFileSync(path.resolve(__dirname, dir, fileNames[i]), 'utf8');      
      const estimatedTimeToRead = Math.round(convertFileToString.split(' ').length / 250);

      convertFileToString ? 
        blogs.push({
          date_posted: extractAndParseDate(fileNames[i]),
          author: extractAndParseAuthor(fileNames[i]),
          blog_title: extractAndParseBlogTitle(fileNames[i]), 
          blog_post: extractAndParseBlogPost(convertFileToString),          
          path_to_article: fileNames[i].replace(/\.md|mdx/, ""),
          time_to_read: estimatedTimeToRead === 0 ? 1 : estimatedTimeToRead,
          image: extractAndManipulateImage(convertFileToString)
        }) 
        : null
    }    
  }

  res.status(200).json(blogs);
};
