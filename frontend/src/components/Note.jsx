import '../index.css'

export default function Note( {note} ){
    const { title, content, createdAt } = note;

    return (
        <div className='note'>
            <h1 className='headings'>{title}</h1>
            <h3 className='headings'>{content}</h3>
            <p>Created on: {createdAt}</p>
            <button>Edit</button>
        </div>
    )
}