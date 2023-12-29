"use client"

import Heading from "@tiptap/extension-heading"
import { EditorContent, useEditor, type Editor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import {
  Bold,
  Heading2,
  Italic,
  List,
  ListOrdered,
  Strikethrough,
} from "lucide-react"

import { Toggle } from "@/components/ui/toggle"

;/ * * * * * * * * * * * * EDITOR * * * * * * * * * * * * /

export function Tiptap({
  description,
  onChange,
}: {
  description?: string
  onChange?: (richText: string) => void
}) {
  // ...
  const editor = useEditor({
    extensions: [
      StarterKit.configure(),
      Heading.configure({
        HTMLAttributes: { class: "text-2xl font-bold", levels: [2] },
      }),
    ],
    content: description,
    editorProps: {
      attributes: {
        class: "rounded-md border min-h-[200px] border-input p-2 text-xs",
      },
    },
    onUpdate({ editor }) {
      console.log(editor.getHTML()) // You can make it HTML, JSON, or Plain text!
      // onChange(editor.getHTML());
    },
  })

  return (
    <div className="flex min-h-[250px] flex-col justify-stretch gap-2">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}

;/ * * * * * * * * * * * * TOOLBAR * * * * * * * * * * * * /

function Toolbar({ editor }: { editor: Editor | null }) {
  if (!editor) return null
  return (
    <div className="rounded-md border border-input bg-transparent">
      <Toggle
        size="sm"
        pressed={editor.isActive("heading")}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
      >
        <Heading2 size={20} className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editor.isActive("bold")}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold size={20} className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editor.isActive("italic")}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic size={20} className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editor.isActive("strike")}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough size={20} className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editor.isActive("bulletList")}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List size={20} className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editor.isActive("orderedList")}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered size={20} className="h-4 w-4" />
      </Toggle>
    </div>
  )
}
