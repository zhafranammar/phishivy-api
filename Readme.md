# Phishing Detection API

## Deskripsi

API ini digunakan untuk menganalisis URL apakah berpotensi sebagai phishing atau tidak, serta menyediakan informasi statistik dasar.

## Endpoint

### 1. Home

#### **GET** `api/data`

**Deskripsi:**
Menyediakan informasi statistik dasar terkait dataset dan jumlah pemindaian.

**Respon Sukses:**

```json
{
  "success": true,
  "data": {
    "total_dataset": 11290,
    "total_scan": 33970
  }
}
```

---

### 2. Check Phishing

#### **GET** `api/check-phishing`

**Deskripsi:**
Menghasilkan hasil pemeriksaan phishing secara acak untuk keperluan pengujian di frontend.

**Respon Sukses:**

```json
{
  "success": true,
  "data": false
}
```

atau

```json
{
  "success": true,
  "data": true
}
```

---

### 3. Analyze URL

#### **POST** `api/analyze-url`

**Deskripsi:**
Menganalisis URL yang dikirimkan untuk menentukan apakah URL tersebut berpotensi phishing.

**Body Request:**

```json
{
  "url": "https://example.com"
}
```

**Respon Sukses:**

```json
{
  "success": true,
  "data": "Hasil analisis URL"
}
```

## Catatan

- Endpoint `/check-phishing` hanya memberikan hasil acak dan tidak melakukan analisis nyata.
- Pastikan mengirimkan URL yang valid dalam format string saat menggunakan endpoint `/analyze-url`.

## Lisensi

API ini dikembangkan untuk keperluan edukasi dan pengujian.
