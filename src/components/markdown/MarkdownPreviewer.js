import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './Markdown.css'

const marked = require("marked");

const MarkdownPreviewer = () => {
    const [markdown, setMarkdown] = useState(
        `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)
`
    )

    const updateMarkdown = (markdown) => {
        setMarkdown(markdown)
    }
    return (
        <div className="preview__container">
            <Link to="/" style={{textDecoration: 'underline', color: 'black', alignSelf: 'flex-start', position: 'fixed', left:'30px', top: '30px', padding: '20px'}}>
                Back to Projects
            </Link>
            <div className="input__container">
                <label for="editor">Markdown Input</label>
                <textarea 
                    id="editor" 
                    name="editor" 
                    rows="10" cols="50"
                    value={markdown}    
                    placeholder="Enter Markdown"
                    onChange = {(event) => updateMarkdown(event.target.value)}
                >
                </textarea>
            </div>
            <div className="output__container">
                <label>Markdown Output</label>
                <div id="preview" className="preview__output" dangerouslySetInnerHTML = {{__html: marked(markdown)}}></div>
            </div>
        </div>
    )
}

export default MarkdownPreviewer
