/**
 * ==============================================================================
 * 💍 THIỆP CƯỚI ĐƠN GIẢN & SANG TRỌNG - JAVASCRIPT XỬ LÝ NỘI DUNG ĐỘNG
 * ==============================================================================
 * Toàn bộ nội dung hiển thị được nạp tự động từ WEDDING_CONFIG (config.js)
 */

document.addEventListener("DOMContentLoaded", () => {
  const config = window.WEDDING_CONFIG || {};

  // Hàm tiện ích gán nội dung text an toàn
  function setText(id, text) {
    const el = document.getElementById(id);
    if (el && text !== undefined && text !== null) {
      el.textContent = text;
    }
  }

  // Hàm lấy chữ cái đầu của tên (họ và tên -> lấy chữ cái đầu của tên gọi cuối)
  function getInitial(fullName, fallback = "A") {
    if (!fullName || typeof fullName !== "string") return fallback;
    const parts = fullName.trim().split(/\s+/);
    const lastWord = parts[parts.length - 1] || "";
    return lastWord.charAt(0).toUpperCase() || fallback;
  }

  // 1. Cập nhật Meta / SEO
  function updateMetadata() {
    const meta = config.meta || {};
    if (meta.pageTitle) {
      document.title = meta.pageTitle;
      setText("page-title", meta.pageTitle);
    }

    if (meta.description) {
      const descEl = document.querySelector('meta[name="description"]');
      if (descEl) descEl.setAttribute("content", meta.description);
    }

    if (meta.ogTitle) {
      const ogTitleEl = document.querySelector('meta[property="og:title"]');
      if (ogTitleEl) ogTitleEl.setAttribute("content", meta.ogTitle);
    }

    if (meta.ogDescription) {
      const ogDescEl = document.querySelector('meta[property="og:description"]');
      if (ogDescEl) ogDescEl.setAttribute("content", meta.ogDescription);
    }
  }

  // 2. Phân giải tên khách mời từ URL (?guest=... hoặc ?to=...)
  function setupGuest() {
    const guestCfg = config.guest || {};
    const coverCfg = config.cover || {};
    const params = new URLSearchParams(window.location.search);
    const guestParam = params.get("guest") || params.get("to") || params.get("for");

    const guestName = guestParam ? guestParam.trim() : (guestCfg.defaultName || "Bạn và Người thương");
    const salutation = guestCfg.salutation || "Trân trọng kính mời";
    const sealPrefix = coverCfg.sealGuestPrefix || salutation;

    // Gán nội dung màn hình mở thiệp
    setText("seal-icon", coverCfg.sealIcon || "💍");
    setText("seal-text", coverCfg.sealText || "MỞ THIỆP CƯỚI");
    setText("seal-guest-name", `${sealPrefix}: ${guestName}`);

    // Gán nội dung thiệp chính
    setText("card-salutation", salutation ? `${salutation}:` : "");
    setText("card-guest-name", guestName);
    setText("guest-desc", guestCfg.invitationMessage || "");
  }

  // 3. Nạp toàn bộ dữ liệu nội dung từ config.js
  function populateContent() {
    // Header & Monogram
    const header = config.header || {};
    setText("invitation-intro", header.introText || "SAVE OUR DATE");
    setText("wedding-title", header.weddingTitle || "THIỆP MỜI BÁO HỶ");

    const groomName = config.couple?.groomName || config.groom?.name || "Chú rể";
    const brideName = config.couple?.brideName || config.bride?.name || "Cô dâu";

    const monoCfg = header.monogram || {};
    const groomInitial = monoCfg.groomInitial || getInitial(groomName, "H");
    const brideInitial = monoCfg.brideInitial || getInitial(brideName, "T");
    setText("mono-groom", groomInitial);
    setText("mono-bride", brideInitial);
    setText("mono-and", monoCfg.divider || "&");

    // Thông tin phụ mẫu 2 bên (hỗ trợ cả cấu trúc parents mới và groom/bride cũ)
    const groomSide = config.parents?.groomSide || {};
    const brideSide = config.parents?.brideSide || {};
    const parentsDivider = config.parents?.divider || "❖";

    const sideGroomLabel = groomSide.familyLabel || config.groom?.familySide || "NHÀ TRAI";
    const fatherGroomPrefix = groomSide.fatherPrefix || "Ông:";
    const fatherGroomName = groomSide.fatherName || config.groom?.parentFather || "";
    const motherGroomPrefix = groomSide.motherPrefix || "Bà:";
    const motherGroomName = groomSide.motherName || config.groom?.parentMother || "";

    const sideBrideLabel = brideSide.familyLabel || config.bride?.familySide || "NHÀ GÁI";
    const fatherBridePrefix = brideSide.fatherPrefix || "Ông:";
    const fatherBrideName = brideSide.fatherName || config.bride?.parentFather || "";
    const motherBridePrefix = brideSide.motherPrefix || "Bà:";
    const motherBrideName = brideSide.motherName || config.bride?.parentMother || "";

    setText("side-groom", sideGroomLabel.toUpperCase());
    setText("father-groom", fatherGroomName ? `${fatherGroomPrefix} ${fatherGroomName}`.trim() : "");
    setText("mother-groom", motherGroomName ? `${motherGroomPrefix} ${motherGroomName}`.trim() : "");
    setText("parents-divider", parentsDivider);

    setText("side-bride", sideBrideLabel.toUpperCase());
    setText("father-bride", fatherBrideName ? `${fatherBridePrefix} ${fatherBrideName}`.trim() : "");
    setText("mother-bride", motherBrideName ? `${motherBridePrefix} ${motherBrideName}`.trim() : "");

    // Thông tin thông báo & Tên cô dâu chú rể
    const couple = config.couple || {};
    setText("announce-text", couple.announcementText || "Trân trọng báo tin lễ thành hôn của hai con chúng tôi:");
    setText("groom-name", groomName);
    setText("bride-name", brideName);
    setText("heart-symbol", couple.heartSymbol || "❤");

    // Thời gian & Địa điểm (Luôn hiển thị khung và tiêu đề, giữ chỗ cho nội dung)
    const event = config.event || {};

    const timeLabel = (event.timeLabel && event.timeLabel.trim()) ? event.timeLabel : "VÀO LÚC";
    const timeVal = (event.time && event.time.trim()) ? event.time : "--:--";
    const solarVal = (event.solarDateText && event.solarDateText.trim()) ? event.solarDateText : "Ngày ... Tháng ... Năm ...";
    const lunarVal = (event.lunarDateText && event.lunarDateText.trim()) ? `(${event.lunarDateText})` : "(Âm lịch: Ngày ... Tháng ...)";

    setText("time-label", timeLabel);
    setText("event-time", timeVal);
    setText("event-solar", solarVal);
    setText("event-lunar", lunarVal);

    const venueVal = (event.venueName && event.venueName.trim()) ? event.venueName : "ĐỊA ĐIỂM TỔ CHỨC TIỆC CƯỚI";
    const hallVal = (event.hall && event.hall.trim()) ? event.hall : "Tư gia nhà trai";
    const addrVal = (event.address && event.address.trim()) ? event.address : "Địa chỉ:";

    setText("event-venue", venueVal);
    setText("event-hall", hallVal);
    setText("event-address", addrVal);

    const mapHintEl = document.getElementById("venue-map-hint");
    if (mapHintEl) {
      const hintText = (event.mapHintText && event.mapHintText.trim()) ? event.mapHintText : "Xem chỉ đường trên Google Maps ↗";
      mapHintEl.innerHTML = `<i class="fa-solid fa-diamond-turn-right"></i> ${hintText}`;
    }

    const eventVenueLink = document.getElementById("event-venue-link");
    if (eventVenueLink) {
      if (event.googleMapsUrl && event.googleMapsUrl.trim()) {
        eventVenueLink.href = event.googleMapsUrl;
      } else {
        eventVenueLink.removeAttribute("href");
      }
    }

    // Lời kết / Footer message
    const footerMsg = config.footer?.message || "Rất hân hạnh được đón tiếp quý khách!";
    setText("footer-msg", footerMsg);
  }

  // 4. Âm thanh nền khi mở thiệp
  const audio = document.getElementById("wedding-audio");
  const openCardBtn = document.getElementById("open-card-btn");
  const envelopeCover = document.getElementById("envelope-cover");
  const musicCfg = config.music || {};

  if (audio) {
    if (musicCfg.url) {
      audio.src = musicCfg.url;
    }
    audio.load();
  }

  let isAudioPlaying = false;
  function startMusic() {
    if (!audio || isAudioPlaying) return;
    audio.volume = 1.0;
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        isAudioPlaying = true;
      }).catch((err) => {
        console.log("Audio waiting for user gesture:", err);
      });
    }
  }

  function handleOpen() {
    if (envelopeCover) {
      envelopeCover.classList.add("hidden");
    }
    if (musicCfg.autoplayOnOpen !== false) {
      startMusic();
    }
  }

  if (openCardBtn) {
    openCardBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      handleOpen();
    });
  }

  if (envelopeCover) {
    envelopeCover.addEventListener("click", handleOpen);
  }

  // Dự phòng: Chạm bất kỳ đâu trên màn hình sau khi mở thiệp sẽ kích hoạt nhạc nếu trước đó bị trình duyệt chặn
  document.addEventListener("click", () => {
    if (!isAudioPlaying && musicCfg.autoplayOnOpen !== false) {
      startMusic();
    }
  });

  // 5. Hiệu ứng cánh hoa rơi (có thể bật/tắt từ config)
  function initPetals() {
    const effectsCfg = config.effects || {};
    const canvas = document.getElementById("effect-canvas");
    if (!canvas) return;

    if (effectsCfg.enablePetals === false) {
      canvas.style.display = "none";
      return;
    }

    const ctx = canvas.getContext("2d");
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    window.addEventListener("resize", () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    });

    const count = effectsCfg.petalCount || 20;
    const petals = [];
    for (let i = 0; i < count; i++) {
      petals.push({
        x: Math.random() * w,
        y: Math.random() * h - h,
        size: Math.random() * 6 + 6,
        vy: Math.random() * 1 + 0.6,
        vx: Math.random() * 0.8 - 0.4,
        rot: Math.random() * Math.PI * 2,
        vrot: Math.random() * 0.02 - 0.01,
        color: Math.random() > 0.5 ? "rgba(224, 112, 133, 0.45)" : "rgba(255, 192, 203, 0.35)"
      });
    }

    function loop() {
      ctx.clearRect(0, 0, w, h);
      petals.forEach((p) => {
        p.y += p.vy;
        p.x += p.vx;
        p.rot += p.vrot;
        if (p.y > h + 15) {
          p.y = -15;
          p.x = Math.random() * w;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-p.size / 2, -p.size / 2, -p.size / 2, p.size / 2, 0, p.size);
        ctx.bezierCurveTo(p.size / 2, p.size / 2, p.size / 2, -p.size / 2, 0, 0);
        ctx.fillStyle = p.color;
        ctx.fill();
        ctx.restore();
      });
      requestAnimationFrame(loop);
    }
    loop();
  }

  // Khởi chạy toàn bộ hệ thống
  updateMetadata();
  setupGuest();
  populateContent();
  initPetals();
});
