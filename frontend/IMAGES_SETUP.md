# Настройка изображений

## Копирование изображений

Изображения из старой версии находятся в `../assets/images/`. 

Для работы Next.js нужно скопировать их в `public/images/`:

```bash
# Windows PowerShell
Copy-Item -Path "..\assets\images\*" -Destination "public\images\" -Recurse

# Linux/Mac
cp -r ../assets/images/* public/images/
```

## Использование изображений

В компонентах используйте путь `/images/filename.png`:

```tsx
<Image
  src="/images/hero_clothing_label_1768222853423.png"
  alt="Description"
  width={500}
  height={300}
/>
```

## Оптимизация

Next.js автоматически оптимизирует изображения через компонент `Image`. Убедитесь, что используете `next/image` вместо обычного `<img>`.
