# Demo presensi praktikum

Jalankan `npm run web`. Login menggunakan NIM apa saja yang tidak kosong dan kata sandi `12345678`.

## Mencoba alur lengkap

1. Pilih **Asisten**, buka menu di kiri atas, lalu **Kelola sesi**.
2. Pilih sesi **Belum Dibuka** dan tekan **Buka sesi presensi**.
3. Dari sidebar, pilih **Ganti peran demo** lalu **Praktikan**.
4. Buka detail sesi tadi dan tekan **Presensi sekarang**. Kehadiran hanya dapat dicatat sekali per NIM dan sesi.
5. Periksa **Riwayat kehadiran**. Status berubah menjadi **Hadir**, lengkap dengan waktu WIB.
6. Ganti peran ke **Asisten**. Buka **Rekap kehadiran** atau detail sesi untuk melihat NIM dan waktu kehadiran peserta.
7. Tekan **Tutup sesi**, lalu konfirmasi. Sesi selesai tidak menerima presensi baru.

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
```

Tes reducer memeriksa pembatasan peran, pembukaan/penutupan sesi, presensi sesi tertutup, pencegahan duplikasi, identitas peserta, validasi data tersimpan, dan logout.
