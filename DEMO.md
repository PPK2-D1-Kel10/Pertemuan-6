# Demo presensi praktikum

Jalankan `npm run web`. Login menggunakan NIM apa saja yang tidak kosong dan kata sandi `12345678`.

## Mencoba alur lengkap

1. Pilih **Asisten**, buka menu di kiri atas, lalu **Kelola sesi**.
2. Pilih sesi **Belum Dibuka** dan tekan **Buka sesi presensi**.
3. Dari sidebar, pilih **Ganti peran** lalu **Praktikan**.
4. Buka detail sesi tadi dan tekan **Presensi sekarang**. Modal **Konfirmasi presensi** menampilkan praktikum, kelas, dan NIM. **Batal**, area di luar modal, atau tombol kembali Android menutup modal tanpa mencatat kehadiran. Tekan **Ya, catat kehadiran** untuk menyimpan waktu aktual Asia/Jakarta. Kehadiran hanya dapat dicatat sekali per NIM dan sesi; tombol berubah menjadi **Sudah presensi** dan nonaktif.
5. Periksa **Riwayat kehadiran**. Status berubah menjadi **Hadir**, lengkap dengan waktu WIB.
6. Ganti peran ke **Asisten**. Buka **Rekap kehadiran** atau detail sesi untuk melihat NIM dan waktu kehadiran peserta.
7. Tekan **Tutup sesi**, lalu konfirmasi. Sesi selesai tidak menerima presensi baru.

Riwayat Praktikan memakai identitas aktif dari DemoContext. Jika NIM belum pernah presensi, pesan **Belum ada catatan kehadiranmu** ditampilkan. Daftar sesi tetap tersedia untuk melihat status dan menuju detail. Tanggal yang ditampilkan adalah tanggal sesi, sedangkan waktu WIB adalah waktu aktual konfirmasi presensi sesuai kontrak data existing.

## Menjalankan di Android

```sh
npm ci
npx expo start --go
```

Gunakan Expo Go yang kompatibel dengan SDK 57, sambungkan ponsel dan komputer ke jaringan yang sama, lalu pindai QR. Untuk emulator Android yang sudah berjalan, tekan `a` di terminal. Tidak ada dependensi native baru pada perubahan presensi ini.

Jika memakai development build proyek yang sudah terpasang, jalankan `npx expo start --dev-client`. Jika belum memiliki build tersebut, buat melalui `npx eas-cli@latest build --platform android --profile development`, pasang hasil build, lalu jalankan server development. Pembuatan build memerlukan akses akun Expo proyek.

## Checklist demo tugas Fazl

1. Login sebagai NIM baru dan pilih Praktikan. Buka riwayat; pastikan empty state tampil dan catatan NIM lain tidak muncul.
2. Buka sesi Belum Dibuka: tombol presensi nonaktif dan pesan menunggu asisten tampil.
3. Buka sesi Berlangsung: tekan presensi lalu Batal; pastikan tidak ada catatan baru. Ulangi dengan tombol kembali Android.
4. Buka modal lagi dan konfirmasi. Pastikan feedback sukses, waktu WIB, dan tombol nonaktif tampil. Riwayat langsung menampilkan Hadir tanpa refresh.
5. Kembali ke sesi yang sama; presensi kedua tetap tidak tersedia.
6. Ganti peran menjadi Asisten; pastikan rekap memuat NIM dan waktu yang sama. Buka sesi Belum Dibuka dan periksa status berubah.
7. Tutup sesi melalui kontrol Asisten. Login sebagai NIM lain, pilih Praktikan, dan pastikan sesi Selesai menolak presensi baru.
8. Periksa filter jadwal, navigasi sidebar, pembatalan penutupan sesi, serta rekap per sesi tetap bekerja.

Tombol menu membuka sidebar. Tombol tutup, area gelap di luar sidebar, tombol Escape di web, dan tombol kembali Android menutupnya.

## Penyimpanan dan batasan

- Ini aplikasi demo lokal, bukan autentikasi server. Pemilihan peran bukan pemberian hak akses produksi.
- Pada web, sesi login, status sesi, dan presensi disimpan di localStorage browser dengan kunci `presensi-praktikum-demo-v1`. Kata sandi tidak disimpan.
- Keluar menghapus identitas login tetapi mempertahankan sesi dan catatan demo. Login dengan NIM lain dapat dipakai untuk mencoba peserta lain.
- Data tidak disinkronkan antarperangkat/browser atau secara langsung antartab. Pada aplikasi native, data hanya bertahan selama proses aplikasi terbuka.
- Rekap menghitung kehadiran yang tercatat. Tidak ada daftar peserta terdaftar untuk menghitung persentase kehadiran kelas atau jumlah peserta absen.
- Sesi selesai tidak dapat dibuka kembali. Untuk mengulang demo dari awal di web, hapus hanya kunci localStorage demo tersebut melalui browser DevTools lalu refresh.

## Pemeriksaan

```sh
npx tsc --noEmit
npm run lint
npm run test:demo
npx expo export --platform web
npx expo export --platform android
```

Tes logika memeriksa fungsi validasi bersama, identitas kosong/spasi, peran, sesi hilang/belum dibuka/selesai, duplikasi per NIM dan sesi, waktu Jakarta termasuk pergantian hari, pembukaan/penutupan sesi, isolasi identitas, konsistensi saat ganti peran, validasi data tersimpan, dan logout. Modal dan navigasi perlu pemeriksaan UI sesuai checklist di atas; tes reducer tidak menjalankan komponen React Native.
