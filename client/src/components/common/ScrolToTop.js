import React, { useState } from 'react'
import NavigationOutlinedIcon from '@mui/icons-material/NavigationOutlined';

export default function ScrolToTop() {
    const [scrollBar, setScrollBar] = useState(false)

    const navbarScrolling = () => {
        if (window.scrollY >= 90) {
            setScrollBar(true)
        } else {
            setScrollBar(false)
        }
    }
    window.addEventListener('scroll', navbarScrolling)
    return (
        <div style={{ position: "fixed", bottom: 15, right: 15, zIndex: 100 }}>
            {scrollBar === true && <button className='btn btn-light border-success shadow' onClick={() => window.scrollTo(0, 0)}>
                <NavigationOutlinedIcon className='' />
            </button>}

        </div>
    )
}
