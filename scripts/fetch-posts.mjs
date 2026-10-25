// 티스토리 RSS에서 최신 글 5개를 읽어 posts.json 으로 저장합니다.
// 외부 패키지 없이 Node.js(18 이상)만으로 동작합니다.
import { writeFile } from "node:fs/promises";

const RSS_URL = "https://majayoru.tistory.com/rss";
const LIMIT = 5;

const res = await fetch(RSS_URL);
if (!res.ok) throw new Error(`RSS 요청 실패 : ${res.status}`);
const xml = await res.text();

const decode = (s = "") =>
  s
    .replace(/^<!\[CDATA\[([\s\S]*?)\]\]>$/, "$1")
    .replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    .replace(/&mdash;/g, "—").replace(/&amp;/g, "&")
    .trim();

const pick = (block, tag) => {
  const m = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`));
  return m ? decode(m[1]) : "";
};

const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map((m) => m[1]);

const posts = items.slice(0, LIMIT).map((item) => {
  const link = pick(item, "link");
  const pub = pick(item, "pubDate");
  return {
    id: pick(item, "guid") || link,
    title: pick(item, "title"),
    category: pick(item, "category"),
    url: link,
    date: pub ? new Date(pub).toISOString().slice(0, 10) : "",
  };
});

await writeFile("posts.json", JSON.stringify(posts, null, 2) + "\n", "utf-8");
console.log(`게시글 ${posts.length}개 저장 완료`);
