-- =============================================================================
-- SAHARA - Seed data (opsional)
-- Jalankan file ini SEKALI SAJA di SQL Editor Supabase, SETELAH schema.sql,
-- untuk mengisi produk/berita/panduan/FAQ/teks halaman dengan konten yang
-- sebelumnya hardcode di kode. Kalau tabel sudah ada isinya, jangan jalankan
-- ulang file ini (akan menghasilkan data produk/berita/panduan/FAQ duplikat -
-- site_settings aman dijalankan ulang karena pakai ON CONFLICT DO NOTHING).
-- =============================================================================

-- Seed data: produk (dari data/products.ts)
insert into public.products (name, description, price, image_url, category, featured, ingredients, benefits, composition) values
  ('Sabuya (Sabun Lidah Buaya)', 'Sabun alami handmade dengan ekstrak lidah buaya untuk mengatasi berbagai gangguan kulit seperti iritasi, gatal, dan kulit kering.', 15000, 'https://images.unsplash.com/photo-1730378616989-499041edc37a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbG9lJTIwdmVyYSUyMHNvYXAlMjBuYXR1cmFsfGVufDF8fHx8MTc3MjExMzc2MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', 'Perawatan Kulit', true, '{"Ekstrak Lidah Buaya","Minyak Kelapa","Minyak Zaitun","Glycerin Alami"}', '{"Mengatasi iritasi kulit","Meredakan gatal-gatal","Melembapkan kulit kering","Cocok untuk kulit sensitif"}', 'Sabun 100g dibuat secara handmade dari pengrajin Desa Wates. Mengandung ekstrak lidah buaya segar yang dipetik langsung dari kebun lokal, diformulasikan khusus untuk mengatasi gangguan kulit.'),
  ('Sabulawa (Sabun Temulawak)', 'Sabun herbal dengan ekstrak temulawak alami untuk mencerahkan dan mengatasi masalah kulit kusam serta flek hitam.', 15000, 'https://images.unsplash.com/photo-1604565750665-3501b2c00194?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0dXJtZXJpYyUyMHNvYXAlMjBoYW5kbWFkZXxlbnwxfHx8fDE3NzIxMTM3NjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', 'Perawatan Kulit', true, '{"Ekstrak Temulawak","Minyak Kelapa","Shea Butter","Vitamin E"}', '{"Mencerahkan kulit kusam","Mengatasi flek hitam","Menghaluskan tekstur kulit","Antioksidan alami"}', 'Sabun 100g dengan temulawak pilihan yang ditanam di area Desa Wates. Proses pembuatan tradisional mempertahankan khasiat temulawak untuk kesehatan kulit.'),
  ('Ja Candy (Permen Jahe)', 'Permen jahe alami untuk membantu meredakan batuk dan gangguan infeksi saluran pernapasan atas (ISPA).', 12000, 'https://images.unsplash.com/photo-1596769969474-24c6a9f6101b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnaW5nZXIlMjBjYW5keSUyMHRyYWRpdGlvbmFsfGVufDF8fHx8MTc3MjExMzc2MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', 'Makanan', true, '{"Jahe Merah","Gula Aren","Madu Murni","Air Perasan Jeruk Nipis"}', '{"Meredakan batuk dan tenggorokan","Menghangatkan badan","Membantu mengatasi ISPA","Meningkatkan daya tahan tubuh"}', 'Kemasan 150g berisi permen jahe yang dibuat dari jahe merah pilihan. Diracik secara tradisional oleh pengrajin Desa Wates tanpa bahan pengawet.'),
  ('Teh Seruas (Teh Celup Lengkuas & Sereh)', 'Teh celup herbal kombinasi lengkuas dan sereh yang berkhasiat untuk meredakan gejala ISPA dan meningkatkan imunitas tubuh.', 18000, 'https://images.unsplash.com/photo-1615205597144-5c7c885291d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZXJiYWwlMjB0ZWElMjBiYWclMjBnYWxhbmdhbHxlbnwxfHx8fDE3NzIxMTM3NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', 'Minuman', true, '{"Lengkuas","Sereh","Daun Pandan","Jahe"}', '{"Meredakan gangguan pernapasan","Menghangatkan tubuh","Meningkatkan sistem imun","Aroma menenangkan"}', '10 kantong teh celup @ 2g. Lengkuas dan sereh dipanen dari kebun organik di Desa Wates, dikeringkan alami dan dikemas higienis untuk menjaga khasiat herbal.'),
  ('Kunira (Sirup Kunyit)', 'Sirup kunyit alami untuk membantu mengatasi diare dan gangguan pencernaan dengan rasa yang nikmat.', 25000, 'https://images.unsplash.com/photo-1708146646005-30597857a7c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0dXJtZXJpYyUyMHN5cnVwJTIwZHJpbmt8ZW58MXx8fHwxNzcyMTEzNzYyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', 'Minuman', true, '{"Kunyit Segar","Gula Aren","Madu","Jeruk Nipis","Air Mineral"}', '{"Mengatasi diare","Meredakan gangguan pencernaan","Anti-inflamasi alami","Meningkatkan kesehatan lambung"}', 'Botol 300ml sirup kunyit yang dibuat dari kunyit segar pilihan. Diproduksi secara higienis oleh pengrajin Desa Wates dengan resep tradisional yang sudah teruji turun temurun.'),
  ('Kencara (Sirup Kencur)', 'Sirup kencur tradisional yang efektif untuk mengatasi diare, meningkatkan nafsu makan, dan melancarkan pencernaan.', 25000, 'https://images.unsplash.com/photo-1722931303388-527993417e23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZXJiYWwlMjBzeXJ1cCUyMGJvdHRsZSUyMHRyYWRpdGlvbmFsfGVufDF8fHx8MTc3MjExMzc2M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', 'Minuman', false, '{"Kencur Segar","Gula Aren","Madu Murni","Asam Jawa","Air Mineral"}', '{"Mengatasi diare","Meningkatkan nafsu makan","Melancarkan pencernaan","Menambah stamina tubuh"}', 'Botol 300ml sirup kencur premium. Kencur dipilih dari tanaman terbaik di Desa Wates, diolah secara tradisional untuk mempertahankan khasiat maksimal dalam mengatasi gangguan pencernaan.');

