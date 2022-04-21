import styles from '../styles/BlinkingCursor.module.css'

type BlinkingParams = {
  cursor: string;
  className?: string;
}


const BlinkingCursor = ({ cursor, className}: BlinkingParams) => {
  return (
    <span className={`${className} ${styles.blinkingCursor}`}>
      {cursor}
    </span>
  )
}

export default BlinkingCursor;
