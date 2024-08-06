import styles from "./index.module.css"

export const GoHome = () => {
    return (
        <div>

            <h4>きをつけておうちに帰ってね</h4>
            <img
                className={styles["cats-image"]}
                alt="丸ねこタワー"
                src="/cats/catsTower-circle.webp"
                width={120}
                height={180}
            />
        </div>
    )
}