import styles from "./index.module.scss"
import {FastForwardOutlined} from "@ant-design/icons" 
export default function Test1() {
    return (
        <div className={styles.box}>
            <span>这是test1</span>
            <FastForwardOutlined />
        </div>
    )
}

