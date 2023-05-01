import styles from "./index.module.scss";

const Index = ({ label, name, value, isRequired, options, onChange }) => {
  return (
    <div className={styles.wrapper}>
      {label && <label>{label}</label>}
      <select 
        name={name} 
        value={value} 
        required={isRequired} 
        onChange={onChange}
        >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Index;
