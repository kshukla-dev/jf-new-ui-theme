const { createClient } = require('@sanity/client');
const client = createClient({
  projectId: 'jyq5j2qu',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-05-03'
});

async function run() {
  const posts = await client.fetch('*[_type == "post"]{title, pageType, slug, _id, publishedAt}');
  console.log(JSON.stringify(posts, null, 2));
}

run().catch(console.error);
