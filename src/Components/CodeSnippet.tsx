import  React from 'react';

interface Props{
    text: string
}

const CodeSnippet: React.FC<Props>= ({text}) => {
    return (
        <span style={style}>
            {text}
        </span>
    )
}
const style={
    color: '#E74C3C',
    backgroundColor: '#F9EBEA',
    padding: '0px 8px 2px',
    borderRadius:'5px',
    lineHeight:'30px'
}
export default (CodeSnippet)