-- Seed data: berita (dari data/news.ts)
-- Catatan: kolom published_date bertipe `date`, jadi tanggal asli
-- (mis. "20 Februari 2026") dikonversi ke format ISO "2026-02-20".
insert into public.news (title, published_date, excerpt, content, image_url, category, author) values
  ('Peluncuran Produk Baru: Sabun Lidah Buaya Sabuya', '2026-02-20', 'Kami dengan bangga memperkenalkan produk terbaru kami, Sabuya - sabun lidah buaya yang diformulasikan khusus untuk mengatasi gangguan kulit dengan bahan alami.', '
      <p>SAHARA dengan bangga mempersembahkan inovasi terbaru dalam rangkaian produk perawatan kulit alami kami: <strong>Sabuya</strong> - sabun lidah buaya yang diformulasikan khusus untuk mengatasi berbagai gangguan kulit.</p>

      <h3>Keunggulan Sabuya</h3>
      <p>Sabuya dibuat dengan 100% bahan alami pilihan yang dipanen langsung dari kebun organik di sekitar Desa Wates, Undaan, Kudus. Lidah buaya yang kami gunakan ditanam tanpa pestisida dan dipanen pada saat kandungan gel-nya paling optimal.</p>

      <p>Produk ini diformulasikan khusus untuk:</p>
      <ul>
        <li>Menenangkan kulit yang iritasi dan kemerahan</li>
        <li>Melembabkan kulit kering secara alami</li>
        <li>Membantu proses regenerasi sel kulit</li>
        <li>Mengatasi jerawat dan bekas luka ringan</li>
        <li>Cocok untuk semua jenis kulit, termasuk kulit sensitif</li>
      </ul>

      <h3>Proses Pembuatan Tradisional</h3>
      <p>Setiap batang sabun Sabuya dibuat dengan metode cold process oleh pengrajin terampil kami. Proses ini memakan waktu 4-6 minggu untuk memastikan kualitas terbaik dan mempertahankan nutrisi alami dari lidah buaya.</p>

      <p>Ibu Siti, salah satu pengrajin sabun kami, berkata: "Kami membuat sabun ini seperti merawat anak sendiri. Setiap tahap dikerjakan dengan penuh kesabaran dan perhatian agar hasilnya sempurna untuk pelanggan."</p>

      <h3>Harga dan Ketersediaan</h3>
      <p>Sabuya kini tersedia dengan harga Rp 35.000 per batang (100 gram). Dapatkan produk ini melalui halaman produk kami atau hubungi layanan informasi untuk pemesanan dalam jumlah besar.</p>

      <p>Sebagai promosi peluncuran, pelanggan yang membeli 3 batang atau lebih akan mendapatkan diskon 10% dan free pouch cantik untuk penyimpanan sabun.</p>
    ', 'https://images.unsplash.com/photo-1612817288484-6f916006741a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRvbmVzaWFuJTIwc29hcCUyMGhhbmRtYWRlfGVufDF8fHx8MTc0MDU3NzQ1MHww&ixlib=rb-4.1.0&q=80&w=1080', 'Produk Baru', 'Tim SAHARA'),
  ('Kerjasama dengan 500+ Pengrajin Lokal', '2026-02-15', 'SAHARA kini bermitra dengan lebih dari 500 pengrajin dan petani lokal di Desa Wates, Undaan, Kudus untuk mendukung ekonomi lokal.', '
      <p>Dalam pencapaian yang membanggakan, SAHARA kini telah bermitra dengan lebih dari 500 pengrajin dan petani lokal di Desa Wates, Kecamatan Undaan, Kabupaten Kudus, Jawa Tengah. Pencapaian ini menandai komitmen kami dalam memberdayakan ekonomi lokal dan melestarikan kearifan tradisional Indonesia.</p>

      <h3>Dampak untuk Komunitas</h3>
      <p>Kerjasama ini tidak hanya menciptakan lapangan kerja bagi masyarakat lokal, tetapi juga membantu melestarikan keahlian tradisional yang telah diwariskan turun-temurun. Pak Karno, petani jahe berusia 58 tahun, berbagi ceritanya:</p>

      <blockquote>"Sejak bermitra dengan SAHARA, kehidupan keluarga saya berubah. Anak saya yang tadinya merantau ke kota kini bisa pulang dan bekerja di kebun bersama saya. Harga jual jahe kami juga lebih stabil."</blockquote>

      <h3>Program Pemberdayaan</h3>
      <p>SAHARA tidak hanya membeli bahan baku dari petani lokal, tetapi juga memberikan:</p>
      <ul>
        <li>Pelatihan teknik pertanian organik berkelanjutan</li>
        <li>Bantuan modal untuk pengembangan kebun</li>
        <li>Jaminan harga beli yang adil dan stabil</li>
        <li>Workshop rutin tentang quality control</li>
        <li>Asuransi kesehatan untuk mitra utama</li>
      </ul>

      <h3>Jenis Bahan yang Dipasok</h3>
      <p>Para mitra kami menyuplai berbagai bahan herbal berkualitas tinggi:</p>
      <ul>
        <li><strong>Lidah Buaya</strong> - 150 petani</li>
        <li><strong>Temulawak</strong> - 120 petani</li>
        <li><strong>Jahe</strong> - 100 petani</li>
        <li><strong>Lengkuas & Sereh</strong> - 80 petani</li>
        <li><strong>Kunyit & Kencur</strong> - 50 petani</li>
      </ul>

      <h3>Rencana ke Depan</h3>
      <p>Kami menargetkan untuk meningkatkan jumlah mitra menjadi 1000 pengrajin dan petani pada akhir tahun 2026. Kami juga berencana untuk memperluas area kerjasama ke desa-desa sekitar untuk memberikan dampak yang lebih luas.</p>

      <p>"Setiap produk SAHARA yang Anda beli adalah investasi langsung untuk kesejahteraan ratusan keluarga di Kudus," kata Ibu Ani, koordinator mitra petani kami.</p>
    ', 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRvbmVzaWFuJTIwZmFybWVyJTIwd29ya2luZ3xlbnwxfHx8fDE3NDA1Nzc0NTB8MA&ixlib=rb-4.1.0&q=80&w=1080', 'Komunitas', 'Tim SAHARA'),
  ('Workshop Herbal Gratis untuk Komunitas', '2026-02-10', 'Bergabunglah dengan workshop gratis kami tentang manfaat herbal alami dan cara menggunakannya dalam kehidupan sehari-hari.', '
      <p>SAHARA mengadakan workshop gratis untuk masyarakat umum yang ingin mempelajari lebih dalam tentang manfaat tanaman herbal dan cara mengolahnya menjadi produk perawatan sehari-hari.</p>

      <h3>Detail Workshop</h3>
      <p><strong>Tanggal:</strong> Sabtu, 1 Maret 2026<br>
      <strong>Waktu:</strong> 09.00 - 15.00 WIB<br>
      <strong>Lokasi:</strong> Balai Desa Wates, Undaan, Kudus<br>
      <strong>Kapasitas:</strong> 50 peserta (First come, first served)</p>

      <h3>Materi Workshop</h3>
      <p>Workshop ini akan dibagi menjadi beberapa sesi menarik:</p>

      <h4>Sesi 1: Pengenalan Tanaman Herbal (09.00 - 10.30)</h4>
      <ul>
        <li>Jenis-jenis tanaman herbal yang mudah ditanam di Indonesia</li>
        <li>Manfaat kesehatan dari setiap tanaman</li>
        <li>Tips menanam dan merawat tanaman herbal di rumah</li>
      </ul>

      <h4>Sesi 2: Praktik Membuat Sabun Herbal (11.00 - 12.30)</h4>
      <ul>
        <li>Teknik dasar pembuatan sabun cold process</li>
        <li>Cara mengekstrak nutrisi dari tanaman herbal</li>
        <li>Hands-on: Setiap peserta membuat sabun sendiri untuk dibawa pulang</li>
      </ul>

      <h4>ISHOMA (12.30 - 13.30)</h4>
      <p>Makan siang akan disediakan dengan menu lokal khas Kudus</p>

      <h4>Sesi 3: Membuat Sirup dan Teh Herbal (13.30 - 15.00)</h4>
      <ul>
        <li>Teknik pengolahan rimpang menjadi sirup sehat</li>
        <li>Cara membuat teh celup herbal sendiri</li>
        <li>Tips penyimpanan dan masa simpan produk</li>
      </ul>

      <h3>Pembicara</h3>
      <p>Workshop ini akan dipandu oleh:</p>
      <ul>
        <li><strong>Ibu Dr. Ratna Wijaya</strong> - Ahli herbal dan etnobotani</li>
        <li><strong>Pak Bambang Sutrisno</strong> - Master crafter sabun dengan 20 tahun pengalaman</li>
        <li><strong>Ibu Siti Nurhaliza</strong> - Pengrajin senior SAHARA</li>
      </ul>

      <h3>Bonus untuk Peserta</h3>
      <p>Setiap peserta akan mendapatkan:</p>
      <ul>
        <li>E-book "Panduan Lengkap Herbal Indonesia"</li>
        <li>Starter kit tanaman herbal (bibit + pot)</li>
        <li>Produk sabun hasil karya sendiri</li>
        <li>Voucher diskon 20% untuk produk SAHARA</li>
        <li>Sertifikat keikutsertaan</li>
      </ul>

      <h3>Cara Pendaftaran</h3>
      <p>Untuk mendaftar, silakan hubungi kami melalui:</p>
      <ul>
        <li>WhatsApp: 0812-3456-7890</li>
        <li>Email: workshop@sahara.id</li>
        <li>Datang langsung ke kantor SAHARA di Desa Wates</li>
      </ul>

      <p><strong>Catatan:</strong> Pendaftaran dibuka hingga 25 Februari 2026 atau sampai kuota penuh. Peserta wajib membawa apron/celemek dan alat tulis.</p>

      <p>Jangan lewatkan kesempatan belajar langsung dari para ahli! Daftarkan diri Anda sekarang juga!</p>
    ', 'https://images.unsplash.com/photo-1511988617509-a57c8a288659?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRvbmVzaWFuJTIwd29ya3Nob3AlMjBjb21tdW5pdHl8ZW58MXx8fHwxNzQwNTc3NDUwfDA&ixlib=rb-4.1.0&q=80&w=1080', 'Event', 'Tim SAHARA'),
  ('SAHARA Raih Sertifikasi Halal MUI', '2026-02-05', 'Alhamdulillah, seluruh produk SAHARA kini telah tersertifikasi halal oleh MUI, memperkuat komitmen kami terhadap kualitas dan kepercayaan konsumen.', '
      <p>Alhamdulillah, SAHARA dengan bangga mengumumkan bahwa seluruh rangkaian produk kami telah mendapatkan sertifikasi halal dari Majelis Ulama Indonesia (MUI). Pencapaian ini merupakan wujud komitmen kami untuk memberikan produk terbaik yang sesuai dengan nilai-nilai konsumen Muslim Indonesia.</p>

      <h3>Proses Sertifikasi</h3>
      <p>Proses mendapatkan sertifikasi halal memakan waktu 6 bulan dengan tahapan yang ketat:</p>
      <ul>
        <li>Audit bahan baku dari hulu ke hilir</li>
        <li>Inspeksi fasilitas produksi</li>
        <li>Pelatihan tim tentang protokol halal</li>
        <li>Pemisahan area dan peralatan produksi</li>
        <li>Dokumentasi lengkap supply chain</li>
      </ul>

      <h3>Apa Artinya untuk Konsumen?</h3>
      <p>Sertifikasi halal ini memberikan jaminan kepada konsumen bahwa:</p>
      <ul>
        <li>Semua bahan baku 100% halal dan thayyib</li>
        <li>Proses produksi sesuai dengan syariat Islam</li>
        <li>Tidak ada kontaminasi silang dengan bahan non-halal</li>
        <li>Pengawasan berkala oleh auditor MUI</li>
      </ul>

      <h3>Produk yang Tersertifikasi</h3>
      <p>Semua 6 produk SAHARA kini telah halal:</p>
      <ul>
        <li>Sabuya (Sabun Lidah Buaya)</li>
        <li>Sabulawa (Sabun Temulawak)</li>
        <li>Ja Candy (Permen Jahe)</li>
        <li>Teh Seruas (Teh Celup Lengkuas Sereh)</li>
        <li>Kunira (Sirup Kunyit)</li>
        <li>Kencara (Sirup Kencur)</li>
      </ul>

      <h3>Ucapan Terima Kasih</h3>
      <p>"Kami mengucapkan terima kasih kepada seluruh tim MUI yang telah membimbing kami dalam proses sertifikasi. Terima kasih juga kepada para pengrajin dan petani mitra kami yang telah berkomitmen untuk menjaga standar halal ini," ujar Bapak Ahmad, direktur SAHARA.</p>

      <p>Logo halal MUI kini tertera di setiap kemasan produk SAHARA sebagai jaminan kualitas dan kehalalan produk kami.</p>
    ', 'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjZXJ0aWZpY2F0ZSUyMGhhbGFsfGVufDF8fHx8MTc0MDU3NzQ1MHww&ixlib=rb-4.1.0&q=80&w=1080', 'Pencapaian', 'Tim SAHARA'),
  ('Program Edukasi Herbal untuk Sekolah-Sekolah', '2026-01-28', 'SAHARA meluncurkan program edukasi gratis tentang tanaman herbal untuk siswa SD dan SMP di Kudus, menjangkau 10 sekolah pada tahap pertama.', '
      <p>SAHARA meluncurkan program Corporate Social Responsibility (CSR) terbaru: "Generasi Herbal Indonesia" - program edukasi gratis tentang tanaman herbal untuk siswa SD dan SMP di wilayah Kudus dan sekitarnya.</p>

      <h3>Latar Belakang Program</h3>
      <p>Indonesia kaya akan tanaman herbal, namun generasi muda saat ini semakin jauh dari pengetahuan tentang kekayaan alam ini. Program ini bertujuan untuk:</p>
      <ul>
        <li>Mengenalkan kembali tanaman herbal nusantara kepada generasi muda</li>
        <li>Mengajarkan manfaat kesehatan dari tanaman lokal</li>
        <li>Menanamkan kecintaan terhadap alam dan lingkungan</li>
        <li>Membuka wawasan tentang potensi ekonomi tanaman herbal</li>
      </ul>

      <h3>Kurikulum Program</h3>
      <p>Program ini dirancang untuk 8 sesi pertemuan dengan materi:</p>
      
      <h4>Untuk SD (Kelas 4-6)</h4>
      <ul>
        <li>Mengenal 10 tanaman herbal sekitar kita</li>
        <li>Cara menanam dan merawat tanaman herbal</li>
        <li>Eksperimen sederhana: membuat teh herbal</li>
        <li>Kunjungan ke kebun herbal SAHARA</li>
      </ul>

      <h4>Untuk SMP (Kelas 7-9)</h4>
      <ul>
        <li>Kimia dasar tanaman herbal</li>
        <li>Manfaat kesehatan berdasarkan penelitian</li>
        <li>Praktik mengolah herbal menjadi produk</li>
        <li>Peluang bisnis dan kewirausahaan herbal</li>
      </ul>

      <h3>Sekolah Peserta Tahap 1</h3>
      <p>10 sekolah yang akan mengikuti program ini:</p>
      <ol>
        <li>SD Negeri 1 Wates</li>
        <li>SD Negeri 2 Wates</li>
        <li>SD Muhammadiyah Undaan</li>
        <li>SMP Negeri 1 Undaan</li>
        <li>SMP Negeri 2 Undaan</li>
        <li>SMP Islam Al-Ikhlas</li>
        <li>SD Negeri 3 Karanganyar</li>
        <li>SD Negeri 1 Cendono</li>
        <li>SMP Negeri 3 Kudus</li>
        <li>SMP Kristen Kudus</li>
      </ol>

      <h3>Fasilitas untuk Sekolah</h3>
      <p>Setiap sekolah peserta akan mendapatkan:</p>
      <ul>
        <li>Greenhouse mini untuk praktik menanam</li>
        <li>Bibit 20 jenis tanaman herbal</li>
        <li>Modul pembelajaran bergambar</li>
        <li>Kunjungan gratis ke fasilitas SAHARA</li>
        <li>Kompetisi "Young Herbalist" dengan hadiah total Rp 10 juta</li>
      </ul>

      <h3>Target Jangka Panjang</h3>
      <p>Pada tahun 2027, kami menargetkan program ini menjangkau 50 sekolah di Jawa Tengah. Kami juga berencana membuat kompetisi tingkat provinsi untuk siswa terbaik.</p>

      <p>"Anak-anak adalah masa depan. Dengan mengenalkan mereka pada kekayaan herbal nusantara sejak dini, kami berharap mereka akan menjadi generasi yang mencintai dan melestarikan alam Indonesia," ujar Ibu Dewi, koordinator program.</p>

      <h3>Cara Sekolah Mendaftar</h3>
      <p>Sekolah yang berminat mengikuti program di tahap berikutnya dapat menghubungi:</p>
      <ul>
        <li>Email: csr@sahara.id</li>
        <li>Telepon: (0291) 123-4567</li>
        <li>WhatsApp: 0812-3456-7890</li>
      </ul>
    ', 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRvbmVzaWFuJTIwc3R1ZGVudHMlMjBsZWFybmluZ3xlbnwxfHx8fDE3NDA1Nzc0NTB8MA&ixlib=rb-4.1.0&q=80&w=1080', 'Program', 'Tim SAHARA'),
  ('Rencana Ekspansi: 10 Produk Baru di 2026', '2026-01-15', 'SAHARA mengumumkan rencana ambisius untuk meluncurkan 10 produk herbal baru sepanjang tahun 2026 untuk melengkapi rangkaian produk yang ada.', '
      <p>Memasuki tahun 2026, SAHARA mengumumkan rencana ekspansi produk yang ambisius. Kami akan meluncurkan 10 produk herbal baru untuk melengkapi 6 produk existing kami, menjadikan total 16 produk pada akhir tahun 2026.</p>

      <h3>Kategori Produk Baru</h3>
      <p>Produk-produk baru ini akan terbagi dalam 4 kategori utama:</p>

      <h4>1. Perawatan Kulit (4 Produk)</h4>
      <ul>
        <li><strong>Masker Wajah Spirulina</strong> - Untuk detoksifikasi dan mencerahkan kulit</li>
        <li><strong>Scrub Kopi Robusta</strong> - Exfoliator alami dari kopi lokal Kudus</li>
        <li><strong>Serum Wajah Daun Kelor</strong> - Anti-aging dengan superfood lokal</li>
        <li><strong>Lip Balm Madu</strong> - Pelembab bibir dari madu hutan asli</li>
      </ul>

      <h4>2. Minuman Kesehatan (3 Produk)</h4>
      <ul>
        <li><strong>Jamu Instan Beras Kencur</strong> - Praktis, tinggal seduh</li>
        <li><strong>Wedang Uwuh Kemasan</strong> - Minuman tradisional dalam kemasan modern</li>
        <li><strong>Juice Mengkudu Organik</strong> - Untuk kesehatan pencernaan</li>
      </ul>

      <h4>3. Aromaterapi (2 Produk)</h4>
      <ul>
        <li><strong>Essential Oil Cengkeh</strong> - Aroma khas Kudus untuk relaksasi</li>
        <li><strong>Lilin Aromaterapi Melati</strong> - Handmade dengan soy wax</li>
      </ul>

      <h4>4. Makanan Sehat (1 Produk)</h4>
      <ul>
        <li><strong>Granola Tempe</strong> - Superfood lokal untuk sarapan sehat</li>
      </ul>

      <h3>Timeline Peluncuran</h3>
      <p>Produk-produk ini akan diluncurkan secara bertahap:</p>
      <ul>
        <li><strong>Q1 2026 (Maret)</strong> - Masker Spirulina, Scrub Kopi</li>
        <li><strong>Q2 2026 (Juni)</strong> - Jamu Beras Kencur, Wedang Uwuh, Serum Kelor</li>
        <li><strong>Q3 2026 (September)</strong> - Essential Oil Cengkeh, Lip Balm Madu</li>
        <li><strong>Q4 2026 (Desember)</strong> - Lilin Aromaterapi, Juice Mengkudu, Granola Tempe</li>
      </ul>

      <h3>Riset dan Pengembangan</h3>
      <p>Setiap produk telah melalui riset mendalam selama 6-12 bulan. Tim R&D kami bekerja sama dengan:</p>
      <ul>
        <li>Universitas Gadjah Mada - Fakultas Farmasi</li>
        <li>Balai Penelitian Tanaman Rempah dan Obat (Balittro)</li>
        <li>Herbalis tradisional berpengalaman dari berbagai daerah</li>
      </ul>

      <h3>Dampak untuk Mitra Petani</h3>
      <p>Ekspansi ini akan membuka peluang bagi 300 petani baru untuk bergabung dengan SAHARA. Kami akan membutuhkan pasokan:</p>
      <ul>
        <li>Spirulina - 50 petani baru</li>
        <li>Kopi Robusta - 80 petani baru</li>
        <li>Daun Kelor - 60 petani baru</li>
        <li>Cengkeh - 40 petani baru</li>
        <li>Bunga Melati - 30 petani baru</li>
        <li>Mengkudu - 40 petani baru</li>
      </ul>

      <h3>Investasi dan Fasilitas Baru</h3>
      <p>Untuk mendukung ekspansi ini, SAHARA akan menginvestasikan Rp 2 miliar untuk:</p>
      <ul>
        <li>Membangun fasilitas produksi baru seluas 500 m²</li>
        <li>Membeli peralatan modern untuk ekstraksi essential oil</li>
        <li>Merekrut 50 karyawan baru</li>
        <li>Upgrading sistem quality control</li>
      </ul>

      <h3>Pre-Order Special</h3>
      <p>Pelanggan setia SAHARA akan mendapat kesempatan pre-order produk baru dengan diskon hingga 30%. Daftarkan email Anda di website kami untuk mendapat notifikasi peluncuran.</p>

      <p>"Ini adalah tahun yang sangat menarik untuk SAHARA. Kami berkomitmen untuk terus berinovasi sambil tetap menjaga kualitas dan nilai-nilai kami," tutup Bapak Ahmad, Direktur SAHARA.</p>
    ', 'https://images.unsplash.com/photo-1556228720-195a672e8a03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmFsJTIwcHJvZHVjdHMlMjBpbmRvbmVzaWF8ZW58MXx8fHwxNzQwNTc3NDUwfDA&ixlib=rb-4.1.0&q=80&w=1080', 'Pengumuman', 'Tim SAHARA');

-- Seed data: panduan (dari data/guides.ts)
insert into public.guides (title, category, difficulty, duration, target_audience, description, image_url, materials, tools, steps, warnings, benefits) values
  ('Cara Menanam Lidah Buaya', 'Menanam', 'Pemula', '1-2 jam persiapan, 3-6 bulan panen', 'Petani, Orang Awam', 'Panduan lengkap menanam lidah buaya dari bibit hingga siap panen. Lidah buaya sangat mudah dirawat dan cocok untuk pemula.', 'https://images.unsplash.com/photo-1676410408633-79228457cec4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbG9lJTIwdmVyYSUyMHBsYW50JTIwZ3Jvd2luZ3xlbnwxfHx8fDE3NzIxMjY0Njl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', '{"Bibit lidah buaya (anakan/pup)","Tanah gembur","Pasir","Kompos organik","Sekam bakar (opsional)"}', '{"Pot atau polybag (diameter min. 30cm)","Sekop kecil/cangkul mini","Sarung tangan berkebun","Gembor/alat penyiram"}', '[{"title": "Persiapan Media Tanam", "description": "Campur tanah gembur, pasir, dan kompos dengan perbandingan 2:1:1. Pastikan media tanam memiliki drainase yang baik karena lidah buaya tidak suka tanah yang terlalu basah.", "tips": ["Tambahkan sekam bakar untuk meningkatkan porositas tanah", "Pastikan pH tanah antara 6.0-7.0 (netral)", "Sterilkan media tanam dengan cara dijemur di bawah matahari 2-3 hari"]}, {"title": "Memilih Bibit Berkualitas", "description": "Pilih anakan lidah buaya yang sudah memiliki 3-4 daun dan tinggi minimal 10cm. Pastikan tidak ada tanda-tanda penyakit seperti bercak coklat atau daun yang layu.", "tips": ["Bibit terbaik berasal dari indukan yang sehat dan produktif", "Hindari bibit yang terlalu muda (kurang dari 5cm)", "Periksa bagian akar - harus putih dan tidak busuk"]}, {"title": "Proses Penanaman", "description": "Isi pot dengan media tanam hingga 3/4 bagian. Buat lubang di tengah, masukkan bibit lidah buaya, lalu tutup dengan tanah. Tekan perlahan agar bibit berdiri tegak.", "tips": ["Jangan menanam terlalu dalam - pangkal daun harus di atas permukaan tanah", "Sisakan 2-3cm ruang dari bibir pot untuk memudahkan penyiraman", "Siram sedikit setelah tanam, jangan terlalu basah"]}, {"title": "Penempatan dan Adaptasi", "description": "Tempatkan pot di lokasi yang teduh selama 1 minggu untuk adaptasi. Setelah itu, pindahkan ke tempat yang terkena sinar matahari pagi (6-10 pagi) minimal 4 jam per hari.", "tips": ["Hindari sinar matahari langsung saat siang hari di minggu pertama", "Lokasi ideal: terkena matahari pagi, teduh saat siang", "Pastikan ada sirkulasi udara yang baik"]}, {"title": "Perawatan Awal", "description": "Siram 2-3 kali seminggu pada minggu pertama. Setelah itu, kurangi menjadi 1-2 kali seminggu. Lidah buaya lebih tahan kekeringan daripada kelebihan air.", "tips": ["Siram hanya jika tanah sudah kering", "Hindari air menggenang di pangkal daun", "Waktu penyiraman terbaik: pagi atau sore hari"]}]'::jsonb, '{"Jangan menyiram terlalu banyak - akar lidah buaya mudah busuk jika terlalu basah","Hindari pemupukan berlebihan - cukup 1 bulan sekali dengan pupuk organik","Perhatikan hama seperti kutu putih - segera bersihkan jika ditemukan"}', '{"Mudah dirawat, cocok untuk pemula","Tahan terhadap cuaca kering","Bisa dipanen dalam 6 bulan","Satu tanaman bisa menghasilkan banyak anakan untuk diperbanyak"}'),
  ('Cara Menanam Jahe di Polybag', 'Menanam', 'Menengah', '2-3 jam persiapan, 8-10 bulan panen', 'Petani, Pengrajin', 'Panduan menanam jahe dalam polybag untuk lahan terbatas. Cocok untuk skala rumahan maupun komersial kecil.', 'https://images.unsplash.com/photo-1558534949-0a442809cb33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnaW5nZXIlMjByb290JTIwZmFybWluZyUyMGluZG9uZXNpYXxlbnwxfHx8fDE3NzIxMjY0Njl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', '{"Bibit jahe (rimpang berkualitas)","Tanah gembur","Pupuk kandang/kompos matang","Sekam padi","Abu sekam (opsional)"}', '{"Polybag ukuran 40x50cm","Cangkul kecil","Gembor","Pisau/cutter untuk memotong rimpang"}', '[{"title": "Persiapan Bibit Jahe", "description": "Pilih rimpang jahe yang sehat, berumur 10-12 bulan, tidak busuk, dan memiliki 2-3 mata tunas. Potong rimpang dengan berat 25-60 gram per potongan.", "tips": ["Pilih jahe dari varietas unggul (jahe gajah/emprit/merah sesuai kebutuhan)", "Pastikan setiap potongan memiliki minimal 2 mata tunas", "Keringkan potongan 1-2 hari setelah dipotong untuk mencegah pembusukan", "Rendam dalam larutan fungisida organik 15 menit sebelum tanam"]}, {"title": "Pembuatan Media Tanam", "description": "Campur tanah gembur, pupuk kandang matang, dan sekam padi dengan perbandingan 1:1:1. Pastikan media tanam gembur dan kaya nutrisi.", "tips": ["Ayak tanah untuk menghilangkan batu dan kotoran", "Gunakan pupuk kandang yang sudah matang minimal 2 bulan", "Tambahkan abu sekam untuk menambah unsur kalium", "Pastikan pH media tanam 6.5-7.5"]}, {"title": "Pengisian Polybag dan Penanaman", "description": "Isi polybag dengan media tanam hingga 3/4 bagian. Letakkan rimpang jahe dengan posisi mata tunas menghadap ke atas. Tutup dengan tanah setebal 3-5cm.", "tips": ["Buat lubang tanam sedalam 5cm di tengah polybag", "Letakkan rimpang secara horizontal", "Jangan menekan tanah terlalu keras", "Siram secukupnya setelah tanam"]}, {"title": "Penempatan dan Naungan", "description": "Tempatkan polybag di area yang teduh dengan intensitas cahaya 40-50%. Jahe membutuhkan naungan, tidak cocok dengan sinar matahari penuh.", "tips": ["Gunakan paranet 60-70% jika menanam di area terbuka", "Pastikan ada sirkulasi udara yang baik", "Hindari genangan air di sekitar polybag", "Susun polybag dengan jarak 30-40cm antar pot"]}, {"title": "Perawatan Rutin", "description": "Siram secara rutin 1-2 kali sehari tergantung cuaca. Berikan pupuk organik cair setiap 2 minggu sekali mulai umur 2 bulan. Lakukan pembumbunan saat rimpang mulai terlihat di permukaan.", "tips": ["Siram pagi dan sore hari", "Jangan sampai tanah kering atau terlalu basah", "Tambahkan media tanam saat rimpang terlihat (pembumbunan)", "Bersihkan gulma secara rutin"]}, {"title": "Pemanenan", "description": "Jahe siap panen saat berumur 8-10 bulan (jahe muda) atau 10-12 bulan (jahe tua). Ciri-ciri: daun menguning dan mulai mengering. Hentikan penyiraman 2 minggu sebelum panen.", "tips": ["Jahe muda (8-10 bulan): untuk konsumsi segar, kandungan air tinggi", "Jahe tua (10-12 bulan): untuk rimpang kering, kandungan minyak atsiri tinggi", "Panen di pagi hari saat cuaca cerah", "Angkat polybag secara hati-hati agar rimpang tidak rusak"]}]'::jsonb, '{"Hindari tanah yang terlalu basah - dapat menyebabkan busuk rimpang","Waspadai penyakit layu bakteri dan busuk rimpang","Jangan menanam di lokasi bekas tanaman jahe tahun sebelumnya","Perhatikan drainase agar tidak ada genangan air"}', '{"Hemat lahan - bisa ditanam di pekarangan rumah","Mudah dipindahkan sesuai kebutuhan","Perawatan lebih terkontrol","Produktivitas bisa mencapai 0.8-1.5 kg per polybag","Bisa dilakukan sepanjang tahun"}'),
  ('Cara Merawat Tanaman Herbal Harian', 'Merawat', 'Pemula', '15-30 menit per hari', 'Petani, Orang Awam', 'Panduan perawatan harian tanaman herbal agar tumbuh subur dan produktif. Cocok untuk berbagai jenis tanaman herbal.', 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZXJiJTIwZ2FyZGVuJTIwaW5kb25lc2iavl8xfHx8fDE3NDA1Nzc0NTB8MA&ixlib=rb-4.1.0&q=80&w=1080', '{"Air bersih","Pupuk organik cair (NPK)","Pestisida organik (jika perlu)","Kompos matang"}', '{"Gembor dengan kepala shower","Gunting pangkas","Sarung tangan","Sprayer untuk pupuk cair"}', '[{"title": "Penyiraman yang Tepat", "description": "Siram tanaman di pagi hari (06.00-08.00) dan sore hari (16.00-18.00). Sesuaikan frekuensi dengan jenis tanaman dan cuaca.", "tips": ["Tanaman rimpang (jahe, kunyit): siram 1-2x sehari, jangan sampai becek", "Tanaman daun (kelor, sereh): siram 2x sehari saat musim kemarau", "Lidah buaya: siram 2-3x seminggu saja", "Cek kelembaban tanah dengan jari sebelum menyiram"]}, {"title": "Pemberian Pupuk Rutin", "description": "Berikan pupuk organik cair setiap 2 minggu sekali. Untuk pupuk padat/kompos, berikan setiap 1-2 bulan sekali dengan cara ditabur di sekeliling pangkal batang.", "tips": ["Waktu terbaik: pagi hari sebelum penyiraman", "Dosis pupuk cair: 5-10ml per liter air", "Jangan berikan pupuk saat tanaman sedang berbunga", "Gunakan pupuk organik agar produk tetap alami"]}, {"title": "Penyiangan Gulma", "description": "Bersihkan gulma/rumput liar di sekitar tanaman minimal 1 minggu sekali. Gulma akan menyerap nutrisi yang seharusnya untuk tanaman herbal.", "tips": ["Cabut gulma hingga ke akarnya", "Lakukan saat tanah lembab agar mudah dicabut", "Gunakan sarung tangan untuk melindungi tangan", "Gulma yang dicabut bisa dijadikan kompos"]}, {"title": "Pemangkasan dan Peremajaan", "description": "Pangkas daun yang menguning, kering, atau terserang hama. Pemangkasan juga merangsang pertumbuhan tunas baru.", "tips": ["Gunakan gunting yang tajam dan bersih", "Potong pada sudut 45 derajat", "Untuk tanaman daun: pangkas 1/3 bagian atas untuk merangsang percabangan", "Buang bagian yang dipangkas agar tidak jadi sarang penyakit"]}, {"title": "Pengendalian Hama dan Penyakit", "description": "Periksa tanaman setiap hari untuk mendeteksi hama atau penyakit sejak dini. Gunakan pestisida organik atau cara manual untuk pengendalian.", "tips": ["Hama umum: ulat, kutu daun, tungau - semprot dengan air sabun atau pestisida nabati", "Penyakit jamur: kurangi penyiraman, tingkatkan sirkulasi udara", "Isolasi tanaman yang sakit agar tidak menular", "Pencegahan terbaik: jaga kebersihan kebun dan drainase yang baik"]}, {"title": "Monitoring Pertumbuhan", "description": "Catat pertumbuhan tanaman setiap minggu. Perhatikan tinggi tanaman, jumlah daun, dan tanda-tanda kesehatan lainnya.", "tips": ["Buat jurnal berkebun sederhana", "Foto tanaman setiap bulan untuk membandingkan pertumbuhan", "Catat kapan pemupukan dan pemangkasan dilakukan", "Identifikasi masalah sejak dini dari perubahan warna daun atau pertumbuhan yang lambat"]}]'::jsonb, '{"Jangan menyiram saat siang hari - dapat membakar daun","Hindari pupuk kimia berlebihan jika untuk konsumsi","Jangan memangkas lebih dari 1/3 bagian tanaman sekaligus","Pastikan alat pangkas steril untuk mencegah penyebaran penyakit"}', '{"Tanaman tumbuh sehat dan produktif","Hasil panen berkualitas tinggi","Mencegah kerugian akibat hama dan penyakit","Meningkatkan produktivitas hingga 30-40%"}'),
  ('Cara Membuat Sabun Herbal Cold Process', 'Membuat Produk', 'Menengah', '3-4 jam pembuatan, 4-6 minggu curing', 'Pengrajin, Orang Awam', 'Panduan lengkap membuat sabun herbal alami menggunakan metode cold process. Aman dan berkualitas tinggi.', 'https://images.unsplash.com/photo-1730378616989-499041edc37a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmFsJTIwaGFuZG1hZGUlMjBzb2FwJTIwYmFyc3xlbnwxfHx8fDE3NzIwOTYxNzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', '{"Minyak kelapa 400ml","Minyak sawit 200ml","Minyak zaitun 100ml","NaOH (soda api) 95 gram","Air destilasi 250ml","Ekstrak herbal (lidah buaya/temulawak) 50ml","Essential oil (opsional) 10ml"}', '{"Timbangan digital (akurasi 0.1g)","2 wadah stainless steel","Stick blender","Termometer","Spatula silikon","Cetakan sabun silikon","Sarung tangan karet","Kacamata pelindung","Masker"}', '[{"title": "Persiapan dan Keamanan", "description": "PENTING: Kenakan sarung tangan, kacamata pelindung, dan masker. Siapkan semua bahan dan alat. Pastikan ruangan berventilasi baik. Jauhkan anak-anak dan hewan peliharaan.", "tips": ["NaOH sangat kaustik - hindari kontak dengan kulit", "Siapkan cuka untuk menetralkan jika terkena NaOH", "Bekerja di area yang luas dan tidak terganggu", "Tutup bahan makanan di sekitar area kerja"]}, {"title": "Membuat Larutan Lye (NaOH)", "description": "Tuang air destilasi ke dalam wadah stainless steel. Perlahan tambahkan NaOH ke dalam air (JANGAN SEBALIKNYA) sambil diaduk. Larutan akan panas (60-80°C) dan berasap. Biarkan dingin hingga 40-45°C.", "tips": ["SELALU tuang NaOH ke air, BUKAN air ke NaOH (bisa meledak!)", "Aduk perlahan sampai NaOH larut sempurna", "Lakukan di area terbuka atau dengan exhaust fan", "Dinginkan dengan merendam wadah di air dingin jika terlalu panas"]}, {"title": "Mencampur Minyak", "description": "Campur semua minyak (kelapa, sawit, zaitun) dalam wadah stainless steel terpisah. Panaskan hingga 40-45°C. Pastikan suhu minyak dan larutan lye sama (±5°C).", "tips": ["Gunakan termometer yang akurat", "Jika minyak kelapa beku, cairkan terlebih dulu dengan pemanasan lembut", "Campuran minyak harus transparan, bukan keruh", "Suhu ideal: 38-42°C untuk kedua larutan"]}, {"title": "Proses Saponifikasi", "description": "Tuang larutan lye perlahan ke dalam campuran minyak sambil diaduk konstan dengan stick blender. Blend selama 3-5 menit hingga mencapai ''trace'' (kekentalan seperti mayones).", "tips": ["Blend dengan pola angka 8 untuk pencampuran merata", "Trace tercapai saat adonan meninggalkan jejak di permukaan", "Jangan over-blend - bisa membuat sabun terlalu cepat mengeras", "Proses ini memakan waktu 5-15 menit tergantung minyak yang digunakan"]}, {"title": "Menambahkan Bahan Tambahan", "description": "Setelah mencapai light trace, tambahkan ekstrak herbal (lidah buaya/temulawak) dan essential oil. Aduk cepat dengan spatula hingga tercampur rata.", "tips": ["Tambahkan bahan pada suhu tidak lebih dari 45°C", "Ekstrak herbal harus sudah disiapkan sebelumnya (gel lidah buaya murni atau ekstrak temulawak)", "Essential oil akan cepat menguap jika terlalu panas", "Aduk cepat tapi tidak sampai membuat gelembung udara"]}, {"title": "Pencetakan dan Curing", "description": "Tuang adonan sabun ke dalam cetakan. Tutup dengan plastik wrap dan handuk untuk menjaga suhu. Biarkan 24-48 jam hingga mengeras. Keluarkan dari cetakan dan potong sesuai ukuran. Cure selama 4-6 minggu di tempat kering dengan sirkulasi udara baik.", "tips": ["Tuang adonan dari ketinggian rendah untuk menghindari gelembung", "Ketuk cetakan perlahan untuk mengeluarkan gelembung udara", "Sabun siap dikeluarkan saat sudah keras seperti keju cheddar", "Selama curing: balik sabun setiap minggu agar kering merata", "Curing lengkap = sabun lebih keras, tidak cepat lembek, dan pH aman"]}, {"title": "Uji pH dan Pengemasan", "description": "Setelah curing 4-6 minggu, uji pH sabun (harus 8-10). Lakukan zap test (sentuh ujung lidah - tidak boleh terasa seperti terkena listrik). Kemas dalam plastik wrap atau kertas lilin.", "tips": ["Gunakan pH strip untuk pengujian", "Jika pH terlalu tinggi (>11), cure lebih lama", "Sabun yang sudah aman tidak terasa pedas/menyengat di lidah", "Simpan di tempat kering dan sejuk", "Label dengan tanggal pembuatan dan bahan"]}]'::jsonb, '{"NaOH sangat berbahaya - wajib menggunakan alat pelindung lengkap","Jangan gunakan alat dari aluminium - akan bereaksi dengan NaOH","Sabun belum aman digunakan sebelum curing 4-6 minggu","Jika terkena NaOH, segera bilas dengan air mengalir 15 menit dan olesi cuka","Simpan NaOH di tempat aman, jauh dari jangkauan anak-anak"}', '{"Sabun 100% alami tanpa bahan kimia berbahaya","Kualitas moisturizing tinggi karena kandungan gliserin alami","Tahan lama (1 batang bisa 3-4 minggu)","Bisa dikustomisasi sesuai kebutuhan kulit","Nilai jual tinggi - 1 batang bisa dijual Rp 30.000-50.000"}'),
  ('Cara Membuat Sirup Herbal (Kunyit/Kencur)', 'Membuat Produk', 'Pemula', '2-3 jam', 'Pengrajin, Orang Awam', 'Panduan mudah membuat sirup herbal dari kunyit atau kencur. Cocok untuk dijual atau konsumsi keluarga.', 'https://images.unsplash.com/photo-1544145748-1f2980adf65a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZXJiYWwlMjBkcmluayUyMGluZG9uZXNpYXxlbnwxfHx8fDE3NDA1Nzc0NTB8MA&ixlib=rb-4.1.0&q=80&w=1080', '{"Kunyit/kencur segar 500 gram","Gula pasir 750 gram","Air matang 1 liter","Asam sitrat/jeruk nipis 2 sdm","Garam 1/4 sdt (pengawet alami)","Daun pandan 2 lembar (opsional)"}', '{"Blender","Panci besar stainless steel","Saringan halus/kain blacu","Botol kaca steril","Timbangan","Sendok kayu"}', '[{"title": "Persiapan Rimpang", "description": "Cuci bersih kunyit/kencur segar. Kupas kulit tipis luarnya. Potong-potong kecil agar mudah diblender. Timbang 500 gram rimpang bersih.", "tips": ["Pilih rimpang yang segar, tidak busuk, dan beraroma kuat", "Gunakan sarung tangan saat mengupas kunyit agar tangan tidak kuning", "Untuk kunyit: pilih yang berwarna orange tua (tua dan berkualitas)", "Untuk kencur: pilih yang putih bersih dan harum"]}, {"title": "Pembuatan Ekstrak", "description": "Blender rimpang dengan 500ml air hingga halus. Saring dengan kain blacu/saringan halus. Peras hingga ekstrak keluar maksimal. Sisihkan ampasnya.", "tips": ["Blender dengan kecepatan tinggi agar benar-benar halus", "Saring 2-3 kali untuk hasil yang jernih", "Peras ampas dengan kuat agar sarinya keluar semua", "Ampas bisa digunakan untuk kompos atau masker wajah"]}, {"title": "Pembuatan Sirup Gula", "description": "Masak 500ml air dengan gula pasir dalam panci hingga mendidih. Aduk terus agar gula larut sempurna dan tidak gosong. Masak hingga kental seperti sirup (sekitar 15-20 menit).", "tips": ["Api sedang agar gula tidak cepat gosong", "Aduk dengan sendok kayu, bukan metal", "Test kekentalan: angkat sendok, sirup harus menetes perlahan", "Jangan sampai terlalu kental - akan mengeras saat dingin"]}, {"title": "Pencampuran Ekstrak dan Sirup", "description": "Tuang ekstrak rimpang ke dalam sirup gula yang masih panas. Tambahkan asam sitrat, garam, dan daun pandan. Masak dengan api kecil selama 10 menit sambil terus diaduk.", "tips": ["Masukkan ekstrak perlahan sambil diaduk", "Api kecil saja agar aroma herbal tidak hilang", "Asam sitrat sebagai pengawet alami dan menambah rasa segar", "Tes rasa: manis, sedikit asam, dan aroma herbal kuat"]}, {"title": "Sterilisasi dan Pengemasan", "description": "Matikan api, saring sekali lagi untuk memastikan tidak ada ampas. Tuang sirup panas ke dalam botol kaca steril. Tutup rapat saat masih panas untuk menciptakan vacuum seal.", "tips": ["Sterilkan botol dengan merebus 10 menit atau oven 100°C selama 15 menit", "Tuang sirup saat masih panas (min 80°C)", "Isi botol hingga penuh, sisakan 1cm dari bibir", "Tutup langsung dan balik botol agar panas sterilkan tutup juga", "Biarkan dingin dalam posisi terbalik"]}, {"title": "Penyimpanan dan Daya Tahan", "description": "Simpan sirup di tempat sejuk dan kering. Sirup tertutup bisa tahan 3-6 bulan. Setelah dibuka, simpan di kulkas dan habiskan dalam 2 minggu.", "tips": ["Label botol dengan tanggal pembuatan dan expired", "Jika ada endapan putih, itu normal - kocok sebelum digunakan", "Tanda sirup rusak: berbau asam, berubah warna, atau berjamur", "Untuk konsumsi: larutkan 2-3 sdm sirup dalam 200ml air dingin"]}]'::jsonb, '{"Pastikan semua alat steril untuk mencegah kontaminasi","Jangan mengurangi gula terlalu banyak - gula adalah pengawet alami","Jika menjual, pastikan mendapat izin PIRT dari Dinkes","Perhatikan kebersihan tangan dan area kerja"}', '{"Proses mudah dan tidak memerlukan alat khusus","Modal kecil, keuntungan besar (margin 100-150%)","Tahan lama tanpa pengawet kimia","Manfaat kesehatan: meningkatkan imunitas, mengatasi diare, anti-inflamasi","Bisa dikembangkan menjadi bisnis UMKM"}'),
  ('Cara Membuat Teh Celup Herbal', 'Membuat Produk', 'Pemula', '3-4 jam (termasuk pengeringan)', 'Pengrajin, Orang Awam', 'Panduan membuat teh celup herbal dari lengkuas dan sereh. Produk praktis dan bernilai jual tinggi.', 'https://images.unsplash.com/photo-1739099778372-6181f31c341c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZXJiYWwlMjB0ZWElMjBiYWdzJTIwb3JnYW5pY3xlbnwxfHx8fDE3NzIxMjY0NzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', '{"Lengkuas segar 200 gram","Sereh segar 100 gram","Daun pandan 50 gram (opsional)","Kantong teh celup kosong (food grade)","Benang dan tag (opsional)"}', '{"Pisau tajam","Talenan","Oven atau dehidrator (atau sinar matahari)","Timbangan digital","Gunting","Wadah kedap udara untuk penyimpanan"}', '[{"title": "Persiapan Bahan Herbal", "description": "Cuci bersih lengkuas dan sereh. Kupas kulit lengkuas, iris tipis setebal 2-3mm. Potong sereh menjadi bagian kecil 2-3cm. Jika pakai pandan, potong tipis juga.", "tips": ["Irisan tipis akan lebih cepat kering dan aroma lebih keluar saat diseduh", "Gunakan pisau tajam agar irisan rapi dan tidak hancur", "Pilih lengkuas dan sereh yang masih segar dan harum", "Buang bagian yang sudah tua atau keras"]}, {"title": "Proses Pengeringan", "description": "Ada 3 metode pengeringan: 1) Oven suhu 50-60°C selama 2-3 jam, 2) Dehidrator suhu 50°C selama 3-4 jam, 3) Jemur di bawah sinar matahari 2-3 hari. Keringkan hingga bahan benar-benar kering dan renyah.", "tips": ["Metode oven: balik bahan setiap 30 menit agar kering merata", "Metode matahari: jemur di atas tampah atau nampan, tutup dengan kain kasa agar tidak ada serangga", "Ciri kering sempurna: mudah patah, tidak lembab, warna tidak terlalu gelap", "Jangan terlalu panas saat mengeringkan - aroma herbal bisa hilang"]}, {"title": "Pengecilan Ukuran", "description": "Setelah kering, potong atau hancurkan bahan menjadi ukuran lebih kecil (sekitar 0.5-1cm). Bisa menggunakan gunting atau diblender kasar. Jangan terlalu halus menjadi bubuk.", "tips": ["Ukuran yang tepat membuat seduhan lebih optimal", "Jika menggunakan blender, gunakan mode pulse (jangan continuous)", "Campur lengkuas dan sereh dengan perbandingan 2:1", "Simpan dalam wadah tertutup sementara"]}, {"title": "Pengemasan dalam Kantong Teh", "description": "Timbang 2-3 gram campuran herbal kering per kantong teh. Masukkan ke dalam kantong teh celup kosong. Tutup dengan cara melipat atau menyegel (tergantung jenis kantong).", "tips": ["Gunakan kantong teh food grade yang aman untuk air panas", "Jangan terlalu penuh - beri ruang untuk ekspansi saat diseduh", "Pastikan kantong tertutup rapat agar isi tidak tumpah", "Jika ada tag dan benang, pasang untuk kemudahan penggunaan"]}, {"title": "Quality Control", "description": "Test beberapa kantong teh dengan cara diseduh air panas 200ml selama 3-5 menit. Cek aroma, warna, dan rasa. Pastikan tidak ada rasa aneh atau bau apek.", "tips": ["Warna seduhan harus kuning keemasan", "Aroma harum lengkuas dan sereh harus keluar", "Rasa: hangat, sedikit pedas dari lengkuas, segar dari sereh", "Jika ada masalah, cek kembali proses pengeringan"]}, {"title": "Pengemasan Akhir dan Penyimpanan", "description": "Kemas teh celup dalam kemasan kedap udara (plastik PP atau aluminium foil). Tambahkan silica gel untuk menjaga kekeringan. Label dengan informasi produk, tanggal kadaluarsa (6-12 bulan), dan cara seduh.", "tips": ["Kemasan satuan: 5-10 kantong per box", "Desain label yang menarik untuk nilai jual", "Simpan di tempat kering, sejuk, terhindar dari sinar matahari langsung", "Jika dijual, cantumkan informasi: komposisi, manfaat, cara seduh, izin PIRT"]}]'::jsonb, '{"Pastikan bahan benar-benar kering untuk mencegah jamur","Gunakan kantong teh yang food grade dan tahan panas","Jangan menyimpan di tempat lembab","Untuk dijual komersial, wajib ada izin PIRT dari Dinkes"}', '{"Produk praktis dan mudah dibawa","Nilai jual tinggi - 1 box (10 kantong) bisa Rp 15.000-25.000","Tahan lama (6-12 bulan jika dikemas dengan baik)","Manfaat kesehatan: mengatasi ISPA, menghangatkan tubuh, anti-inflamasi","Tidak memerlukan modal besar untuk memulai"}');
-- Seed data: FAQ (dari halaman Layanan Informasi)
insert into public.faqs (question, answer, sort_order) values
  (
    'Apakah produk SAHARA benar-benar 100% alami?',
    'Ya, semua produk kami dibuat dari bahan-bahan alami tanpa bahan kimia berbahaya atau aditif sintetis. Kami berkomitmen pada transparansi penuh dan dengan senang hati membagikan daftar bahan lengkap untuk setiap produk.',
    1
  ),
  (
    'Berapa lama waktu pengiriman?',
    'Untuk area Jakarta dan sekitarnya, pengiriman memakan waktu 1-2 hari kerja. Untuk daerah lain di Indonesia, pengiriman memakan waktu 3-5 hari kerja tergantung lokasi.',
    2
  ),
  (
    'Apakah ada garansi untuk produk?',
    'Kami menjamin kualitas semua produk kami. Jika Anda tidak puas, kami menawarkan pengembalian dana penuh dalam 14 hari setelah pembelian untuk produk yang belum dibuka.',
    3
  ),
  (
    'Bagaimana cara menyimpan produk alami?',
    'Setiap produk dilengkapi dengan instruksi penyimpanan. Umumnya, simpan di tempat sejuk dan kering, terhindar dari sinar matahari langsung. Beberapa produk mungkin perlu disimpan di kulkas setelah dibuka.',
    4
  );

-- Seed data: pengaturan situs (Beranda + Layanan Informasi)
-- Singleton row (id selalu 1) - berisi teks asli dari landing page sebelum migrasi.
insert into public.site_settings (id, hero_title, hero_title_accent, hero_subtitle, hero_image_url, about_intro, about_heading, about_body, mission_heading, mission_text, stat1_value, stat1_title, stat1_description, stat2_value, stat2_title, stat2_description, stat3_value, stat3_title, stat3_description, cta_heading, cta_body, contact_address, contact_phone, contact_email, contact_hours)
values (1, 'Temukan Kebaikan', 'Alami Murni', 'Dibuat dengan cinta oleh pengrajin lokal. Rasakan produk alami terbaik yang dibuat dari bahan-bahan yang bersumber secara berkelanjutan.', '/images/hero.png', 'Perjalanan kami dimulai dengan hasrat sederhana: membawa produk alami berkualitas tinggi ke rumah-rumah Indonesia sambil mendukung komunitas lokal.', 'Dari Hati, Untuk Anda', 'SAHARA didirikan pada tahun 2026 dengan misi sederhana namun kuat: menyediakan produk alami berkualitas tinggi yang dibuat dengan cara tradisional dan bahan-bahan yang bersumber secara berkelanjutan.

Kami bekerja sama dengan pengrajin lokal berbakat di Desa Wates, Undaan, Kudus, memastikan setiap produk dibuat dengan perhatian dan keahlian yang luar biasa. Dari kebun dan sawah di sekitar desa, kami berkomitmen untuk mendukung komunitas lokal dengan memanfaatkan bahan-bahan herbal alami yang tumbuh di wilayah tersebut.

Setiap pembelian tidak hanya membawa produk berkualitas ke rumah Anda, tetapi juga mendukung mata pencaharian ratusan petani dan pengrajin lokal di Desa Wates.', 'Misi Kami', 'Menyediakan produk alami berkualitas tinggi yang dibuat secara etis, sambil memberdayakan komunitas lokal dan melestarikan tradisi pembuatan handmade Indonesia. Kami percaya bahwa produk yang baik untuk Anda juga harus baik untuk planet dan masyarakat.', '100%', 'Alami', 'Tanpa bahan kimia berbahaya atau aditif sintetis', '500+', 'Pengrajin', 'Mitra pengrajin dan petani lokal di Desa Wates, Undaan, Kudus', '2026', 'Didirikan', 'Memulai perjalanan mendukung pengrajin lokal', 'Siap Merasakan Hidup Alami?', 'Bergabunglah dengan ribuan pelanggan puas yang telah mengubah gaya hidup mereka dengan produk alami handmade kami.', 'Desa Wates, Undaan
Kudus, Jawa Tengah', '+62 812 3456 7890', 'hello@sahara.id', 'Senin - Jumat: 09.00 - 18.00
Sabtu: 09.00 - 15.00
Minggu: Tutup')
on conflict (id) do nothing;
