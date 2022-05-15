import { OgQueryParams } from "../../../types/OgQueryParams";

const chromium = require("chrome-aws-lambda");
const { builder } = require("@netlify/functions");
const fs = require("fs").promises;


const generateQueryString = (query: { [key: string]: string | string[] | number | undefined | null }) => encodeURI(Object.keys(query)
    .reduce((acc, cur, index) => query[cur] ? `${acc}${index === 0 ? '' : '&'}${cur}=${query[cur]}` : acc, '?'));

const generateOGImage = async ({ title, publishedOn, image, likes, comments, shares, category, categoryColor }) => {
  const browser = await chromium.puppeteer.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath,
    headless: true,
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630 });
  await page.goto((`https://deloughry.co.uk/og${generateQueryString({ title, publishedOn, image, likes, comments, shares, category, categoryColor })}`), { waitUntil: 'networkidle2' });
  const buffer = await page.screenshot({ type: 'jpeg' });
  await browser.close();

  return buffer.toString('base64');
};

exports.handler = async function ({ queryStringParameters }: { queryStringParameters }) {
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "image/jpg",
    },
    body: await generateOGImage( queryStringParameters),
    isBase64Encoded: true,
  };
};
