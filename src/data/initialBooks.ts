import { Book, LoanRecord } from '../types/library';

export const COVER_PRESETS = [
  {
    id: 'botanical',
    label: 'Ilustrasi Botani Rose',
    url: '/src/assets/images/cover_senja_nusantara_1795660148672.jpg',
  },
  {
    id: 'bauhaus',
    label: 'Geometri Arsitektur Plum',
    url: '/src/assets/images/cover_arsitektur_sistem_1795660148306.jpg',
  },
  {
    id: 'sculpture',
    label: 'Monograf Klasik Alabaster',
    url: '/src/assets/images/cover_jurnal_filsafat_1795660149664.jpg',
  },
  {
    id: 'watercolor',
    label: 'Cat Air Senja Pastel',
    url: '/src/assets/images/cover_seni_ketenangan_1795660150248.jpg',
  },
];

export const HERO_IMAGE_URL = '/src/assets/images/hero_library_rose_1795660147619.jpg';

export const INITIAL_BOOKS: Book[] = [
  {
    id: 'book-01',
    catalogCode: 'PR-FIK-101',
    title: 'Senja di Taman Kamelia',
    author: 'Nadia Larasati',
    category: 'Fiksi',
    language: 'Indonesia',
    publisher: 'Pustaka Gramedia Utama',
    year: 2024,
    pages: 312,
    rating: 4.9,
    status: 'Tersedia',
    coverUrl: '/src/assets/images/cover_senja_nusantara_1795660148672.jpg',
    coverPalette: 'rose-ivory',
    keywords: ['sastra', 'keluarga', 'sejarah', 'botani', 'jakarta'],
    synopsis:
      'Berlatar rumah kaca tua di kawasan Menteng pada penghujung dekade 1980-an, novel ini mengikuti perjalanan Raras yang berusaha merawat arsip botani peninggalan neneknya. Di balik lembaran herbarium yang mengering, tersimpan surat-surat tak terkirim yang perlahan menyingkap sejarah cinta, pengorbanan, dan rekonsiliasi tiga generasi perempuan.',
    chapters: [
      {
        title: 'Bab I — Rumah Kaca di Ujung Jalan Teuku Umar',
        content: [
          'Hujan sore itu turun dengan ritme yang tenang, membasahi kaca-kaca buram di beranda belakang rumah Nenek Sekar. Dari balik jendela tinggi, batang-batang kamelia yang ditanam lima puluh tahun lalu tampak berkilau seperti porselen basah.',
          'Raras membuka kotak kayu mahoni yang baru saja diturunkan dari loteng. Di dalamnya, tersusun rapi ratusan lembar kertas katun yang menguning, masing-masing menjepit kelopak bunga kering beserta catatan tangan bertinta merah marun yang sudah memudar.',
          'Setiap spesimen bukan sekadar catatan taksonomi; di sudut kiri bawah selalu tertera tanggal, nama kota, dan sebaris kalimat pendek yang terdengar seperti potongan dialog yang terhenti di tengah jalan.',
        ],
      },
      {
        title: 'Bab II — Catatan Tinta Merah Marun',
        content: [
          'Pada lembar bertanggal 14 November 1957, Raras menemukan sebuah kelopak teratai merah muda yang masih mempertahankan semburat warnanya. Di bawahnya tertulis: "Jika surat ini tidak pernah sampai ke Pelabuhan Tanjung Priok, anggaplah taman ini sebagai saksi."',
          'Kalimat itu membuat Raras terdiam cukup lama. Selama ini keluarga besarnya selalu meyakini bahwa Nenek Sekar hidup menyendiri karena pilihan artistiknya sebagai ilustrator flora, bukan karena sebuah perjanjian yang belum selesai.',
        ],
      },
      {
        title: 'Bab III — Benih yang Menunggu Musim',
        content: [
          'Keesokan paginya, Raras membawa buku catatan tua itu ke perpustakaan kota untuk mencocokkan stempel pos dan arsip penerbitan lama. Di ruang baca yang hening, ia mulai menyusun kembali kepingan cerita yang tercecer selama setengah abad.',
        ],
      },
    ],
  },
  {
    id: 'book-02',
    catalogCode: 'PR-TEK-204',
    title: 'Designing Resilient Distributed Systems',
    author: 'Elena Vance & Henrik Lindqvist',
    category: 'Teknologi',
    language: 'English',
    publisher: 'Nordic Press Engineering',
    year: 2025,
    pages: 428,
    rating: 4.8,
    status: 'Tersedia',
    coverUrl: '/src/assets/images/cover_arsitektur_sistem_1795660148306.jpg',
    coverPalette: 'plum-linen',
    keywords: ['architecture', 'cloud', 'distributed', 'microservices', 'latency'],
    synopsis:
      'A practical architectural guide to building fault-tolerant distributed software at scale. Combining formal consensus theory with real-world post-mortems, Vance and Lindqvist examine graceful degradation, idempotent event pipelines, backpressure mechanisms, and human-centered observability.',
    chapters: [
      {
        title: 'Chapter 1 — The Myth of Constant Connectivity',
        content: [
          'Every distributed architecture begins with an optimistic diagram on a whiteboard: clean arrows connecting tidy boxes, each communicating instantaneously without packet loss or clock skew. Reality, however, operates under permanent partial failure.',
          'Resilient engineering does not seek to eliminate network partitions or hardware decay; instead, it treats failure as a first-class domain state that every component must navigate predictably.',
        ],
      },
      {
        title: 'Chapter 2 — Backpressure and Bounded Queues',
        content: [
          'Unbounded buffers conceal bottlenecks until memory exhaustion cascades across an entire cluster. By designing explicit backpressure signals and load-shedding boundaries at ingress gateways, systems preserve core user journeys even during tenfold traffic spikes.',
        ],
      },
    ],
  },
  {
    id: 'book-03',
    catalogCode: 'PR-AKA-309',
    title: 'Estetika Ruang Publik dalam Arsitektur Nusantara',
    author: 'Prof. Dr. Ardiansyah Putra',
    category: 'Akademik/Jurnal',
    language: 'Indonesia',
    publisher: 'Penerbit Universitas Dharma',
    year: 2023,
    pages: 276,
    rating: 4.7,
    status: 'Dipinjam',
    coverUrl: '/src/assets/images/cover_jurnal_filsafat_1795660149664.jpg',
    coverPalette: 'blush-noir',
    keywords: ['arsitektur', 'urbanisme', 'riset', 'monograf', 'budaya'],
    synopsis:
      'Monograf akademik yang menelaah transformasi alun-alun, pendopo, dan ruang komunal tropis dari era prakolonial hingga kota metropolitan kontemporer. Dilengkapi studi lapangan di Yogyakarta, Bandung, dan Makassar mengenai bagaimana material lokal membentuk interaksi sosial warga.',
    chapters: [
      {
        title: 'Bab I — Pendopo sebagai Ruang Transisi Sosial',
        content: [
          'Dalam tradisi arsitektur Jawa dan sebagian besar Nusantara, batas antara ruang privat dan ruang publik tidak pernah dibangun sebagai dinding masif yang kedap suara. Atap berundak dan lantai yang ditinggikan menciptakan ambang visual yang mengundang sekaligus menjaga tata krama.',
          'Penelitian ini mencatat bagaimana perubahan rasio ruang hijau dan perkerasan beton pada dekade terakhir memengaruhi frekuensi perjumpaan informal antarwarga di kota-kota menengah.',
        ],
      },
      {
        title: 'Bab II — Cahaya Tropis dan Material Berpori',
        content: [
          'Penggunaan bata terakota, kayu ulin, dan batu alam bukan sekadar pilihan estetika vernakular, melainkan strategi termal pasif yang merespons kelembapan tinggi sepanjang tahun.',
        ],
      },
    ],
  },
  {
    id: 'book-04',
    catalogCode: 'PR-PGD-412',
    title: 'Seni Ketenangan di Tengah Kebisingan Digital',
    author: 'Klara Wijaya',
    category: 'Pengembangan Diri',
    language: 'Indonesia',
    publisher: 'Lentera Hati Press',
    year: 2025,
    pages: 224,
    rating: 4.9,
    status: 'Tersedia',
    coverUrl: '/src/assets/images/cover_seni_ketenangan_1795660150248.jpg',
    coverPalette: 'mauve-sage',
    keywords: ['mindfulness', 'fokus', 'kebiasaan', 'produktivitas', 'ketenangan'],
    synopsis:
      'Buku refleksi praktis tentang merancang ulang ritme perhatian di era notifikasi tanpa henti. Klara Wijaya memadukan riset neurosains atensi dengan kebiasaan sederhana seperti membaca mendalam selama dua puluh menit setiap pagi dan menciptakan batas sehat antara ruang kerja dan istirahat.',
    chapters: [
      {
        title: 'Bab I — Ekonomi Perhatian dan Kelelahan Halus',
        content: [
          'Sebagian besar kelelahan yang kita rasakan di akhir hari bukanlah akibat pekerjaan fisik yang berat, melainkan residu dari ratusan perpindahan konteks kecil yang terjadi setiap jam.',
          'Ketika perhatian kita terpecah menjadi fragmen tiga puluh detik, otak kehilangan kesempatan untuk memasuki fase pemikiran mendalam yang justru menghasilkan kepuasan sejati.',
        ],
      },
      {
        title: 'Bab II — Ritual Pagi Tanpa Layar',
        content: [
          'Menunda kontak pertama dengan umpan berita selama tiga puluh menit setelah bangun tidur memberi ruang bagi sistem saraf untuk menetapkan agenda hari berdasarkan niat pribadi, bukan urgensi orang lain.',
        ],
      },
    ],
  },
  {
    id: 'book-05',
    catalogCode: 'PR-NON-502',
    title: 'Sejarah Singkat Perempuan Perintis Sains',
    author: 'Dr. Maya Kusumawardani',
    category: 'Non-Fiksi',
    language: 'Indonesia',
    publisher: 'Katalis Ilmu Publishing',
    year: 2024,
    pages: 340,
    rating: 4.8,
    status: 'Tersedia',
    coverPalette: 'berry-vellum',
    keywords: ['sejarah', 'sains', 'biografi', 'astronomi', 'inspirasi'],
    synopsis:
      'Kumpulan esai biografis yang mengangkat kisah lima belas ilmuwan perempuan dari berbagai abad—mulai dari ahli astronomi di observatorium kuno hingga pelopor komputasi modern dan biologi molekuler di Asia Tenggara—yang kontribusinya kerap terpinggirkan dalam catatan buku teks.',
    chapters: [
      {
        title: 'Bab I — Para Penghitung Bintang di Observatorium Lama',
        content: [
          'Sebelum fotografi astronomi otomatis hadir, ribuan pelat kaca berisi spektrum cahaya bintang dianalisis satu per satu menggunakan kaca pembesar oleh para peneliti perempuan yang bekerja dalam keheningan ruang arsip.',
          'Ketelitian mereka bukan hanya mengatalogkan ratusan ribu bintang, melainkan juga menemukan hukum hubungan periode-luminositas yang kelak digunakan untuk mengukur luas alam semesta.',
        ],
      },
      {
        title: 'Bab II — Laboratorium di Tepi Khatulistiwa',
        content: [
          'Di kawasan tropis, penelitian botani dan farmakologi modern bertumbuh dari kerja keras peneliti lokal yang mendokumentasikan kekayaan hayati kepulauan dengan ketekunan luar biasa.',
        ],
      },
    ],
  },
  {
    id: 'book-06',
    catalogCode: 'PR-FIK-118',
    title: 'The Cartographer of Forgotten Letters',
    author: 'Julian Mercer',
    category: 'Fiksi',
    language: 'English',
    publisher: 'Albion Literary House',
    year: 2023,
    pages: 368,
    rating: 4.7,
    status: 'Dipinjam',
    coverPalette: 'plum-linen',
    keywords: ['fiction', 'mystery', 'letters', 'archive', 'europe'],
    synopsis:
      'When an archivist in a quiet coastal town inherits a ledger of undelivered wartime correspondence, he begins mapping the journeys of strangers across three decades. A lyrical novel about memory, misplaced trust, and the quiet resilience of written words.',
    chapters: [
      {
        title: 'Chapter 1 — The Copper Ledger',
        content: [
          'Salt air had tarnished the hinges of the basement vault, yet the paper inside remained astonishingly crisp. Arthur placed the leather-bound register beneath the brass lamp and traced the ink index with his thumb.',
          'Every entry bore a destination that no longer existed on modern railway timetables—small station towns renamed after borders shifted.',
        ],
      },
      {
        title: 'Chapter 2 — Coordinates of Return',
        content: [
          'By pinning faded postage stamps onto an old maritime map, Arthur realized the letters did not scatter randomly; they converged along a single coastal ferry route.',
        ],
      },
    ],
  },
  {
    id: 'book-07',
    catalogCode: 'PR-TEK-215',
    title: 'Rekayasa Antarmuka Manusia & Tipografi Digital',
    author: 'Raka Pratama & Sinta Dewi',
    category: 'Teknologi',
    language: 'Indonesia',
    publisher: 'Studio Aksara Digital',
    year: 2025,
    pages: 288,
    rating: 4.9,
    status: 'Tersedia',
    coverPalette: 'rose-ivory',
    keywords: ['ui/ux', 'desain', 'tipografi', 'aksesibilitas', 'web'],
    synopsis:
      'Panduan komprehensif bagi desainer produk dan pengembang web dalam merancang antarmuka digital yang ramah mata, mudah diakses, dan memiliki hierarki tipografi yang matang. Membahas kontras warna WCAG, ritme spasial, serta psikologi keterbacaan di layar beresolusi tinggi.',
    chapters: [
      {
        title: 'Bab I — Keterbacaan sebagai Bentuk Empati',
        content: [
          'Antarmuka yang baik tidak memaksa pengguna menebak di mana harus melihat terlebih dahulu. Dengan mengatur ukuran huruf, jarak baris, dan kontras latar secara terukur, desain berubah menjadi pemandu yang tenang.',
          'Panjang baris optimal antara 60 hingga 75 karakter terbukti secara konsisten mengurangi kelelahan mata pada sesi baca panjang.',
        ],
      },
      {
        title: 'Bab II — Harmoni Warna dan Kontras Aksesibel',
        content: [
          'Warna bukan sekadar dekorasi emosional; dalam sistem desain modern, warna bertugas memisahkan kanvas netral, permukaan struktural, dan titik aksi utama tanpa mengorbankan rasio kontras minimum 4.5:1.',
        ],
      },
    ],
  },
  {
    id: 'book-08',
    catalogCode: 'PR-AKA-321',
    title: 'Journal of Sustainable Urban Ecology Vol. 14',
    author: 'Dr. Clara Lindholm (Ed.)',
    category: 'Akademik/Jurnal',
    language: 'English',
    publisher: 'Elsevier Academic Commons',
    year: 2025,
    pages: 196,
    rating: 4.6,
    status: 'Tersedia',
    coverPalette: 'mauve-sage',
    keywords: ['journal', 'ecology', 'climate', 'urban', 'research'],
    synopsis:
      'Peer-reviewed interdisciplinary volume investigating urban heat island mitigation, permeable sponge-city corridors, and community-led micro-forests across Southeast Asian and European metropolitan centers.',
    chapters: [
      {
        title: 'Paper 01 — Canopy Density and Microclimate Cooling',
        content: [
          'Empirical thermal imaging gathered across twelve high-density districts demonstrates that multi-layered native street canopies lower pedestrian-level radiant temperatures by up to 4.2°C during peak afternoon hours.',
        ],
      },
      {
        title: 'Paper 02 — Bioretention Gardens in Heritage Precincts',
        content: [
          'Integrating sunken rain gardens along historic stone pavements substantially reduces stormwater runoff velocity without disrupting traditional streetscapes.',
        ],
      },
    ],
  },
  {
    id: 'book-09',
    catalogCode: 'PR-NON-519',
    title: 'Ekonomi Kreator & Masa Depan Penerbitan Independen',
    author: 'Bagus Santoso',
    category: 'Non-Fiksi',
    language: 'Indonesia',
    publisher: 'Penerbit Indie Nusantara',
    year: 2024,
    pages: 254,
    rating: 4.7,
    status: 'Tersedia',
    coverPalette: 'terracotta-cream',
    keywords: ['ekonomi', 'penerbitan', 'media', 'kreatif', 'bisnis'],
    synopsis:
      'Analisis mendalam mengenai pergeseran ekosistem buku dan buletin digital independen di Indonesia. Mengulas model keanggotaan pembaca, distribusi cetak sesuai permintaan (print-on-demand), dan bagaimana komunitas literasi kecil mampu membangun keberlanjutan finansial.',
    chapters: [
      {
        title: 'Bab I — Kebangkitan Toko Buku Independen & Zine',
        content: [
          'Di tengah gelombang konten singkat yang seragam, pembaca justru kembali mencari kurasi yang personal dan bertempo lambat. Toko buku kecil yang merangkap ruang diskusi tumbuh menjadi simpul budaya baru di banyak kota.',
        ],
      },
    ],
  },
  {
    id: 'book-10',
    catalogCode: 'PR-PGD-428',
    title: 'Quiet Craft: Building Meaningful Creative Habits',
    author: 'Hana Takahashi',
    category: 'Pengembangan Diri',
    language: 'English',
    publisher: 'Koto Editorial Press',
    year: 2024,
    pages: 210,
    rating: 4.9,
    status: 'Tersedia',
    coverPalette: 'blush-noir',
    keywords: ['creativity', 'habits', 'journaling', 'craft', 'mindset'],
    synopsis:
      'Drawing inspiration from ceramicists, bookbinders, and quiet studio practitioners in Kyoto, Hana Takahashi offers a thoughtful framework for sustaining creative work over decades without burnout or obsession with external validation.',
    chapters: [
      {
        title: 'Chapter 1 — The Rhythm of Daily Practice',
        content: [
          'Mastery rarely arrives as a sudden burst of inspiration; it accumulates quietly through small, repeatable gestures performed with full attention—sharpening a tool, mixing pigment, or writing three honest paragraphs before noon.',
        ],
      },
    ],
  },
];

