import React from 'react'
import { useEditor, EditorContent, ReactNodeViewRenderer } from '@tiptap/react'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { CodeBlock } from './CodeBlock'

// load all highlight.js languages
import lowlight from 'lowlight'

// load specific languages only
// import lowlight from 'lowlight/lib/core'
// import javascript from 'highlight.js/lib/languages/javascript'
// lowlight.registerLanguage('javascript', javascript)
import './styles/mainStyles.scss'
import { ContenidoDashboard } from '../dashboard/Dashboard'
import Grid from '@mui/material/Grid'

const MenuBar = ({ editor }: any) => {
    if (!editor) {
        return null
    }

    return (
        <button onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={editor.isActive('codeBlock') ? 'is-active' : ''}>
            Editor de codigo
        </button>
    )
}

export const TipTapEditor = ({ solution }: any) => {
    const editor = useEditor({
        extensions: [
            Document,
            Paragraph,
            Text,
            CodeBlockLowlight
                .extend({
                    addNodeView() {
                        return ReactNodeViewRenderer(CodeBlock)
                    },
                })
                .configure({ lowlight }),
        ],
        content: solution
    })

    return (
        <div>
            <ContenidoDashboard />
            <MenuBar editor={editor} />

            <EditorContent editor={editor} />

        </div>
    )
}