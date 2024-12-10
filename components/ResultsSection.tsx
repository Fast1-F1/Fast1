// components/ResultsSection.tsx
import { FlashList } from '@shopify/flash-list';
import React from 'react';
import { Text } from 'react-native';

import ErrorMessage from './ErrorMessage';

export default function ResultsSection({
  title,
  results,
  errorMessage,
  renderItem,
  keyExtractor,
}: {
  title: string;
  results: any[];
  errorMessage?: string;
  renderItem: (item: any) => JSX.Element;
  keyExtractor: (item: any) => string;
}) {
  if (errorMessage) {
    return <ErrorMessage errorMessage={errorMessage} />;
  }

  return (
    <>
      <Text className="p-2 text-xl font-bold text-white">{title}</Text>
      <FlashList
        data={results}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        estimatedItemSize={200}
      />
    </>
  );
}