export const INITIAL_LOANS: LoanRecord[] = [
  {
    id: 'loan-seed-1',
    bookId: 'book-03',
    bookTitle: 'Estetika Ruang Publik dalam Arsitektur Nusantara',
    bookAuthor: 'Prof. Dr. Ardiansyah Putra',
    catalogCode: 'PR-AKA-309',
    borrowerName: 'Indi Kurnia',
    memberId: 'PR-2026-0142',
    borrowedAt: '2026-11-20',
    dueDate: '2026-12-04',
    status: 'Aktif',
  },
  {
    id: 'loan-seed-2',
    bookId: 'book-06',
    bookTitle: 'The Cartographer of Forgotten Letters',
    bookAuthor: 'Julian Mercer',
    catalogCode: 'PR-FIK-118',
    borrowerName: 'Sari Melati',
    memberId: 'PR-2026-0089',
    borrowedAt: '2026-11-18',
    dueDate: '2026-12-02',
    status: 'Aktif',
  },
  {
    id: 'loan-seed-3',
    bookId: 'book-01',
    bookTitle: 'Senja di Taman Kamelia',
    bookAuthor: 'Nadia Larasati',
    catalogCode: 'PR-FIK-101',
    borrowerName: 'Indi Kurnia',
    memberId: 'PR-2026-0142',
    borrowedAt: '2026-11-01',
    dueDate: '2026-11-15',
    returnedAt: '2026-11-12',
    status: 'Dikembalikan',
  },
];
