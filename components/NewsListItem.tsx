import { Text, Image, View } from 'react-native';

type News = {
  dataSourceIdentifier: string;
  description: string;
  headline: string;
  images: {
    url: string;
    caption?: string;
  }[];
  link: string;
};

export default function NewsListItem({ item }: { item: News }) {
  return (
    <View className=" border border-gray-200 bg-white p-3">
      <Text className="text-lg font-bold text-black">{item.headline}</Text>
      <Image source={{ uri: item.images[0].url }} className="aspect-video w-full" />
    </View>
  );
}
