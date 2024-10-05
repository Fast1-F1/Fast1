import { useEffect, useState } from 'react';
import { View, ActivityIndicator, FlatList } from 'react-native';

import NewsListItem from '~/components/NewsListItem';

const apiKey = process.env.EXPO_PUBLIC_RAPID_API_KEY;

export default function NewsScreen() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchF1News = async () => {
    try {
      const response = await fetch('https://f1-motorsport-data.p.rapidapi.com/news', {
        method: 'GET',
        headers: {
          'x-rapidapi-key': `${apiKey}`,
          'x-rapidapi-host': 'f1-motorsport-data.p.rapidapi.com',
        },
      });
      const data = await response.json();
      console.log(data);
      setNews(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setLoading(true);
    fetchF1News();
    setLoading(false);
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View>
      <FlatList
        contentContainerClassName="gap-3"
        keyExtractor={(item) => item.dataSourceIdentifier}
        data={news}
        renderItem={({ item }) => <NewsListItem item={item} />}
      />
    </View>
  );
}
