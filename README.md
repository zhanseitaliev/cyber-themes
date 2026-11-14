# cyber-themes

Мод-тема для Claude Code в десктопном и мобильном приложениях Claude. Внутри две тёмные темы:

- **Green Rain** (по умолчанию): зелёный фосфор на почти чёрном фоне, а за панелями падают колонки символов («цифровой дождь»).
- **Neon Grid**: строгий почти чёрный фон с синевой и неоновый циан.

Переключение командой `/look matrix`, `/look neon` или просто `/look`. Выбор сохраняется между сессиями.

Тема рассчитана на тёмный режим приложения. В терминале и редакторах темы не рисуются.

## Установка

В терминальной сессии Claude Code:

```
/plugin install cyber-themes --marketplace zhanseitaliev/cyber-themes
```

Из shell:

```bash
claude plugin install cyber-themes --marketplace zhanseitaliev/cyber-themes
```

В десктопном приложении, где `/plugin` не работает: нажмите `+` рядом с полем ввода, затем Plugins, Add marketplace с `zhanseitaliev/cyber-themes`, затем Add plugin.

## Удаление

```bash
claude plugin uninstall cyber-themes@cyber-themes
```
