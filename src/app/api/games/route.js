export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const category = searchParams.get('category');
    const platform = searchParams.get('platform');
    const sortBy = searchParams.get('sort-by');

    let apiUrl = 'https://www.freetogame.com/api/';
    
    if (id) {
      apiUrl += `game?id=${id}`;
    } else {
      apiUrl += 'games?';
      const params = [];
      if (category) params.push(`category=${category}`);
      if (platform) params.push(`platform=${platform}`);
      if (sortBy) params.push(`sort-by=${sortBy}`);
      apiUrl += params.join('&');
    }

    const res = await fetch(apiUrl);
    if (!res.ok) throw new Error(`Failed to fetch data from ${apiUrl}`);
    
    const data = await res.json();
    return Response.json(data);
  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}