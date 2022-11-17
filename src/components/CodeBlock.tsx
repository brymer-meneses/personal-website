import { PrismAsyncLight as SyntaxHighlighter} from 'react-syntax-highlighter'
import { nord } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { CodeProps } from 'react-markdown/lib/ast-to-react.js'

// I have no idea how the code below works, it was just taken from this guide:
// https://github.com/remarkjs/react-markdown#use-custom-components-syntax-highlight
function CodeBlock({node, inline, className, children, ...props} : CodeProps ) {
  const match = /language-(\w+)/.exec(className || '')

  if (inline || !match)
    return (
      <code className={className} {...props} >
        {children}
      </code>
    )

  return (
    <SyntaxHighlighter
      children={ String(children).replace(/\n$/, '') }
      // @ts-ignore
      style={nord}
      language={match[1]}
      PreTag="div"
      {...props}
    />
  )
}

export default CodeBlock;
