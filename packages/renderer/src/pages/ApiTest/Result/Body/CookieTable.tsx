import React from 'react';
import styles from './cookieTable.module.scss';
import { useAtomValue } from 'jotai';
import { ResultAtom } from '/@/store/ApiTest/result.store';
import clsx from "clsx";
import EmptyIcon from '/@/assets/images/empty.svg';

const titles = ['name', 'value', 'domain', 'path', 'expires', 'httponly', 'secure'];

const CookieTable = () => {
  const res = useAtomValue(ResultAtom);
  if (!res) {
    return null;
  }

  if (!res.cookie.length){
    return (
        <div className={styles.empty}>
          <img className={styles.emptyIcon} src={EmptyIcon} alt={''}/>
          <div className={styles.desc}>没有收到cookie哦</div>
        </div>
    )
  }

  return (
    <div className={styles.cookieTable}>
      <div className={styles.header}>
        {titles.map((title) => {
          return (
            <div className={styles.title} key={title}>
              {title}
            </div>
          );
        })}
      </div>
      <div className={styles.body}>
        {res.cookie.map((cookie,index) => {
          return (
              <div key={index} className={clsx([styles.itemLine,res.cookie.length>2&&styles.bg])}>
                {
                  titles.map((key)=>{
                    return <div key={key} className={styles.value}>{cookie[key]}</div>
                  })
                }
              </div>
          )
        })}
      </div>
    </div>
  );
};

export default CookieTable;
