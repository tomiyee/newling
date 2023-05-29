import { useState } from 'react';
import { columnNamesSelector } from '../../recoil/flashcards';
import { useRecoilValue } from 'recoil';
import { Button, Menu } from 'react-native-paper';

const PromptMenuButton = ({ flashcardSetId, defaultSide, setDefaultSide }) => {
  const columnNames = useRecoilValue(columnNamesSelector(flashcardSetId)) ?? [];

  const [menuVisible, setMenuVisible] = useState(false);
  const closeMenu = () => setMenuVisible(false);
  const openMenu = () => setMenuVisible(true);

  return (
    <Menu
      visible={menuVisible}
      onDismiss={closeMenu}
      anchor={
        <Button mode="outlined" onPress={openMenu}>
          {`Show First: ${columnNames[defaultSide]}`}
        </Button>
      }
    >
      {columnNames.map((columnName, i) => (
        <Menu.Item
          key={columnName}
          onPress={() => {
            closeMenu();
            setDefaultSide(i);
          }}
          title={columnName}
        />
      ))}
    </Menu>
  );
};

export default PromptMenuButton;
