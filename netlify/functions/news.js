// Use dynamic import for node-fetch v3+ compatibility
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

exports.handler = async function(event, context) {
  const { category, country, page, pageSize } = event.queryStringParameters;
  const apiKey = 'bdd92eb7c47142189414664dfec48839'; // <-- user's NewsAPI key
  const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&page=${page}&apiKey=${apiKey}&pageSize=${pageSize}`;
  const response = await fetch(url);
  const data = await response.json();
  return {
    statusCode: 200,
    body: JSON.stringify(data),
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  };
}; 