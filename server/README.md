# Server

## Folder Structure

```bash
├── api
│   ├── http
│   │   ├── controller
│   │   ├── middleware
│   │   └── route
│   └── websocket
├── bootstrap
│   ├── app.go
│   ├── database.go
│   └── env.go
├── cmd
│   └── main.go
├── domain
├── infrastructure
│   ├── influx
│   └── sql
├── repository
├── service
└── usecase
```

Backend ini dikembangkan dengan mengikuti prinsip Clean Architecture, arsitektur ini terdiri dari beberapa folder yang memiliki peran masing-masing:

1. **api:** Berisi bagian untuk komunikasi antara sistem kita dengan dunia luar. Terbagi menjadi:
   - **http:** Menangani HTTP request/response.
     - **controller:** Menangani logika pengendali permintaan HTTP.
     - **middleware:** Tempat untuk middleware yang digunakan dalam routing HTTP.
     - **route:** Menentukan routing dan endpoint HTTP.
   - **websocket:** Menangani komunikasi real-time melalui protokol WebSocket.

2. **bootstrap:** Berisi kode awal yang membantu memulai aplikasi. Meliputi:
   - **app.go:** Inisialisasi aplikasi dan setup dasar.
   - **database.go:** Konfigurasi dan koneksi ke database.
   - **env.go:** Menangani variabel lingkungan dan konfigurasi aplikasi.

3. **cmd:** Berisi kode yang berkaitan dengan command-line interface (CLI) atau entry point aplikasi.
   - **main.go:** File utama untuk menjalankan aplikasi.

4. **domain:** Berisi aturan bisnis, entitas, dan objek yang mendasari aplikasi. Ini adalah inti dari aplikasi yang independen dari detail teknis.

5. **infrastructure:** Berisi detail teknis dari aplikasi. Terbagi menjadi:
   - **influx:** Kode yang berkaitan dengan penggunaan atau koneksi ke basis data InfluxDB.
   - **sql:** Kode yang berkaitan dengan penggunaan atau koneksi ke basis data SQL.

6. **repository:** Tempat di mana logika akses data disimpan, memungkinkan akses ke data dari penyimpanan apa pun (misalnya: database, penyimpanan berkas, dll).

7. **service:** Berisi logika bisnis yang lebih lanjut dan dapat menggabungkan beberapa akses data jika diperlukan.

8. **usecase:** Berisi implementasi aturan bisnis dan logika aplikasi. Menentukan cara bagaimana aturan bisnis diterapkan.


### Flow Clean Architecture 

![image](https://github.com/MIND-ID-Tel-U/mindid-digital-twin/assets/40682104/d7aa44de-28cf-40d1-8633-5047883e9022)

