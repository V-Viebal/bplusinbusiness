import ColorAdvisor from './ColorAdvisor';
import './bplusin-concept.css';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';

function App() {
  const [selectedSize, setSelectedSize] = useState('2.1m');
  const [selectedFabric, setSelectedFabric] = useState(0);
  const [toastMessage, setToastMessage] = useState('');
  const [colorAdvisorOpen, setColorAdvisorOpen] = useState(false);

  const fabrics = [
    { name: 'Oatmeal Bouclé', color: '#e8e2d8' },
    { name: 'Warm Taupe', color: '#a89d8f' },
    { name: 'Charcoal Wool', color: '#3d3b38' },
    { name: 'Forest Velvet', color: '#3b4d41' },
  ];

  const priceMap: Record<string, string> = {
    '1.8m': '11.200.000 đ',
    '2.1m': '12.900.000 đ',
    '2.4m': '14.800.000 đ',
  };

  useEffect(() => {
    // Reveal animation
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

    // Nav active link spy
    const navLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('.nav a'));
    const sections = Array.from(document.querySelectorAll<HTMLElement>('main section[id]'));
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navLinks.forEach((a) => (a.style.opacity = '0.7'));
            const active = navLinks.find((a) => a.getAttribute('href') === `#${entry.target.id}`);
            if (active) active.style.opacity = '1';
          }
        });
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: 0 }
    );
    sections.forEach((s) => spy.observe(s));

    return () => {
      io.disconnect();
      spy.disconnect();
    };
  }, []);

  const handleAddToCart = () => {
    setToastMessage(`Đã thêm vào giỏ hàng: B+IN Sofa 02 (${selectedSize}, ${fabrics[selectedFabric].name})`);
    setTimeout(() => {
      setToastMessage('');
    }, 3500);
  };

  return (
    <>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="B+IN Home">
          <span className="brand-mark">B+IN</span>
          <span className="brand-sub">Good furniture. Made simple.</span>
        </a>
        <nav className="nav">
          <a href="#concept">Concept</a>
          <a href="#product">Product</a>
          <a href="#online">Online model</a>
          <a href="#advantage">Advantage</a>
          <button className="nav-color-button" onClick={() => setColorAdvisorOpen(true)}>Tư vấn màu sắc</button>
        </nav>
        <a className="mini-cta" href="#summary">
          View summary
        </a>
      </header>

      {colorAdvisorOpen && <ColorAdvisor language="VI" onClose={() => setColorAdvisorOpen(false)} />}

      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            bottom: '28px',
            right: '28px',
            zIndex: 9999,
            background: '#23231f',
            color: '#f4f1ea',
            padding: '14px 22px',
            borderRadius: '12px',
            boxShadow: '0 16px 36px rgba(0,0,0,0.3)',
            fontSize: '14px',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            border: '1px solid rgba(255,255,255,0.15)',
            animation: 'fadeIn 0.3s ease',
          }}
        >
          <span>✓</span>
          <span>{toastMessage}</span>
        </div>
      )}

      <main id="top">
        {/* HERO SECTION */}
        <section className="hero section-dark">
          <div className="hero-copy reveal">
            <div className="eyebrow">B+IN / BUSINESS CONCEPT</div>
            <h1>
              Furniture được thiết kế <em>đúng hơn</em> cho cuộc sống Việt Nam.
            </h1>
            <p className="hero-lead">
              Một thương hiệu furniture online-first: thiết kế tốt, tỷ lệ hợp nhà Việt, chất lượng đáng tin cậy và mức giá hợp lý — được xây dựng trên kinh nghiệm của B+Furniture.
            </p>
            <div className="hero-actions">
              <a className="button light" href="#concept">
                Khám phá concept
              </a>
              <button className="text-link color-hero-button" onClick={() => setColorAdvisorOpen(true)}>Khám phá tông màu phù hợp <span>↗</span></button>
              <a className="text-link" href="#model">
                Xem business model <span>↘</span>
              </a>
            </div>
            <div className="hero-tags">
              <span>Warm</span>
              <span>Compact</span>
              <span>Smart</span>
            </div>
          </div>

          <div className="hero-stage reveal delay-1">
            <div className="room-grid"></div>
            <div className="hero-products" aria-label="Reference product direction for B+IN">
              <img
                className="hero-sofa"
                src="https://www.urbannatural.com/cdn/shop/files/younger-slim-sofa.png?v=1774632122&width=1200"
                alt="Reference slim beige sofa with metal legs"
              />
              <img
                className="hero-chair"
                src="https://ordinairevietnam.com/cdn/shop/files/Arden_Chair_2.png?v=1766479864&width=800"
                alt="Reference upholstered dining chair with powder-coated metal frame"
              />
              <img
                className="hero-table"
                src="https://ordinairevietnam.com/cdn/shop/files/Kyo_Dining_PACKSHOT_51810118-360d-4031-ae86-42c72c04fc9e.png?v=1772434572&width=800"
                alt="Reference warm wood dining table"
              />
            </div>
            <div className="direction-captions" aria-label="Mô tả định hướng sản phẩm">
              <div className="direction-card">
                <strong>SOFA</strong>
                <span>Gọn cho nhà Việt · chân thanh thoát</span>
              </div>
              <div className="direction-card">
                <strong>BÀN ĂN</strong>
                <span>Gỗ ấm · cạnh bo mềm</span>
              </div>
              <div className="direction-card">
                <strong>GHẾ ĂN</strong>
                <span>Đệm êm · khung kim loại nhẹ</span>
              </div>
            </div>
            <div className="reference-note">Hình tham khảo · định hướng sản phẩm</div>
          </div>
        </section>

        {/* SECTION 01: THE OPPORTUNITY */}
        <section id="concept" className="section intro">
          <div className="section-kicker">01 / THE OPPORTUNITY</div>
          <div className="intro-grid">
            <div>
              <h2>
                Không phải “B+Furniture rẻ hơn”.
                <br />
                Đó là một business model khác.
              </h2>
            </div>
            <div className="intro-copy">
              <p>
                B+IN nằm giữa hai thái cực: furniture đại trà dễ mua nhưng thiếu thiết kế, và furniture cao cấp có chất lượng tốt nhưng giá cao, phức tạp và phụ thuộc showroom.
              </p>
              <p className="statement">
                B+IN tạo ra <strong>design-quality thinking</strong> ở mức giá dễ tiếp cận hơn bằng cách giảm complexity — không giảm chất lượng cốt lõi.
              </p>
            </div>
          </div>

          <div className="market-spectrum reveal">
            <div className="spectrum-card muted">
              <span className="num">01</span>
              <h3>Mass furniture</h3>
              <p>Dễ tiếp cận, nhưng generic và chất lượng thiếu nhất quán.</p>
            </div>
            <div className="spectrum-center">
              <div className="pulse">B+IN</div>
              <p>
                <strong>Best balance</strong>
                <br />
                Design × Quality × Price × Convenience
              </p>
            </div>
            <div className="spectrum-card muted">
              <span className="num">03</span>
              <h3>Premium design</h3>
              <p>Thiết kế tốt, nhưng giá cao và hành trình mua thường phức tạp.</p>
            </div>
          </div>
        </section>

        {/* SECTION 02: BRAND DNA */}
        <section className="section section-warm" id="dna">
          <div className="section-head">
            <div>
              <div className="section-kicker">02 / BRAND DNA</div>
              <h2>Warm. Compact. Smart.</h2>
            </div>
            <p>Mọi quyết định từ form, vật liệu, kích thước đến đóng gói đều phải quay về ba nguyên tắc này.</p>
          </div>

          <div className="dna-grid">
            <article className="dna-card reveal">
              <div className="dna-icon warm-icon">◌</div>
              <h3>Warm</h3>
              <p>Gỗ, textile và bảng màu ấm. Furniture phải có cảm giác thân thiện, residential và dễ sống cùng.</p>
              <div className="swatches">
                <i></i>
                <i></i>
                <i></i>
                <i></i>
              </div>
            </article>
            <article className="dna-card reveal delay-1">
              <div className="dna-icon compact-icon">↔</div>
              <h3>Compact</h3>
              <p>Tỷ lệ dành cho căn hộ và nhà phố Việt Nam: visual weight nhẹ, không bulky, nhiều size nhưng cùng platform.</p>
              <div className="mini-diagram">
                <span>1.8m</span>
                <span>2.1m</span>
                <span>2.4m</span>
              </div>
            </article>
            <article className="dna-card reveal delay-2">
              <div className="dna-icon smart-icon">＋</div>
              <h3>Smart</h3>
              <p>Smart không phải electronics. Smart là cấu tạo, sản xuất, logistics và trải nghiệm mua hàng được thiết kế thông minh.</p>
              <div className="flow-line">
                <span>Design</span>
                <b>→</b>
                <span>Pack</span>
                <b>→</b>
                <span>Buy</span>
              </div>
            </article>
          </div>
        </section>

        {/* SECTION 03: DESIGN SYSTEM */}
        <section className="section" id="product">
          <div className="section-head wide">
            <div>
              <div className="section-kicker">03 / DESIGN SYSTEM</div>
              <h2>Everyday Vietnamese Modern</h2>
            </div>
            <p>Soft Contemporary, nhưng được điều chỉnh theo tỷ lệ nhà Việt, thói quen sử dụng và logic sản xuất online-first.</p>
          </div>

          <div className="design-board reveal">
            <div className="board-visual">
              <div className="floating-label label-a">SOFT EDGE</div>
              <div className="floating-label label-b">FLOATING</div>
              <div className="floating-label label-c">WARM METAL</div>
              <div className="design-image-grid">
                <figure className="design-img design-img-sofa">
                  <img
                    src="https://ordinairevietnam.com/cdn/shop/files/MILDSOFA-Front_2100x1400_5541fc39-a2e8-4db2-af67-50493c82f23c_700x700.jpg?v=1753849107"
                    alt="Mild sofa reference"
                  />
                  <figcaption>Sofa reference</figcaption>
                </figure>
                <figure className="design-img design-img-chair">
                  <img
                    src="https://ordinairevietnam.com/cdn/shop/files/Arden_Chair_2.png?v=1766479864&width=800"
                    alt="Arden chair reference"
                  />
                  <figcaption>Metal frame reference</figcaption>
                </figure>
                <figure className="design-img design-img-lounge">
                  <img
                    src="https://ordinairevietnam.com/cdn/shop/files/Louisa_armchair.png?v=1754621654&width=800"
                    alt="Louisa lounge chair reference"
                  />
                  <figcaption>Soft volume reference</figcaption>
                </figure>
              </div>
            </div>
            <div className="board-copy">
              <div className="principle">
                <span>01</span>
                <div>
                  <h4>Soft edge</h4>
                  <p>Bo cong vừa phải; không cute, không sắc lạnh.</p>
                </div>
              </div>
              <div className="principle">
                <span>02</span>
                <div>
                  <h4>Low visual weight</h4>
                  <p>Chân lùi, khung thanh, cảm giác đồ “nhẹ” trong không gian.</p>
                </div>
              </div>
              <div className="principle">
                <span>03</span>
                <div>
                  <h4>Quiet detail</h4>
                  <p>Ít ornament, nhưng joint, groove và frame trở thành signature.</p>
                </div>
              </div>
              <div className="principle">
                <span>04</span>
                <div>
                  <h4>Warm material mix</h4>
                  <p>Metal không đứng một mình: luôn đi với wood hoặc textile.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 04: MATERIAL & ENGINEERING */}
        <section className="section section-charcoal" id="materials">
          <div className="section-head light wide">
            <div>
              <div className="section-kicker">04 / MATERIAL & ENGINEERING</div>
              <h2>Spend where the customer feels it.</h2>
            </div>
            <p>Giá trị không đến từ specification đắt nhất, mà từ việc phân bổ chi phí đúng nơi khách hàng thực sự cảm nhận.</p>
          </div>
          <div className="material-grid">
            <div className="material-card">
              <span>01</span>
              <h3>Performance fabric</h3>
              <p>Chạm tốt, bền, dễ vệ sinh.</p>
            </div>
            <div className="material-card">
              <span>02</span>
              <h3>Veneer + solid wood</h3>
              <p>Dùng solid wood đúng vị trí chịu lực và chạm.</p>
            </div>
            <div className="material-card accent">
              <span>03</span>
              <h3>Powder-coated steel</h3>
              <p>Khung mảnh, dễ chuẩn hóa, phù hợp KD/flat-pack.</p>
            </div>
            <div className="material-card">
              <span>04</span>
              <h3>Better foam</h3>
              <p>Đầu tư vào comfort thay vì décor.</p>
            </div>
          </div>

          <div className="metal-note reveal">
            <div className="metal-visual photo-visual">
              <img
                src="https://ordinairevietnam.com/cdn/shop/files/Arden_Chair_3.png?v=1766479864&width=800"
                alt="Powder-coated metal frame chair reference"
              />
              <span>Powder-coated steel reference</span>
            </div>
            <div>
              <span className="micro">SIGNATURE COMPONENT SYSTEM</span>
              <h3>2–3 hệ chân / frame dùng xuyên collection</h3>
              <p>Tạo nhận diện thương hiệu, giảm tooling, giảm SKU linh kiện, tăng volume và tối ưu logistics.</p>
            </div>
          </div>
        </section>

        {/* SECTION 05: PRODUCT PLATFORM */}
        <section className="section" id="model">
          <div className="section-head wide">
            <div>
              <div className="section-kicker">05 / PRODUCT PLATFORM</div>
              <h2>Ít sản phẩm hơn. Hệ thống tốt hơn.</h2>
            </div>
            <p>B+IN không phát triển từng SKU như một dự án riêng. Mỗi family chia sẻ platform, linh kiện và logic sản xuất.</p>
          </div>

          <div className="platform-grid">
            <div className="platform-card reveal">
              <div className="platform-top">
                <span>SOFA PLATFORM</span>
                <strong>01</strong>
              </div>
              <div className="platform-sizes">
                <b>1.8 m</b>
                <b>2.1 m</b>
                <b>2.4 m</b>
                <b>Ottoman</b>
              </div>
              <div className="platform-bar">
                <i></i>
                <i></i>
                <i></i>
              </div>
              <p>Chung logic frame · chung leg system · ít lựa chọn fabric · nhiều size.</p>
            </div>
            <div className="platform-card reveal delay-1">
              <div className="platform-top">
                <span>TABLE PLATFORM</span>
                <strong>02</strong>
              </div>
              <div className="platform-sizes">
                <b>1600</b>
                <b>1800</b>
                <b>2000</b>
                <b>Desk</b>
              </div>
              <div className="platform-bar">
                <i></i>
                <i></i>
                <i></i>
              </div>
              <p>Chung metal frame · thay top/finish · dễ mở rộng sang console và desk.</p>
            </div>
          </div>

          <div className="launch-line">
            <span>Launch collection</span>
            <strong>8–15 core products</strong>
            <div className="launch-products">
              <i>Sofa</i>
              <i>Lounge</i>
              <i>Dining chair</i>
              <i>Dining table</i>
              <i>Coffee</i>
              <i>Side table</i>
              <i>Console</i>
              <i>Bed</i>
              <i>Bedside</i>
            </div>
          </div>

          <div className="reference-gallery reveal">
            <div className="gallery-intro">
              <span className="micro">REFERENCE PRODUCT DIRECTION</span>
              <h3>Hình ảnh sản phẩm thực tế để khóa ngôn ngữ B+IN.</h3>
              <p>
                Đây là hình tham chiếu thị trường, không phải sản phẩm B+IN. Mục tiêu là làm rõ form, tỷ lệ, vật liệu và mức độ đơn giản mà collection đầu tiên nên hướng tới.
              </p>
            </div>
            <article className="ref-card ref-wide">
              <img
                src="https://ordinairevietnam.com/cdn/shop/files/MILDSOFA-Front_2100x1400_5541fc39-a2e8-4db2-af67-50493c82f23c_700x700.jpg?v=1753849107"
                alt="Compact sofa with slim metal legs"
              />
              <div>
                <b>Sofa direction</b>
                <span>Soft edge · compact depth · slim metal leg</span>
                <a href="https://ordinairevietnam.com/products/mild-sofa" target="_blank" rel="noopener">
                  Reference: Ordinaire Vietnam
                </a>
              </div>
            </article>
            <article className="ref-card">
              <img
                src="https://ordinairevietnam.com/cdn/shop/files/Arden_Chair_2.png?v=1766479864&width=800"
                alt="Dining chair with powder-coated metal frame"
              />
              <div>
                <b>Dining chair</b>
                <span>Powder-coated frame · upholstered touch points</span>
                <a href="https://ordinairevietnam.com/collections/chair/products/arden-chair" target="_blank" rel="noopener">
                  Reference: Ordinaire Vietnam
                </a>
              </div>
            </article>
            <article className="ref-card">
              <img
                src="https://ordinairevietnam.com/cdn/shop/files/Kyo_Dining_PACKSHOT_51810118-360d-4031-ae86-42c72c04fc9e.png?v=1772434572&width=800"
                alt="Warm rounded wood dining table"
              />
              <div>
                <b>Dining table</b>
                <span>Warm wood · soft edge · visually simple</span>
                <a href="https://ordinairevietnam.com/products/kyo-dining-table" target="_blank" rel="noopener">
                  Reference: Ordinaire Vietnam
                </a>
              </div>
            </article>
            <article className="ref-card">
              <img
                src="https://ordinairevietnam.com/cdn/shop/files/Louisa_armchair.png?v=1754621654&width=800"
                alt="Soft contemporary lounge chair"
              />
              <div>
                <b>Lounge chair</b>
                <span>Friendly volume · low visual complexity</span>
                <a href="https://ordinairevietnam.com/products/louisa-armchair" target="_blank" rel="noopener">
                  Reference: Ordinaire Vietnam
                </a>
              </div>
            </article>
            <article className="ref-card">
              <img
                src="https://houseofisabella.co.uk/cdn/shop/files/bodhi-living-calvo-coffee-table-house-of-isabella-uk-43765815836979.jpg?v=1755000300&width=1200"
                alt="Oak coffee table with slim black metal frame"
              />
              <div>
                <b>Coffee table</b>
                <span>Wood tray top · standardized slim steel frame</span>
                <a href="https://houseofisabella.co.uk/products/bodhi-forden-tray-coffee-table-grey" target="_blank" rel="noopener">
                  Reference: House of Isabella
                </a>
              </div>
            </article>
            <article className="ref-card ref-wide">
              <img
                src="https://ordinairevietnam.com/cdn/shop/files/Clair_1.png?v=1769071713&width=800"
                alt="Low TV console with open shelves"
              />
              <div>
                <b>Console / storage</b>
                <span>Low, horizontal, functional and easy to configure</span>
                <a href="https://ordinairevietnam.com/products/clair-shelf" target="_blank" rel="noopener">
                  Reference: Ordinaire Vietnam
                </a>
              </div>
            </article>
            <article className="ref-card">
              <img
                src="https://ordinairevietnam.com/cdn/shop/files/klara_557558c6-edfb-469e-9953-74274d476bb5.png?v=1761043547&width=800"
                alt="Minimal upholstered bed"
              />
              <div>
                <b>Bed</b>
                <span>Soft headboard · simple body · standard mattress sizes</span>
                <a href="https://ordinairevietnam.com/products/klara-bed" target="_blank" rel="noopener">
                  Reference: Ordinaire Vietnam
                </a>
              </div>
            </article>
          </div>
        </section>

        {/* SECTION 06: ONLINE-FIRST */}
        <section className="section section-warm" id="online">
          <div className="section-head wide">
            <div>
              <div className="section-kicker">06 / ONLINE-FIRST</div>
              <h2>
                Không phải catalog trên web.
                <br />
                Là một digital furniture store.
              </h2>
            </div>
            <p>Sản phẩm, UX, logistics và pricing đều được thiết kế ngay từ đầu cho việc mua hoàn toàn online.</p>
          </div>

          <div className="digital-demo reveal">
            <div className="browser-shell">
              <div className="browser-top">
                <span></span>
                <span></span>
                <span></span>
                <b>bin.furniture / sofa-02</b>
              </div>
              <div className="browser-body">
                <div className="product-scene">
                  <img
                    className="demo-product-img"
                    src="https://www.urbannatural.com/cdn/shop/files/younger-slim-sofa.png?v=1774632122&width=1200"
                    alt="Reference sofa shown inside digital product configurator"
                  />
                  <div className="scene-chip chip1">360°</div>
                  <div className="scene-chip chip2">AR</div>
                  <div className="scene-chip chip3">ROOM</div>
                  <div className="demo-reference">Reference image</div>
                </div>
                <div className="config-panel">
                  <span className="micro">B+IN SOFA 02</span>
                  <h3>
                    {selectedSize} · {fabrics[selectedFabric].name}
                  </h3>
                  <div className="price">{priceMap[selectedSize]}</div>
                  <label>SIZE</label>
                  <div className="choices">
                    {['1.8m', '2.1m', '2.4m'].map((sz) => (
                      <button
                        key={sz}
                        className={selectedSize === sz ? 'active' : ''}
                        onClick={() => setSelectedSize(sz)}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                  <label>FABRIC</label>
                  <div className="fabric-pills">
                    {fabrics.map((f, idx) => (
                      <i
                        key={idx}
                        style={{
                          backgroundColor: f.color,
                          outline: selectedFabric === idx ? '2px solid #9a6d49' : 'none',
                          outlineOffset: '2px',
                          cursor: 'pointer',
                        }}
                        onClick={() => setSelectedFabric(idx)}
                        title={f.name}
                      ></i>
                    ))}
                  </div>
                  <button className="buy-btn" onClick={handleAddToCart}>
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="online-points">
            <div>
              <strong>01</strong>
              <span>Giá realtime</span>
            </div>
            <div>
              <strong>02</strong>
              <span>3D / 360° / AR</span>
            </div>
            <div>
              <strong>03</strong>
              <span>Room preset</span>
            </div>
            <div>
              <strong>04</strong>
              <span>Few, curated choices</span>
            </div>
            <div>
              <strong>05</strong>
              <span>Easy delivery & assembly</span>
            </div>
          </div>
        </section>

        {/* SECTION 07: WHY B+IN CAN WIN */}
        <section className="section" id="advantage">
          <div className="section-head wide">
            <div>
              <div className="section-kicker">07 / WHY B+IN CAN WIN</div>
              <h2>B+Furniture experience becomes invisible advantage.</h2>
            </div>
            <p>B+IN không cần trông phức tạp. Phần “khó” nằm phía sau: ergonomics, engineering, sourcing, production và QC.</p>
          </div>

          <div className="advantage-grid">
            <div className="adv-card">
              <span>DESIGN</span>
              <h3>Better proportions</h3>
              <p>Ít sản phẩm nhưng form và comfort được làm kỹ.</p>
            </div>
            <div className="adv-card">
              <span>ENGINEERING</span>
              <h3>Platform architecture</h3>
              <p>Chia sẻ cấu kiện và logic sản xuất giữa các family.</p>
            </div>
            <div className="adv-card">
              <span>MANUFACTURING</span>
              <h3>B+Furniture know-how</h3>
              <p>Kinh nghiệm material, supplier, QC và production.</p>
            </div>
            <div className="adv-card">
              <span>DIGITAL</span>
              <h3>Better buying experience</h3>
              <p>Thay showroom bằng trải nghiệm số rõ ràng và tương tác.</p>
            </div>
          </div>

          <div className="flywheel reveal">
            <div className="fly-center">
              B+IN
              <br />
              <small>BETTER VALUE</small>
            </div>
            <div className="fly-item f1">Digital data</div>
            <div className="fly-item f2">Better decisions</div>
            <div className="fly-item f3">Fewer SKU</div>
            <div className="fly-item f4">Higher volume / SKU</div>
            <div className="fly-item f5">Better cost</div>
            <div className="fly-item f6">More customers</div>
            <svg viewBox="0 0 800 480" aria-hidden="true">
              <ellipse cx="400" cy="240" rx="280" ry="155" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="8 10" opacity=".35" />
            </svg>
          </div>
        </section>

        {/* SECTION 08: SUMMARY */}
        <section className="section section-dark final" id="summary">
          <div className="section-kicker">08 / SUMMARY</div>
          <div className="final-grid">
            <div>
              <span className="brand-big">B+IN</span>
              <h2>
                GOOD FURNITURE.
                <br />
                MADE SIMPLE.
              </h2>
            </div>
            <div className="final-copy">
              <p>
                B+IN là thương hiệu furniture online dành cho nhà ở Việt Nam, sử dụng kinh nghiệm thiết kế và sản xuất của B+Furniture để tạo ra sản phẩm ấm áp, gọn gàng, thông minh và có mức giá hợp lý hơn.
              </p>
              <div className="summary-list">
                <span>Designed for Vietnamese homes.</span>
                <span>Built on B+Furniture experience.</span>
                <span>Available entirely online.</span>
              </div>
            </div>
          </div>
          <div className="footer-line">
            <span>B+IN / BUSINESS CONCEPT</span>
            <span>Warm · Compact · Smart</span>
            <span>2026</span>
          </div>
        </section>
      </main>
    </>
  );
}

const rootEl = document.getElementById('root');
if (rootEl) {
  ReactDOM.createRoot(rootEl).render(<App />);
}
