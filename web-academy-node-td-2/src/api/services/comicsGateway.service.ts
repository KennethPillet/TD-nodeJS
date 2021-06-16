import got from 'got';
const API_URL = 'https://comicvine.gamespot.com/api';
const API_KEY = '563fa75c876c102750c9ff8b38423b3b85f2535d';
const fields1 = ['birth', 'deck', 'gender', 'id', 'issues_died_in', 'name', 'powers', 'publisher', 'real_name'];
const fields2 = ['id', 'name', 'count_of_issue_appearances', 'date_added'];

export async function getOneCharacterData(endpoint: string, queryParams: any = {}): Promise<any> {
  try {
    const response = await got(`${API_URL}${endpoint}`, {
      searchParams: {
        ...queryParams,
        api_key: API_KEY,
        format: 'json',
        field_list: fields1.join(','),
      },
    });
    return JSON.parse(response.body);
  } catch (error) {
    return { error: error.message };
  }
}
export async function getCharactersData(endpoint: string, queryParams: any = {}): Promise<any> {
  try {
    const response = await got(`${API_URL}${endpoint}`, { searchParams: { ...queryParams, api_key: API_KEY, format: 'json', field_list: fields2.join(',') } });
    return JSON.parse(response.body);
  } catch (error) {
    return { error: error.message };
  }
}
