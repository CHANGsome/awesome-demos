import React from 'react';
import { useState } from 'react';
import DropArea from './DropArea';
import styles from './index.module.scss';
interface PropsType extends React.HTMLAttributes<HTMLDivElement> {
  dropItems: string[];
}
const DropDown: React.FC<PropsType> = (props) => {
  const [dropVisible, setDropVisible] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<string>('');
  const { dropItems, style } = props;
  return (
    <div
      className={styles.container}
      style={style}
      onMouseEnter={() => {
        setDropVisible(true);
      }}
      onMouseLeave={() => {
        setDropVisible(false);
      }}
    >
      <div className={styles.title}>
        {selectedItem ? selectedItem : props.children}
      </div>
      <DropArea visible={dropVisible}>
        {dropItems.map((item, index) => (
          <div
            key={index}
            className={styles.areaItem}
            onClick={() => {
              setSelectedItem(item);
            }}
          >
            {item}
          </div>
        ))}
      </DropArea>
    </div>
  );
};
export default DropDown;
