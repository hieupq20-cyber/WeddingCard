/**
 * ==============================================================================
 * 💍 CẤU HÌNH THIỆP CƯỚI ĐIỆN TỬ TOÀN DIỆN (FULL WEDDING CONFIG)
 * ==============================================================================
 * Toàn bộ nội dung hiển thị trên thiệp được quản lý tại file này.
 * Bạn có thể tự do chỉnh sửa chữ, tên gọi, thời gian, địa điểm, nhạc nền,...
 */

const WEDDING_CONFIG = {
  // 1. TIÊU ĐỀ TRANG VÀ THÔNG TIN CHIA SẺ (SEO & SOCIAL SHARE)
  meta: {
    pageTitle: "Thiệp Mừng Cưới",
    description: "Trân trọng kính mời bạn đến chung vui trong ngày hạnh phúc của chúng tôi!",
    ogTitle: "Thiệp Mừng Cưới",
    ogDescription: "Trân trọng kính mời bạn đến chung vui trong ngày trọng đại."
  },

  // 2. MÀN HÌNH BÌA MỞ THIỆP (ENVELOPE COVER)
  cover: {
    sealIcon: "💍",                     // Biểu tượng trên con dấu mở thiệp
    sealText: "MỞ THIỆP CƯỚI",          // Dòng chữ trên nút mở thiệp
    sealGuestPrefix: "Kính gửi"         // Tiền tố khách mời trên phong bì bìa
  },

  // 3. TIÊU ĐỀ ĐẦU THIỆP (CARD HEADER & MONOGRAM)
  header: {
    introText: "SAVE OUR DATE",         // Dòng chữ giới thiệu nhỏ phía trên
    weddingTitle: "THIỆP MỜI BÁO HỶ",   // Tiêu đề thiệp mời
    monogram: {
      groomInitial: "",                 // Chữ cái đại diện chú rể (bỏ trống sẽ tự động lấy chữ cái đầu của tên)
      brideInitial: "",                 // Chữ cái đại diện cô dâu (bỏ trống sẽ tự động lấy chữ cái đầu của tên)
      divider: "&"                      // Ký tự liên kết giữa 2 chữ cái
    }
  },

  // 4. THÔNG TIN PHỤ MẪU HAI BÊN (PARENTS)
  parents: {
    divider: "❖",                       // Biểu tượng phân cách giữa 2 nhà
    groomSide: {
      familyLabel: "NHÀ TRAI",
      fatherPrefix: "Ông:",
      fatherName: "",
      motherPrefix: "Bà:",
      motherName: ""
    },
    brideSide: {
      familyLabel: "NHÀ GÁI",
      fatherPrefix: "Ông:",
      fatherName: "",
      motherPrefix: "Bà:",
      motherName: ""
    }
  },

  // 5. THÔNG BÁO LỄ CƯỚI & TÊN CÔ DÂU - CHÚ RỂ (COUPLE)
  couple: {
    announcementText: "Trân trọng báo tin lễ thành hôn của hai con chúng tôi:",
    groomName: "Phạm Quang Hiếu",
    brideName: "Nguyễn Kim Oanh",
    heartSymbol: "❤"
  },

  // 6. THÔNG TIN KHÁCH MỜI (GUEST SETTINGS)
  guest: {
    salutation: "Trân trọng kính mời",                                // Lời xưng hô
    defaultName: "Bạn và Người thương",                               // Tên khách mặc định khi link không có ?guest=...
    invitationMessage: "Tới dự bữa cơm thân mật chung vui cùng gia đình chúng tôi" // Lời mời dự tiệc
  },

  // 7. THỜI GIAN & ĐỊA ĐIỂM TỔ CHỨC (EVENT & VENUE)
  event: {
    timeLabel: "VÀO LÚC",
    time: "",
    solarDateText: "",
    lunarDateText: "",
    venueName: "",
    hall: "",
    address: "",
    mapHintText: "Xem chỉ đường trên Google Maps ↗",
    googleMapsUrl: ""
  },

  // 8. LỜI CẢM ƠN / KẾT THIỆP (FOOTER)
  footer: {
    message: "Rất hân hạnh được đón tiếp quý khách!"
  },

  // 9. HIỆU ỨNG CÁNH HOA RƠI (CANVAS EFFECTS)
  effects: {
    enablePetals: true,                 // Bật/tắt hiệu ứng cánh hoa rơi (true/false)
    petalCount: 20                      // Số lượng cánh hoa
  },

  // 10. NHẠC NỀN (BACKGROUND MUSIC)
  music: {
    // Link MP3 online hoặc đường dẫn file MP3 cục bộ (VD: "./nhac-cuoi.mp3")
    url: "./music.mp3",
    autoplayOnOpen: true                // Tự động phát khi bấm mở thiệp
  },

  // TƯƠNG THÍCH NGƯỢC (dành cho các cấu hình phiên bản cũ nếu có)
  groom: {
    name: "",
    parentFather: "",
    parentMother: "",
    familySide: "Nhà Trai"
  },
  bride: {
    name: "",
    parentFather: "",
    parentMother: "",
    familySide: "Nhà Gái"
  }
};

if (typeof window !== "undefined") {
  window.WEDDING_CONFIG = WEDDING_CONFIG;
}
