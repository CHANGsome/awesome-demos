import * as React from 'react';
import Layout from '../../components/DoubleColumnLayout';
import styles from './index.module.scss';
import { MouseEventHandler, useRef } from 'react';
import DropDown from 'components/Dropdown';

interface Props extends React.HTMLAttributes<HTMLElement> {}
const SortableList: React.FC<Props> = (props) => {
  const list = [];
  const listItemRefs = [];
  for (let i = 0; i < 10; i++) {
    list.push('可以拖动换位置的列表元素' + (i + 1));
    // const ref = useRef<HTMLLIElement>(null);
    listItemRefs.push();
  }

  const handleMouseDown: MouseEventHandler = (e) => {
    console.log(e);
  };

  return (
    <Layout>
      <>
        <DropDown
          dropItems={['item1', 'item2', 'item3', 'item4', 'item5']}
          style={{ marginBottom: '10px' }}
        >
          <div>test</div>
        </DropDown>
        <div className={styles.container}>
          <ul>
            {list.map((item, index) => (
              <li
                className={styles.item}
                key={index}
                onMouseDown={handleMouseDown}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </>
    </Layout>
  );
};
export default SortableList;
