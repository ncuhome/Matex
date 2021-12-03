import React, { ChangeEvent, Fragment } from "react";
import styles from "./index.module.scss";

interface LabelInputProps {
  label: string;
  showLabel?: boolean;
  select?: boolean;
  options?: any[];
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const LabelInput: React.FC<LabelInputProps> = ({
  label = "",
  showLabel = true,
  select = false,
  onChange,
  options = []
}) => {
  const renderEle = () => {
    if (select) {
      return (
        <div>
          <select className={styles.select} placeholder={"请选择类型"} onChange={onChange}>
            {options.map((option) => {
              return (
                <Fragment key={option}>
                  <option value={option}>{option}</option>
                </Fragment>
              );
            })}
          </select>
        </div>
      );
    } else {
      return <input onChange={onChange} type="text" className={styles.input} />;
    }
  };

  return (
    <div className={styles.con}>
      {showLabel && <label className={styles.label}>{label}</label>}
      {renderEle()}
    </div>
  );
};

export default LabelInput;
