export type LocaleText = {
  id: string;
  en: string;
};

type Certificate = {
  id: string;
  name: string; // Certificate names are universal (ISO, HACCP, etc.)
  image: string;
};

type ProvenStrength = {
  title: LocaleText;
  description: LocaleText;
  bgImage?: string;
  bgColor?: string;
};

type Product = {
  id: string;
  name: LocaleText;
  image: string;
};

type Brand = {
  name: string; // Brand names are universal
  image: string;
  featured?: boolean; // Show on homepage brand grid
};

type CoverSection = {
  images: string[];
};

type VisitLocation = {
  name: LocaleText;
  location: LocaleText;
};

type Company = {
  order: number;
  slug: string;
  name: LocaleText;
  initial_name: LocaleText;
  thumbnail: string;
  logo: string;
  description: LocaleText;
  full_description: LocaleText;
  certifications: Certificate[];
  provens: ProvenStrength[];
  products: Product[];
  brands: Brand[];
  cover_sections: CoverSection[];
  locations: VisitLocation[];
  cover_image: string[];
  hero_image: string[];
};

export type TCompany = Company;

type CompanyListItem = Pick<
  Company,
  | "order"
  | "slug"
  | "name"
  | "initial_name"
  | "logo"
  | "description"
  | "thumbnail"
>;

export type TCompanyListItem = CompanyListItem;

