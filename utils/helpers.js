import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(localizedFormat);

const STORE = {
  DATE: /^(\d{4}([.\-/])\d{2}([.\-/])\d{2})/,
  AUTHOR: /-by-(.*)/,
  EXTENSION: /\.md|mdx/,
  DASH: /-/g,
  HEADER: /(^.+\-\-\-)/i,
  NEW_LINE: /\\n/g,
  SPECIAL_CHARS: /[^a-zA-Z ]/g,
  IMG_PATH: /(\(.+\))/gi,
  ALT_IMG: /(\[.+\])/gi,
};

const handleCaps = (string) =>
  string
    .toLowerCase()
    .split(" ")
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(" ");

const extractAndParseDate = (string) => {
  if (STORE.DATE.test(string)) {
    const date = string.match(STORE.DATE);
    return dayjs(date[0]).format("LL");
  }
};

const extractAndParseAuthor = (string) => {
  if (STORE.AUTHOR.test(string)) {
    const unparsedAuthor = string.match(STORE.AUTHOR);
    const withoutExtension = unparsedAuthor[0].replace(STORE.EXTENSION, "");
    const withoutDash = withoutExtension.replace(STORE.DASH, " ");
    const author = withoutDash.substring(3);
    return handleCaps(author);
  }
};

const extractAndParseBlogTitle = (string) => {
  const withoutDate = string.replace(STORE.DATE, "");
  const withoutExtension = withoutDate.replace(STORE.EXTENSION, "");
  const withoutAuthor = withoutExtension.replace(STORE.AUTHOR, "");
  const addSpace = withoutAuthor.replace(STORE.DASH, " ");
  return handleCaps(addSpace);
};

const extractAndParseBlogPost = (string) => {
  const withoutHeader = JSON.stringify(string).replace(STORE.HEADER, "");
  const withoutNewLines = withoutHeader.replace(STORE.NEW_LINE, "");
  const withoutSpecailChars = withoutNewLines.replace(STORE.SPECIAL_CHARS, "");
  return withoutSpecailChars.substring(0, 200);
};

const extractAndManipulateImage = (string) => {
  const unparsedPath = string.match(STORE.IMG_PATH);
  const unparsedAlt = string.match(STORE.ALT_IMG);
  if (unparsedPath === null) {
    return;
  } else {
    const parsedPath = unparsedPath[0];
    const parsedAlt = unparsedAlt[0];

    return {
      img_path: parsedPath.slice(1, -1),
      alt_tag: parsedAlt.slice(1, -1),
    };
  }
};

module.exports = {
  extractAndParseDate,
  extractAndParseAuthor,
  extractAndParseBlogTitle,
  extractAndParseBlogPost,
  extractAndManipulateImage,
};
