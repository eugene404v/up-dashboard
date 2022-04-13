import React, { ReactElement, ReactFragment } from 'react'
import { Link } from 'react-router-dom'
import styles from "./DropdownMenu.module.css"

type propsType = {
    className?: string;
    data: Array<menuItemType>;
    children: ReactElement | ReactFragment;
    containerClassName?: string;
}

type menuItemType = {
    text: string;
    link?: string;
    onClick?: () => void;
    isExternal?: boolean;
}

function DropdownMenu({ className, data, children, containerClassName }: propsType) {
    const [expanded, setExpanded] = React.useState(false);
    const menuRef = React.useRef<HTMLUListElement>(null)
    const buttonRef = React.useRef<HTMLDivElement>(null)

    const openHandler = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setExpanded(prev => !prev);
    }

    React.useEffect(() => {
        const closeHandler = (e: MouseEvent) => {
            const path = e.composedPath && e.composedPath();
            if (!path.includes(menuRef.current!) && !path.includes(buttonRef.current!)) {
                setExpanded(false);
            }
        }
        document.body.addEventListener('click', closeHandler)
        return () => {
            document.body.removeEventListener('click', closeHandler)
        }
    }, [])

    return (
        <div className={`${styles.container} ${containerClassName || ""}`}>
            <div ref={buttonRef} onClick={openHandler}>{children}</div>
            {expanded && <ul ref={menuRef} className={`${styles.menu} ${className || ""}`}>
                {Array.isArray(data) && data.map(el => {
                    return <li key={el.text}>
                        {el.link && !el.isExternal && <Link className={styles.btn} to={el.link}>{el.text}</Link>}
                        {el.link && el.isExternal && <a className={styles.btn} href={el.link} target="_blank">{el.text}</a>}
                        {!el.link && <button className={styles.btn} onClick={(e) => {
                            e.stopPropagation()
                            e.preventDefault()
                            el.onClick && el.onClick()
                            setExpanded(false)
                        }}>{el.text}</button>}
                    </li>
                })}
            </ul>}
        </div>

    )
}

export default DropdownMenu
