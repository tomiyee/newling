import React, { FC } from 'react';
import { DataTable } from 'react-native-paper';
import { Flashcard } from '../../recoil/flashcards';

const FlashcardsTable: FC<{
  flashcards: Flashcard[];
  columnNames: string[];
}> = ({ flashcards, columnNames }) => {
  return (
    <DataTable style={{ flexGrow: 1 }}>
      <DataTable.Header>
        {columnNames.map((columnName) => (
          <DataTable.Title key={columnName}>{columnName}</DataTable.Title>
        ))}
      </DataTable.Header>
      {flashcards.map((flashcard, i) => (
        <DataTable.Row key={`card-${i}`}>
          {flashcard.map((sideContent) => (
            <DataTable.Cell key={sideContent}>{sideContent}</DataTable.Cell>
          ))}
        </DataTable.Row>
      ))}
    </DataTable>
  );
};

export default FlashcardsTable;
