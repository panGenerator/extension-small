import { Mark, mergeAttributes } from '@tiptap/core'

export interface SmallExtensionOptions {
  HTMLAttributes: Object,
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    small: {
      /**
       * Set a small mark
       */
      setSmall: () => ReturnType,
      /**
       * Toggle a small mark
       */
      toggleSmall: () => ReturnType,
      /**
       * Unset a small mark
       */
      unsetSmall: () => ReturnType,
    }
  }
}

export const Small = Mark.create<SmallExtensionOptions>({
  name: 'small',

  addOptions() {
    return {
      HTMLAttributes: {},
    }
  },

  parseHTML() {
    return [
      {
        tag: 'small',
      }
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['small', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
  },

  addCommands() {
    return {
      setSmall: () => ({ commands }) => {
        return commands.setMark(this.name)
      },
      toggleSmall: () => ({ commands }) => {
        return commands.toggleMark(this.name)
      },
      unsetSmall: () => ({ commands }) => {
        return commands.unsetMark(this.name)
      },
    }
  },

  addKeyboardShortcuts() {
    return {
      'Mod-,': () => this.editor.commands.toggleSmall(),
    }
  },
})