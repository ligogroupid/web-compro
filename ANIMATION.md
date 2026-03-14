# Animation & Transition Implementation Guide

Panduan ini menjelaskan pola animasi scroll-triggered yang digunakan di `compro/` — berbasis `useInView` hook + Tailwind CSS transition classes.

---

## Hook: `useInView`

Lokasi: `@/hooks/useInView.ts`

```ts
import { useInView } from "@/hooks/useInView";
```

### API

```ts
const { ref, isInView } = useInView<HTMLDivElement>({
  once?: boolean;      // default: true  — animasi hanya sekali, tidak ulang saat scroll keluar
  threshold?: number;  // default: 0.1   — % elemen yang harus terlihat untuk trigger (0–1)
  rootMargin?: string; // default: "0px" — margin dari viewport sebelum trigger
});
```

- `ref` — attach ke elemen HTML target
- `isInView` — `true` setelah elemen masuk viewport, stays `true` jika `once: true`
- Generic `<T extends HTMLElement>` — bisa di-type sesuai elemen: `HTMLDivElement`, `HTMLHeadingElement`, `HTMLAnchorElement`, dll.

### Contoh minimal

```tsx
"use client";
import { useInView } from "@/hooks/useInView";

export default function MyComponent() {
  const { ref, isInView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      Konten
    </div>
  );
}
```

---

## Pola Animasi Standar

### Konstanta reusable (gunakan per file)

```ts
const BASE   = "transition-all duration-700 ease-out";
const HIDDEN = "opacity-0 translate-y-10";
const VISIBLE = "opacity-100 translate-y-0";
```

Terapkan ke elemen:

```tsx
<div className={`${BASE} ${isInView ? VISIBLE : HIDDEN}`}>
```

### Variasi intensitas

| Intensitas | Hidden class | Keterangan |
|------------|-------------|------------|
| Halus | `opacity-0 translate-y-6` | Untuk elemen kecil / heading |
| Normal | `opacity-0 translate-y-10` | Default, paling sering dipakai |
| Kuat | `opacity-0 translate-y-20` | Untuk card besar / list item |

### Variasi durasi

| Durasi | Class | Keterangan |
|--------|-------|------------|
| Cepat | `duration-300` | Hover states, popup |
| Normal | `duration-500` | Elemen sedang |
| Lambat | `duration-700` | Default untuk scroll reveal |

---

## Pattern 1: Single Element

Satu elemen, satu `useInView`. Paling sederhana.

```tsx
"use client";
import { useInView } from "@/hooks/useInView";

export default function SectionHeading({ text }: { text: string }) {
  const { ref, isInView } = useInView<HTMLHeadingElement>({ threshold: 0.1 });

  return (
    <h2
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      {text}
    </h2>
  );
}
```

**Contoh di codebase:** `company-item-list.tsx` — satu `useInView` pada `<Link>` wrapper.

---

## Pattern 2: Multiple Elements, Sequential (Mandiri + Delay)

Masing-masing elemen punya `useInView` sendiri, tapi punya `transitionDelay` berbeda agar muncul bergantian.

**Kapan dipakai:** Sekelompok elemen yang secara visual berhubungan (logo, nama, deskripsi) dan ingin muncul satu per satu — baik di desktop (bisa terlihat bersamaan) maupun mobile (muncul saat di-scroll ke sana).

**Aturan penting untuk `transitionDelay`:**
```tsx
// BENAR — reset ke "0ms" saat hidden, agar tidak ada lag saat elemen re-enter viewport
style={{ transitionDelay: isInView ? "300ms" : "0ms" }}

// SALAH — delay tetap aktif saat hidden, menyebabkan lag
style={{ transitionDelay: "300ms" }}
```

### Contoh implementasi (`CompanyInfo.tsx`)

```tsx
"use client";
import { useInView } from "@/hooks/useInView";

const BASE    = "transition-all duration-700 ease-out";
const HIDDEN  = "opacity-0 translate-y-10";
const VISIBLE = "opacity-100 translate-y-0";

export default function CompanyInfo({ logo, name, description }) {
  const { ref: logoRef, isInView: logoInView } = useInView<HTMLDivElement>({ threshold: 0.1 });
  const { ref: nameRef, isInView: nameInView } = useInView<HTMLHeadingElement>({ threshold: 0.1 });
  const { ref: descRef, isInView: descInView } = useInView<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section>
      {/* Elemen 1 — muncul langsung (delay 0) */}
      <div
        ref={logoRef}
        className={`${BASE} ${logoInView ? VISIBLE : HIDDEN}`}
      >
        <img src={logo} alt="logo" />
      </div>

      {/* Elemen 2 — muncul 300ms setelah masuk viewport */}
      <h2
        ref={nameRef}
        className={`${BASE} ${nameInView ? VISIBLE : HIDDEN}`}
        style={{ transitionDelay: nameInView ? "300ms" : "0ms" }}
      >
        {name}
      </h2>

      {/* Elemen 3 — muncul 600ms setelah masuk viewport */}
      <div
        ref={descRef}
        className={`${BASE} ${descInView ? VISIBLE : HIDDEN}`}
        style={{ transitionDelay: descInView ? "600ms" : "0ms" }}
      >
        {description}
      </div>
    </section>
  );
}
```

