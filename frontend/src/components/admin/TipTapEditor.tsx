import { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';

interface TipTapEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

const ToolbarButton = ({
  onClick, active, title, children,
}: { onClick: () => void; active?: boolean; title: string; children: React.ReactNode }) => (
  <button
    type="button"
    title={title}
    onClick={onClick}
    className={`px-2 py-1 rounded text-sm font-medium transition select-none ${
      active ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
    }`}
  >
    {children}
  </button>
);

export const TipTapEditor = ({
  content,
  onChange,
  placeholder = 'Write your content here…',
}: TipTapEditorProps) => {
  const editor = useEditor({
    extensions: [
      // StarterKit bundles paragraph, bold, italic, strike, code, codeBlock,
      // blockquote, bulletList, orderedList, hardBreak, heading, hr, etc.
      StarterKit.configure({
        codeBlock: {}, // use built-in code block
      }),
      Placeholder.configure({ placeholder }),
    ],
    content,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  // Sync content into editor when it changes externally
  // (e.g. when "edit" loads existing post content asynchronously)
  useEffect(() => {
    if (!editor) return;
    const current = editor.getHTML();
    // Only update if content genuinely differs to avoid cursor jumps
    if (content !== current) {
      editor.commands.setContent(content || '', { emitUpdate: false });
    }
  }, [content, editor]);

  if (!editor) return null;

  return (
    <div className="rounded-xl border border-slate-300 focus-within:border-slate-900 focus-within:ring-1 focus-within:ring-slate-900 overflow-hidden">
      {/* ── Toolbar ── */}
      <div className="flex flex-wrap gap-0.5 border-b border-slate-200 bg-slate-50 px-3 py-2">
        <ToolbarButton title="Bold" active={editor.isActive('bold')}
          onClick={() => editor.chain().focus().toggleBold().run()}>
          <strong>B</strong>
        </ToolbarButton>
        <ToolbarButton title="Italic" active={editor.isActive('italic')}
          onClick={() => editor.chain().focus().toggleItalic().run()}>
          <em>I</em>
        </ToolbarButton>
        <ToolbarButton title="Strikethrough" active={editor.isActive('strike')}
          onClick={() => editor.chain().focus().toggleStrike().run()}>
          <s>S</s>
        </ToolbarButton>
        <ToolbarButton title="Inline code" active={editor.isActive('code')}
          onClick={() => editor.chain().focus().toggleCode().run()}>
          {'`c`'}
        </ToolbarButton>

        <span className="mx-1 self-center text-slate-300">|</span>

        <ToolbarButton title="Heading 1" active={editor.isActive('heading', { level: 1 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
          H1
        </ToolbarButton>
        <ToolbarButton title="Heading 2" active={editor.isActive('heading', { level: 2 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
          H2
        </ToolbarButton>
        <ToolbarButton title="Heading 3" active={editor.isActive('heading', { level: 3 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
          H3
        </ToolbarButton>

        <span className="mx-1 self-center text-slate-300">|</span>

        <ToolbarButton title="Bullet list" active={editor.isActive('bulletList')}
          onClick={() => editor.chain().focus().toggleBulletList().run()}>
          • List
        </ToolbarButton>
        <ToolbarButton title="Ordered list" active={editor.isActive('orderedList')}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          1. List
        </ToolbarButton>
        <ToolbarButton title="Blockquote" active={editor.isActive('blockquote')}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}>
          ❝
        </ToolbarButton>
        <ToolbarButton title="Code block" active={editor.isActive('codeBlock')}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
          {'</>'}
        </ToolbarButton>

        <span className="mx-1 self-center text-slate-300">|</span>

        <ToolbarButton title="Divider" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
          —
        </ToolbarButton>
        <ToolbarButton title="Undo" onClick={() => editor.chain().focus().undo().run()}>↩</ToolbarButton>
        <ToolbarButton title="Redo" onClick={() => editor.chain().focus().redo().run()}>↪</ToolbarButton>
      </div>

      {/* ── Editor area ── */}
      <style>{`
        .tiptap-editor .ProseMirror {
          outline: none;
          min-height: 16rem;
          padding: 0.75rem 1rem;
          font-size: 0.875rem;
          color: #334155;
          line-height: 1.7;
        }
        .tiptap-editor .ProseMirror h1 { font-size: 1.5rem; font-weight: 700; margin: 1rem 0 0.5rem; }
        .tiptap-editor .ProseMirror h2 { font-size: 1.25rem; font-weight: 600; margin: 0.875rem 0 0.5rem; }
        .tiptap-editor .ProseMirror h3 { font-size: 1.1rem; font-weight: 600; margin: 0.75rem 0 0.5rem; }
        .tiptap-editor .ProseMirror p { margin: 0 0 0.5rem; }
        .tiptap-editor .ProseMirror ul { list-style: disc; padding-left: 1.5rem; margin: 0.5rem 0; }
        .tiptap-editor .ProseMirror ol { list-style: decimal; padding-left: 1.5rem; margin: 0.5rem 0; }
        .tiptap-editor .ProseMirror blockquote { border-left: 3px solid #cbd5e1; padding-left: 1rem; color: #64748b; margin: 0.75rem 0; }
        .tiptap-editor .ProseMirror pre { background: #f1f5f9; border-radius: 0.5rem; padding: 0.75rem 1rem; font-size: 0.8125rem; overflow-x: auto; margin: 0.5rem 0; }
        .tiptap-editor .ProseMirror code { background: #f1f5f9; border-radius: 0.25rem; padding: 0.1em 0.3em; font-size: 0.8em; }
        .tiptap-editor .ProseMirror pre code { background: none; padding: 0; font-size: inherit; }
        .tiptap-editor .ProseMirror hr { border: none; border-top: 2px solid #e2e8f0; margin: 1rem 0; }
        .tiptap-editor .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          color: #94a3b8;
          float: left;
          height: 0;
          pointer-events: none;
        }
      `}</style>
      <div className="tiptap-editor">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};
