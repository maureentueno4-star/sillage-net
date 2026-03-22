exports.handler = async function(event) {
  const query = event.queryStringParameters?.q || '';
  const key   = process.env.SERPAPI_KEY;

  if (!query) return { statusCode: 400, body: JSON.stringify({ error: 'Paramètre q manquant' }) };
  if (!key)   return { statusCode: 500, body: JSON.stringify({ error: 'Clé SerpApi non configurée sur le serveur' }) };

  const params = new URLSearchParams({
    engine:  'google_shopping',
    q:       query + ' parfum',
    gl:      'fr',
    hl:      'fr',
    num:     '40',
    api_key: key,
  });

  const resp = await fetch(`https://serpapi.com/search.json?${params}`);
  const data = await resp.json();

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(data),
  };
};
