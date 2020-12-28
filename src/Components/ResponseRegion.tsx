import React from 'react'
import './../Styles/App.scss';
import './../Styles/theme.scss'

interface Props{
    data: string | null
    theme: string
}

const ResponseRegion:React.FC<Props> = ({ data,theme }) => {
    return (
        <div className={`response-area ${theme}`} style={style}>
            {
                data === null ?
                    (
                        <h3 style={{ textAlign: 'center'}}>
                            😬 No Data
                        </h3>
                    )
                    :
                    (
                        <pre>{data}</pre>
                    )
            }
        </div>
    )
}

const style = {
    width:'100%',
    height: '30vh',
    margin: '15px 0', 
    overflow: 'auto', 
    borderRadius: '5px',
    fontSize:'15px'
}

export default (ResponseRegion)