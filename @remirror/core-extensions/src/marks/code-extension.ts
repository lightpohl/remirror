import {
  CommandMarkTypeParams,
  ExtensionManagerMarkTypeParams,
  KeyBindings,
  MarkExtension,
  MarkExtensionSpec,
  MarkGroup,
  convertCommand,
  markInputRule,
  markPasteRule,
} from '@remirror/core';
import { toggleMark } from 'prosemirror-commands';

export class CodeExtension extends MarkExtension {
  get name() {
    return 'code' as const;
  }

  get schema(): MarkExtensionSpec {
    return {
      group: MarkGroup.Code,
      parseDOM: [{ tag: 'code' }],
      toDOM: () => ['code', 0],
    };
  }

  public keys({ type }: ExtensionManagerMarkTypeParams): KeyBindings {
    return {
      'Mod-`': convertCommand(toggleMark(type)),
    };
  }

  public commands({ type }: CommandMarkTypeParams) {
    return { code: () => toggleMark(type) };
  }

  public inputRules({ type }: ExtensionManagerMarkTypeParams) {
    return [markInputRule({ regexp: /(?:`)([^`]+)(?:`)$/, type })];
  }

  public pasteRules({ type }: ExtensionManagerMarkTypeParams) {
    return [markPasteRule({ regexp: /(?:`)([^`]+)(?:`)/g, type })];
  }
}
