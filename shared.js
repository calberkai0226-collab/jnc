/**
 * shared.js — 巨能场全站共享组件
 * 包含：左右浮块导航、全屏菜单、Footer、Toast、相关 CSS 和 JS
 * 
 * 使用方法：在每个页面的 </body> 前加一行：
 *   <script src="shared.js"></script>
 * 
 * 不需要手动写导航、菜单、footer 的 HTML，全部由此文件自动注入。
 * 修改一次，所有页面同步生效。
 */

(function () {
  'use strict';

  // ===================== CSS =====================
  var css = `
/* ========== 共享组件样式 ========== */

/* ── 左浮块（Logo） ── */
.nav-pill-left {
  position: fixed; top: 34px; left: 67px; z-index: 1100;
  display: flex; align-items: center; justify-content: center;
  width: 156px; height: 56px; padding: 0 14px;
  background: rgba(255, 253, 250, 0.95);
  border: none; border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  opacity: 1; pointer-events: auto; transform: none;
  transition: opacity 0.15s ease,
              transform 0.25s cubic-bezier(0.76,0,0.24,1),
              top 0.45s cubic-bezier(0.76,0,0.24,1),
              left 0.45s cubic-bezier(0.76,0,0.24,1),
              width 0.45s cubic-bezier(0.76,0,0.24,1),
              height 0.45s cubic-bezier(0.76,0,0.24,1),
              border-radius 0.45s cubic-bezier(0.76,0,0.24,1),
              background 0.3s ease, box-shadow 0.3s ease;
}

/* ── 右浮块（汉堡） ── */
.nav-pill-right {
  position: fixed; top: 34px; right: 67px; z-index: 1100;
  display: flex; align-items: center; justify-content: center;
  width: 56px; height: 56px;
  background: rgba(255, 253, 250, 0.95);
  border: none; border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  opacity: 1; pointer-events: auto; transform: none;
  transition: opacity 0.3s ease,
              transform 0.5s cubic-bezier(0.76,0,0.24,1),
              top 0.5s cubic-bezier(0.76,0,0.24,1),
              right 0.5s cubic-bezier(0.76,0,0.24,1),
              width 0.5s cubic-bezier(0.76,0,0.24,1),
              height 0.5s cubic-bezier(0.76,0,0.24,1),
              border-radius 0.5s cubic-bezier(0.76,0,0.24,1),
              box-shadow 0.3s ease;
}
.nav-pill-left.visible,
.nav-pill-right.visible { opacity: 1; pointer-events: auto; transform: none; }

.nav-pill-right:hover { box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08); }
.nav-pill-right:hover .pill-menu-btn span { background: #000; }
.nav-pill-right.menu-open:hover { background: transparent !important; box-shadow: none !important; }
.nav-pill-right.menu-open:hover .pill-menu-btn span { background: #000; }

/* 菜单打开时：右浮块融入菜单背景 */
.nav-pill-right.menu-open {
  top: 18px !important; right: 24px !important; transform: none !important;
  width: 56px !important; height: 56px !important; border-radius: 16px !important;
  background: transparent !important; box-shadow: none !important;
  backdrop-filter: none !important; -webkit-backdrop-filter: none !important;
}
/* 三道杠 → X */
.nav-pill-right.menu-open .pill-menu-btn span:nth-child(1) {
  transform: translateY(8px) rotate(45deg); background: #2a1f3d;
}
.nav-pill-right.menu-open .pill-menu-btn span:nth-child(2) {
  opacity: 0; transform: scaleX(0); width: 0;
}
.nav-pill-right.menu-open .pill-menu-btn span:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg); background: #2a1f3d; width: 28px;
}
.nav-pill-right.menu-open .pill-menu-btn {
  align-items: center; padding-left: 0;
}

/* 菜单打开时：左浮块融入菜单背景 */
.nav-pill-left.menu-open {
  top: 18px !important; left: 24px !important; transform: none !important;
  width: 156px !important; height: 56px !important; border-radius: 16px !important;
  background: transparent !important; box-shadow: none !important;
  backdrop-filter: none !important; -webkit-backdrop-filter: none !important;
}

/* ── Logo 和汉堡按钮 ── */
.pill-logo {
  display: flex; align-items: center; justify-content: center;
  width: 100%; height: 100%; text-decoration: none;
}
.pill-logo img {
  height: 34px; width: auto; display: block;
  filter: brightness(0) opacity(0.82); margin-left: 26px;
}
.pill-menu-btn {
  display: flex; flex-direction: column; gap: 6px;
  align-items: flex-start; justify-content: center;
  width: 100%; height: 100%;
  cursor: pointer; background: none; border: none; padding: 0 0 0 15px;
}
.pill-menu-btn span {
  display: block; width: 28px; height: 2px; background: #2a1f3d;
  border-radius: 2px; transform-origin: center;
  transition: transform 0.4s cubic-bezier(0.76,0,0.24,1),
              opacity 0.25s ease, width 0.3s ease;
}
.pill-menu-btn span:nth-child(3) { width: 13px; }

/* ── 全屏菜单 ── */
.fullscreen-menu {
  position: fixed; inset: 0; z-index: 1050;
  background: transparent; display: flex; flex-direction: column;
  pointer-events: none; visibility: hidden;
  transition: visibility 0s linear 0.6s;
}
.fullscreen-menu.open {
  pointer-events: auto; visibility: visible;
  transition: visibility 0s linear 0s;
}
.fsm-body {
  position: absolute; inset: 0; display: flex; flex-direction: column;
  background: #f5f3ee; transform: translateY(100%);
  transition: transform 0.3s cubic-bezier(0.76, 0, 0.24, 1);
}
.fullscreen-menu.open .fsm-body { transform: translateY(0); }

.fsm-nav, .fsm-footer {
  opacity: 0; transform: translateY(12px);
  transition: opacity 0.1s ease, transform 0.1s ease;
}
.fullscreen-menu.open .fsm-nav {
  opacity: 1; transform: translateY(0);
  transition: opacity 0.2s ease 0.15s, transform 0.2s ease 0.15s;
}
.fullscreen-menu.open .fsm-footer {
  opacity: 1; transform: translateY(0);
  transition: opacity 0.2s ease 0.3s, transform 0.2s ease 0.3s;
}

.fsm-link {
  display: flex; align-items: center; justify-content: space-between;
  font-family: inherit;
  font-size: clamp(24px, 3.5vw, 36px); font-weight: 400;
  color: #888884; text-decoration: none;
  line-height: 1.2; padding: 28px 0;
  letter-spacing: 0.01em;
  transition: color 0.2s; opacity: 0; transform: translateY(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}
.fsm-link:first-child { border-top: 1px solid rgba(0, 0, 0, 0.08); }
.fsm-link:hover { color: #1a1118; }
.fsm-link-arrow { display: none; }

.fullscreen-menu.open .fsm-link {
  opacity: 1; transform: translateY(0);
  transition: opacity 0.2s ease, transform 0.2s ease, color 0.2s;
}
.fullscreen-menu.open .fsm-link:nth-child(1) { transition-delay: 0.18s, 0.18s, 0s; }
.fullscreen-menu.open .fsm-link:nth-child(2) { transition-delay: 0.23s, 0.23s, 0s; }
.fullscreen-menu.open .fsm-link:nth-child(3) { transition-delay: 0.28s, 0.28s, 0s; }
.fullscreen-menu.open .fsm-link:nth-child(4) { transition-delay: 0.33s, 0.33s, 0s; }
.fullscreen-menu.open .fsm-link:nth-child(5) { transition-delay: 0.38s, 0.38s, 0s; }
.fullscreen-menu:not(.open) .fsm-link {
  transition: opacity 0.1s ease, transform 0.1s ease, color 0.2s;
}

.fsm-nav {
  flex: 1; display: flex; flex-direction: column; justify-content: flex-start;
  padding: 120px 48px 0;
}
.fsm-footer { padding: 32px 48px; flex-shrink: 0; }
.fsm-cta {
  font-size: 15px; font-weight: 500;
  color: #6B2CC9; text-decoration: none; transition: opacity 0.2s;
}
.fsm-cta:hover { opacity: 0.7; }

/* ── Footer ── */
footer {
  padding: 48px 48px 42px; border-top: none;
  font-size: 13px; color: rgba(255, 255, 255, 0.5);
  text-align: left; line-height: 1.8; background: #191919;
}
footer .footer-inner { max-width: 1080px; }
.footer-copyright { font-size: 13px; color: rgba(255, 255, 255, 0.5); }
.footer-email {
  display: inline-block; font-size: 13px; color: rgba(255, 255, 255, 0.5);
  margin-top: 4px; text-decoration: none; border-bottom: 1px solid transparent;
  transition: border-color 0.2s;
}
.footer-email:hover { border-bottom-color: rgba(255, 255, 255, 0.3); }
.footer-made-with { font-size: 13px; color: rgba(255, 255, 255, 0.35); margin-top: 6px; }
.footer-made-with .heart { color: #c0392b; }

/* ── Toast ── */
.copy-toast {
  position: fixed; bottom: 40px; left: 50%; transform: translateX(-50%) translateY(20px);
  background: #1a1118; color: #f5f3ee;
  font-size: 14px; padding: 12px 24px; border-radius: 100px;
  opacity: 0; pointer-events: none; z-index: 9999;
  transition: opacity 0.3s, transform 0.3s; white-space: nowrap;
}
.copy-toast.show { opacity: 1; transform: translateX(-50%) translateY(0); }

/* ── 响应式断点 ── */
@media (max-width: 1200px) {
  .nav-pill-left { left: 32px; top: 36px; width: 138px; height: 52px; border-radius: 14px; }
  .nav-pill-right { right: 32px; top: 36px; width: 52px; height: 52px; border-radius: 14px; }
  .nav-pill-left.menu-open { left: 16px !important; top: 16px !important; width: 138px !important; height: 52px !important; border-radius: 14px !important; }
  .nav-pill-right.menu-open { right: 16px !important; top: 16px !important; width: 52px !important; height: 52px !important; border-radius: 14px !important; }
  .pill-logo img { height: 30px; margin-left: 24px; }
  .pill-menu-btn span { width: 26px; }
  .pill-menu-btn span:nth-child(3) { width: 12px; }
}
@media (max-width: 900px) {
  .nav-pill-left { left: 29px; top: 12px; width: 125px; height: 48px; border-radius: 13px; }
  .nav-pill-right { right: 29px; top: 12px; width: 48px; height: 48px; border-radius: 13px; }
  .nav-pill-left.menu-open { left: 12px !important; top: 8px !important; width: 125px !important; height: 48px !important; border-radius: 13px !important; }
  .nav-pill-right.menu-open { right: 12px !important; top: 8px !important; width: 48px !important; height: 48px !important; border-radius: 13px !important; }
  .pill-logo img { height: 28px; margin-left: 22px; }
  .pill-menu-btn span { width: 24px; }
  .pill-menu-btn span:nth-child(3) { width: 11px; }
  .fsm-nav { padding: 100px 36px 0; }
}
@media (max-width: 640px) {
  .nav-pill-left { left: 16px; top: 16px; width: 118px; height: 44px; border-radius: 12px; padding: 0; }
  .nav-pill-right { right: 16px; top: 16px; width: 44px; height: 44px; border-radius: 12px; }
  .nav-pill-left.menu-open { width: 118px !important; height: 44px !important; left: 8px !important; top: 8px !important; }
  .nav-pill-right.menu-open { width: 44px !important; height: 44px !important; right: 8px !important; top: 8px !important; }
  .pill-logo img { height: 26px; margin-left: 17px; padding-left: 0; }
  .pill-menu-btn { gap: 5px; padding-left: 12px; }
  .pill-menu-btn span { width: 22px; height: 2px; }
  .pill-menu-btn span:nth-child(3) { width: 10px; }
  .nav-pill-right.menu-open .pill-menu-btn { align-items: center; padding-left: 0; }
  .nav-pill-right.menu-open .pill-menu-btn span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .nav-pill-right.menu-open .pill-menu-btn span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); width: 22px; }
  .fsm-nav { padding: 90px 28px 0; justify-content: flex-start; }
  .fsm-link { font-size: 24px; font-weight: 400; padding: 22px 0; color: rgba(26, 17, 24, 0.65); font-family: inherit; }
  .fsm-link-arrow { display: none; }
  .fsm-footer { padding: 24px 28px; }
  footer { padding: 36px 28px 30px; }
}
`;

  // ===================== HTML =====================
  // 判断当前页面是否是首页（用于 logo 链接）
  var isIndex = /index\.html$/.test(location.pathname) || /\/$/.test(location.pathname);
  var logoHref = isIndex ? '#' : 'index.html';

  var navHTML = ''
    + '<div class="nav-pill-left visible" id="pillLeft">'
    +   '<a href="' + logoHref + '" class="pill-logo" id="pillLogoLink">'
    +     '<img src="巨能场logo.png" alt="巨能场" class="pill-logo-full" width="75" height="75" />'
    +   '</a>'
    + '</div>'
    + '<div class="nav-pill-right" id="pillRight">'
    +   '<button class="pill-menu-btn" id="menuToggle" aria-label="菜单" onclick="toggleMenu()">'
    +     '<span></span><span></span><span></span>'
    +   '</button>'
    + '</div>'
    + '<div class="fullscreen-menu" id="fullscreenMenu">'
    +   '<div class="fsm-body" id="fsmBody">'
    +     '<nav class="fsm-nav">'
    +       '<a href="mailto:chris@megworks.ai" class="fsm-link" onclick="smartMailto(event)">'
    +         '<span>联系我们</span><span class="fsm-link-arrow">›</span>'
    +       '</a>'
    +       '<a href="join.html" class="fsm-link" onclick="toggleMenu()">'
    +         '<span>加入我们</span><span class="fsm-link-arrow">›</span>'
    +       '</a>'
    +     '</nav>'
    +   '</div>'
    + '</div>';

  var footerHTML = ''
    + '<footer>'
    +   '<div class="footer-inner">'
    +     '<div class="footer-copyright">©2026 巨能场</div>'
    +     '<div class="footer-made-with">Built with <span class="heart">♥️</span> in Shenzhen</div>'
    +   '</div>'
    + '</footer>';

  var toastHTML = '<div class="copy-toast" id="copyToast">邮箱已复制：chris@megworks.ai</div>';

  // ===================== 注入 =====================

  // 1. 注入 CSS
  var styleEl = document.createElement('style');
  styleEl.id = 'shared-styles';
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  // 2. 删除页面中已有的旧组件（防止重复）
  ['pillLeft', 'pillRight', 'fullscreenMenu', 'copyToast'].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.parentNode.removeChild(el);
  });
  var oldFooter = document.querySelector('footer');
  if (oldFooter) oldFooter.parentNode.removeChild(oldFooter);

  // 3. 注入导航（插到 body 最前面）
  var navContainer = document.createElement('div');
  navContainer.innerHTML = navHTML;
  while (navContainer.firstChild) {
    document.body.insertBefore(navContainer.firstChild, document.body.firstChild);
  }

  // 4. 注入 Footer + Toast（插到 body 最后面）
  var footerContainer = document.createElement('div');
  footerContainer.innerHTML = footerHTML + toastHTML;
  while (footerContainer.firstChild) {
    document.body.appendChild(footerContainer.firstChild);
  }

  // ===================== JS 逻辑 =====================

  // 菜单开关
  var pillLeft  = document.getElementById('pillLeft');
  var pillRight = document.getElementById('pillRight');
  var fsMenu    = document.getElementById('fullscreenMenu');
  var menuOpen  = false;

  window.toggleMenu = function () {
    menuOpen = !menuOpen;
    if (menuOpen) {
      fsMenu.classList.add('open');
      document.body.style.overflow = 'hidden';
      pillLeft.classList.add('menu-open');
      pillRight.classList.add('menu-open');
    } else {
      fsMenu.classList.remove('open');
      document.body.style.overflow = '';
      pillLeft.classList.remove('menu-open');
      pillRight.classList.remove('menu-open');
      pillRight.style.backdropFilter = 'none';
      pillRight.style.webkitBackdropFilter = 'none';
      pillLeft.style.backdropFilter = 'none';
      pillLeft.style.webkitBackdropFilter = 'none';
      requestAnimationFrame(function () {
        setTimeout(function () {
          pillRight.style.backdropFilter = '';
          pillRight.style.webkitBackdropFilter = '';
          pillLeft.style.backdropFilter = '';
          pillLeft.style.webkitBackdropFilter = '';
        }, 600);
      });
    }
  };

  // 智能邮箱：先尝试 mailto，打不开就复制
  window.smartMailto = function (e) {
    e.preventDefault();
    var email = 'chris@megworks.ai';
    var hasFocus = true;
    function onBlur() { hasFocus = false; }
    window.addEventListener('blur', onBlur);
    window.location.href = 'mailto:' + email;
    setTimeout(function () {
      window.removeEventListener('blur', onBlur);
      if (hasFocus) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(email).then(function () {
            showToast();
          }).catch(function () { fallbackCopy(email); });
        } else { fallbackCopy(email); }
      }
      if (menuOpen) { toggleMenu(); }
    }, 500);
  };

  function fallbackCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;opacity:0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); showToast(); } catch (e) {}
    document.body.removeChild(ta);
  }

  function showToast() {
    var toast = document.getElementById('copyToast');
    if (!toast) return;
    toast.classList.add('show');
    setTimeout(function () { toast.classList.remove('show'); }, 2000);
  }

})();
