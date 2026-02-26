type LocaleText = {
  id: string;
  en: string;
};

export type Article = {
  order: number;
  created_date: string;
  title: LocaleText;
  thumbnail: string;
  slug: string;
  name: LocaleText;
  content: LocaleText;
};

export const DUMMY_ARTICLES: Article[] = [
  {
    order: 1,
    created_date: "2026-02-20T09:00:00Z",
    title: {
      id: "Inovasi Plastik Ramah Lingkungan untuk Masa Depan",
      en: "Eco-Friendly Plastic Innovation for the Future",
    },
    thumbnail: "/images/articles/article-1.jpg",
    slug: "inovasi-plastik-ramah-lingkungan",
    name: {
      id: "Tim Redaksi Ligo",
      en: "Ligo Editorial Team",
    },
    content: {
      id: `<h2>Menuju Era Plastik Berkelanjutan</h2>
<p>Industri plastik global tengah mengalami transformasi besar menuju praktik yang lebih ramah lingkungan. Sebagai salah satu pemain utama di sektor ini, grup perusahaan kami berkomitmen penuh untuk mengembangkan solusi inovatif yang mengurangi dampak lingkungan.</p>
<h3>Teknologi Biodegradable</h3>
<p>Kami telah menginvestasikan lebih dari <strong>Rp 50 miliar</strong> dalam riset dan pengembangan material biodegradable selama tiga tahun terakhir. Hasilnya, produk kemasan kami kini mampu terurai secara alami dalam waktu <em>6-12 bulan</em>, jauh lebih cepat dibandingkan plastik konvensional.</p>
<blockquote><p>"Inovasi bukan pilihan, melainkan keharusan. Kami percaya bahwa plastik dan keberlanjutan bisa berjalan berdampingan."</p></blockquote>
<h3>Langkah Konkret Kami</h3>
<ul>
  <li>Penggunaan bahan baku berbasis <strong>pati jagung</strong> dan <strong>tebu</strong></li>
  <li>Pengurangan emisi karbon pabrik sebesar 30% pada tahun 2025</li>
  <li>Kerjasama dengan universitas lokal untuk riset material baru</li>
  <li>Program take-back untuk daur ulang produk bekas pakai</li>
</ul>
<p>Dengan langkah-langkah ini, kami optimis dapat menjadi pelopor industri plastik berkelanjutan di Asia Tenggara.</p>`,
      en: `<h2>Toward a Sustainable Plastics Era</h2>
<p>The global plastics industry is undergoing a major transformation toward more environmentally friendly practices. As a key player in this sector, our corporate group is fully committed to developing innovative solutions that reduce environmental impact.</p>
<h3>Biodegradable Technology</h3>
<p>We have invested over <strong>IDR 50 billion</strong> in research and development of biodegradable materials over the past three years. As a result, our packaging products can now decompose naturally within <em>6-12 months</em>, far faster than conventional plastics.</p>
<blockquote><p>"Innovation is not a choice, but a necessity. We believe that plastics and sustainability can go hand in hand."</p></blockquote>
<h3>Our Concrete Steps</h3>
<ul>
  <li>Use of raw materials based on <strong>corn starch</strong> and <strong>sugarcane</strong></li>
  <li>30% reduction in factory carbon emissions by 2025</li>
  <li>Collaboration with local universities for new material research</li>
  <li>Take-back program for recycling used products</li>
</ul>
<p>With these steps, we are optimistic about becoming a pioneer in sustainable plastics in Southeast Asia.</p>`,
    },
  },
  {
    order: 2,
    created_date: "2026-02-15T10:30:00Z",
    title: {
      id: "Ekspansi Pabrik Baru di Jawa Timur",
      en: "New Factory Expansion in East Java",
    },
    thumbnail: "/images/articles/article-2.jpg",
    slug: "ekspansi-pabrik-baru-jawa-timur",
    name: {
      id: "Departemen Komunikasi",
      en: "Communications Department",
    },
    content: {
      id: `<h2>Pabrik Baru di Kawasan Industri PIER Pasuruan</h2>
<p>Grup perusahaan kami resmi mengumumkan pembangunan fasilitas produksi terbaru yang berlokasi di <strong>Kawasan Industri PIER, Pasuruan, Jawa Timur</strong>. Pabrik ini diproyeksikan mulai beroperasi pada kuartal ketiga tahun 2026.</p>
<h3>Spesifikasi Fasilitas</h3>
<p>Fasilitas baru ini akan memiliki:</p>
<ol>
  <li>Luas lahan total <strong>15 hektar</strong></li>
  <li>Kapasitas produksi <strong>50.000 ton per tahun</strong></li>
  <li>Sistem otomasi penuh dengan teknologi <em>Industry 4.0</em></li>
  <li>Instalasi pengolahan air limbah (IPAL) berstandar internasional</li>
</ol>
<h3>Dampak Ekonomi</h3>
<p>Pembangunan pabrik ini akan menciptakan lebih dari <strong>2.000 lapangan kerja baru</strong> bagi masyarakat sekitar. Kami juga berencana menjalin kemitraan dengan UMKM lokal untuk rantai pasokan pendukung.</p>
<p>Investasi total untuk proyek ini mencapai <strong>Rp 800 miliar</strong>, menjadikannya salah satu investasi terbesar dalam sejarah perusahaan.</p>`,
      en: `<h2>New Factory at PIER Industrial Estate Pasuruan</h2>
<p>Our corporate group has officially announced the construction of a new production facility located at <strong>PIER Industrial Estate, Pasuruan, East Java</strong>. The factory is projected to begin operations in the third quarter of 2026.</p>
<h3>Facility Specifications</h3>
<p>The new facility will feature:</p>
<ol>
  <li>Total land area of <strong>15 hectares</strong></li>
  <li>Production capacity of <strong>50,000 tons per year</strong></li>
  <li>Full automation system with <em>Industry 4.0</em> technology</li>
  <li>International-standard wastewater treatment plant (WWTP)</li>
</ol>
<h3>Economic Impact</h3>
<p>The construction of this factory will create more than <strong>2,000 new jobs</strong> for the surrounding community. We also plan to establish partnerships with local SMEs for the supporting supply chain.</p>
<p>The total investment for this project reaches <strong>IDR 800 billion</strong>, making it one of the largest investments in company history.</p>`,
    },
  },
  {
    order: 3,
    created_date: "2026-02-10T08:00:00Z",
    title: {
      id: "Penghargaan ISO 9001 untuk Standar Kualitas Terbaik",
      en: "ISO 9001 Award for Best Quality Standards",
    },
    thumbnail: "/images/articles/article-3.jpg",
    slug: "penghargaan-iso-9001-kualitas",
    name: {
      id: "Tim Quality Assurance",
      en: "Quality Assurance Team",
    },
    content: {
      id: `<h2>Raih Sertifikasi ISO 9001:2015 dengan Nilai Sempurna</h2>
<p>Kami dengan bangga mengumumkan bahwa seluruh unit produksi dalam grup perusahaan telah berhasil meraih <strong>sertifikasi ISO 9001:2015</strong> dengan nilai audit yang memuaskan dari lembaga sertifikasi internasional.</p>
<h3>Proses Audit yang Ketat</h3>
<p>Proses audit berlangsung selama <em>dua minggu penuh</em> dan mencakup evaluasi menyeluruh terhadap:</p>
<ul>
  <li>Sistem manajemen mutu di seluruh lini produksi</li>
  <li>Dokumentasi dan prosedur operasi standar (SOP)</li>
  <li>Kepuasan pelanggan dan penanganan keluhan</li>
  <li>Proses perbaikan berkelanjutan (<em>continuous improvement</em>)</li>
</ul>
<h3>Komitmen Kualitas</h3>
<p>Pencapaian ini menegaskan komitmen kami terhadap standar kualitas tertinggi. Setiap produk yang keluar dari pabrik kami telah melalui <strong>7 tahap quality control</strong> yang ketat sebelum sampai ke tangan konsumen.</p>
<blockquote><p>"Kualitas adalah fondasi dari setiap produk yang kami hasilkan. Sertifikasi ini bukan akhir, melainkan awal dari standar yang lebih tinggi."</p></blockquote>`,
      en: `<h2>Achieved ISO 9001:2015 Certification with Perfect Score</h2>
<p>We are proud to announce that all production units within our corporate group have successfully obtained <strong>ISO 9001:2015 certification</strong> with satisfactory audit scores from an international certification body.</p>
<h3>Rigorous Audit Process</h3>
<p>The audit process lasted for <em>two full weeks</em> and included a comprehensive evaluation of:</p>
<ul>
  <li>Quality management systems across all production lines</li>
  <li>Documentation and standard operating procedures (SOPs)</li>
  <li>Customer satisfaction and complaint handling</li>
  <li>Continuous improvement processes</li>
</ul>
<h3>Quality Commitment</h3>
<p>This achievement reaffirms our commitment to the highest quality standards. Every product leaving our factory has undergone <strong>7 strict quality control stages</strong> before reaching consumers.</p>
<blockquote><p>"Quality is the foundation of every product we make. This certification is not the end, but the beginning of even higher standards."</p></blockquote>`,
    },
  },
  {
    order: 4,
    created_date: "2026-01-28T14:00:00Z",
    title: {
      id: "Kemitraan Strategis dengan Distributor Asia Tenggara",
      en: "Strategic Partnership with Southeast Asian Distributors",
    },
    thumbnail: "/images/articles/article-4.jpg",
    slug: "kemitraan-strategis-distributor-asia-tenggara",
    name: {
      id: "Divisi Business Development",
      en: "Business Development Division",
    },
    content: {
      id: `<h2>Memperluas Jaringan Distribusi ke 5 Negara ASEAN</h2>
<p>Dalam langkah strategis untuk memperkuat kehadiran regional, kami telah menandatangani perjanjian kemitraan jangka panjang dengan <strong>distributor terkemuka di 5 negara ASEAN</strong>: Malaysia, Thailand, Vietnam, Filipina, dan Myanmar.</p>
<h3>Detail Kemitraan</h3>
<p>Perjanjian ini mencakup beberapa aspek penting:</p>
<ol>
  <li><strong>Distribusi eksklusif</strong> untuk lini produk kemasan food-grade</li>
  <li><strong>Joint marketing</strong> dengan anggaran bersama senilai USD 5 juta</li>
  <li><strong>Transfer teknologi</strong> untuk standarisasi kualitas produk</li>
  <li><strong>Pelatihan teknis</strong> bagi tim distributor di setiap negara</li>
</ol>
<h3>Target Pasar</h3>
<p>Dengan kemitraan ini, kami menargetkan peningkatan <strong>volume ekspor sebesar 40%</strong> dalam dua tahun ke depan. Pasar makanan dan minuman di Asia Tenggara yang terus bertumbuh menjadi peluang besar bagi produk kemasan berkualitas tinggi kami.</p>
<p>Penandatanganan MoU dilaksanakan di <em>Jakarta Convention Center</em> dan dihadiri oleh perwakilan dari seluruh mitra distribusi.</p>`,
      en: `<h2>Expanding Distribution Network to 5 ASEAN Countries</h2>
<p>In a strategic move to strengthen our regional presence, we have signed long-term partnership agreements with <strong>leading distributors in 5 ASEAN countries</strong>: Malaysia, Thailand, Vietnam, the Philippines, and Myanmar.</p>
<h3>Partnership Details</h3>
<p>This agreement covers several key aspects:</p>
<ol>
  <li><strong>Exclusive distribution</strong> for food-grade packaging product lines</li>
  <li><strong>Joint marketing</strong> with a shared budget of USD 5 million</li>
  <li><strong>Technology transfer</strong> for product quality standardization</li>
  <li><strong>Technical training</strong> for distributor teams in each country</li>
</ol>
<h3>Target Market</h3>
<p>With this partnership, we are targeting a <strong>40% increase in export volume</strong> within the next two years. The growing food and beverage market in Southeast Asia presents a significant opportunity for our high-quality packaging products.</p>
<p>The MoU signing ceremony was held at the <em>Jakarta Convention Center</em> and attended by representatives from all distribution partners.</p>`,
    },
  },
  {
    order: 5,
    created_date: "2026-01-20T11:00:00Z",
    title: {
      id: "Teknologi Daur Ulang Plastik Generasi Terbaru",
      en: "Next-Generation Plastic Recycling Technology",
    },
    thumbnail: "/images/articles/article-5.jpg",
    slug: "teknologi-daur-ulang-plastik",
    name: {
      id: "Tim Riset & Pengembangan",
      en: "Research & Development Team",
    },
    content: {
      id: `<h2>Implementasi Chemical Recycling di Fasilitas Produksi</h2>
<p>Sebagai bagian dari komitmen keberlanjutan, kami telah mengimplementasikan teknologi <strong>chemical recycling</strong> generasi terbaru di fasilitas produksi utama kami. Teknologi ini memungkinkan daur ulang plastik campuran yang sebelumnya tidak dapat didaur ulang secara mekanis.</p>
<h3>Keunggulan Teknologi</h3>
<ul>
  <li><strong>Efisiensi tinggi</strong> — mampu memproses hingga 10.000 ton limbah plastik per tahun</li>
  <li><strong>Multi-material</strong> — dapat mendaur ulang berbagai jenis plastik dalam satu proses</li>
  <li><strong>Kualitas output</strong> — menghasilkan bahan baku setara virgin material</li>
  <li><strong>Emisi rendah</strong> — menggunakan sistem closed-loop yang meminimalkan polusi udara</li>
</ul>
<h3>Kolaborasi Riset</h3>
<p>Pengembangan teknologi ini merupakan hasil kolaborasi selama <em>3 tahun</em> dengan <strong>Institut Teknologi Bandung (ITB)</strong> dan <strong>Fraunhofer Institute</strong> dari Jerman. Investasi riset mencapai Rp 120 miliar.</p>
<blockquote><p>"Daur ulang bukan lagi sekadar menghancurkan dan mencetak ulang. Chemical recycling membuka dimensi baru dalam ekonomi sirkular plastik."</p></blockquote>`,
      en: `<h2>Chemical Recycling Implementation at Production Facilities</h2>
<p>As part of our sustainability commitment, we have implemented next-generation <strong>chemical recycling</strong> technology at our main production facility. This technology enables the recycling of mixed plastics that were previously unable to be mechanically recycled.</p>
<h3>Technology Advantages</h3>
<ul>
  <li><strong>High efficiency</strong> — capable of processing up to 10,000 tons of plastic waste per year</li>
  <li><strong>Multi-material</strong> — can recycle various types of plastics in a single process</li>
  <li><strong>Output quality</strong> — produces raw materials equivalent to virgin material</li>
  <li><strong>Low emissions</strong> — uses a closed-loop system that minimizes air pollution</li>
</ul>
<h3>Research Collaboration</h3>
<p>The development of this technology is the result of a <em>3-year</em> collaboration with <strong>Institut Teknologi Bandung (ITB)</strong> and <strong>Fraunhofer Institute</strong> from Germany. Research investment reached IDR 120 billion.</p>
<blockquote><p>"Recycling is no longer just about shredding and remolding. Chemical recycling opens a new dimension in the circular plastics economy."</p></blockquote>`,
    },
  },
  {
    order: 6,
    created_date: "2026-01-12T09:30:00Z",
    title: {
      id: "Peluncuran Produk Kemasan Food-Grade Terbaru",
      en: "Launch of Latest Food-Grade Packaging Products",
    },
    thumbnail: "/images/articles/article-6.jpg",
    slug: "peluncuran-produk-kemasan-food-grade",
    name: {
      id: "Divisi Pemasaran Produk",
      en: "Product Marketing Division",
    },
    content: {
      id: `<h2>Seri EcoPack: Kemasan Food-Grade yang Aman dan Ramah Lingkungan</h2>
<p>Kami dengan antusias memperkenalkan <strong>seri EcoPack</strong>, lini produk kemasan food-grade terbaru yang menggabungkan keamanan pangan, daya tahan, dan tanggung jawab lingkungan dalam satu solusi kemasan.</p>
<h3>Varian Produk</h3>
<p>Seri EcoPack tersedia dalam beberapa varian:</p>
<ol>
  <li><strong>EcoPack Clear</strong> — kemasan transparan untuk produk segar dan frozen food</li>
  <li><strong>EcoPack Seal</strong> — kemasan vacuum-sealed untuk daging dan seafood</li>
  <li><strong>EcoPack Flex</strong> — kemasan fleksibel untuk snack dan makanan kering</li>
  <li><strong>EcoPack Bowl</strong> — wadah siap saji untuk industri horeka</li>
</ol>
<h3>Sertifikasi dan Keamanan</h3>
<p>Seluruh produk EcoPack telah lulus uji dan mendapat sertifikasi:</p>
<ul>
  <li>BPOM RI untuk keamanan kontak makanan</li>
  <li><strong>FDA (Food and Drug Administration)</strong> Amerika Serikat</li>
  <li>SNI 7988:2023 untuk kemasan plastik food-grade</li>
</ul>
<p>Produk sudah tersedia untuk <em>pre-order</em> dan akan mulai didistribusikan secara nasional pada <strong>Maret 2026</strong>.</p>`,
      en: `<h2>EcoPack Series: Safe and Eco-Friendly Food-Grade Packaging</h2>
<p>We are excited to introduce the <strong>EcoPack series</strong>, our latest food-grade packaging product line that combines food safety, durability, and environmental responsibility in one packaging solution.</p>
<h3>Product Variants</h3>
<p>The EcoPack series is available in several variants:</p>
<ol>
  <li><strong>EcoPack Clear</strong> — transparent packaging for fresh products and frozen food</li>
  <li><strong>EcoPack Seal</strong> — vacuum-sealed packaging for meat and seafood</li>
  <li><strong>EcoPack Flex</strong> — flexible packaging for snacks and dry food</li>
  <li><strong>EcoPack Bowl</strong> — ready-to-serve containers for the horeka industry</li>
</ol>
<h3>Certification and Safety</h3>
<p>All EcoPack products have passed testing and received certification from:</p>
<ul>
  <li>BPOM RI for food contact safety</li>
  <li><strong>FDA (Food and Drug Administration)</strong> of the United States</li>
  <li>SNI 7988:2023 for food-grade plastic packaging</li>
</ul>
<p>Products are now available for <em>pre-order</em> and will begin nationwide distribution in <strong>March 2026</strong>.</p>`,
    },
  },
  {
    order: 7,
    created_date: "2026-01-05T13:00:00Z",
    title: {
      id: "Partisipasi di Pameran Industri Plastik Internasional",
      en: "Participation in International Plastics Industry Exhibition",
    },
    thumbnail: "/images/articles/article-7.jpg",
    slug: "pameran-industri-plastik-internasional",
    name: {
      id: "Tim Events & Promosi",
      en: "Events & Promotions Team",
    },
    content: {
      id: `<h2>Tampil di Chinaplas 2026, Pameran Plastik Terbesar di Asia</h2>
<p>Grup perusahaan kami berpartisipasi dalam <strong>Chinaplas 2026</strong>, pameran industri plastik dan karet terbesar di Asia yang diselenggarakan di <em>Shenzhen World Exhibition & Convention Center</em>, Tiongkok, pada 15-18 April 2026.</p>
<h3>Booth dan Showcase</h3>
<p>Di booth seluas <strong>200 m²</strong>, kami menampilkan:</p>
<ul>
  <li>Demonstrasi langsung proses produksi dengan mesin blow molding terbaru</li>
  <li>Pameran produk seri <strong>EcoPack</strong> dan material biodegradable</li>
  <li>Presentasi teknologi <strong>chemical recycling</strong> kepada pengunjung industri</li>
  <li>Zona networking untuk pertemuan bisnis B2B</li>
</ul>
<h3>Pencapaian di Pameran</h3>
<p>Selama empat hari pameran, kami berhasil:</p>
<ol>
  <li>Menerima lebih dari <strong>500 pengunjung</strong> di booth kami</li>
  <li>Menjalin <strong>35 kontak bisnis baru</strong> dari 12 negara</li>
  <li>Menandatangani <strong>3 Letter of Intent (LoI)</strong> untuk distribusi internasional</li>
</ol>
<p>Partisipasi di Chinaplas memperkuat posisi kami sebagai pemain regional yang siap bersaing di kancah global.</p>`,
      en: `<h2>Exhibiting at Chinaplas 2026, Asia's Largest Plastics Exhibition</h2>
<p>Our corporate group participated in <strong>Chinaplas 2026</strong>, the largest plastics and rubber industry exhibition in Asia, held at the <em>Shenzhen World Exhibition & Convention Center</em>, China, from April 15-18, 2026.</p>
<h3>Booth and Showcase</h3>
<p>At our <strong>200 m²</strong> booth, we showcased:</p>
<ul>
  <li>Live demonstrations of production processes with the latest blow molding machines</li>
  <li>Exhibition of <strong>EcoPack</strong> series products and biodegradable materials</li>
  <li>Presentation of <strong>chemical recycling</strong> technology to industry visitors</li>
  <li>Networking zone for B2B business meetings</li>
</ul>
<h3>Exhibition Achievements</h3>
<p>During the four-day exhibition, we successfully:</p>
<ol>
  <li>Received more than <strong>500 visitors</strong> at our booth</li>
  <li>Established <strong>35 new business contacts</strong> from 12 countries</li>
  <li>Signed <strong>3 Letters of Intent (LoI)</strong> for international distribution</li>
</ol>
<p>Our participation at Chinaplas strengthens our position as a regional player ready to compete on the global stage.</p>`,
    },
  },
  {
    order: 8,
    created_date: "2025-12-28T10:00:00Z",
    title: {
      id: "Program CSR: Edukasi Pengelolaan Sampah Plastik",
      en: "CSR Program: Plastic Waste Management Education",
    },
    thumbnail: "/images/articles/article-8.jpg",
    slug: "program-csr-edukasi-pengelolaan-sampah",
    name: {
      id: "Divisi CSR & Keberlanjutan",
      en: "CSR & Sustainability Division",
    },
    content: {
      id: `<h2>Program "Plastik Bijak" untuk 50 Sekolah di Jawa dan Bali</h2>
<p>Sebagai wujud tanggung jawab sosial perusahaan, kami meluncurkan program <strong>"Plastik Bijak"</strong>, sebuah inisiatif edukasi pengelolaan sampah plastik yang menyasar <strong>50 sekolah dasar dan menengah</strong> di Jawa dan Bali.</p>
<h3>Komponen Program</h3>
<p>Program ini terdiri dari empat pilar utama:</p>
<ol>
  <li><strong>Workshop interaktif</strong> — Pelatihan 3 hari untuk guru dan siswa tentang pemilahan dan daur ulang sampah</li>
  <li><strong>Bank Sampah Sekolah</strong> — Penyediaan infrastruktur bank sampah di setiap sekolah peserta</li>
  <li><strong>Kompetisi kreativitas</strong> — Lomba karya seni dari bahan plastik daur ulang</li>
  <li><strong>Kunjungan pabrik</strong> — Field trip ke fasilitas daur ulang kami untuk siswa berprestasi</li>
</ol>
<h3>Dampak yang Diharapkan</h3>
<ul>
  <li>Menjangkau lebih dari <strong>15.000 siswa</strong> secara langsung</li>
  <li>Mengumpulkan dan mendaur ulang <strong>10 ton sampah plastik</strong> dari lingkungan sekolah</li>
  <li>Membentuk <strong>50 komunitas peduli lingkungan</strong> berbasis sekolah</li>
</ul>
<blockquote><p>"Perubahan dimulai dari generasi muda. Dengan edukasi yang tepat, kita bisa membangun budaya pengelolaan sampah yang bertanggung jawab sejak dini."</p></blockquote>
<p>Program ini didukung oleh <strong>Kementerian Lingkungan Hidup dan Kehutanan</strong> serta beberapa organisasi non-profit lingkungan.</p>`,
      en: `<h2>"Smart Plastics" Program for 50 Schools in Java and Bali</h2>
<p>As a manifestation of our corporate social responsibility, we launched the <strong>"Smart Plastics"</strong> program, a plastic waste management education initiative targeting <strong>50 elementary and secondary schools</strong> in Java and Bali.</p>
<h3>Program Components</h3>
<p>The program consists of four main pillars:</p>
<ol>
  <li><strong>Interactive workshops</strong> — 3-day training for teachers and students on waste sorting and recycling</li>
  <li><strong>School Waste Banks</strong> — Provision of waste bank infrastructure at each participating school</li>
  <li><strong>Creativity competition</strong> — Art contest using recycled plastic materials</li>
  <li><strong>Factory visits</strong> — Field trips to our recycling facilities for top-performing students</li>
</ol>
<h3>Expected Impact</h3>
<ul>
  <li>Reaching more than <strong>15,000 students</strong> directly</li>
  <li>Collecting and recycling <strong>10 tons of plastic waste</strong> from school environments</li>
  <li>Establishing <strong>50 school-based environmental communities</strong></li>
</ul>
<blockquote><p>"Change starts with the younger generation. With proper education, we can build a culture of responsible waste management from an early age."</p></blockquote>
<p>This program is supported by the <strong>Ministry of Environment and Forestry</strong> and several environmental non-profit organizations.</p>`,
    },
  },
];