const DUMMY_COMPANIES: Company[] = [
  {
    order: 1,
    slug: "pt-prima-plastindo",
    name: {
      id: "PT Prima Plastindo",
      en: "PT Prima Plastindo",
    },
    initial_name: {
      id: "Prima Plastindo",
      en: "Prima Plastindo",
    },
    thumbnail:
      "https://placehold.co/600x400/1a56db/ffffff?text=Prima+Plastindo",
    logo: "https://placehold.co/200x80/1a56db/ffffff?text=PP",
    description: {
      id: "Produsen kemasan plastik fleksibel terkemuka dengan standar kualitas internasional.",
      en: "A leading flexible plastic packaging manufacturer with international quality standards.",
    },
    full_description: {
      id: "PT Prima Plastindo berdiri sejak 1992 sebagai pionir industri kemasan plastik fleksibel di Indonesia. Dengan lebih dari 30 tahun pengalaman, kami memproduksi berbagai jenis kemasan plastik untuk kebutuhan industri makanan, minuman, dan farmasi. Fasilitas produksi modern kami di Karawang, Jawa Barat, dilengkapi dengan mesin-mesin berteknologi tinggi dan dioperasikan oleh tenaga ahli berpengalaman.",
      en: "PT Prima Plastindo was established in 1992 as a pioneer of the flexible plastic packaging industry in Indonesia. With over 30 years of experience, we produce a wide range of plastic packaging for the food, beverage, and pharmaceutical industries. Our modern production facility in Karawang, West Java, is equipped with high-tech machinery operated by experienced professionals.",
    },
    certifications: [
      {
        id: "cert-pp-01",
        name: "ISO 9001:2015",
        image: "https://placehold.co/120x80/f3f4f6/374151?text=ISO+9001",
      },
      {
        id: "cert-pp-02",
        name: "HACCP",
        image: "https://placehold.co/120x80/f3f4f6/374151?text=HACCP",
      },
    ],
    provens: [
      {
        title: {
          id: "30+ Tahun Pengalaman",
          en: "30+ Years of Experience",
        },
        description: {
          id: "Lebih dari tiga dekade melayani industri kemasan plastik nasional dan internasional.",
          en: "Over three decades serving the national and international plastic packaging industry.",
        },
        bgColor: "#1a56db",
      },
      {
        title: {
          id: "Teknologi Modern",
          en: "Modern Technology",
        },
        description: {
          id: "Mesin produksi berteknologi terkini untuk menghasilkan produk berkualitas tinggi.",
          en: "State-of-the-art production machinery to deliver high-quality products.",
        },
        bgImage:
          "https://placehold.co/800x600/111827/ffffff?text=Modern+Technology",
      },
    ],
    products: [
      {
        id: "prod-pp-01",
        name: {
          id: "Kemasan Stand-Up Pouch",
          en: "Stand-Up Pouch Packaging",
        },
        image: "https://placehold.co/400x300/dbeafe/1e40af?text=Stand-Up+Pouch",
      },
      {
        id: "prod-pp-02",
        name: {
          id: "Plastik Roll Film",
          en: "Roll Film Plastic",
        },
        image: "https://placehold.co/400x300/dbeafe/1e40af?text=Roll+Film",
      },
    ],
    brands: [
      {
        name: "PrimaFlex",
        image: "https://placehold.co/160x60/dbeafe/1e40af?text=PrimaFlex",
        featured: true,
      },
      {
        name: "PrimaPack",
        image: "https://placehold.co/160x60/dbeafe/1e40af?text=PrimaPack",
      },
    ],
    cover_sections: [
      {
        images: [
          "https://placehold.co/1440x600/1a56db/ffffff?text=Prima+Plastindo+Factory",
          "https://placehold.co/1440x600/1e40af/ffffff?text=Prima+Plastindo+Production",
        ],
      },
    ],
    locations: [
      {
        name: {
          id: "Pabrik Utama Karawang",
          en: "Karawang Main Factory",
        },
        location: {
          id: "Jl. Industri Raya No. 12, Karawang, Jawa Barat 41361",
          en: "Jl. Industri Raya No. 12, Karawang, West Java 41361",
        },
      },
    ],
    cover_image: [
      "https://placehold.co/1440x600/1a56db/ffffff?text=Prima+Plastindo+Cover",
    ],
    hero_image: [
      "https://placehold.co/1440x700/1a56db/ffffff?text=Prima+Plastindo+Hero",
    ],
  },
  {
    order: 2,
    slug: "pt-maju-polymer",
    name: {
      id: "PT Maju Polymer",
      en: "PT Maju Polymer",
    },
    initial_name: {
      id: "Maju Polymer",
      en: "Maju Polymer",
    },
    thumbnail: "https://placehold.co/600x400/047857/ffffff?text=Maju+Polymer",
    logo: "https://placehold.co/200x80/047857/ffffff?text=MP",
    description: {
      id: "Spesialis bahan baku polimer untuk industri manufaktur otomotif dan elektronik.",
      en: "Polymer raw material specialist for the automotive and electronics manufacturing industry.",
    },
    full_description: {
      id: "PT Maju Polymer adalah pemasok utama bahan baku polimer teknik untuk sektor otomotif dan elektronik. Didirikan pada 2001, perusahaan kami telah bermitra dengan lebih dari 200 manufaktur di seluruh Indonesia. Kami menyediakan solusi material plastik teknik seperti ABS, PC, PP, dan nylon dengan spesifikasi yang dapat disesuaikan dengan kebutuhan klien.",
      en: "PT Maju Polymer is a major engineering polymer raw material supplier for the automotive and electronics sectors. Founded in 2001, our company has partnered with over 200 manufacturers across Indonesia. We provide engineering plastic material solutions such as ABS, PC, PP, and nylon with specifications customizable to client needs.",
    },
    certifications: [
      {
        id: "cert-mp-01",
        name: "ISO 9001:2015",
        image: "https://placehold.co/120x80/f3f4f6/374151?text=ISO+9001",
      },
      {
        id: "cert-mp-02",
        name: "ISO 14001",
        image: "https://placehold.co/120x80/f3f4f6/374151?text=ISO+14001",
      },
    ],
    provens: [
      {
        title: {
          id: "200+ Mitra Manufaktur",
          en: "200+ Manufacturing Partners",
        },
        description: {
          id: "Jaringan kemitraan luas dengan ratusan manufaktur di seluruh kepulauan Indonesia.",
          en: "An extensive partnership network with hundreds of manufacturers across the Indonesian archipelago.",
        },
        bgColor: "#047857",
      },
      {
        title: {
          id: "Material Teknik Unggulan",
          en: "Superior Engineering Materials",
        },
        description: {
          id: "Menyediakan berbagai grade polimer teknik sesuai standar internasional.",
          en: "Providing various engineering polymer grades meeting international standards.",
        },
        bgImage:
          "https://placehold.co/800x600/064e3b/ffffff?text=Engineering+Material",
      },
    ],
    products: [
      {
        id: "prod-mp-01",
        name: {
          id: "ABS Grade Teknik",
          en: "ABS Engineering Grade",
        },
        image: "https://placehold.co/400x300/d1fae5/065f46?text=ABS+Grade",
      },
      {
        id: "prod-mp-02",
        name: {
          id: "Lembaran Polikarbonat",
          en: "Polycarbonate Sheet",
        },
        image: "https://placehold.co/400x300/d1fae5/065f46?text=PC+Sheet",
      },
    ],
    brands: [
      {
        name: "MajuTech",
        image: "https://placehold.co/160x60/d1fae5/065f46?text=MajuTech",
        featured: true,
      },
    ],
    cover_sections: [
      {
        images: [
          "https://placehold.co/1440x600/047857/ffffff?text=Maju+Polymer+Warehouse",
        ],
      },
    ],
    locations: [
      {
        name: {
          id: "Gudang & Kantor Pusat",
          en: "Warehouse & Head Office",
        },
        location: {
          id: "Jl. Raya Bekasi KM 28, Cikarang Barat, Bekasi, Jawa Barat 17520",
          en: "Jl. Raya Bekasi KM 28, Cikarang Barat, Bekasi, West Java 17520",
        },
      },
      {
        name: {
          id: "Pusat Distribusi Surabaya",
          en: "Surabaya Distribution Center",
        },
        location: {
          id: "Jl. Margomulyo Indah Blok A No. 5, Surabaya, Jawa Timur 60187",
          en: "Jl. Margomulyo Indah Block A No. 5, Surabaya, East Java 60187",
        },
      },
    ],
    cover_image: [
      "https://placehold.co/1440x600/047857/ffffff?text=Maju+Polymer+Cover",
    ],
    hero_image: [
      "https://placehold.co/1440x700/047857/ffffff?text=Maju+Polymer+Hero",
    ],
  },
  {
    order: 3,
    slug: "pt-nusantara-plas",
    name: {
      id: "PT Nusantara Plas",
      en: "PT Nusantara Plas",
    },
    initial_name: {
      id: "Nusantara Plas",
      en: "Nusantara Plas",
    },
    thumbnail: "https://placehold.co/600x400/b45309/ffffff?text=Nusantara+Plas",
    logo: "https://placehold.co/200x80/b45309/ffffff?text=NP",
    description: {
      id: "Produsen pipa dan fitting PVC untuk infrastruktur air bersih dan sanitasi.",
      en: "PVC pipe and fitting manufacturer for clean water and sanitation infrastructure.",
    },
    full_description: {
      id: "PT Nusantara Plas memfokuskan diri pada produksi pipa PVC, HDPE, dan fitting untuk proyek infrastruktur air bersih, drainase, dan irigasi. Sejak 1998, produk-produk kami telah digunakan dalam ratusan proyek pemerintah dan swasta di seluruh Nusantara. Standar produksi kami mengacu pada SNI dan ISO untuk menjamin keandalan dan ketahanan jangka panjang.",
      en: "PT Nusantara Plas focuses on the production of PVC pipes, HDPE, and fittings for clean water, drainage, and irrigation infrastructure projects. Since 1998, our products have been used in hundreds of government and private projects throughout the archipelago. Our production standards adhere to SNI and ISO to ensure long-term reliability and durability.",
    },
    certifications: [
      {
        id: "cert-np-01",
        name: "SNI",
        image: "https://placehold.co/120x80/f3f4f6/374151?text=SNI",
      },
      {
        id: "cert-np-02",
        name: "ISO 9001:2015",
        image: "https://placehold.co/120x80/f3f4f6/374151?text=ISO+9001",
      },
    ],
    provens: [
      {
        title: {
          id: "Proyek Nasional",
          en: "National Projects",
        },
        description: {
          id: "Produk kami telah digunakan dalam ratusan proyek infrastruktur pemerintah pusat dan daerah.",
          en: "Our products have been used in hundreds of central and regional government infrastructure projects.",
        },
        bgColor: "#b45309",
      },
      {
        title: {
          id: "Standar SNI & ISO",
          en: "SNI & ISO Standards",
        },
        description: {
          id: "Setiap produk melewati pengujian ketat sesuai standar nasional dan internasional.",
          en: "Every product undergoes rigorous testing according to national and international standards.",
        },
        bgImage:
          "https://placehold.co/800x600/78350f/ffffff?text=Quality+Standard",
      },
    ],
    products: [
      {
        id: "prod-np-01",
        name: {
          id: "Pipa PVC AW",
          en: "PVC AW Pipe",
        },
        image: "https://placehold.co/400x300/fef3c7/92400e?text=Pipa+PVC+AW",
      },
      {
        id: "prod-np-02",
        name: {
          id: "Pipa HDPE",
          en: "HDPE Pipe",
        },
        image: "https://placehold.co/400x300/fef3c7/92400e?text=Pipa+HDPE",
      },
      {
        id: "prod-np-03",
        name: {
          id: "Fitting PVC",
          en: "PVC Fitting",
        },
        image: "https://placehold.co/400x300/fef3c7/92400e?text=Fitting+PVC",
      },
    ],
    brands: [
      {
        name: "NusaPipe",
        image: "https://placehold.co/160x60/fef3c7/92400e?text=NusaPipe",
        featured: true,
      },
      {
        name: "NusaFlow",
        image: "https://placehold.co/160x60/fef3c7/92400e?text=NusaFlow",
      },
    ],
    cover_sections: [
      {
        images: [
          "https://placehold.co/1440x600/b45309/ffffff?text=Nusantara+Plas+Factory",
          "https://placehold.co/1440x600/92400e/ffffff?text=Nusantara+Plas+Products",
        ],
      },
    ],
    locations: [
      {
        name: {
          id: "Pabrik Cibitung",
          en: "Cibitung Factory",
        },
        location: {
          id: "Kawasan Industri MM2100 Blok NN-1, Cibitung, Bekasi, Jawa Barat 17520",
          en: "MM2100 Industrial Estate Block NN-1, Cibitung, Bekasi, West Java 17520",
        },
      },
    ],
    cover_image: [
      "https://placehold.co/1440x600/b45309/ffffff?text=Nusantara+Plas+Cover",
    ],
    hero_image: [
      "https://placehold.co/1440x700/b45309/ffffff?text=Nusantara+Plas+Hero",
    ],
  },
  {
    order: 4,
    slug: "pt-global-resin",
    name: {
      id: "PT Global Resin",
      en: "PT Global Resin",
    },
    initial_name: {
      id: "Global Resin",
      en: "Global Resin",
    },
    thumbnail: "https://placehold.co/600x400/6d28d9/ffffff?text=Global+Resin",
    logo: "https://placehold.co/200x80/6d28d9/ffffff?text=GR",
    description: {
      id: "Importir dan distributor resin plastik premium untuk industri injeksi dan ekstrusi.",
      en: "Premium plastic resin importer and distributor for the injection and extrusion industry.",
    },
    full_description: {
      id: "PT Global Resin adalah importir dan distributor resmi resin plastik premium dari produsen-produsen terkemuka di Asia, Eropa, dan Amerika. Berdiri sejak 2005, kami menjadi jembatan antara produsen resin global dengan industri manufaktur plastik lokal. Portofolio produk kami mencakup PP, PE, PET, PS, ABS, dan berbagai specialty polymer untuk aplikasi industri khusus.",
      en: "PT Global Resin is an authorized importer and distributor of premium plastic resins from leading manufacturers in Asia, Europe, and the Americas. Established in 2005, we bridge global resin producers with the local plastic manufacturing industry. Our product portfolio covers PP, PE, PET, PS, ABS, and various specialty polymers for specialized industrial applications.",
    },
    certifications: [
      {
        id: "cert-gr-01",
        name: "ISO 9001:2015",
        image: "https://placehold.co/120x80/f3f4f6/374151?text=ISO+9001",
      },
    ],
    provens: [
      {
        title: {
          id: "Distribusi Nasional",
          en: "Nationwide Distribution",
        },
        description: {
          id: "Jaringan distribusi yang menjangkau seluruh wilayah Indonesia dengan armada logistik handal.",
          en: "A distribution network reaching all regions of Indonesia with a reliable logistics fleet.",
        },
        bgColor: "#6d28d9",
      },
      {
        title: {
          id: "Mitra Global",
          en: "Global Partners",
        },
        description: {
          id: "Bermitra langsung dengan produsen resin ternama dari tiga benua.",
          en: "Direct partnerships with renowned resin manufacturers from three continents.",
        },
        bgImage:
          "https://placehold.co/800x600/4c1d95/ffffff?text=Global+Partnership",
      },
    ],
    products: [
      {
        id: "prod-gr-01",
        name: {
          id: "Resin PP Homopolimer",
          en: "PP Homopolymer Resin",
        },
        image: "https://placehold.co/400x300/ede9fe/5b21b6?text=PP+Homopolymer",
      },
      {
        id: "prod-gr-02",
        name: {
          id: "Resin PET Grade Botol",
          en: "PET Bottle Grade Resin",
        },
        image:
          "https://placehold.co/400x300/ede9fe/5b21b6?text=PET+Bottle+Grade",
      },
    ],
    brands: [
      {
        name: "GlobalPoly",
        image: "https://placehold.co/160x60/ede9fe/5b21b6?text=GlobalPoly",
        featured: true,
      },
    ],
    cover_sections: [
      {
        images: [
          "https://placehold.co/1440x600/6d28d9/ffffff?text=Global+Resin+Warehouse",
        ],
      },
      {
        images: [
          "https://placehold.co/1440x600/5b21b6/ffffff?text=Global+Resin+Distribution",
          "https://placehold.co/1440x600/4c1d95/ffffff?text=Global+Resin+Logistics",
        ],
      },
    ],
    locations: [
      {
        name: {
          id: "Gudang Pusat Jakarta",
          en: "Jakarta Central Warehouse",
        },
        location: {
          id: "Jl. Raya Cakung Cilincing KM 3, Jakarta Utara, DKI Jakarta 14130",
          en: "Jl. Raya Cakung Cilincing KM 3, North Jakarta, DKI Jakarta 14130",
        },
      },
      {
        name: {
          id: "Gudang Surabaya",
          en: "Surabaya Warehouse",
        },
        location: {
          id: "Jl. Kalianak No. 67, Asemrowo, Surabaya, Jawa Timur 60182",
          en: "Jl. Kalianak No. 67, Asemrowo, Surabaya, East Java 60182",
        },
      },
    ],
    cover_image: [
      "https://placehold.co/1440x600/6d28d9/ffffff?text=Global+Resin+Cover",
    ],
    hero_image: [
      "https://placehold.co/1440x700/6d28d9/ffffff?text=Global+Resin+Hero",
      "https://placehold.co/1440x700/5b21b6/ffffff?text=Global+Resin+Hero+2",
    ],
  },
  {
    order: 5,
    slug: "pt-indo-masterbatch",
    name: {
      id: "PT Indo Masterbatch",
      en: "PT Indo Masterbatch",
    },
    initial_name: {
      id: "Indo Masterbatch",
      en: "Indo Masterbatch",
    },
    thumbnail:
      "https://placehold.co/600x400/dc2626/ffffff?text=Indo+Masterbatch",
    logo: "https://placehold.co/200x80/dc2626/ffffff?text=IM",
    description: {
      id: "Produsen masterbatch warna dan aditif untuk industri plastik nasional.",
      en: "Color masterbatch and additive manufacturer for the national plastics industry.",
    },
    full_description: {
      id: "PT Indo Masterbatch adalah produsen masterbatch warna, hitam-putih, dan aditif fungsional terbesar di Indonesia Timur. Sejak 2003, kami menyuplai masterbatch berkualitas tinggi untuk berbagai aplikasi plastik seperti blown film, injection molding, dan extrusion. Laboratorium R&D kami mampu mengembangkan formula warna khusus sesuai permintaan klien dengan toleransi warna Delta E < 1.",
      en: "PT Indo Masterbatch is the largest color, black-white, and functional additive masterbatch manufacturer in Eastern Indonesia. Since 2003, we supply high-quality masterbatch for various plastic applications such as blown film, injection molding, and extrusion. Our R&D laboratory can develop custom color formulas per client request with a color tolerance of Delta E < 1.",
    },
    certifications: [
      {
        id: "cert-im-01",
        name: "ISO 9001:2015",
        image: "https://placehold.co/120x80/f3f4f6/374151?text=ISO+9001",
      },
      {
        id: "cert-im-02",
        name: "RoHS Compliant",
        image: "https://placehold.co/120x80/f3f4f6/374151?text=RoHS",
      },
    ],
    provens: [
      {
        title: {
          id: "Formula Warna Presisi",
          en: "Precision Color Formula",
        },
        description: {
          id: "Teknologi color matching dengan toleransi Delta E < 1 untuk konsistensi warna sempurna.",
          en: "Color matching technology with Delta E < 1 tolerance for perfect color consistency.",
        },
        bgColor: "#dc2626",
      },
      {
        title: {
          id: "R&D Berkelanjutan",
          en: "Continuous R&D",
        },
        description: {
          id: "Investasi berkelanjutan dalam riset dan pengembangan formula masterbatch inovatif.",
          en: "Continuous investment in research and development of innovative masterbatch formulas.",
        },
        bgImage: "https://placehold.co/800x600/7f1d1d/ffffff?text=R%26D+Lab",
      },
    ],
    products: [
      {
        id: "prod-im-01",
        name: {
          id: "Masterbatch Warna",
          en: "Color Masterbatch",
        },
        image:
          "https://placehold.co/400x300/fee2e2/991b1b?text=Color+Masterbatch",
      },
      {
        id: "prod-im-02",
        name: {
          id: "Masterbatch Putih",
          en: "White Masterbatch",
        },
        image:
          "https://placehold.co/400x300/fee2e2/991b1b?text=White+Masterbatch",
      },
      {
        id: "prod-im-03",
        name: {
          id: "Masterbatch Aditif",
          en: "Additive Masterbatch",
        },
        image: "https://placehold.co/400x300/fee2e2/991b1b?text=Additive+MB",
      },
    ],
    brands: [
      {
        name: "IndoColor",
        image: "https://placehold.co/160x60/fee2e2/991b1b?text=IndoColor",
        featured: true,
      },
      {
        name: "IndoAddit",
        image: "https://placehold.co/160x60/fee2e2/991b1b?text=IndoAddit",
      },
    ],
    cover_sections: [
      {
        images: [
          "https://placehold.co/1440x600/dc2626/ffffff?text=Indo+Masterbatch+Lab",
          "https://placehold.co/1440x600/b91c1c/ffffff?text=Indo+Masterbatch+Production",
        ],
      },
    ],
    locations: [
      {
        name: {
          id: "Pabrik & Kantor Pusat Makassar",
          en: "Makassar Factory & Headquarters",
        },
        location: {
          id: "Kawasan Industri KIMA, Jl. Kapasa Raya No. 88, Makassar, Sulawesi Selatan 90241",
          en: "KIMA Industrial Estate, Jl. Kapasa Raya No. 88, Makassar, South Sulawesi 90241",
        },
      },
    ],
    cover_image: [
      "https://placehold.co/1440x600/dc2626/ffffff?text=Indo+Masterbatch+Cover",
    ],
    hero_image: [
      "https://placehold.co/1440x700/dc2626/ffffff?text=Indo+Masterbatch+Hero",
    ],
  },
  {
    order: 6,
    slug: "pt-karya-plastik",
    name: {
      id: "PT Karya Plastik Sejahtera",
      en: "PT Karya Plastik Sejahtera",
    },
    initial_name: {
      id: "Karya Plastik",
      en: "Karya Plastik",
    },
    thumbnail: "https://placehold.co/600x400/0e7490/ffffff?text=Karya+Plastik",
    logo: "https://placehold.co/200x80/0e7490/ffffff?text=KPS",
    description: {
      id: "Produsen peralatan rumah tangga dan produk konsumen berbahan plastik berkualitas.",
      en: "Quality plastic household appliance and consumer product manufacturer.",
    },
    full_description: {
      id: "PT Karya Plastik Sejahtera telah memproduksi peralatan rumah tangga plastik berkualitas sejak 1995. Dengan kapasitas produksi 5.000 ton per tahun, kami menghasilkan berbagai produk konsumer mulai dari peralatan dapur, wadah penyimpanan, hingga furnitur plastik. Komitmen kami terhadap desain ergonomis dan material food-grade menjadikan produk kami pilihan utama keluarga Indonesia.",
      en: "PT Karya Plastik Sejahtera has been producing quality plastic household appliances since 1995. With a production capacity of 5,000 tons per year, we manufacture a wide range of consumer products from kitchenware, storage containers, to plastic furniture. Our commitment to ergonomic design and food-grade materials makes our products the top choice for Indonesian families.",
    },
    certifications: [
      {
        id: "cert-kps-01",
        name: "SNI",
        image: "https://placehold.co/120x80/f3f4f6/374151?text=SNI",
      },
      {
        id: "cert-kps-02",
        name: "Food Grade BPOM",
        image: "https://placehold.co/120x80/f3f4f6/374151?text=BPOM",
      },
      {
        id: "cert-kps-03",
        name: "ISO 9001:2015",
        image: "https://placehold.co/120x80/f3f4f6/374151?text=ISO+9001",
      },
    ],
    provens: [
      {
        title: {
          id: "Material Food-Grade",
          en: "Food-Grade Materials",
        },
        description: {
          id: "Seluruh produk konsumer kami menggunakan material plastik food-grade bersertifikat BPOM.",
          en: "All our consumer products use BPOM-certified food-grade plastic materials.",
        },
        bgColor: "#0e7490",
      },
      {
        title: {
          id: "Desain Ergonomis",
          en: "Ergonomic Design",
        },
        description: {
          id: "Tim desainer kami menghadirkan produk yang fungsional, estetis, dan nyaman digunakan.",
          en: "Our design team delivers products that are functional, aesthetic, and comfortable to use.",
        },
        bgImage:
          "https://placehold.co/800x600/164e63/ffffff?text=Ergonomic+Design",
      },
    ],
    products: [
      {
        id: "prod-kps-01",
        name: {
          id: "Wadah Serbaguna",
          en: "Multi-Purpose Container",
        },
        image:
          "https://placehold.co/400x300/cffafe/0e7490?text=Wadah+Serbaguna",
      },
      {
        id: "prod-kps-02",
        name: {
          id: "Peralatan Dapur",
          en: "Kitchenware",
        },
        image:
          "https://placehold.co/400x300/cffafe/0e7490?text=Peralatan+Dapur",
      },
      {
        id: "prod-kps-03",
        name: {
          id: "Kursi & Meja Plastik",
          en: "Plastic Chairs & Tables",
        },
        image:
          "https://placehold.co/400x300/cffafe/0e7490?text=Furnitur+Plastik",
      },
    ],
    brands: [
      {
        name: "KaryaHome",
        image: "https://placehold.co/160x60/cffafe/0e7490?text=KaryaHome",
        featured: true,
      },
      {
        name: "KaryaKitchen",
        image: "https://placehold.co/160x60/cffafe/0e7490?text=KaryaKitchen",
      },
    ],
    cover_sections: [
      {
        images: [
          "https://placehold.co/1440x600/0e7490/ffffff?text=Karya+Plastik+Showroom",
        ],
      },
    ],
    locations: [
      {
        name: {
          id: "Pabrik Tangerang",
          en: "Tangerang Factory",
        },
        location: {
          id: "Jl. Industri Utama Raya Blok C No. 15, Balaraja, Tangerang, Banten 15610",
          en: "Jl. Industri Utama Raya Block C No. 15, Balaraja, Tangerang, Banten 15610",
        },
      },
      {
        name: {
          id: "Showroom Jakarta",
          en: "Jakarta Showroom",
        },
        location: {
          id: "Jl. Mangga Dua Raya No. 22, Penjaringan, Jakarta Utara, DKI Jakarta 14430",
          en: "Jl. Mangga Dua Raya No. 22, Penjaringan, North Jakarta, DKI Jakarta 14430",
        },
      },
    ],
    cover_image: [
      "https://placehold.co/1440x600/0e7490/ffffff?text=Karya+Plastik+Cover",
    ],
    hero_image: [
      "https://placehold.co/1440x700/0e7490/ffffff?text=Karya+Plastik+Hero",
    ],
  },
];

export async function getCompanyList(): Promise<CompanyListItem[]> {
  // TODO: replace with Supabase query when ready
  return DUMMY_COMPANIES.sort((a, b) => a.order - b.order).map(
    ({ order, slug, name, initial_name, logo, description, thumbnail }) => ({
      order,
      slug,
      name,
      initial_name,
      logo,
      description,
      thumbnail,
    }),
  );
}

export async function getCompanyBySlug(slug: string): Promise<Company | null> {
  // TODO: replace with Supabase query when ready
  return DUMMY_COMPANIES.find((c) => c.slug === slug) ?? null;
}

export type FeaturedBrand = Brand & { companyName: string };

export async function getFeaturedBrands(): Promise<FeaturedBrand[]> {
  // TODO: replace with Supabase query when ready
  return DUMMY_COMPANIES.flatMap((company) =>
    company.brands
      .filter((brand) => brand.featured)
      .map((brand) => ({ ...brand, companyName: company.name.en })),
  );
}
