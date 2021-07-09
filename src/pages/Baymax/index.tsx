import Layout from 'components/DoubleColumnLayout';
import styles from './index.module.scss';

const Baymax: React.FC = (props) => {
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.baymax}>
          <div className={styles.head}>
            <div className={styles.eyes}/>
          </div>
          <div className={styles.body}>
            <div className={styles.hand}>
              <div className={styles.midFinger}/>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Baymax;
