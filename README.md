# Static Blog

Update Blog based on _filename_ and 3 lines of markdown.

## Setup
```bash
$ git clone 
$ cd static-blog && npm i
```

To start the _live editor_ `npm run dev`. For everything else see the [package.json]()

## Create New Articles

We use regular expressions to capture the date, title and author from the file name.

`/pages/blog/YYYY-MM-DD-my-awesome-article-by-author-name.md`

Add the following lines to the top of your article, this serves several purposes; 

1. Is the introduction to the article itself. 
2. Image is extracted for article preview
3. The heading, image and first 200 characters after the `---` (exculding markdown syntax) are used for article SEO

```
# My Awesome Article
![alt](path/to/image.png)
---

...
```