import styles from "./index.module.scss";

const Index = ({ label, type, name, value, isRequired, placeholder, onChange, maxlength, pattern, max }) => {
  return (
    <div className={styles.wrapper}>
      {
        label && (
          <label>{label}</label>
        )
      }
      <input 
        name={name} 
        value={value} 
        required={isRequired} 
        placeholder={placeholder}
        type={type}
        onChange={onChange} 
        maxLength={maxlength}
        pattern={pattern}
        max={max} 
      />
    </div>
  );
}

export default Index;