**Panduan delay standar:**

| Urutan | Delay |
|--------|-------|
| Elemen ke-1 | `0ms` (tidak perlu `transitionDelay`) |
| Elemen ke-2 | `300ms` |
| Elemen ke-3 | `600ms` |
| Elemen ke-4 | `900ms` |

---

## Pattern 3: List Items, Staggered (Satu Observer)

Untuk daftar item yang banyak. Satu `useInView` di parent wrapper, delay dihitung per index.

**Kapan dipakai:** Grid/list card yang quantity-nya dinamis.

```tsx
"use client";
import { useInView } from "@/hooks/useInView";

const ITEMS = ["Item A", "Item B", "Item C", "Item D"];

export default function StaggeredList() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <div ref={ref} className="grid grid-cols-2 gap-4">
      {ITEMS.map((item, index) => (
        <div
          key={index}
          className={`transition-all duration-700 ease-out ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: isInView ? `${index * 150}ms` : "0ms" }}
        >
          {item}
        </div>
      ))}
    </div>
  );
}
```

**Panduan delay per index:**

| Jumlah item | Delay antar item |
|-------------|-----------------|
| ≤ 4 items | `300ms` per item |
| 5–8 items | `150ms` per item |
| > 8 items | `80ms` per item |

**Contoh di codebase:** `ligo-letter-values.tsx` — 4 item dengan `(index + 1) * 300ms`.

---

## Pattern 4: CSS Keyframe + `--card-delay` (via `globals.css`)

Untuk animasi yang lebih kompleks (clip-path, scale, dll.) yang tidak bisa dilakukan hanya dengan Tailwind utility classes.

**Kapan dipakai:** Card grid dengan efek reveal yang lebih stylish.

### Langkah 1 — Tambahkan keyframe di `globals.css`

```css
@keyframes my-reveal {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.my-reveal {
  animation: my-reveal 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: var(--card-delay, 0ms);
}
```

### Langkah 2 — Gunakan di komponen dengan `useInView`

```tsx
"use client";
import { useInView } from "@/hooks/useInView";

export default function CardGrid({ items }) {
  const { ref, isInView } = useInView({ threshold: 0.15 });

  return (
    <div ref={ref} className="grid grid-cols-3 gap-6">
      {items.map((item, index) => (
        <div
          key={index}
          className={isInView ? "my-reveal" : "opacity-0"}
          style={{ "--card-delay": `${index * 80}ms` } as React.CSSProperties}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
}
```

**Contoh di codebase:** `MoreCompanies.tsx` menggunakan `.more-companies-card-reveal` dengan `--card-delay`.

---

## Checklist Implementasi

Sebelum menambahkan animasi ke komponen baru:

- [ ] File adalah **Client Component** (`"use client"` di baris pertama)
- [ ] Import `useInView` dari `@/hooks/useInView`
- [ ] Setiap `useInView` di-type dengan elemen HTML yang tepat (`HTMLDivElement`, `HTMLHeadingElement`, dll.)
- [ ] `ref` di-attach ke elemen HTML langsung (bukan React component)
- [ ] `transitionDelay` conditional: `isInView ? "Xms" : "0ms"` — jangan hardcode tanpa kondisi
- [ ] Elemen pertama dalam grup tidak perlu `transitionDelay` (atau `0ms`)
- [ ] Komponen yang menerima data dari server tetap `async` di page — animasi hanya di sub-komponen client

---

## Referensi Komponen yang Sudah Menggunakan `useInView`

| Komponen | Pattern | Keterangan |
|----------|---------|------------|
| `CompanyInfo.tsx` | Multiple mandiri + delay | Logo → Name → Desc → Cert sekuensial |
| `company-item-list.tsx` | Single element | Seluruh list item sebagai satu unit |
| `ligo-letter-values.tsx` | Staggered list, satu observer | 4 huruf LIGO dengan delay per index |
| `MoreCompanies.tsx` | CSS keyframe + `--card-delay` | Grid company card dengan reveal kompleks |
| `ProductItem.tsx` | Single element | Per product card mandiri |
| `count-up-number.tsx` | Trigger logic (bukan visual) | `isInView` memulai counter, bukan animasi CSS |
| `recycle-process.tsx` | Scale pop + stagger (mobile) | Badge hexagon dengan `transform: scale` |
