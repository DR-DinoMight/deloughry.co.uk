import {getPageViewCount, upsertPageView} from "./atlas";

const setPageView = (pathName: string) => {
  //Create an block list of urls that should not be tracked
  const blockList = [
    '/api',
    '/images',
    '.jpg',
    '.png',
    '.svg',
    '.ico',
    '.css',
    '.js',
    '.json',
    '.woff',
    '.woff2',
    '.ttf',
    '.eot',
    '.otf',
    '.webmanifest'
  ];

  //Check if the url is in the block list
  const isBlocked = blockList.some(url => pathName.includes(url));
  if (!isBlocked) {
    upsertPageView(pathName).catch(err => {
      console.error(err);
    });
  }

};

export {
  setPageView,
};
